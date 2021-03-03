import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyParallelogram } from "./MyParallelogram.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.scene = scene;
		this.diamond = new MyDiamond(scene);
		this.triangle = new MyTriangle(scene);
		this.parallelogram = new MyParallelogram(scene);
		this.triangleSmall1 = new MyTriangleSmall(scene);
		this.triangleBig1 = new MyTriangleBig(scene);
		this.triangleSmall2 = new MyTriangleSmall(scene);
		this.triangleBig2 = new MyTriangleBig(scene);
	}
	
	display() {
        let scene = this.scene;
		scene.pushMatrix();

		scene.multMatrix([
			Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0, 0,
			-Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		]);

		scene.multMatrix([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 1, 0, 1,
		]);

		this.diamond.display();

		scene.popMatrix();
		scene.pushMatrix();

		scene.multMatrix([
		-1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1,
		]);

		scene.multMatrix([
		Math.cos(3*Math.PI/4), Math.sin(3*Math.PI/4), 0, 0,
		-Math.sin(3*Math.PI/4), Math.cos(3*Math.PI/4), 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1,
		]); 

		this.parallelogram.display();

		scene.popMatrix();
		scene.pushMatrix();

		scene.multMatrix([
		Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0, 0,
		-Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1,
		]); 


		scene.multMatrix([
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		1, 0, 0, 1,
		]);

		this.triangleSmall1.display();

		scene.popMatrix();
		scene.pushMatrix();

		scene.multMatrix([
		Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0, 0,
		-Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1,
		]); 


		scene.multMatrix([
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		-1, 0, 0, 1,
		]);


		this.triangleSmall2.display();

		scene.popMatrix();
		scene.pushMatrix();

		scene.multMatrix([
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		2*Math.sqrt(2), 0, 0, 1,
		]);

		scene.multMatrix([
		Math.cos(-Math.PI/4), Math.sin(-Math.PI/4), 0, 0,
		-Math.sin(-Math.PI/4), Math.cos(-Math.PI/4), 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1,
		]); 

		this.triangle.display();

		scene.popMatrix();
		scene.pushMatrix();

		scene.multMatrix([
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		3*Math.sqrt(2), 0, 0, 1,
		]);

		scene.multMatrix([
		Math.cos(3*Math.PI/4), Math.sin(3*Math.PI/4), 0, 0,
		-Math.sin(3*Math.PI/4), Math.cos(3*Math.PI/4), 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1,
		]); 
		
		this.triangleBig1.display();

		scene.popMatrix();
		scene.pushMatrix();

		scene.multMatrix([
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		-2*Math.sqrt(2), 0, 0, 1,
		]);

		scene.multMatrix([
		Math.cos(-3*Math.PI/4), Math.sin(-3*Math.PI/4), 0, 0,
		-Math.sin(-3*Math.PI/4), Math.cos(-3*Math.PI/4), 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1,
		]); 
		
		this.triangleBig2.display();
		
		scene.popMatrix();
	}

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
		this.triangle.enableNormalViz();
		this.parallelogram.enableNormalViz();
		this.triangleSmall1.enableNormalViz();
		this.triangleBig1.enableNormalViz();
		this.triangleSmall2.enableNormalViz();
		this.triangleBig2.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
		this.triangle.disableNormalViz();
		this.parallelogram.disableNormalViz();
		this.triangleSmall1.disableNormalViz();
		this.triangleBig1.disableNormalViz();
		this.triangleSmall2.disableNormalViz();
		this.triangleBig2.disableNormalViz();
    }
}

