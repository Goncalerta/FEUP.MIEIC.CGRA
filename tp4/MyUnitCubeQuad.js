import {CGFobject} from '../lib/CGF.js';
import {MyQuad} from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
        this.quad = new MyQuad(scene);
	}
	
	display() {
        this.scene.pushMatrix();

        this.scene.multMatrix([
            1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0.5, 1,
		]);

        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.multMatrix([
            1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, -0.5, 0, 1,
		]);

        this.scene.multMatrix([
            1, 0, 0, 0,
			0, Math.cos(Math.PI/2), Math.sin(Math.PI/2), 0,
			0, -Math.sin(Math.PI/2), Math.cos(Math.PI/2), 0,
			0, 0, 0, 1,
		]);

        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        this.scene.multMatrix([
            1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, -0.5, 1,
		]);

        this.scene.multMatrix([
            1, 0, 0, 0,
			0, Math.cos(Math.PI), Math.sin(Math.PI), 0,
			0, -Math.sin(Math.PI), Math.cos(Math.PI), 0,
			0, 0, 0, 1,
		]);

        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.multMatrix([
            1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0.5, 0, 1,
		]);

        this.scene.multMatrix([
            1, 0, 0, 0,
			0, Math.cos(3*Math.PI/2), Math.sin(3*Math.PI/2), 0,
			0, -Math.sin(3*Math.PI/2), Math.cos(3*Math.PI/2), 0,
			0, 0, 0, 1,
		]);

        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.multMatrix([
            1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0.5, 0, 0, 1,
		]);

        this.scene.multMatrix([
            Math.cos(Math.PI/2), 0, -Math.sin(Math.PI/2), 0,
			0, 1, 0, 0,
			Math.sin(Math.PI/2), 0, Math.cos(Math.PI/2), 0,
			0, 0, 0, 1,
		]);

        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.multMatrix([
            1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			-0.5, 0, 0, 1,
		]);

        this.scene.multMatrix([
            Math.cos(-Math.PI/2), 0, -Math.sin(-Math.PI/2), 0,
			0, 1, 0, 0,
			Math.sin(-Math.PI/2), 0, Math.cos(-Math.PI/2), 0,
			0, 0, 0, 1,
		]);

        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
    }
}

