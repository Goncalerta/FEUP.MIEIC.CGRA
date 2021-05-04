import { CGFobject } from '../lib/CGF.js';
import { MySeaweed } from './MySeaweed.js';

export class MySeaweedSet extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} numGroups - Number of groups of seaweeds
     * @param  {integer} minGroupSize - Minimum number of seaweeds in a group
     * @param  {integer} maxGroupSize - Maximum number of seaweeds in a group
     * @param  {integer} minX - Minimum X coordinate for the seaweed's position
     * @param  {integer} maxX - Maximum X coordinate for the seaweed's position
     * @param  {integer} minZ - Minimum Z coordinate for the seaweed's position
     * @param  {integer} maxZ - Maximum Z coordinate for the seaweed's position
     * @param  {float} minRadius - Minimum radius of the seaweeds
     * @param  {float} maxRadius - Maximum radius of the seaweeds
     * @param  {float} minHeight - Minimum height of the seaweeds
     * @param  {float} maxHeight - Maximum height of the seaweeds
     * @param  {float} maxDisplacementInGroup - Maximum displacement of a seaweed in a group
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
