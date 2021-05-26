import {CGFtexture, CGFshader, CGFappearance} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

export class MySeaFloor {
	/**
  	 * MySeaFloor
	 * @constructor
 	 * @param  {CGFscene} scene - Reference to MyScene object
	 * @param  {integer} size - Size of the side of the surface
 	 * @param  {integer} nrDivs - Number of divisions in both directions of the surface
 	 * @param  {float} offsetScale - Maximum displacement of the texture in coordinate Y
	 * @param  {float} shadowScale - Scale to control the color of the darker zones of the floor
 	 */	
	constructor(scene, size, nrDivs, offsetScale, shadowScale) {
		this.scene = scene;

		this.size = size;
        this.floor = new MyPlane(scene, nrDivs);

        this.texture = new CGFtexture(this.scene, "images/sand.png");
		this.sandmap = new CGFtexture(this.scene, "images/sandMap.png");

        this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.appearance.setShininess(1);
        this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');

		this.shader = new CGFshader(this.scene.gl, "shaders/sea_floor.vert", "shaders/sea_floor.frag");
		this.shader.setUniformsValues({ heightMap: 1, offsetScale: offsetScale, shadowScale: shadowScale});
	}

    /**
     * @method display
     * Displays MySeaFloor.
     */
    display() {
        this.appearance.apply();
        this.scene.setActiveShader(this.shader);
        this.sandmap.bind(1);

        this.scene.pushMatrix();
        this.scene.scale(this.size, 1, this.size);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.floor.display();
		this.scene.popMatrix();
    }
}
