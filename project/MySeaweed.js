import { CGFobject } from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyPyramid } from './MyPyramid.js';

export class MySeaweed extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
     * @param  {integer} minX - minimum X
     * @param  {integer} maxX - maximum X
     * @param  {integer} minZ - minimum Z
     * @param  {integer} maxZ - maximum Z
     */
    constructor(scene, x, z, numSeaweed, minRadius, maxRadius, minHeight, maxHeight, maxDisplacement) {
        super(scene);

        this.numSeaweed = numSeaweed;
        this.minX = x - maxDisplacement;
        this.maxX = x + maxDisplacement;
        this.minZ = z - maxDisplacement;
        this.maxZ = z + maxDisplacement;
        this.minRadius = minRadius;
        this.maxRadius = maxRadius;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.maxDisplacement = maxDisplacement;

        this.seaweedAppearances = [];

        for (let i = 0; i < this.numSeaweed; i++) {
            let seaweedAppearance = new CGFappearance(this.scene);

            let greenComponent = Math.random() * 0.3 + 0.4;
            let otherComponent = Math.random() * 0.3 + 0.1;

            seaweedAppearance.setAmbient(otherComponent, greenComponent, otherComponent, 1);
		    seaweedAppearance.setDiffuse(0.2, greenComponent, 0.2, 1);
		    seaweedAppearance.setSpecular(0.2, 0.5, 0.2, 1);
		    seaweedAppearance.setShininess(3);

            this.seaweedAppearances.push(seaweedAppearance);
        }

        this.pyramid = new MyPyramid(this.scene, 5, 5)

        this.initSeaweed();
    }

    /**
     * Creates numSeaweed number of seaweeds.
     * Generates random positions limited by minimum and maximum of X and Y and dimensions for each seaweed.
     */
    initSeaweed() {
        this.seaweedPositions = [];
        this.seaweedDimensions = [];

        let deltaX = this.maxX - this.minX;
        let deltaZ = this.maxZ - this.minZ;

        let deltaRadius = this.maxRadius - this.minRadius;
        let deltaHeight = this.maxHeight - this.minHeight;

        for (let i = 0; i < this.numSeaweed; i++) {
            let x = Math.random() * deltaX + this.minX;
            let z = Math.random() * deltaZ + this.minZ;
            let scaleX = Math.random() * deltaRadius + this.minRadius;
            let scaleY = Math.random() * deltaHeight + this.minHeight;
            let scaleZ = Math.random() * deltaRadius + this.minRadius;
            this.seaweedPositions.push(x, z);
            this.seaweedDimensions.push(scaleX, scaleY, scaleZ);
        }
    }

    display() {
        for (let i = 0; i < this.numSeaweed; i++) {
            this.seaweedAppearances[i].apply();
            this.scene.pushMatrix();

            this.scene.translate(this.seaweedPositions[2*i], 0.2, this.seaweedPositions[2*i + 1]);
            this.scene.scale(this.seaweedDimensions[3*i], this.seaweedDimensions[3*i + 1], this.seaweedDimensions[3*i + 2]);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.pyramid.display(this.scene);
            
            this.scene.popMatrix();
        }
    }
}
