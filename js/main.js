import {WebcamCanvas} from "./View/WebcamCanvas.js";
import {ExerciseStreamController} from "./Controller/ExerciseStreamController.js";
import {FrequencyChart} from "./View/FrequencyChart.js";
import {ExerciseController} from "./Controller/ExerciseController.js";
import {PoseNetController} from "./Controller/PoseNetController.js";

// Set Views
const webcamCanvas = new WebcamCanvas();
const frequencyChart = new FrequencyChart('chart');

//Set Controllers
const poseNetController = new PoseNetController(webcamCanvas);
const onPushPoseCallbacks = [frequencyChart.updateChart.bind(frequencyChart)];
const exerciseStreamController = new ExerciseStreamController(poseNetController, onPushPoseCallbacks);
poseNetController.callbacksOnPoseCaptured.push(exerciseStreamController.pushPose.bind(exerciseStreamController));
poseNetController.callbacksOnPoseCaptured.push(exerciseStreamController.drawPose.bind(exerciseStreamController));
const exerciseController = new ExerciseController(poseNetController, exerciseStreamController);

