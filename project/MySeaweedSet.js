import { CGFshader } from '../lib/CGF.js';
import { MySeaweed } from './MySeaweed.js';

export class MySeaweedSet {
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
     * @param  {float} maxDisplacementInGroup - Maximum displacement of a leaf in a single group from that group's center
     * @param  {float} ondulationAmplitude - Amplitude of the ondulation
     * @param  {float} ondulationCurvature - Curvature of the ondulation 
     * @param  {float} ondulationSpeed - Speed of ondulation
     */
    constructor(scene, numGroups, minGroupSize, maxGroupSize, minX, maxX, minZ, maxZ, minRadius, maxRadius, minHeight, maxHeight, 
                maxDisplacementInGroup, ondulationAmplitude, ondulationCurvature, ondulationSpeed) {
        this.scene = scene;

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

        // Generate seaweed groups
        this.groups = [];
        for (let i = 0; i < this.numGroups; i++) {
            let x = Math.random() * deltaX + this.minX;
            let z = Math.random() * deltaZ + this.minZ;
            let groupSize = Math.random() * deltaGroupSize + this.minGroupSize;
            let group = new MySeaweed(this.scene, x, z, groupSize, minRadius, maxRadius, minHeight, maxHeight, maxDisplacementInGroup);

            this.groups.push(group);
        }

        this.ondulationAmplitude = ondulationAmplitude;
        this.ondulationCurvature = ondulationCurvature;
        this.ondulationSpeed = ondulationSpeed;
        this.ondulationPhase = 0;

        this.shader = new CGFshader(this.scene.gl, "shaders/seaweed.vert", "shaders/seaweed.frag");
        this.shader.setUniformsValues({ amplitude: this.ondulationAmplitude, curvature: this.ondulationCurvature, phase: this.ondulationPhase});
    }

    /**
     * @method update
     * Updates phase of ondulation according to its speed
     */
    update() {
        this.ondulationPhase += this.ondulationSpeed;
        this.shader.setUniformsValues({ amplitude: this.ondulationAmplitude, curvature: this.ondulationCurvature, phase: this.ondulationPhase});
    }

    display() {
        this.scene.setActiveShader(this.shader);
        for (let group of this.groups) {
            group.display();
        }
    }
}
