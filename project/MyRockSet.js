import {CGFappearance} from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} numRocks - Number of rocks
     * @param  {float} minX - Minimum X coordinate for the rock's position
     * @param  {float} maxX - Maximum X coordinate for the rock's position
     * @param  {float} minZ - Minimum Z coordinate for the rock's position
     * @param  {float} maxZ - Maximum Z coordinate for the rock's position
     * @param  {integer} sphereSlices - Number of slices around Y axis of the sphere
     * @param  {integer} sphereStacks - Number of stacks along Y axis, from the center to the poles (half of sphere)
     */
    constructor(scene, numRocks, minX, maxX, minZ, maxZ, sphereSlices, sphereStacks) {
        this.scene = scene;

        this.numRocks = numRocks;
        this.minX = minX;
        this.maxX = maxX;
        this.minZ = minZ;
        this.maxZ = maxZ;

        this.rockAppearance = new CGFappearance(this.scene);
        this.rockAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.rockAppearance.setDiffuse(0.2, 0.2, 0.2, 1);
		this.rockAppearance.setSpecular(1.0, 1.0, 1.0, 1);
		this.rockAppearance.setShininess(3);

        this.initRocks(sphereSlices, sphereStacks);
    }

    /**
     * @method initRocks
     * Creates numRocks number of rocks.
     * Generates random positions limited by minimum and maximum of X and Y, angles and dimensions for each rock.
     * @param  {integer} sphereSlices - number of slices around Y axis of the sphere
     * @param  {integer} sphereStacks - number of stacks along Y axis, from the center to the poles (half of sphere) 
     */
    initRocks(sphereSlices, sphereStacks) {
        this.rocks = [];
        this.rockPositions = [];
        this.rockAngles = [];
        this.rockDimensions = [];

        let deltaX = this.maxX - this.minX;
        let deltaZ = this.maxZ - this.minZ;
        let minScale = 0.1;
        let maxScale = 0.2;
        let deltaScale = maxScale - minScale;

        for (let i = 0; i < this.numRocks; i++) {
            this.rocks.push(new MyRock(this.scene, sphereSlices, sphereStacks, 0.5, 1));
            let x = Math.random() * deltaX + this.minX;
            let z = Math.random() * deltaZ + this.minZ;
            let angle = Math.random() * 2 * Math.PI;
            let scaleX = Math.random() * deltaScale + minScale;
            let scaleY = Math.random() * deltaScale + minScale;
            let scaleZ = Math.random() * deltaScale + minScale;
            this.rockPositions.push(x, z);
            this.rockAngles.push(angle);
            this.rockDimensions.push(scaleX, scaleY, scaleZ);
        }
    }

    /**
     * @method getRockAppearance
     * Returns the rock appearance.
     */
    getRockAppearance() {
        return this.rockAppearance;
    }

    /**
     * @method getNumRocks
     * Returns the number of rocks of the set.
     */
    getNumRocks() {
        return this.numRocks;
    }

    /**
     * @method removeRock
     * Removes certain rock from the set and its properties (position, angle and dimensions).
     * Updates the number of rocks in the set.
     * @param {Integer} i - Index of the rock in 'rocks' to remove.
     */
    removeRock(i) {
        this.rocks.splice(i, 1);
        this.rockPositions.splice(2 * i, 2);
        this.rockAngles.splice(i, 1);
        this.rockDimensions.splice(3 * i, 3);
        this.numRocks -= 1;
    }

    /**
     * @method addRock
     * Adds rock to the set and its properties (position, angle and dimensions).
     * Updates the number of rocks in the set.
     * @param {MyRock} rock - Rock to add to the set.
     * @param {Array} rockPosition - Position of the rock. Array with x and z coordinates.
     * @param {float} rockAngle - Angle of the rock.
     * @param {Array} rockDimensions - Rock's dimensions. Array with x, y and z scale factor.
     */
    addRock(rock, rockPosition, rockAngle, rockDimensions) {
        this.rocks.push(rock);
        this.rockPositions.push(...rockPosition);
        this.rockAngles.push(rockAngle);
        this.rockDimensions.push(...rockDimensions);
        this.numRocks += 1;
    }

    /**
     * @method display
     * Displays MyRockSet.
     */
    display() {
        this.rockAppearance.apply();
        for (let i = 0; i < this.numRocks; i++) {
            this.scene.pushMatrix();

            this.scene.translate(this.rockPositions[2*i], 0.8*this.rockDimensions[3*i + 1], this.rockPositions[2*i + 1]);
            this.scene.rotate(this.rockAngles[i], 1, 0, 0);
            this.scene.scale(this.rockDimensions[3*i], this.rockDimensions[3*i + 1], this.rockDimensions[3*i + 2]);
            
            this.rocks[i].display(this.scene);
            
            this.scene.popMatrix();
        }
    }
}
