import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
        
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5,	// 0
			-0.5, -0.5, 0.5,	// 1
			-0.5, 0.5, -0.5,	// 2
			-0.5, 0.5, 0.5,	 	// 3
			0.5, -0.5, -0.5,	// 4
			0.5, -0.5, 0.5,		// 5
			0.5, 0.5, -0.5, 	// 6
			0.5, 0.5, 0.5,		// 7

            -0.5, -0.5, -0.5,	// 0 + 8
			-0.5, -0.5, 0.5,	// 1 + 8
			-0.5, 0.5, -0.5,	// 2 + 8
			-0.5, 0.5, 0.5,	 	// 3 + 8
			0.5, -0.5, -0.5,	// 4 + 8
			0.5, -0.5, 0.5,		// 5 + 8
			0.5, 0.5, -0.5, 	// 6 + 8
			0.5, 0.5, 0.5,		// 7 + 8
            
            -0.5, -0.5, -0.5,	// 0 + 16
			-0.5, -0.5, 0.5,	// 1 + 16
			-0.5, 0.5, -0.5,	// 2 + 16
			-0.5, 0.5, 0.5,	 	// 3 + 16
			0.5, -0.5, -0.5,	// 4 + 16
			0.5, -0.5, 0.5,		// 5 + 16
			0.5, 0.5, -0.5, 	// 6 + 16
			0.5, 0.5, 0.5,		// 7 + 16
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			16, 20, 21,
			21, 17, 16,	
			8, 10, 14,
			14, 12, 8,
			1, 3, 2,
			2, 0, 1,
			4, 6, 7,
			7, 5, 4,
			9, 13, 15,
			15, 11, 9,
			23, 22, 18,
			18, 19, 23,
		];

        this.normals = [
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            0, 0, -1,
            0, 0, 1,
            0, 0, -1,
            0, 0, 1,
            0, 0, -1,
            0, 0, 1,
            0, 0, -1,
            0, 0, 1,
            0, -1, 0,
            0, -1, 0,
            0, 1, 0,
            0, 1, 0,
            0, -1, 0,
            0, -1, 0,
            0, 1, 0,
            0, 1, 0,
        ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

