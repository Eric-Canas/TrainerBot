import {MIN_PART_CONFIDENCE} from "./Constants.js";

class PoseNetController{
    constructor(videoStream, callbacksOnPoseCaptured = []){
        this.videoStream = videoStream;
        this.callbacksOnPoseCaptured = callbacksOnPoseCaptured;
        this.poseNet = null;
        this.loadPoseNet();
        this.lastPoseCaptured = null;
        this.poseEvent = new CustomEvent('posecaptured', {pose : this.lastPoseCaptured})
        this.framesWithoutDetections = 0;
        document.addEventListener('posecaptured', this.capturePose.bind(this), false);
        
    }
    
    /*Loads the network and triggers the asynchoronous detection bucle once the webcam video is available*/
    async loadPoseNet(){
        this.poseNet = await posenet.load();
        this.videoStream.addEventListener('loadeddata', event => this.capturePose());
    }

    async capturePose(){
        //TODO: Maybe it is necessary to verify here that the videoStream data is accessible
        let pose = await this.poseNet.estimateSinglePose(this.videoStream);
        //Transform pose into an object only containing the parts with higher confidence than a threshold.
        pose = this.cleanPose(pose, MIN_PART_CONFIDENCE);
        if (pose.size > 0){
            this.lastPoseCaptured = pose;
            for (const callback of this.callbacksOnPoseCaptured){ 
                callback(this.lastPoseCaptured);
            }
            this.framesWithoutDetections = 0;
        } else {
            this.framesWithoutDetections++;
        }
        document.dispatchEvent(this.poseEvent);
    }

    cleanPose(pose, minConfidence = MIN_PART_CONFIDENCE) {
        let cleanPose = {};
        for (const part of pose.keypoints){
            if (part.score > minConfidence){
                cleanPose[part.part] = {x : part.position.x, y : part.position.y};
            }
        }
        console.log(cleanPose);
        return cleanPose;
    }
}

export {PoseNetController};