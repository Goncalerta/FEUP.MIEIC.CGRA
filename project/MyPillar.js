import {CGFobject, CGFtexture} from '../lib/CGF.js';
import {CGFappearance} from '../lib/CGF.js';
import {MyCylinder} from './MyCylinder.js'

 export class MyPillar extends CGFobject {
    /**
     * MyPillar
     * @constructor
     * @param  {CGFscene} scene - Reference to MyScene object
     * @param  {float} x - X coordinate of the object's position
     * @param  {float} z - Z coordinate of the object's position
     * @param  {float} radius - Radius of the object
     * @param  {integer} height - Height of the object
     * @param  {integer} cylinderSlices - Number of divisions around the Y axis
     */ 
    constructor(scene, x, z, radius, height, cylinderSlices) {
        super(scene);

        this.x = x;
        this.z = z;
        this.radius = radius;
        this.height = height;
        this.cylinder = new MyCylinder(this.scene, cylinderSlices, height*2);

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 0.90, 0.85, 1);
		this.appearance.setDiffuse(0.52*0.4, 0.37*0.4, 0.26*0.4, 1.0);
		this.appearance.setSpecular(0.52*0.2, 0.37*0.2, 0.26*0.2, 1.0);
		this.appearance.setShininess(11.0);
        // From
        // http://www.cadhatch.com/seamless-bark-textures/4588167786
        // Bark-0497
        this.appearance.setTexture(new CGFtexture(this.scene, 'images/tree.jpg'));
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
