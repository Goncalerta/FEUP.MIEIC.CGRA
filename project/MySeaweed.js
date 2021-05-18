import { CGFappearance } from '../lib/CGF.js';
import { MyPyramid } from './MyPyramid.js';

export class MySeaweed {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} x - X coordinate of the center of the seaweed
     * @param  {integer} z - Z coordinate of the center of the seaweed
     * @param  {integer} numSeaweed - Number of leaves
     * @param  {float} minRadius - Minimum radius of each leaf
     * @param  {float} maxRadius - Maximum radius of each leaf
     * @param  {float} minHeight - Minimum height of each leaf
     * @param  {float} maxHeight - Maximum height of each leaf
     * @param  {float} maxDisplacement - Maximum displacement of each leaf from the given x and z
     */
    constructor(scene, x, z, numSeaweed, minRadius, maxRadius, minHeight, maxHeight, maxDisplacement) {
        this.scene = scene;

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

        // Generate seaweed's appearances
        this.seaweedAppearances = [];
        for (let i = 0; i < this.numSeaweed; i++) {
            let blueComponent = Math.random() * 0.3 + 0.1;
            let redComponent = blueComponent + Math.random() * 0.25 + 0.1;
            let greenComponent = redComponent + Math.random() * 0.2;

            let seaweedAppearance = new CGFappearance(this.scene);
            seaweedAppearance.setAmbient(redComponent, greenComponent, blueComponent, 1);
		    seaweedAppearance.setDiffuse(0.8*redComponent, greenComponent, 0.7*blueComponent, 1);
		    seaweedAppearance.setSpecular(0.4*redComponent, 0.6*greenComponent, 0.4*blueComponent, 1);
		    seaweedAppearance.setShininess(3);

            this.seaweedAppearances.push(seaweedAppearance);
        }

        this.pyramid = new MyPyramid(this.scene, 10, 10)

        this.initSeaweed();
    }

    /**
     * @method initSeaweed
     * Creates numSeaweed number of seaweed leaves.
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
            let scaleRadius = Math.random() * deltaRadius + this.minRadius;
            let scaleY = Math.random() * deltaHeight + this.minHeight;
            this.seaweedPositions.push(x, z);
            this.seaweedDimensions.push(scaleRadius, scaleY, scaleRadius);
        }
    }

    display() {
        for (let i = 0; i < this.numSeaweed; i++) {
            this.seaweedAppearances[i].apply();
            this.scene.pushMatrix();

            this.scene.translate(this.seaweedPositions[2*i], 0, this.seaweedPositions[2*i + 1]);
            this.scene.scale(this.seaweedDimensions[3*i], this.seaweedDimensions[3*i + 1], this.seaweedDimensions[3*i + 2]);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.translate(0, 0, 0.5);
            this.pyramid.display(this.scene);
            
            this.scene.popMatrix();
        }
    }
}
