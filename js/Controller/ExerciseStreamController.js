import {MAX_FREQUENCY_IN_FRAMES, INVERT_Y_AXIS, DRAWN_POINTS_RADIUS} from "../Model/Constants.js";

class ExerciseStreamController{
    constructor(poseNetController, onPushPoseCallbacks = [], basePose = null){
        this.poseNetController = poseNetController;
        this.basePose = basePose;
        this.maxQueueLength = MAX_FREQUENCY_IN_FRAMES;
        this.distancesQueue = basePose? [0] : [];
        this.posesQueue = basePose? [basePose ] : [];
        this.onPushPoseCallbacks = onPushPoseCallbacks;
        this.framesWithoutPoseUpdate = 0;
        this.framesBetweenUpdates = ~~(MAX_FREQUENCY_IN_FRAMES/2);
        this.XStd = {};
        this.YStd = {};
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

    /*Calculates the distance between the newPose Map and a base pose.*/
    distanceToBasePose(newPose){
        const commonVisibleParts = Object.keys(this.basePose).filter(key => Object.keys(newPose).includes(key));
        //we do not want to calculate a distance since we must avoid to loss the sign.
        let differenceX = 0;
        let differenceY = 0;
        for (const part of commonVisibleParts){
            differenceX += this.basePose[part].x - newPose[part].x;
            differenceY += this.basePose[part].y - newPose[part].y;
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
    
    updateStd(){
        let xStd = {};
        let yStd = {};
        for (const pose of this.posesQueue){
            for (const [part, position] of Object.entries(pose)){
                if (xStd.hasOwnProperty(part)){
                    xStd[part].push(position.x);
                    yStd[part].push(position.y);
                } else {
                    xStd[part] = [position.x];
                    yStd[part] = [position.y];
                }
            }
        }
        this.xStd = {};
        this.yStd = {};
        for(const part of Object.keys(xStd)){
            this.xStd[part] = math.std(xStd[part]);
            this.yStd[part] = math.std(yStd[part]);
        }
    }

    drawPose(pose){
        //TODO: YOU CAN DO IT BETTER
        this.poseNetController.webcamController.clearCanvas();
        for (const [part, position] of Object.entries(pose)){
            this.poseNetController.webcamController.drawPoint(position.x*this.poseNetController.webcamController.width, (INVERT_Y_AXIS-position.y)*this.poseNetController.webcamController.height, DRAWN_POINTS_RADIUS, "red");
        }
    }

}

export {ExerciseStreamController};