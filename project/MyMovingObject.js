import {CGFobject} from '../lib/CGF.js';

/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyMovingObject extends CGFobject {
    constructor(scene, object) {
        super(scene);
        this.reset();
        this.object = object;
        this.initBuffers();
    }
    initBuffers() {
        this.object.initBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity) {
        this.object.updateBuffers(complexity);
    }

    update() {
        let directionVect = [Math.sin(this.orientation), 0, Math.cos(this.orientation)];
        
        for (let i = 0; i < 3; i++) {
            this.position[i] += this.speed * directionVect[i];
        }
    }

    turn(val) {
        this.orientation += val;
    }

    accelerate(val) {
        this.speed += val;
        if (this.speed < 0) this.speed = 0;
    }

    reset() {
        this.position = [0, 0, 0];
        this.speed = 0;
        this.orientation = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(...this.position);
        this.scene.rotate(this.orientation, 0, 1, 0);
        
        this.object.display();
        this.scene.popMatrix();
    }
}


