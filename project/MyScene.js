import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { CGFcamera2 } from "./CFGcamera2.js"
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { MyPyramid } from "./MyPyramid.js";
import { MySphere } from "./MySphere.js";
import { MyFish } from "./MyFish.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyFishNest } from "./MyFishNest.js";
import { MySeaweedSet } from "./MySeaweedSet.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MyWaterSurface } from "./MyWaterSurface.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyPillar } from "./MyPillar.js";
import { MySeaweed } from "./MySeaweed.js";
import { MyPlane } from "./MyPlane.js";

export class MyScene extends CGFscene {
    /**
     * MyScene
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * @method init
     * Initializes the scene.
     * @param {CGFapplication} application - Application.
     */
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        // Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        // Initialize scene objects
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);

        this.seaFloor = new MySeaFloor(this, 50, 50, 6, 1.25);
        this.waterSurface = new MyWaterSurface(this, 10, 50, 0.3, 0.3);
        
        this.rockSet = new MyRockSet(this, 30, -22, 22, -22, 22, 10, 10);
        this.seaweedSet = new MySeaweedSet(this, 25, 2, 5, -22, 22, -22, 22, 0.08, 0.14, 0.25, 0.9, 0.2, 1.1, 0.15, 0.1);
        
        this.fishNest = new MyFishNest(this, -8, -11.5, 2.25, this.rockSet.getNumRocks(), this.rockSet.getRockAppearance());
        this.movingObject = new MyMovingFish(this, this.fishNest, this.rockSet);
        
        this.pillars = [];
        // Pillar appearance: created outside MyPillar so it can be used once for every pillar
        this.pillarAppearance = new CGFappearance(this);
        this.pillarAppearance.setAmbient(1, 0.90, 0.85, 1);
		this.pillarAppearance.setDiffuse(0.52*0.4, 0.37*0.4, 0.26*0.4, 1.0);
		this.pillarAppearance.setSpecular(0.52*0.2, 0.37*0.2, 0.26*0.2, 1.0);
		this.pillarAppearance.setShininess(11.0);
        // From
        // http://www.cadhatch.com/seamless-bark-textures/4588167786
        // Bark-0497
        this.pillarAppearance.setTexture(new CGFtexture(this, 'images/tree.jpg'));
        for (let x = 3.5; x <= 25; x+=6) {
            this.pillars.push(
                new MyPillar(this, x, -0.25, 0.35, 10, 20),
                new MyPillar(this, x, -3.25, 0.35, 10, 20),
            );
        }

        this.cubeMapTextures = [];
        this.cubeMapTextureNames = [
            ['underwater_cubemap', 'jpg'], 
            ['demo_cubemap', 'png'], 
            ['test_cubemap', 'png'],
            ['canyon_cubemap', 'png'],
            ['car_cubemap', 'png'],
            ['desert_cubemap', 'png'],
        ];
        for (let _ in this.cubeMapTextureNames) {
            // Textures will be loaded lazily
            // so that startup is not so slow
            this.cubeMapTextures.push(null);
        }
        
        this.loadCubeMap(0, this.cubeMapTextureNames[0][0], this.cubeMapTextureNames[0][1]);
        this.cubeMap = new MyCubeMap(this, ...this.cubeMapTextures[0]);

        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0, 0, 0, 1);
		this.defaultAppearance.setShininess(1);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(1);
        this.sphereAppearance.setTexture(new CGFtexture(this, 'images/earth.jpg'));

        // Objects connected to MyInterface
        this.displayAxis = true;
        this.selectedCubeMap = 0;
        this.movingObjectScaleFactor = 1;
        this.speedFactor = 1;

        this.cubeMapIds = {};
        for (let textureIndex in this.cubeMapTextureNames) {
            this.cubeMapIds[this.cubeMapTextureNames[textureIndex][0]] = textureIndex;
        }
    }

    /**
     * @method initLights
     * Initializes the scene lights.
     */
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    /**
     * @method initCameras
     * Initializes the scene camera.
     */
    initCameras() {
        this.camera = new CGFcamera2(1.75, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    /**
     * @method setDefaultAppearance
     * Sets default appearance in the scene.
     */
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0, 0, 0, 1);
        this.setShininess(10.0);
    }
    
    /**
     * @method loadCubeMap
     * Loads certain texture into a vector of textures for the cube map.
     * @param {Integer} index - Index of the texture to load for the cube map.
     * @param {String} textureName - Name of the texture.
     * @param {String} fileExtension - File extension of the texute.
     */
    loadCubeMap(index, textureName, fileExtension) {
        this.cubeMapTextures[index] = [
            new CGFtexture(this, 'images/' + textureName + '/top.' + fileExtension),
            new CGFtexture(this, 'images/' + textureName + '/back.' + fileExtension),
            new CGFtexture(this, 'images/' + textureName + '/right.' + fileExtension),
            new CGFtexture(this, 'images/' + textureName + '/front.' + fileExtension),
            new CGFtexture(this, 'images/' + textureName + '/left.' + fileExtension),
            new CGFtexture(this, 'images/' + textureName + '/bottom.' + fileExtension),
        ];
        return this.cubeMapTextures[index];
    }

    /**
     * @method updateCubeMap
     * Updates the cube map with selected texture.
     */
    updateCubeMap() {
        let index = this.selectedCubeMap;
        let cubemap = this.cubeMapTextures[index];
        if (cubemap == null) {
            cubemap = this.loadCubeMap(
                this.selectedCubeMap, 
                this.cubeMapTextureNames[index][0], 
                this.cubeMapTextureNames[index][1]
            );
        }
        this.cubeMap.updateTextures(...cubemap);
    }

    /**
     * @method updateMovingObject
     * Updates the moving object's scale factor.
     */
    updateMovingObject() {
        this.movingObject.updateScaleFactor(this.movingObjectScaleFactor);
    }

    /**
     * @method update
     * Called periodically (as per setUpdatePeriod() in init()).
     * Updates the objects in the scene and checks input from keys.
     * @param {Number} - Current time in milliseconds.
     */
    update(t) {
        this.checkKeys();
        this.movingObject.updatePosition(this.speedFactor);
        this.movingObject.updateAnimation(t);
        this.waterSurface.updateAnimation(t);
        this.seaweedSet.update(t);
    }

    /**
     * @method checkKeys
     * Checks for user's input in tge keyboard and acts accordingly.
     */
    checkKeys() {
        if (this.gui.isKeyPressed("KeyW")) {
            this.movingObject.accelerate(0.01);
        }

        if (this.gui.isKeyPressed("KeyS")) {
            this.movingObject.accelerate(-0.01);
        }

        if (this.gui.isKeyPressed("KeyA")) {
            this.movingObject.turn(Math.PI/8);
        }

        if (this.gui.isKeyPressed("KeyD")) {
            this.movingObject.turn(-Math.PI/8);
        }

        if (this.gui.isKeyPressed("KeyP")) {
            this.movingObject.setMovingUp();
        }
        
        if (this.gui.isKeyPressed("KeyL")) {
            this.movingObject.setMovingDown();
        }

        if (this.gui.isKeyPressed("KeyR")) {
            this.movingObject.reset();
        }

        if (this.gui.isKeyPressed("KeyC")) {
            this.movingObject.interactWithRock();
        }
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // ---- BEGIN Primitive drawing section
        
        this.seaFloor.display();
        this.fishNest.display();
        this.seaweedSet.display();

        this.waterSurface.display();

        this.rockSet.display();

        this.pillarAppearance.apply();
        for (let pillar of this.pillars) {
            pillar.display();
        }

        this.movingObject.display();

        // this.sphereAppearance.apply();
        // this.sphere.display();

        let CUBE_MAP_LENGTH = 500;
        this.pushMatrix();
        this.translate(...this.camera.position);
        this.scale(CUBE_MAP_LENGTH, CUBE_MAP_LENGTH, CUBE_MAP_LENGTH);
        this.cubeMap.display();
        this.popMatrix();

        // ---- END Primitive drawing section
    }
}
