import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyPyramid } from "./MyPyramid.js";
import { MySphere } from "./MySphere.js";
import { MyFish } from "./MyFish.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
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

        this.movingObject = new MyMovingObject(this, new MyPyramid(this, 10, 10));

        this.cubeMapTextures = [];
        //let cubeMapTextureNames = ['demo_cubemap', 'test_cubemap', 'canyon_cubemap', 'car_cubemap', 'desert_cubemap'];
        let cubeMapTextureNames = [];
        for (let textureName of cubeMapTextureNames) {
            let cubeMapTexture = [
                new CGFtexture(this, 'images/' + textureName + '/top.png'),
                new CGFtexture(this, 'images/' + textureName + '/back.png'),
                new CGFtexture(this, 'images/' + textureName + '/right.png'),
                new CGFtexture(this, 'images/' + textureName + '/front.png'),
                new CGFtexture(this, 'images/' + textureName + '/left.png'),
                new CGFtexture(this, 'images/' + textureName + '/bottom.png'),
            ];
            this.cubeMapTextures.push(cubeMapTexture);
        }
        
        //this.cubeMap = new MyCubeMap(this, ...this.cubeMapTextures[0]);


        // Sea Floor and its Apperance
        // TODO: Garantee maximum height does not go beyond Y=1 (verification in shader)
        // TODO: Pass maximum height or height offset to shader (uniform)
        this.seaFloor = new MySeaFloor(this, 50);

        this.seaFloorAppearance = new CGFappearance(this);
		this.seaFloorAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.seaFloorAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.seaFloorAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.seaFloorAppearance.setShininess(120);

		this.texture = new CGFtexture(this, "images/sand.png");
		this.seaFloorAppearance.setTexture(this.texture);
		this.seaFloorAppearance.setTextureWrap('REPEAT', 'REPEAT');
		this.texture2 = new CGFtexture(this, "images/sandMap.png");

		// shaders initialization
		this.shader = new CGFshader(this.gl, "shaders/sea_floor.vert", "shaders/sea_floor.frag");

		// additional texture will have to be bound to texture unit 1 later, when using the shader, with "this.texture2.bind(1);"
		this.shader.setUniformsValues({ uSampler2: 1, maxHeightY: 1.0});


        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0, 0, 0, 1);
		this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);
        this.sphereAppearance.setTexture(new CGFtexture(this, 'images/earth.jpg'));

        this.fish = new MyFish(this);

        // Objects connected to MyInterface
        this.displayAxis = true;
        this.selectedCubeMap = 0;
        this.movingObjectScaleFactor = 1;
        this.speedFactor = 1;

        this.cubeMapIds = {};
        for (let textureIndex in cubeMapTextureNames) {
            this.cubeMapIds[cubeMapTextureNames[textureIndex]] = textureIndex;
        }
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(1.7, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0, 0, 0, 1);
        this.setShininess(10.0);
    }
    
    updateCubeMap() {
        this.cubeMap.updateTextures(...this.cubeMapTextures[this.selectedCubeMap]);
    }

    updateMovingObject() {
        this.movingObject.updateScaleFactor(this.movingObjectScaleFactor);
    }

    // Called periodically (as per setUpdatePeriod() in init())
    update(t) {
        this.checkKeys();
        this.movingObject.updateVelocity(this.speedFactor);

        this.fish.updateAnimation(t);
    }

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

        if (this.gui.isKeyPressed("KeyR")) {
            this.movingObject.reset();
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
        
        //this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // ---- BEGIN Primitive drawing section

        /*this.pushMatrix();
        this.translate(0, 3, 0);
        this.fish.display();
        this.popMatrix();*/

        
        this.seaFloorAppearance.apply();
        this.setActiveShader(this.shader);
        this.texture2.bind(1);

        this.pushMatrix();
        this.scale(50, 50, 50, 0);
        this.rotate(-Math.PI/2, 1, 0, 0);
		this.seaFloor.display();
		this.popMatrix();


        //this.movingObject.display();

        // this.sphereAppearance.apply();
        //this.sphere.display();

        //let CUBE_MAP_LENGTH = 500;
        //this.pushMatrix();
        //this.translate(...this.camera.position);
        //this.scale(CUBE_MAP_LENGTH, CUBE_MAP_LENGTH, CUBE_MAP_LENGTH);
        //this.cubeMap.display();
        //this.popMatrix();

        // ---- END Primitive drawing section

        this.setActiveShader(this.defaultShader);
    }
}
