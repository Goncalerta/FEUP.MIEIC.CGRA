import {CGFobject} from '../lib/CGF.js';

export class MyMovingObject extends CGFobject {
    /**
     * MyMovingObject
     * @constructor
     * @param  {CGFscene} scene - Reference to MyScene object
     * @param object - The CGFobject that will be moved and displayed on screen
     * @param  {integer} scaleFactor - Scale factor of the object
     */
    constructor(scene, object, scaleFactor = 1) {
        super(scene);
        this.position = [0, 0, 0];
        this.speed = 0;
        this.orientation = 0;
        this.object = object;
        this.scaleFactor = scaleFactor;
        this.turnDirection = 0;
    }

    /**
     * Updates the velocity based on the orientation and speed.
     * @param speedFactor - A factor to control the speed.
     */
    updateVelocity(speedFactor) {
        let directionVect = [Math.sin(this.orientation), 0, Math.cos(this.orientation)];
        
        for (let i = 0; i < 3; i++) {
            this.position[i] += speedFactor * this.speed * directionVect[i];
        }
    }

    /**
     * Changes the orientation of the object on the xOz plane.
     * @param {integer} val - Increment in orientation.
     */
    turn(val) {
        this.orientation += val;
    }

    /**
     * Changes the speed of the object.
     * @param {integer} val - Change in speed.
     */
    accelerate(val) {
        this.speed += val;
        if (this.speed < 0) this.speed = 0;
    }

    /**
     * Resets the object to its initial position, speed and orientation.
     */
    reset() {
        this.position = [0, 0, 0];
        this.speed = 0;
        this.orientation = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(...this.position);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.object.display();
        this.scene.popMatrix();
    }

    updateScaleFactor(scaleFactor) {
        this.scaleFactor = scaleFactor;
    }
}
