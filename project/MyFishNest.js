import {CGFappearance} from '../lib/CGF.js';

export class MyFishNest {
    /**
     * MyFishNest
     * @constructor
     * @param  {CGFscene} scene - Reference to MyScene object 
     * @param  {integer} x - X coordinate of the object's position
     * @param  {integer} z - Y coordinate of the object's position
     * @param  {float} radius - Radius of the object
     * @param  {integer} numRocks - Number of rocks in the scene
     * @param  {CGFappearance} rockAppearance - Appearance of the rocks
     */
	constructor(scene, x, z, radius, numRocks, rockAppearance) {
		this.scene = scene;

        this.x = x;
        this.z = z;
        this.radius = radius;

        this.rocks = [];
        this.rockPositionsRadius = []; // Positions relative to nest center
        this.rockPositionsAngle = [];
        this.rockAngles = [];
        this.rockDimensions = [];

        this.rockAppearance = rockAppearance;

        this.initRockPositions(numRocks);
	}

    /**
     * @method initRockPositions
     * Initializes the set of positions occupied by the rocks that the fish collects in the nest
     * @param {integer} numRocks - Number of rocks in the scene
     */
    initRockPositions(numRocks) {
        for (let i = 0; i < numRocks; i++) {
            this.rockPositionsAngle.push(Math.random() * 2 * Math.PI);
            // This allows a more uniform rock distribution
            // Source: https://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly
            let u = Math.random() + Math.random();
            let r = u > 1? 2 - u : u;
            this.rockPositionsRadius.push(r * this.radius * 0.8); // Multiply by 0.8 so rocks don't become 'buried' in the edges of the nest
            
        }
    }

    /**
     * @method initRockPositions
     * Returns whether the given position is inside the nest
     * @param {array} position - the position (array with x, y, z coordinates) to check
     */
    contains(position) {
        let delta_x = this.x - position[0];
        let delta_z = this.z - position[2];
        return Math.sqrt(delta_x * delta_x + delta_z * delta_z) <= this.radius;
    }

    /**
     * @method addRock
     * Adds a rock to the nest
     * @param {MyRock} rock - rock to add to the nest
     * @param {float} rockAngle - angle of the rock
     * @param {float} rockDimensions - dimensions of the rock
     */
    addRock(rock, rockAngle, rockDimensions) {
        this.rocks.push(rock);
        this.rockAngles.push(rockAngle);
        this.rockDimensions.push(...rockDimensions);
    }

    /**
     * @method display
     * Displays MyFishNest.
     */
    display() {
        this.rockAppearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.x, -0.7, this.z);

        for (let i in this.rocks) {
            this.scene.pushMatrix();

            this.scene.rotate(this.rockPositionsAngle[i], 0, 1, 0);
            this.scene.translate(0, 0, this.rockPositionsRadius[i]);
            this.scene.rotate(this.rockAngles[i], 1, 0, 0);
            this.scene.scale(this.rockDimensions[3*i], this.rockDimensions[3*i + 1], this.rockDimensions[3*i + 2]);
            
            this.rocks[i].display(this.scene);

            this.scene.popMatrix();
        }

		this.scene.popMatrix();
    }
}
