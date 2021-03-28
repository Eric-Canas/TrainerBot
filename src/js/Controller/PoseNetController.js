/**
 * Copyright (c) 2021
 *
 * Summary. Manages the loading and estimations of the PoseNet network
 * Description. The PoseNet Controller class charges is in charge of loading the PoseNet model,
 *              from the tensorflowjs hub, and constantly estimate a position for the current
 *              frame of the given videoStream. Additionally, every time a pose is detected,
 *              it executes the set of callbacks passed as argument in the constructor.
 * 
 * @author Eric Cañas <elcorreodeharu@gmail.com>
 * @file   This file defines the PoseNetController class.
 * @since  0.0.1
 */
import {MIN_PART_CONFIDENCE, INVERT_Y_AXIS, AVERAGED_PARTS} from "../Model/Constants.js";

class PoseNetController{
    /**
     * 
     * 
     * @param {WebcamController} webcamController  : Controller of the webcam. Containing the videoStream information as well as other 
     *                                               webcam parameters such as the width and height of the video captured.
     * @param {Array} callbacksOnPoseCaptured : Array of callbacks containing the functions that must be triggered
     *                                          every time that a pose is captured. Those callbacks must receive
     *                                          as first argument a pose Object with the syntax {partName : {xPos, yPos}}.
     */
    constructor(webcamController, callbacksOnPoseCaptured = []){
        this.webcamController = webcamController;
        this.callbacksOnPoseCaptured = callbacksOnPoseCaptured;
        this.poseNet = null;
        this._disable = false;
        this._loadPoseNet();
        this._poseEvent = new CustomEvent('posecaptured', {pose : this.lastPoseCaptured})
        this.framesWithoutDetections = 0;
        document.addEventListener('posecaptured', this.capturePose.bind(this), false);
    }

    /**
     * Loads posenet and assign it to this.poseNet. Then (once videoStream is loaded) starts the capturePose bucle.
     */
    async _loadPoseNet(){
        this.poseNet = await posenet.load();
        await this.webcamController.videoStream.addEventListener('loadeddata', event => this.capturePose());
    }

    disable(){
        this._disable = true;
    }
    enable(){
        if (this._disable){
            this._disable = false;
            document.dispatchEvent(this._poseEvent);
        }
    }
    /**
     * Estimate a single position from the current frame in the videoStream. 
     * Then, it cleans the pose: Sets it as an object with the syntax {partName : {xPos, yPos}}, which only
     * contains those parts with a confidence higher than minConfidence. If this object is not empty, it executes
     * all callback functions in the this.callbacksOnPoseCaptured array, passing the new pose as unique argument.
     * Otherwise, it increments the variable this.framesWithoutDetections.
     * Finally, when all the process is done, it triggers again the event that will capture the next pose.
     * @param {float} minConfidence : Float between 0.0 and 1.0. Minimum confidence of a part for being considered as detected.
     *                                Parts with low confidence use to be not present in the image. Default: MIN_PART_CONFIDENCE.
     */
    async capturePose(event, minConfidence = MIN_PART_CONFIDENCE){
        if (!this._disable){
            //TODO: Maybe it is necessary to verify here that the videoStream data is accessible
            let pose = await this.poseNet.estimateSinglePose(this.webcamController.videoStream);
            //Transform pose into an object only containing the parts with higher confidence than a threshold.
            pose = this._cleanPose(pose, minConfidence);
            if (Object.keys(pose).length > 0){
                for (const callback of this.callbacksOnPoseCaptured){ 
                    callback(pose);
                }
                this.framesWithoutDetections = 0;
            } else {
                this.framesWithoutDetections++;
            }
                document.dispatchEvent(this._poseEvent);
        }
    }

    /**
     * Cleans a pose. It means: to set it as an object with the syntax {partName : {xPos, yPos}}, which only contains those parts
     * with a confidence higher than minConfidence. xPos and YPos values are normalized in the range [0., 1.], Using the width
     * and height defined in this.webcamController. If invertYAxis is true, y axis is inverted (sets 0. at bottom and 1. at top).
     * 
     * @param {Tensorflow PoseNet Detection} pose : Pose detected by the Tensorflow PoseNet model. 
     * @param {float} minConfidence               : Float between 0.0 and 1.0. Minimum confidence of a part for being considered as detected.
     *                                              Parts with low confidence use to be not present in the image. Default: MIN_PART_CONFIDENCE.
     * @param {boolean} invertYAxis               : If true, y axis is inverted (sets 0.0 at bottom and 1.0 at top). Default: INVERT_Y_AXIS.
     * 
     * @return {Object} : Afore-described object with the syntax {partName : {xPos, yPos}}.
     */
    _cleanPose(pose, minConfidence = MIN_PART_CONFIDENCE, invertYAxis = INVERT_Y_AXIS) {
        let cleanPose = {};
        for (const part of pose.keypoints){
            if (part.score > minConfidence){
                cleanPose[part.part] = {x : part.position.x/this.webcamController.width,
                                        y : invertYAxis - (part.position.y/this.webcamController.height)};
            }
        }
        
        for (const averagedPart of Object.keys(AVERAGED_PARTS)){
            let foundPartsX = [];
            let foundPartsY = [];
            for (const part of AVERAGED_PARTS[averagedPart]){
                if (cleanPose.hasOwnProperty(part)){
                    foundPartsX.push(cleanPose[part].x);
                    foundPartsY.push(cleanPose[part].y);
                    delete cleanPose[part];
                }
            }
            
            if (foundPartsX.length > 0){
                cleanPose[averagedPart] = {x : math.mean(foundPartsX), y : math.mean(foundPartsY)};
            }
        }

        return cleanPose;
    }
}

export {PoseNetController};