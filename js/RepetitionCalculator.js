import {MAX_FREQUENCY_IN_FRAMES} from "./Constants.js";

class RepetitionCalculator{
    constructor(basePose = null, onPushPoseCallbacks = []){
        this.basePose = basePose;
        this.maxQueueLength = MAX_FREQUENCY_IN_FRAMES;
        this.distancesQueue = basePose? [0] : [];
        this.posesQueue = basePose? [basePose] : [];
        this.onPushPoseCallbacks = onPushPoseCallbacks;
    }
    /*Pushes a pose in the buffer and calls all the callbacks*/
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
    /*Calculates the distance between the newPose Map and a base pose.*/
    distanceToBasePose(newPose){ // New pose is a Map
        console.log(newPose);
        console.log(newPose.size);
        return newPose["nose"].y;
        
    }


}

export {RepetitionCalculator};