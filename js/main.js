import {WebcamCanvas} from "./WebcamCanvas.js";
import {RepetitionCalculator} from "./RepetitionCalculator.js";
import {FrequencyChart} from "./FrequencyChart.js";
import {ExerciseController} from "./ExerciseController.js";
import {PoseNetController} from "./PoseNetController.js";

const webcamCanvas = new WebcamCanvas();
const poseNetController = new PoseNetController(webcamCanvas.videoStream);
const frequencyChart = new FrequencyChart('chart');
const onPushPoseCallbacks = [frequencyChart.updateChart.bind(frequencyChart)];
const repetitionCalculator = new RepetitionCalculator(null, onPushPoseCallbacks);
poseNetController.callbacksOnPoseCaptured.push(repetitionCalculator.pushPose.bind(repetitionCalculator));
const exerciseController = new ExerciseController(poseNetController, repetitionCalculator);

