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

    display() {
        this.object.display();
    }
}


