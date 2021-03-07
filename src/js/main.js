import {WebcamController} from "./Controller/WebcamController.js";
import {WebcamCanvas} from "./View/WebcamCanvas.js";
import {MovementStateController} from "./Controller/MovementStateController.js";
import {FrequencyChart} from "./View/FrequencyChart.js";
import {PosePainter} from "./Helpers/PosePainter.js";
import {SessionController} from "./Controller/SessionController.js";
import {PoseNetController} from "./Controller/PoseNetController.js";

let onUpdatedStateCallbacks = [];
// Set Views
const webcamCanvas = new WebcamCanvas();
const frequencyChart = new FrequencyChart();
// Views callbacks
onUpdatedStateCallbacks.push(frequencyChart.updateChart.bind(frequencyChart));

//Set Controllers
const webcamController = new WebcamController();
const poseNetController = new PoseNetController(webcamController);
const movementStateController = new MovementStateController(onUpdatedStateCallbacks);
const posePainter = new PosePainter(webcamCanvas, movementStateController);
poseNetController.callbacksOnPoseCaptured.push(movementStateController.updateState.bind(movementStateController));
poseNetController.callbacksOnPoseCaptured.push(posePainter.drawPose.bind(posePainter));
const sessionController = new SessionController(poseNetController, movementStateController);
