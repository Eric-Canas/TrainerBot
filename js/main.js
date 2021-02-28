import {WebcamCanvas} from "./View/WebcamCanvas.js";
import {RepetitionCalculator} from "./Controller/RepetitionCalculator.js";
import {FrequencyChart} from "./View/FrequencyChart.js";
import {ExerciseController} from "./Controller/ExerciseController.js";
import {PoseNetController} from "./Controller/PoseNetController.js";

// Set Views
const webcamCanvas = new WebcamCanvas();
const frequencyChart = new FrequencyChart('chart');

//Set Controllers
const poseNetController = new PoseNetController(webcamCanvas);
const onPushPoseCallbacks = [frequencyChart.updateChart.bind(frequencyChart)];
const repetitionCalculator = new RepetitionCalculator(poseNetController, onPushPoseCallbacks);
poseNetController.callbacksOnPoseCaptured.push(repetitionCalculator.pushPose.bind(repetitionCalculator));
poseNetController.callbacksOnPoseCaptured.push(repetitionCalculator.drawPose.bind(repetitionCalculator));
const exerciseController = new ExerciseController(poseNetController, repetitionCalculator);

