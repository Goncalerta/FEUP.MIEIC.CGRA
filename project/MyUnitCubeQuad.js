import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MyQuad} from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texturePY - Texture of +Y side.
 * @param texturePZ - Texture of +Z side.
 * @param texturePX - Texture of +X side.
 * @param textureNZ - Texture of -Z side.
 * @param textureNX - Texture of -X side.
 * @param textureNY - Texture of -Y side.
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, texturePY = null, texturePZ = null, texturePX = null, textureNZ = null, textureNX = null, textureNY = null) {
		super(scene);
        this.quad = new MyQuad(scene);
        this.textures = [texturePY, texturePZ, texturePX, textureNZ, textureNX, textureNY];
        this.material = new CGFappearance(this.scene);
    }
	
    /**
     * Displays a single face of the cube.
     * @param angle The angle needed to rotate from the +Z face to the side to display.
     * @param topOrBottom Whether the face is one of top or bottom (otherwise, it's a side face).
     * @param textureIndex The index of the texture to display (from the `this.textures` array).
     */
    displayFace(angle, topOrBottom, textureIndex) {
        this.scene.pushMatrix();
        if (topOrBottom) {
            this.scene.rotate(angle, 1, 0, 0);
        } else {
            this.scene.rotate(angle, 0, 1, 0);
        }
        this.scene.translate(0, 0, 0.5);
        
        this.material.setTexture(this.textures[textureIndex]);
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