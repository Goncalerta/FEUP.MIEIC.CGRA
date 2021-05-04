import {CGFobject, CGFtexture, CGFshader, CGFappearance} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';
/**
 * MySeaFloor
 * @constructor
 * @param scene - Reference to MyScene object
 * @param nDivs - number of divisions in both directions of the surface
 * @param minS - minimum texture coordinate in S
 * @param maxS - maximum texture coordinate in S
 * @param minT - minimum texture coordinate in T
 * @param maxT - maximum texture coordinate in T
 */
export class MySeaFloor extends CGFobject {
	constructor(scene, size, nrDivs, offsetScale) {
		super(scene);

		this.size = size;
        this.floor = new MyPlane(scene, nrDivs);

        this.texture = new CGFtexture(this.scene, "images/sand_with_shell.png");
		this.sandmap = new CGFtexture(this.scene, "images/sandMap_with_shell.png");

        this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.appearance.setShininess(1);
        this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');

		this.shader = new CGFshader(this.scene.gl, "shaders/sea_floor.vert", "shaders/sea_floor.frag");
		this.shader.setUniformsValues({ heightMap: 1, offsetScale: offsetScale});
	}

    setOffsetScale(offsetScale) {
        this.shader.setUniformsValues({ heightMap: 1, offsetScale: offsetScale});
    }

    display() {
        this.appearance.apply();
        this.scene.setActiveShader(this.shader);
        this.sandmap.bind(1);

        this.scene.pushMatrix();
        this.scene.scale(this.size, 1, this.size);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.floor.display();
		this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
