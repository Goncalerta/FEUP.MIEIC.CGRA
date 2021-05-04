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
        this.verticalMovementState = 1;
        this.verticalVelocity = verticalVelocity;
        this.maxPosition = maxPosition;
        this.minPosition = minPosition;
        this.minTailspeed = 1/600;
        this.tailspeedFactor = 0.3;
        this.position[1] = maxPosition;

        this.fish.setTailSpeed(this.minTailspeed);
        this.restartFinCountdown = 0;
        this.t = 0;
    }

    updateAnimation(t) {
        this.fish.updateAnimation(t);
        if (this.restartFinCountdown > 0) {
            this.restartFinCountdown -= t - this.t;
            if (this.restartFinCountdown <= 0) {
                this.restartFinCountdown = 0;
                this.fish.setStopFinState(0);
            }
        }
        this.t = t;
    }

    accelerate(val) {
        super.accelerate(val);
        let tailspeed = this.minTailspeed + this.speed * this.tailspeedFactor;
        this.fish.setTailSpeed(tailspeed);
    }

    turn(val) {
        super.turn(val);
        let stopFinState;
        if (val > 0) {
            stopFinState = -1;
        } else if (val < 0) {
            stopFinState = 1;
        } else {
            stopFinState = 0;
        }
        this.restartFinCountdown = 250;
        this.fish.setStopFinState(stopFinState);
    }

    reset() {
        super.reset();
        this.fish.setTailSpeed(this.minTailspeed);
        this.position[1] = this.maxPosition;
        this.verticalMovementState = 1;
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
    }

    setMovingUp() {
        this.verticalMovementState = 1;
    }

    setMovingDown() {
        this.verticalMovementState = -1;
    }
}
