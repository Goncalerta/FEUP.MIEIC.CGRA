import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MyQuad} from './MyQuad.js';

/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject {
	constructor(scene, tex1 = null, tex2 = null, tex3 = null, tex4 = null, tex5 = null, tex6 = null) {
		super(scene);
        this.quad = new MyQuad(scene);
        this.tex = [tex1, tex2, tex3, tex4, tex5, tex6];
	}
	
	
	display() {
        let material = new CGFappearance(this.scene);
        material.setEmission(1.0, 1.0, 1.0, 1.0);
        material.setAmbient(0, 0, 0, 1);
        material.setDiffuse(0, 0, 0, 1);
        material.setSpecular(0, 0, 0, 1);
        material.setShininess(1.0);

        this.scene.pushMatrix();

        this.scene.multMatrix([
            50, 0, 0, 0,
			0, 50, 0, 0,
			0, 0, 50, 0,
			0, 0, 0, 1,
		]);

        this.scene.multMatrix([
            -1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		]);

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

        this.scene.rotate(Math.PI, 0, 0, 1);
        
        material.setTexture(this.tex[0]);
        material.apply();
       
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.multMatrix([
            1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0.5, 1,
		]);

        material.setTexture(this.tex[1]);
        material.apply();
        
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

        material.setTexture(this.tex[4]);
        material.apply();

        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        
        this.scene.multMatrix([
            Math.cos(Math.PI), Math.sin(Math.PI), 0, 0,
			-Math.sin(Math.PI), Math.cos(Math.PI), 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		]);

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

        material.setTexture(this.tex[3]);
        material.apply();

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

        material.setTexture(this.tex[2]);
        material.apply();

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

        this.scene.rotate(Math.PI, 0, 0, 1);

        material.setTexture(this.tex[5]);
        material.apply();

        this.quad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix();
    }
}

