import {CGFobject} from '../lib/CGF.js';

export class MyMovingObject {
    /**
     * MyMovingObject
     * @constructor
     * @param  {CGFscene} scene - Reference to MyScene object
     * @param  {CGFobject} object - The CGFobject that will be moved and displayed on screen
     * @param  {float} scaleFactor - Scale factor of the object
     */
    constructor(scene, object, scaleFactor = 1) {
        this.scene = scene;
        this.position = [0, 0, 0];
        this.speed = 0;
        this.orientation = 0;
        this.object = object;
        this.scaleFactor = scaleFactor;
        this.turnDirection = 0;
    }

    /**
     * @method updatePosition
     * Updates the position of the object based on its speed, orientation and vertical movement state
     * @param {float} speedFactor - A factor to control the speed
     */
    updatePosition(speedFactor) {
        let directionVect = [Math.sin(this.orientation), 0, Math.cos(this.orientation)];
        
        for (let i = 0; i < 3; i++) {
            this.position[i] += speedFactor * this.speed * directionVect[i];
        }
    }

    /**
     * @method turn
     * Changes the orientation of the object on the xOz plane
     * @param {float} val - Increment in orientation
     */
    turn(val) {
        this.orientation += val;
    }

    /**
     * @method accelerate
     * Changes the speed of the object
     * @param {float} val - Change in speed
     */
    accelerate(val) {
        this.speed += val;
        if (this.speed < 0) this.speed = 0;
    }

    /**
     * @method reset
     * Resets the object to its initial position, speed and orientation
     */
    reset() {
        this.position = [0, 0, 0];
        this.speed = 0;
        this.orientation = 0;
    }

    /**
     * @method display
     * Displays MyMovingObject.
     */
    display() {
        this.scene.pushMatrix();
        this.scene.translate(...this.position);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.object.display();
        this.scene.popMatrix();
    }

    /**
     * @method updateScaleFactor
     * Updates the object's scale factor
     * @param {float} scaleFactor - New object's scale factor
     */
    updateScaleFactor(scaleFactor) {
        this.scaleFactor = scaleFactor;
    }
}
