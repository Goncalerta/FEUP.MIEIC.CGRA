import { CGFobject } from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyPyramid } from './MyPyramid.js';
import { MySeaweed } from './MySeaweed.js';

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
    constructor(scene, numGroups, minGroupSize, maxGroupSize, minX, maxX, minZ, maxZ, minRadius, maxRadius, minHeight, maxHeight, maxDisplacementInGroup) {
        super(scene);

        this.numGroups = numGroups;
        this.minGroupSize = minGroupSize;
        this.maxGroupSize = maxGroupSize;
        this.minX = minX;
        this.maxX = maxX;
        this.minZ = minZ;
        this.maxZ = maxZ;

        let deltaX = this.maxX - this.minX;
        let deltaZ = this.maxZ - this.minZ;
        let deltaGroupSize = this.maxGroupSize - this.minGroupSize;

        this.groups = [];

        for (let i = 0; i < this.numGroups; i++) {
            let x = Math.random() * deltaX + this.minX;
            let z = Math.random() * deltaZ + this.minZ;
            let groupSize = Math.random() * deltaGroupSize + this.minGroupSize;
            let group = new MySeaweed(this.scene, x, z, groupSize, minRadius, maxRadius, minHeight, maxHeight, maxDisplacementInGroup);

            this.groups.push(group);
        }
    }

    display() {
        for (let group of this.groups) {
            group.display();
        }
    }
}
