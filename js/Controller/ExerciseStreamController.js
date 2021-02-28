import {MAX_FREQUENCY_IN_FRAMES, POSENET_CLEANED_PART_NAMES, META_INFORMATION_WINDOW,
        PONDER_DIFFERENCE_BY_STD, FRAMES_BETWEEN_UPDATES, COUNT_STD_FROM_PERCENTILE} from "../Model/Constants.js";


class ExerciseStreamController{
    constructor(onPushPoseCallbacks = []){
        this.basePose = null;
        this.maxQueueLength = MAX_FREQUENCY_IN_FRAMES;
        this.distancesQueue = [];
        this.posesQueue = [];
        this.onPushPoseCallbacks = onPushPoseCallbacks;
        this.framesWithoutPoseUpdate = 0;
        this.framesBetweenUpdates = FRAMES_BETWEEN_UPDATES;
        this.xStd = [];
        this.yStd = [];
    }

    /*Pushes a pose in the buffer and calls all the callbacks*/
    pushPose(pose){
        this.posesQueue.push(pose);
        this.checkBasePose();
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

    /*Calculates the distance between the pose Map and a base pose.*/
    distanceToBasePose(pose, ponderByStd = PONDER_DIFFERENCE_BY_STD){
        const commonVisibleParts = Object.keys(this.basePose).filter(key => Object.keys(pose).includes(key));
        //we do not want to calculate a distance since we must avoid to loss the sign.
        let differenceX = 0;
        let differenceY = 0;
        for (const part of commonVisibleParts){
            differenceX += this.basePose[part].x - pose[part].x;
            differenceY += this.basePose[part].y - pose[part].y;
        }
        return differenceX+differenceY;
        
    }

    checkBasePose(){
        if (this.basePose == null){
            this.basePose = this.posesQueue[this.posesQueue.length - 1];
        }
        if (this.framesWithoutPoseUpdate % this.framesBetweenUpdates === 0){
            this.updateBasePose();
            this.updateStd();
            this.framesWithoutPoseUpdate = 1;
        } else {
            this.framesWithoutPoseUpdate++
        }
    }
    
    updateBasePose(){
         //TODO: Check the whole array looking for a better base pose. The best pose is those where the part of the body with more standard deviation is at the lower point. 
        //And preferrably if we are updating during the same exercise, the one closer to the original. It also should have the more body parts visible.
        //make the decision or heuristic for deciding best basePose for the current exercise.
    }
    
    updateStd(startAtPercentile = COUNT_STD_FROM_PERCENTILE){
        let xStd = {}
        let yStd = {}
        const poseQueueToUse = this.posesQueue.slice(~~(this.posesQueue.length*startAtPercentile));
        for (const part of POSENET_CLEANED_PART_NAMES){
            xStd[part] = [];
            yStd[part] = [];
        }

        for (const pose of poseQueueToUse){
            for (const [part, position] of Object.entries(pose)){
                xStd[part].push(position.x);
                yStd[part].push(position.y);
            }
        }

        for(const part of Object.keys(xStd)){
            xStd[part] = xStd[part].length > 0 ? math.std(xStd[part]) : 0;
            yStd[part] = yStd[part].length > 0 ? math.std(yStd[part]) : 0;
        }

        this.xStd.push(xStd)
        this.yStd.push(yStd)
        if (this.xStd.length > META_INFORMATION_WINDOW){
            this.xStd.shift();
            this.yStd.shift();
        }
    }

    

}

export {ExerciseStreamController};