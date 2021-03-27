/**
 * Copyright (c) 2021
 *
 * Summary. Controls all the logic for managing the exercise that is being performed as well as
 *          the transitions between exercises.
 * Description. Controls all the logic for managing the exercise that is being performed as well as
 *              the transitions between exercises.
 * 
 * @author Eric Cañas <elcorreodeharu@gmail.com>
 * @file   This file defines the ExerciseController class.
 * @since  0.0.1
 */

 import {END_SESSION_BUTTON_ID} from "../Model/Constants.js";
 import {WebcamController} from "../Controller/WebcamController.js";
 import {WebcamCanvas} from "../View/WebcamCanvas.js";
 import {MovementStateController} from "../Controller/MovementStateController.js";
 import {FrequencyChart} from "../View/FrequencyChart.js";
 import {PosePainter} from "../Helpers/PosePainter.js";
 import {PoseNetController} from "../Controller/PoseNetController.js";

 class SessionController{
    //To avoid the creation of diverse SessionControllers, it is a singleton
    static instance;

    constructor(endSessionButtonID = END_SESSION_BUTTON_ID){
        if (this.constructor.instance){
            return instance
        } else {
            this.onUpdatedStateCallbacks = [];
            // Set Views
            this.webcamCanvas = new WebcamCanvas();
            this.frequencyChart = new FrequencyChart();
            // Views callbacks
            this.onUpdatedStateCallbacks.push(this.frequencyChart.updateChart.bind(this.frequencyChart));
            this.webcamController = new WebcamController();
            this.poseNetController = new PoseNetController(this.webcamController);
            this.movementStateController = new MovementStateController(this.onUpdatedStateCallbacks);
            this.posePainter = new PosePainter(this.webcamCanvas, this.movementStateController);
            this.poseNetController.callbacksOnPoseCaptured.push(this.movementStateController.updateState.bind(this.movementStateController));
            this.poseNetController.callbacksOnPoseCaptured.push(this.posePainter.drawPose.bind(this.posePainter));
            document.getElementById(endSessionButtonID).addEventListener('click', this.endSession.bind(this), false);
            this.constructor.instance = this
        }
    }

    beginSession(){
        this.onUpdatedStateCallbacks = [];
        // Set Views
        this.webcamCanvas = new WebcamCanvas();
        this.frequencyChart = new FrequencyChart();
        // Views callbacks
        this.onUpdatedStateCallbacks.push(this.frequencyChart.updateChart.bind(this.frequencyChart));
        this.webcamController = new WebcamController();
        this.poseNetController = new PoseNetController(this.webcamController);
        this.movementStateController = new MovementStateController(this.onUpdatedStateCallbacks);
        this.posePainter = new PosePainter(this.webcamCanvas, this.movementStateController);
        this.poseNetController.callbacksOnPoseCaptured.push(this.movementStateController.updateState.bind(this.movementStateController));
        this.poseNetController.callbacksOnPoseCaptured.push(this.posePainter.drawPose.bind(this.posePainter));
    }
    endSession(){
        console.log("END")
    }
    


}

export {SessionController};