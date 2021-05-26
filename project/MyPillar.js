import {MyCylinder} from './MyCylinder.js'

 export class MyPillar {
    /**
     * MyPillar
     * @constructor
     * @param  {CGFscene} scene - Reference to MyScene object
     * @param  {float} x - X coordinate of the object's position
     * @param  {float} z - Z coordinate of the object's position
     * @param  {float} radius - Radius of the object
     * @param  {float} height - Height of the object
     * @param  {integer} cylinderSlices - Number of divisions around the Y axis
     */ 
    constructor(scene, x, z, radius, height, cylinderSlices) {
        this.scene = scene;

        this.x = x;
        this.z = z;
        this.radius = radius;
        this.height = height;
        this.cylinder = new MyCylinder(this.scene, cylinderSlices, height);
    }

    /**
     * @method display
     * Displays MyPillar.
     */
    display() {
        // The CGF appearance was removed from MyPillar class
        // so that the texture could be used once for all pillars
        this.scene.pushMatrix();

        this.scene.translate(this.x, 0, this.z);
        this.scene.scale(this.radius, this.height, this.radius);
        
        this.cylinder.display();
        
        this.scene.popMatrix();
    }
}
