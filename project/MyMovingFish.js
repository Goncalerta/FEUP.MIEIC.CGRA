import {CGFobject} from '../lib/CGF.js';
import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';

export class MyMovingFish extends MyMovingObject {
    /**
     * MyMovingObject
     * @constructor
     * @param  {CGFscene} scene - Reference to MyScene object
     * @param object - The CGFobject that will be moved and displayed on screen
     * @param  {integer} scaleFactor - Scale factor of the object
     */
    constructor(scene, scaleFactor = 1, verticalVelocity = 0.1, minPosition = 0.5, maxPosition = 5) {
        super(scene, new MyFish(scene), scaleFactor);
        this.fish = this.object;
        this.verticalMovementState = 0;
        this.verticalVelocity = verticalVelocity;
        this.maxPosition = maxPosition;
        this.minPosition = minPosition;
        this.position[1] = 3;
    }

    updateAnimation(t) {
        this.fish.updateAnimation(t);
    }

    updateVelocity(speedFactor) {
        super.updateVelocity(speedFactor);

        this.position[1] += this.verticalVelocity * this.verticalMovementState;
        if (this.position[1] > this.maxPosition) {
            this.position[1] = this.maxPosition;
        }
        if (this.position[1] < this.minPosition) {
            this.position[1] = this.minPosition;
        }
        //let directionVect = [Math.sin(this.orientation), 0, Math.cos(this.orientation)];
        
        //for (let i = 0; i < 3; i++) {
        //    this.position[i] += speedFactor * this.speed * directionVect[i];
        //}
    }

    setMovingUp() {
        this.verticalMovementState = 1;
    }

    setMovingDown() {
        this.verticalMovementState = -1;
    }

    setVerticallyStill() {
        this.verticalMovementState = 0;
    }
}
