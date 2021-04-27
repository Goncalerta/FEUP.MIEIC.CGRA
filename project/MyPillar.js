import {CGFobject} from '../lib/CGF.js';
import {CGFappearance} from '../lib/CGF.js';
import {MyCylinder} from './MyCylinder.js'

/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 * @param object - The CGFobject that will be moved and displayed on screen. 
 */
 export class MyPillar extends CGFobject {
    constructor(scene, x, z, radius, height, cylinderSlices) {
        super(scene);

        this.x = x;
        this.z = z;
        this.radius = radius;
        this.height = height;
        this.cylinder = new MyCylinder(this.scene, cylinderSlices);

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.52, 0.37, 0.26, 1.0);
        this.appearance.setDiffuse(0.52*0.4, 0.37*0.4, 0.26*0.4, 1.0);
		this.appearance.setSpecular(0.52*0.2, 0.37*0.2, 0.26*0.2, 1.0);
		this.appearance.setShininess(11.0);
        //this.appearance.setTexture(new CGFtexture(this.scene, 'images/pier.jpg'));
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.x, 0, this.z);
        this.scene.scale(this.radius, this.height, this.radius);
        
        this.appearance.apply();
        this.cylinder.display();
        
        this.scene.popMatrix();
    }
}
