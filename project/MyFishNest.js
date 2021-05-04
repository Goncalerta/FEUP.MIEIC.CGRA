import {CGFobject, CGFtexture, CGFshader, CGFappearance} from '../lib/CGF.js';

export class MyFishNest extends CGFobject {
    /**
     * MyFishNest
     * @constructor
     * @param  {CGFscene} scene - Reference to MyScene object 
     * @param  {integer} x - X coordinate of the object's position
     * @param  {integer} z - Y coordinate of the object's position
     * @param  {float} radius - Radius of the object
     * @param  {MyRockSet} myRockSet - Rock set of rocks in the fish nest
     */
	constructor(scene, x, z, radius, myRockSet) {
		super(scene);

        this.x = x;
        this.z = z;
        this.radius = radius;

        this.rocks = [];
        this.rockPositionsRadius = []; // Positions relative to nest center
        this.rockPositionsAngle = [];
        this.rockAngles = [];
        this.rockDimensions = [];

        this.myRockSet = myRockSet;

        this.initRockPositions();
	}

    initRockPositions() {
        for (let i = 0; i < this.myRockSet.getNumRocks(); i++) {
            this.rockPositionsAngle.push(Math.random() * 2 * Math.PI);
            // This allows a more uniform rock distribution
            // Source: https://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly
            let u = Math.random() + Math.random();
            let r = u > 1? 2 - u : u;
            this.rockPositionsRadius.push(r * this.radius);
            
        }
    }

    contains(position) {
        let delta_x = this.x - position[0];
        let delta_z = this.z - position[2];
        return Math.sqrt(delta_x * delta_x + delta_z * delta_z) <= this.radius;
    }

    addRock(rock, rockAngle, rockDimensions) {
        this.rocks.push(rock);
        this.rockAngles.push(rockAngle);
        this.rockDimensions.push(...rockDimensions);
    }

    display() {
        this.myRockSet.getRockAppearance().apply();
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

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
