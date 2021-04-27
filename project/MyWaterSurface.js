import {CGFobject} from '../lib/CGF.js';
import {CGFappearance} from '../lib/CGF.js';
import {CGFshader} from '../lib/CGF.js';
import {CGFtexture} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
import { MyTriangle } from './MyTriangle.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 * @param object - The CGFobject that will be moved and displayed on screen. 
 */
export class MyWaterSurface extends CGFobject {
    constructor(scene, y, size, distortion, waterSpeed) {
        super(scene);

        this.y = y;
        this.size = size;
        this.t = 0;
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
    
        this.shader = new CGFshader(this.scene.gl, "shaders/water_surface.vert", "shaders/water_surface.frag");
        this.shader.setUniformsValues({ distortionMap: 1, distortionScale: this.distortionScale, timeFactor: this.t });
        this.distortionMap = new CGFtexture(this.scene, 'images/distortionmap.png');
    }

    /**
     * Initializes buffers of the inner object.
     */
    initBuffers() {
        this.surface.initBuffers();
    }

    updateAnimation(t) {
        this.t = t;
        this.shader.setUniformsValues({ distortionMap: 1, distortionScale: this.distortionScale, timeFactor: this.t / 10000 * this.waterSpeed % 1 });
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, this.y, 0);
        this.scene.scale(this.size, 1, this.size);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.appearance.apply();
        this.scene.setActiveShader(this.shader);
        this.distortionMap.bind(1);
        this.surface.display(this.scene);
        this.scene.setActiveShader(this.scene.defaultShader);
        
        this.scene.popMatrix();
    }
}
