import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';

export class MyMovingFish extends MyMovingObject {
    /**
     * MyMovingObject
     * @constructor
     * @param  {CGFscene} scene - Reference to MyScene object
     * @param  {MyFishNest} fishNest - Fish nest
     * @param  {MyRockSet} rockSet - Set of rocks in scene
     * @param  {integer} scaleFactor - Scale factor of the object
     * @param  {float} verticalVelocity - Uniform vertical velocity of the fish
     * @param  {float} minPosition - Minimum Y coordinate of the object's position
     * @param  {float} maxPosition - Maximum Y coordinate of the object's position
     */
    constructor(scene, fishNest, rockSet, scaleFactor = 1, verticalVelocity = 0.1, minPosition = 0.5, maxPosition = 5) {
        super(scene, new MyFish(scene), scaleFactor);
        this.fish = this.object;
        // Vertical movement attributes (the movement when 'P' or 'L' keys are pressed)
        this.verticalMovementState = 1; // 1: must be on top or rising; -1: must be on bottom or going down
        this.verticalVelocity = verticalVelocity;
        this.maxPosition = maxPosition;
        this.minPosition = minPosition;
        this.position[1] = maxPosition; // The fish starts at the top

        // Rock attributes (for when the fish has a rock in its mouth)
        this.catchedRock = null;
        this.rockPosition = null;
        this.rockAngle = null;
        this.rockDimensions = null;
        this.rockSet = rockSet; // Reference to the set of rocks in scene

        // Reference to the nest
        this.fishNest = fishNest;

        // Attributes to control tail and fin animation
        this.minTailspeed = 1/600;
        this.tailspeedFactor = 0.3;
        this.fish.setTailSpeed(this.minTailspeed);
        this.restartFinCountdown = 0;
        this.t = 0;
    }

    /**
     * @method updateAnimation
     * Updates the state of the animation based on current time
     * @param {Number} t - Current time in milliseconds
     */
    updateAnimation(t) {
        this.fish.updateAnimation(t);

        // This mechanism makes the fin start moving again after some time
        // if the fish is not turning.
        if (this.restartFinCountdown > 0) {
            this.restartFinCountdown -= t - this.t;
            if (this.restartFinCountdown <= 0) {
                this.restartFinCountdown = 0;
                this.fish.setStopFinState(0); // 0: makes both fins move
            }
        }
        this.t = t;
    }

    /**
     * @method accelerate
     * Changes the speed of the object and updates tail animation accordingly
     * @param {float} val - Change in speed
     */
    accelerate(val) {
        super.accelerate(val);
        let tailspeed = this.minTailspeed + this.speed * this.tailspeedFactor;
        this.fish.setTailSpeed(tailspeed);
    }

    /**
     * @method turn
     * Changes the orientation of the object on the xOz plane
     * @param {float} val - Increment in orientation
     */
    turn(val) {
        super.turn(val);
        let stopFinState;
        if (val > 0) {
            // Turn left -> stop left fin
            stopFinState = -1;
        } else if (val < 0) {
            // Turn right -> stop right fin
            stopFinState = 1;
        } else {
            // Stop turning -> move both fins
            stopFinState = 0;
        }
        this.restartFinCountdown = 250; // Countdown to restart fin movement if the fish stops turning
        this.fish.setStopFinState(stopFinState);
    }

    /**
     * @method reset
     * Resets the fish to its initial position, speed and orientation
     * If it has a rock in its mouth, return it to the rock set
     */
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

    /**
     * @method updatePosition
     * Updates the position of the fish based on its speed, orientation and vertical movement state
     * @param {float} speedFactor - A factor to control the speed
     */
    updatePosition(speedFactor) {
        super.updatePosition(speedFactor);

        this.position[1] += this.verticalVelocity * this.verticalMovementState;
        if (this.position[1] > this.maxPosition) {
            this.position[1] = this.maxPosition;
        }
        if (this.position[1] < this.minPosition) {
            this.position[1] = this.minPosition;
        }
    }

    /**
     * @method display
     * Displays MyMovingFish.
     */
    display() {
        // Display the moving object
        super.display();
        // Display the rock in the fish mouth if there is one
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

    /**
     * @method setMovingUp
     * Changes the state of the fish's vertical movement so it starts to go up (unless it is at the top already)
     */
    setMovingUp() {
        this.verticalMovementState = 1;
    }

    /**
     * @method setMovingUp
     * Changes the state of the fish's vertical movement so it starts to go down (unless it is at the bottom already)
     */
    setMovingDown() {
        this.verticalMovementState = -1;
    }

    /**
     * @method interactWithRock
     * If the fish is at the bottom, tries to interact with the rocks in the scene. Used when 'C' is pressed
     */
    interactWithRock() {
        if (this.position[1] != this.minPosition) {
            return;
        }

        if (this.catchedRock == null) {
            // No rock in mouth: try to catch one
            this.catchRock();
        } else {
            // Rock in mouth: try to put it in the nest
            this.putRock();
        }
    }

    /**
     * @method catchRock
     * Tries to catch the closest rock
     */
    catchRock() {
        let closest = null;
        let closestDist = 1.5; // The rock must be withing 1.5 units of distance of the fish

        // Find the closest rock within 1.5 units of distance
        for (let i in this.rockSet.rocks) {
            let delta_x = this.position[0] - this.rockSet.rockPositions[2*i];
            let delta_z = this.position[2] - this.rockSet.rockPositions[2*i+1];
            let dist = Math.sqrt(delta_x * delta_x + delta_z * delta_z);
            if (dist >= closestDist) continue;
            closest = i;
        }
        if (closest == null) {
            return; // No rock fulfilling conditions was found
        }

        // Add rock to the fish, removing it from the rockSet
        this.catchedRock = this.rockSet.rocks[closest];
        this.rockPosition = [this.rockSet.rockPositions[2*closest], this.rockSet.rockPositions[2*closest+1]];
        this.rockAngle = this.rockSet.rockAngles[closest];
        this.rockDimensions = [this.rockSet.rockDimensions[3*closest], this.rockSet.rockDimensions[3*closest+1], this.rockSet.rockDimensions[3*closest+2]];
        this.rockSet.removeRock(closest);
    }

    /**
     * @method putRock
     * Tries to put its rock in the nest
     */
    putRock() {
        // Check whether fish is inside nest
        if (this.fishNest.contains(this.position)) {
            // Add rock to the nest, removing it from the fish
            this.fishNest.addRock(this.catchedRock, this.rockAngle, this.rockDimensions);
            this.catchedRock = null;
            this.rockPosition = null;
            this.rockAngle = null;
            this.rockDimensions = null;
       }
    }
}
