import {CGFobject} from '../lib/CGF.js';
import {CGFappearance} from '../lib/CGF.js';
import {CGFshader} from '../lib/CGF.js';
import {CGFtexture} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';

/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 * @param object - The CGFobject that will be moved and displayed on screen. 
 */
export class MyFish extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.body = new MySphere(scene, 20, 20);
        this.bodyShader = new CGFshader(this.scene.gl, "shaders/fishbody.vert", "shaders/fishbody.frag"),
        this.bodyAppearance = new CGFappearance(this.scene);
		this.bodyAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.bodyAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.bodyAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.bodyAppearance.setShininess(120);
        this.bodyAppearance.setTexture(new CGFtexture(this.scene, 'images/fishbody_texture.jfif'));


        this.eye = new MySphere(scene, 20, 20);
    }

    /**
     * Initializes buffers of the inner object.
     */
    initBuffers() {
        this.body.initBuffers();
        this.eye.initBuffers();
    }

    display() {
        // this.scene.pushMatrix();

        // this.scene
        // this.eye.display();

        // this.scene.popMatrix();

        this.scene.setActiveShader(this.bodyShader);
        this.bodyAppearance.apply();
        this.body.display();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
