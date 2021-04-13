import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyPyramid } from "./MyPyramid.js";
import { MySphere } from "./MySphere.js";

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
        this.cubeMap = new MyCubeMap(this, 
            new CGFtexture(this, 'images/canyon_cubemap/top.png'),
            new CGFtexture(this, 'images/canyon_cubemap/back.png'),
            new CGFtexture(this, 'images/canyon_cubemap/right.png'),
            new CGFtexture(this, 'images/canyon_cubemap/front.png'),
            new CGFtexture(this, 'images/canyon_cubemap/left.png'),
            new CGFtexture(this, 'images/canyon_cubemap/bottom.png')
        );

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


        // Objects connected to MyInterface
        this.displayAxis = true;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0, 0, 0, 1);
        this.setShininess(10.0);
    }

    // Called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.movingObject.update();
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
        
        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // ---- BEGIN Primitive drawing section

        this.sphereAppearance.apply();
        this.sphere.display();
        //this.movingObject.display();

        let CUBE_MAP_LENGTH = 500;
        this.pushMatrix();
        this.translate(...this.camera.position);
        this.scale(CUBE_MAP_LENGTH, CUBE_MAP_LENGTH, CUBE_MAP_LENGTH);
        this.cubeMap.display();
        this.popMatrix();

        // ---- END Primitive drawing section
    }
}
