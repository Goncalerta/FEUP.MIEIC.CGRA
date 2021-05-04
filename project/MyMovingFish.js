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
    constructor(scene, fishNest, rockSet, scaleFactor = 1, verticalVelocity = 0.1, minPosition = 0.5, maxPosition = 5) {
        super(scene, new MyFish(scene), scaleFactor);
        this.fish = this.object;
        this.verticalMovementState = 1;
        this.verticalVelocity = verticalVelocity;
        this.maxPosition = maxPosition;
        this.minPosition = minPosition;
        this.minTailspeed = 1/600;
        this.tailspeedFactor = 0.3;
        this.position[1] = maxPosition;

        this.catchedRock = null;
        this.rockPosition = null;
        this.rockAngle = null;
        this.rockDimensions = null;
        this.rockSet = rockSet;

        this.fishNest = fishNest;

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
        if (this.catchedRock != null) {
            this.rockSet.addRock(this.catchedRock, this.rockPosition, this.rockAngle, this.rockDimensions);
            this.catchedRock = null;
            this.rockPosition = null;
            this.rockAngle = null;
            this.rockDimensions = null;
        }
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

    display() {
        super.display();
        if (this.catchedRock != null) {
            this.rockSet.getRockAppearance().apply();

            this.scene.pushMatrix();

            this.scene.translate(...this.position);
            this.scene.rotate(this.orientation, 0, 1, 0);
            this.scene.translate(0, 0, 0.3);
            this.scene.rotate(this.rockAngle, 1, 0, 0);
            this.scene.scale(...this.rockDimensions);
            
            this.catchedRock.display(this.scene);
            
            this.scene.popMatrix();
        }
    }

    setMovingUp() {
        this.verticalMovementState = 1;
    }

    setMovingDown() {
        this.verticalMovementState = -1;
    }

    interactWithRock() {
        if (this.position[1] != this.minPosition) {
            return;
        }

        if (this.catchedRock == null) {
            this.catchRock();
        } else {
            this.dropRock();
        }
    }

    catchRock() {
        let closest = null;
        let closestDist = 1.5;

        for (let i in this.rockSet.rocks) {
            let delta_x = this.position[0] - this.rockSet.rockPositions[2*i];
            let delta_z = this.position[2] - this.rockSet.rockPositions[2*i+1];
            let dist = Math.sqrt(delta_x * delta_x + delta_z * delta_z);
            if (dist >= closestDist) continue;
            closest = i;
        }
        if (closest == null) {
            return;
        }

        this.catchedRock = this.rockSet.rocks[closest];
        this.rockPosition = [this.rockSet.rockPositions[2*closest], this.rockSet.rockPositions[2*closest+1]];
        this.rockAngle = this.rockSet.rockAngles[closest];
        this.rockDimensions = [this.rockSet.rockDimensions[3*closest], this.rockSet.rockDimensions[3*closest+1], this.rockSet.rockDimensions[3*closest+2]];
        this.rockSet.removeRock(closest);
    }

    dropRock() {
        if (this.fishNest.contains(this.position)) {
            this.fishNest.addRock(this.catchedRock, this.rockAngle, this.rockDimensions);
            this.catchedRock = null;
            this.rockPosition = null;
            this.rockAngle = null;
            this.rockDimensions = null;
        }
    }
}
