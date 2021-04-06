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
        
        this.initMaterial();
    }

    initMaterial() {
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1.0, 1.0, 1.0, 1.0);
        this.material.setAmbient(0, 0, 0, 1);
        this.material.setDiffuse(0, 0, 0, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setShininess(1.0);
    }
	
    displayFace(angle, top_or_bottom, textureIndex) {
        this.scene.pushMatrix();
        if (top_or_bottom) {
            this.scene.rotate(angle, 1, 0, 0);
        } else {
            this.scene.rotate(angle, 0, 1, 0);
        }
        this.scene.translate(0, 0, 0.5);
        if (top_or_bottom) {
            this.scene.rotate(Math.PI, 1, 0, 0);
        } else {
            this.scene.rotate(Math.PI, 0, 1, 0);
        }
        this.material.setTexture(this.tex[textureIndex]);
        this.material.apply();
        this.quad.display();
        this.scene.popMatrix();
    }
	
	display() {
        this.scene.pushMatrix();
        this.scene.scale(50, 50, 50);

        this.displayFace(-Math.PI/2, true, 0);

        for (let i = 0; i < 4; i++) {
            this.displayFace(i*Math.PI/2, false, i+1);
        }

        this.displayFace(Math.PI/2, true, 5);

        this.scene.popMatrix();
    }
}
