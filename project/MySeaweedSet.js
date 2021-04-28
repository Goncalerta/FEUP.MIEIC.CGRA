import { CGFobject } from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyPyramid } from './MyPyramid.js';

export class MySeaweedSet extends CGFobject {
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
    constructor(scene, numSeaweed, minX, maxX, minZ, maxZ) {
        super(scene);

        this.numSeaweed = numSeaweed;
        this.minX = minX;
        this.maxX = maxX;
        this.minZ = minZ;
        this.maxZ = maxZ;

        this.seaweedAppearances = [];

        for (let i = 0; i < this.numSeaweed; i++) {
            this.seaweedAppearance = new CGFappearance(this.scene);

            let greenComponent = Math.random() * 0.3 + 0.4;
            let otherComponent = Math.random() * 0.3 + 0.1;

            this.seaweedAppearance.setAmbient(otherComponent, greenComponent, otherComponent, 1);
		    this.seaweedAppearance.setDiffuse(0.2, greenComponent, 0.2, 1);
		    this.seaweedAppearance.setSpecular(0.2, 0.5, 0.2, 1);
		    this.seaweedAppearance.setShininess(3);

            this.seaweedAppearances.push(this.seaweedAppearance);
        }

        this.initSeaweed();
    }

    /**
     * Creates numSeaweed number of seaweeds.
     * Generates random positions limited by minimum and maximum of X and Y and dimensions for each seaweed.
     */
    initSeaweed() {
        this.seaweeds = [];
        this.seaweedPositions = [];
        this.seaweedDimensions = [];

        let deltaX = this.maxX - this.minX;
        let deltaZ = this.maxZ - this.minZ;
        let minScale = 0.1;
        let maxScale = 0.2;
        let deltaScale = maxScale - minScale;


        for (let i = 0; i < this.numSeaweed; i++) {

            let slices = Math.floor(Math.random() * 3) + 3;
            let height = Math.random() * 2 + 3;
            this.seaweeds.push(new MyPyramid(this.scene, height, slices, slices));
            let x = Math.random() * deltaX + this.minX;
            let z = Math.random() * deltaZ + this.minZ;
            let angle = Math.random() * 2 * Math.PI;
            let scaleX = Math.random() * deltaScale + minScale;
            let scaleY = Math.random() * deltaScale + minScale;
            let scaleZ = Math.random() * deltaScale + minScale;
            this.seaweedPositions.push(x, z);
            this.seaweedDimensions.push(scaleX, scaleY, scaleZ);
        }
    }

    display() {

        for (let i = 0; i < this.numSeaweed; i++) {

            this.seaweedAppearances[i].apply();
            this.scene.pushMatrix();

            this.scene.translate(this.seaweedPositions[3*i], 0.2, this.seaweedPositions[3*i + 1]);
            this.scene.scale(this.seaweedDimensions[3*i]*4, this.seaweedDimensions[3*i + 1]*4, this.seaweedDimensions[3*i + 2]*4);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.seaweeds[i].display(this.scene);
            
            this.scene.popMatrix();
        }
    }
}
