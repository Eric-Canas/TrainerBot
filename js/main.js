import {WebcamController} from "./Controller/WebcamController.js";
import {WebcamCanvas} from "./View/WebcamCanvas.js";
import {ExerciseStreamController} from "./Controller/ExerciseStreamController.js";
import {FrequencyChart} from "./View/FrequencyChart.js";
import {PosePainter} from "./Helpers/PosePainter.js";
import {ExerciseController} from "./Controller/ExerciseController.js";
import {PoseNetController} from "./Controller/PoseNetController.js";

let onPushPoseCallbacks = [];
// Set Views
const webcamCanvas = new WebcamCanvas();
const frequencyChart = new FrequencyChart('chart');
// Views callbacks
onPushPoseCallbacks.push(frequencyChart.updateChart.bind(frequencyChart));

//Set Controllers
const webcamController = new WebcamController();
const poseNetController = new PoseNetController(webcamController);
const exerciseStreamController = new ExerciseStreamController(onPushPoseCallbacks);
const posePainter = new PosePainter(webcamCanvas, webcamController, exerciseStreamController);
poseNetController.callbacksOnPoseCaptured.push(exerciseStreamController.pushPose.bind(exerciseStreamController));
poseNetController.callbacksOnPoseCaptured.push(posePainter.drawPose.bind(posePainter));
const exerciseController = new ExerciseController(poseNetController, exerciseStreamController);
