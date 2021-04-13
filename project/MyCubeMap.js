import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MyQuad} from './MyQuad.js';

/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texturePY - Texture of +Y side.
 * @param texturePZ - Texture of +Z side.
 * @param texturePX - Texture of +X side.
 * @param textureNZ - Texture of -Z side.
 * @param textureNX - Texture of -X side.
 * @param textureNY - Texture of -Y side.
 */
export class MyCubeMap extends CGFobject {
    constructor(scene, texturePY = null, texturePZ = null, texturePX = null, textureNZ = null, textureNX = null, textureNY = null) {
		super(scene);
        this.quad = new MyQuad(scene);
        
        this.updateTextures(texturePY, texturePZ, texturePX, textureNZ, textureNX, textureNY);
        this.initMaterial();
    }

    /**
     * Initializes material of the MyCubeMap.
     */
    initMaterial() {
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setAmbient(0, 0, 0, 1);
        this.material.setDiffuse(0, 0, 0, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setShininess(1);
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
        if (topOrBottom) {
            this.scene.rotate(Math.PI, 1, 0, 0);
        } else {
            this.scene.rotate(Math.PI, 0, 1, 0);
        }
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

    /**
     * @method updateTextures
     * Updates the textures of this MyCubeMap.
     * @param texturePY - Texture of +Y side.
     * @param texturePZ - Texture of +Z side.
     * @param texturePX - Texture of +X side.
     * @param textureNZ - Texture of -Z side.
     * @param textureNX - Texture of -X side.
     * @param textureNY - Texture of -Y side.
     */
    updateTextures(texturePY, texturePZ, texturePX, textureNZ, textureNX, textureNY) {
        this.textures = [texturePY, texturePZ, texturePX, textureNZ, textureNX, textureNY];
    }
}
