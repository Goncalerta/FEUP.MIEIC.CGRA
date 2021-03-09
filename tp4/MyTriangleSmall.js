import {CGFobject} from '../lib/CGF.js';
/**
 * myTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene, texCoords) {
		super(scene);
		this.texCoords = texCoords;
        this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			0, 1, 0,	//1
			1, 0, 0,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 0,
		];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
        ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
