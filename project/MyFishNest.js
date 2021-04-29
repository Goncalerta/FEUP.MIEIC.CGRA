import {CGFobject, CGFtexture, CGFshader, CGFappearance} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';
import { MySphere } from './MySphere.js';
/**
 * MyFishNest
 * @constructor
 */
export class MyFishNest extends CGFobject {
	constructor(scene, x, z, radius) {
		super(scene);

        this.x = x;
        this.z = z;
        this.radius = radius;
		this.debug = new MySphere(this.scene, 20, 20);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, 0, this.z);
        this.scene.scale(this.radius, 3, this.radius);
		//this.debug.display();
		this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
