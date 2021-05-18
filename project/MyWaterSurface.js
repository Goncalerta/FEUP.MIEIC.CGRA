import {CGFappearance} from '../lib/CGF.js';
import {CGFshader} from '../lib/CGF.js';
import {CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyWaterSurface {
    /**
     * MyWaterSurface
     * @constructor
     * @param  {CGFscene} scene - Reference to MyScene object
     * @param  {integer} y - Y coordinate of the surface's position
     * @param  {integer} size - Size of the side of the surface
     * @param  {float} distortion - Maximum displacement of the distortion map
     * @param  {float} waterSpeed - Speed of the water movement
     */
    constructor(scene, y, size, distortion, waterSpeed) {
        this.scene = scene;

        this.y = y;
        this.size = size;
        this.surface = new MyQuad(this.scene);
        this.distortionScale = distortion;
        this.waterSpeed = waterSpeed;

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setEmission(1, 1, 1, 1);
        this.appearance.setAmbient(0, 0, 0, 1);
        this.appearance.setDiffuse(0, 0, 0, 1);
		this.appearance.setSpecular(0, 0, 0, 1);
		this.appearance.setShininess(1);
        this.appearance.setTexture(new CGFtexture(this.scene, 'images/pier.jpg'));
        this.appearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    
        this.shader = new CGFshader(this.scene.gl, "shaders/water_surface.vert", "shaders/water_surface.frag");
        this.distortionMap = new CGFtexture(this.scene, 'images/distortionmap.png');
        this.shader.setUniformsValues({ distortionMap: 1, distortionScale: this.distortionScale, timeFactor: 0 });
    }

    /**
     * @method updateAnimation
     * Updates the timeFactor passed to the shader based on current time
     * @param {Number} t - Current time in milliseconds
     */
    updateAnimation(t) {
        this.shader.setUniformsValues({ distortionMap: 1, distortionScale: this.distortionScale, timeFactor: t / 10000 * this.waterSpeed % 1 });
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(0, this.y, 0);
        this.scene.scale(this.size, 1, this.size);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        
        this.scene.setActiveShader(this.shader);
        this.distortionMap.bind(1);
        
        this.appearance.apply();
        this.surface.display(this.scene);
        
        this.scene.popMatrix();
    }
}
