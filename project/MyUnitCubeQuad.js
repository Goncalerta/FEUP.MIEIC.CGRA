import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MyQuad} from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, tex1 = null, tex2 = null, tex3 = null, tex4 = null, tex5 = null, tex6 = null) {
		super(scene);
        this.quad = new MyQuad(scene);
        this.tex = [tex1, tex2, tex3, tex4, tex5, tex6];
        this.material = new CGFappearance(this.scene);
    }
	
    displayFace(angle, top_or_bottom, textureIndex) {
        this.scene.pushMatrix();
        if (top_or_bottom) {
            this.scene.rotate(angle, 1, 0, 0);
        } else {
            this.scene.rotate(angle, 0, 1, 0);
        }
        this.scene.translate(0, 0, 0.5);
        
        this.material.setTexture(this.tex[textureIndex]);
        this.material.apply();
        this.quad.display();
        this.scene.popMatrix();
    }
	
	display() {
        this.displayFace(-Math.PI/2, true, 0);

        for (let i = 0; i < 4; i++) {
            this.displayFace(i*Math.PI/2, false, i+1);
        }

        this.displayFace(Math.PI/2, true, 5);
    }
}
