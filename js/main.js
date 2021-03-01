import {WebcamCanvas} from "./View/WebcamCanvas.js";
import {ExerciseStreamController} from "./Controller/ExerciseStreamController.js";
import {FrequencyChart} from "./View/FrequencyChart.js";
import {PosePainter} from "./Helpers/PosePainter.js";
import {ExerciseController} from "./Controller/ExerciseController.js";
import {PoseNetController} from "./Controller/PoseNetController.js";

// Set Views
const webcamCanvas = new WebcamCanvas();
const frequencyChart = new FrequencyChart('chart');

//Set Controllers
const poseNetController = new PoseNetController(webcamCanvas);
const onPushPoseCallbacks = [frequencyChart.updateChart.bind(frequencyChart)];
const exerciseStreamController = new ExerciseStreamController(onPushPoseCallbacks);
const posePainter = new PosePainter(webcamCanvas, exerciseStreamController);
poseNetController.callbacksOnPoseCaptured.push(exerciseStreamController.pushPose.bind(exerciseStreamController));
poseNetController.callbacksOnPoseCaptured.push(posePainter.drawPose.bind(posePainter));
const exerciseController = new ExerciseController(poseNetController, exerciseStreamController);

