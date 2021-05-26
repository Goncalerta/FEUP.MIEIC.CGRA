import {CGFappearance} from '../lib/CGF.js';
import {CGFshader} from '../lib/CGF.js';
import {CGFtexture} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
import { MyTriangle } from './MyTriangle.js';

export class MyFish {
    /**
     * MyFish
     * @constructor
     * @param  {CGFscene} scene - Reference to MyScene object 
     */
    constructor(scene) {
        this.scene = scene;

        // Body ratio in relation to the fish y axis
        this.xDistortion = 0.6;
        this.zDistortion = 1.6;
        
        this.body = new MySphere(scene, 20, 20);
        this.bodyShader = new CGFshader(this.scene.gl, "shaders/fish_body.vert", "shaders/fish_body.frag");
        this.bodyShader.setUniformsValues({ xDistortion: this.xDistortion, zDistortion: this.zDistortion });
        
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

        // Fin and tail movement attributes
        this.finspeed = 1/400;
        this.tailspeed = 1/160;
        this.finphase = 0;
        this.tailphase = 0.9;

        this.stopFinState = 0; // 0: no fin is stopped, 1: right fin is stopped, -1: left fin is stopped
        this.tailRotationState = this.tailphase;

        // Internal clock to display the correct state of the animation
        this.t = 0;
    }

    /**
     * @method setStopFinState
     * Used to stop one of the fins when the fish is moving
     * @param {integer} stopFinState - New state of the fins. 0: no fin is stopped, 1: right fin is stopped, -1: left fin is stopped
     */
    setStopFinState(stopFinState) {
        this.stopFinState = stopFinState;
    }

    /**
     * @method setTailSpeed
     * Changes the speed of the tail
     * @param {float} tailspeed - New speed
     */
    setTailSpeed(tailspeed) {
        this.tailspeed = tailspeed;
    }

    /**
     * @method displayEye
     * Displays one of the eyes of the fish
     * @param {boolean} left - Whether the displayed eye is the left one (otherwise it's the right one)
     */
    displayEye(left) {
        this.scene.pushMatrix();

        this.scene.translate(left? 0.4 : -0.4, 0.28, 0.9);
        this.scene.scale(0.18, 0.18, 0.18);
        this.scene.rotate(Math.PI/2, 0, 0, 1);        
        this.eye.display();

        this.scene.popMatrix();
    }

     /**
     * @method displayLateralFin
     * Displays one of the lateral fins of the fish
     * @param {boolean} left - Whether the displayed fin is the left one (otherwise it's the right one)
     */
    displayLateralFin(left) {
        this.scene.pushMatrix();
        this.scene.translate(left? 0.6 : -0.6, -0.5, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.translate(0, Math.sqrt(0.5), 0);

        let rotation_angle; 
        if ((this.stopFinState == -1 && left) || (this.stopFinState == 1 && !left)) {
            // Fixed angle for when movement is stopped
            rotation_angle = Math.PI/5;
        } else {
            // Angle based on the current time, speed and phase of the fin
            let rotation_state = this.t * this.finspeed + this.finphase;
            rotation_angle = Math.PI/10 + Math.cos(rotation_state)*Math.cos(rotation_state)*Math.PI/5;
        }
        this.scene.rotate(left? rotation_angle:-rotation_angle, 0, 0, 1);
        this.scene.translate(0, -Math.sqrt(0.5), 0);
        this.scene.rotate(Math.PI/4, 1, 0, 0);
        this.fin.display();
        this.scene.popMatrix();
    }

    /**
     * @method updateAnimation
     * Updates the state of the animation based on current time
     * @param {Number} t - Current time in milliseconds
     */
    updateAnimation(t) {
        this.tailRotationState += this.tailspeed * (t-this.t);
        this.t = t;
    }

    /**
     * @method display
     * Displays MyFish.
     */
    display() {
        this.scene.pushMatrix();
        let fishscale = 0.5/(2*this.zDistortion);
        this.scene.scale(fishscale, fishscale, fishscale); // Scale the fish to the instructed size (so that the lenght is around 0.5)

        // Eyes
        this.eyeAppearance.apply();
        this.displayEye(true);
        this.displayEye(false);

        this.fishAppearance.apply();

        // Tail
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1.6);

        let rotation_angle = Math.cos(this.tailRotationState)*Math.PI/9;
        this.scene.rotate(rotation_angle, 0, 1, 0);
        this.scene.translate(0, 0, -1);
        this.fin.display();
        this.scene.popMatrix();

        // Top fin
        this.scene.pushMatrix();
        this.scene.translate(0, (1 + Math.sqrt(2))/2, 0);
        this.scene.scale(-0.5, 0.5, -0.5);
        this.scene.rotate(Math.PI/4, 1, 0, 0);
        this.fin.display();
        this.scene.popMatrix();

        // Lateral fins
        this.displayLateralFin(true);
        this.displayLateralFin(false);

        // Body
        this.scene.setActiveShader(this.bodyShader);
        this.body.display();

        this.scene.popMatrix();
    }
}
