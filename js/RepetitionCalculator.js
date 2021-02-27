import {MAX_FREQUENCY_IN_FRAMES} from "./Constants.js";

class RepetitionCalculator{
    constructor(initialPose = null, onPushPoseCallbacks = []){
        this.initialPose = initialPose;
        this.maxQueueLength = MAX_FREQUENCY_IN_FRAMES;
        this.distancesQueue = initialPose? [0] : [];
        this.posesQueue = initialPose? [initialPose] : [];
        this.basePose = initialPose? initialPose : null;
        this.onPushPoseCallbacks = onPushPoseCallbacks;
    }
    /* Pushes a pose in the buffer and calls all the callbacks
    */
    pushPose(pose){
        this.posesQueue.push(pose);
        this.distancesQueue.push(this.distanceToBasePose(pose));
        // Maintain it as a finite size queue
        if (this.posesQueue.length > this.maxQueueLength) {
            this.posesQueue.shift();
            this.distancesQueue.shift();
        }
        for (const callback of this.onPushPoseCallbacks){
            callback(this.distancesQueue);
        }
    }
    /*Calculates the distance between the new pose and a base pose.
    */
    distanceToBasePose(newPose){
        return newPose.nose.y
        
    }


}

export {RepetitionCalculator};