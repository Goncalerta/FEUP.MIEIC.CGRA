import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
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
        this.texture = new CGFtexture(scene, 'images/tangram.png');
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

        this.material_diamond = new CGFappearance(this.scene);
        // this.material_diamond.setAmbient(0.849, 1.0, 0.1, 1.0);
        // this.material_diamond.setDiffuse(0.849*0.9, 1.0*0.9, 0.1*0.9, 1.0);
        // this.material_diamond.setSpecular(0.849, 1.0, 0.1, 1.0);
        // this.material_diamond.setShininess(11.0);
        this.material_diamond.setTexture(this.texture);
        this.material_diamond.apply();

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

        this.material_parallelogram = new CGFappearance(this.scene);
        // this.material_parallelogram.setAmbient(1.0, 1.0, 0.2, 1.0);
        // this.material_parallelogram.setDiffuse(1.0*0.9, 1.0*0.9, 0.2*0.9, 1.0);
        // this.material_parallelogram.setSpecular(1.0, 1.0, 0.2, 1.0);
        // this.material_parallelogram.setShininess(11.0);
        this.material_parallelogram.setTexture(this.texture);
        this.material_parallelogram.apply();

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

        this.material_triangleSmall1 = new CGFappearance(this.scene);
        // this.material_triangleSmall1.setAmbient(0.37, 0.0, 1.0, 1.0);
        // this.material_triangleSmall1.setDiffuse(0.37*0.9, 0.0, 1.0*0.9, 1.0);
        // this.material_triangleSmall1.setSpecular(0.37, 0.0, 1.0, 1.0);
        // this.material_triangleSmall1.setShininess(11.0);
        this.material_triangleSmall1.setTexture(this.texture);
        this.material_triangleSmall1.apply();

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


        this.material_triangleSmall2 = new CGFappearance(this.scene);
        // this.material_triangleSmall2.setAmbient(1.0, 0.2, 0.2, 1.0);
        // this.material_triangleSmall2.setDiffuse(1.0*0.9, 0.2*0.9, 0.2*0.9, 1.0);
        // this.material_triangleSmall2.setSpecular(1.0, 0.2, 0.2, 1.0);
        // this.material_triangleSmall2.setShininess(11.0);
        this.material_triangleSmall2.setTexture(this.texture);
        this.material_triangleSmall2.apply();

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

        this.material_triangle = new CGFappearance(this.scene);
        // this.material_triangle.setAmbient(1.0, 0.54, 0.8, 1.0);
        // this.material_triangle.setDiffuse(1.0*0.9, 0.54*0.9, 0.8*0.9, 1.0);
        // this.material_triangle.setSpecular(1.0, 0.54, 0.8, 1.0);
        // this.material_triangle.setShininess(11.0);
        this.material_triangle.setTexture(this.texture);
        this.material_triangle.apply();

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
		
        this.material_triangleBig1 = new CGFappearance(this.scene);
        // this.material_triangleBig1.setAmbient(1.0, 0.6, 0.0, 1.0);
        // this.material_triangleBig1.setDiffuse(1.0*0.9, 0.6*0.9, 0.0, 1.0);
        // this.material_triangleBig1.setSpecular(1.0, 0.6, 0.0, 1.0);
        // this.material_triangleBig1.setShininess(11.0);
        this.material_triangleBig1.setTexture(this.texture);
        this.material_triangleBig1.apply();

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

        this.material_triangleBig2 = new CGFappearance(this.scene);
        // this.material_triangleBig2.setAmbient(0.2, 0.6, 1.0, 1.0);
        // this.material_triangleBig2.setDiffuse(0.2*0.9, 0.6*0.9, 1.0*0.9, 1.0);
        // this.material_triangleBig2.setSpecular(0.2, 0.6, 1.0, 1.0);
        // this.material_triangleBig2.setShininess(11.0);
        this.material_triangleBig2.setTexture(this.texture);
        this.material_triangleBig2.apply();
		
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

