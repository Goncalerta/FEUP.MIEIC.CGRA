import {CGFobject} from '../lib/CGF.js';
import {CGFappearance} from '../lib/CGF.js';
import {CGFshader} from '../lib/CGF.js';
import {CGFtexture} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
import { MyTriangle } from './MyTriangle.js';

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
        this.bodyShader = new CGFshader(this.scene.gl, "shaders/fish_body.vert", "shaders/fish_body.frag"),
        this.fishAppearance = new CGFappearance(this.scene);
		this.fishAppearance.setAmbient(0.8, 0, 0, 1);
		this.fishAppearance.setDiffuse(0.8, 0, 0, 1);
		this.fishAppearance.setSpecular(0.2, 0.2, 0.2, 1);
		this.fishAppearance.setShininess(5);
        this.fishAppearance.setTexture(new CGFtexture(this.scene, 'images/fishbody_texture.jfif'));


        this.eyeAppearance = new CGFappearance(this.scene);
		this.eyeAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.eyeAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.eyeAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.eyeAppearance.setShininess(1);
        this.eyeAppearance.setTexture(new CGFtexture(this.scene, 'images/fisheye.png'));

        this.eye = new MySphere(scene, 20, 20);

        this.fin = new MyTriangle(scene);

        this.t = 0;
    }

    /**
     * Initializes buffers of the inner object.
     */
    initBuffers() {
        this.body.initBuffers();
        this.eye.initBuffers();
        this.fin.initBuffers();
    }

    display_eye(left) {
        this.scene.pushMatrix();

        this.eyeAppearance.apply();

        this.scene.translate(left? 0.4 : -0.4, 0.28, 0.9);
        this.scene.scale(0.18, 0.18, 0.18);
        this.scene.rotate(Math.PI/2, 0, 0, 1);        
        this.eye.display();

        this.scene.popMatrix();
    }

    display_lateral_fin(left, t) {
        this.scene.pushMatrix();
        this.scene.translate(left? 0.6:-0.6, -0.5, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.translate(0, Math.sqrt(0.5), 0);

        let rotation_angle = Math.PI/10 + Math.cos(this.t/400)*Math.cos(this.t/400)*Math.PI/5;
        this.scene.rotate(left? rotation_angle:-rotation_angle, 0, 0, 1);
        this.scene.translate(0, -Math.sqrt(0.5), 0);
        this.scene.rotate(Math.PI/4, 1, 0, 0);
        this.fin.display();
        this.scene.popMatrix();
    }

    updateAnimation(t) {
        this.t = t;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.15625, 0.15625, 0.15625);

        // Eyes
        this.display_eye(true);
        this.display_eye(false);

        this.fishAppearance.apply();

        // Tail
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1.6);
        let rotation_angle = Math.cos((this.t+150)/160)*Math.PI/9;
        this.scene.rotate(rotation_angle, 0, 1, 0);
        this.scene.translate(0, 0, -1);
        this.fin.display();
        this.scene.popMatrix();

        // Top fin
        this.scene.pushMatrix();
        this.scene.translate(0, (1+Math.sqrt(2))/2, 0);
        this.scene.scale(-0.5, 0.5, -0.5);
        this.scene.rotate(Math.PI/4, 1, 0, 0);
        this.fin.display();
        this.scene.popMatrix();

        // Lateral fins
        this.display_lateral_fin(true);
        this.display_lateral_fin(false);

        // Body
        this.scene.setActiveShader(this.bodyShader);
        this.body.display();

        this.scene.setActiveShader(this.scene.defaultShader);
        

        this.scene.popMatrix();
    }
}
