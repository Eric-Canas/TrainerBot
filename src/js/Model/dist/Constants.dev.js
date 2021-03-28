"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EPSILON = exports.OBJECTIVE_POSE_CRITERIA = exports.BASE_POSE_CRITERIA = exports.MEASURE_ONLY_ON_PREDOMINANT_AXIS = exports.AVERAGED_PARTS = exports.SKELETON_CONNECTIONS = exports.POSENET_CLEANED_PART_NAMES = exports.MIN_PART_CONFIDENCE = exports.PLOT_BASE_POSE = exports.SHOW_STD_DIRECTION = exports.DRAWN_POINTS_RADIUS = exports.DEFAULT_CANVAS_WIDTH = exports.DEFAULT_CANVAS_HEIGHT = exports.INVERT_Y_AXIS = exports.CHART_LABEL = exports.CHART_BACKGROUND_COLOR = exports.CHART_LINE_COLOR = exports.TRANSPARENT_BLUE = exports.TRANSPARENT_WHITE = exports.TRANSPARENT_RED = exports.MILISECONDS_BETWEEN_CONSISTENCY_UPDATES = exports.POINTS_TO_LINE_THRESHOLD = exports.COUNT_STD_FROM_PERCENTILE = exports.META_INFORMATION_WINDOW = exports.MAX_FREQ_RANGE = exports.MAX_FREQUENCY_IN_FRAMES = exports.TAG_LAPSE_ID = exports.SAVE_DATASET_CANVAS_ID = exports.BEGIN_SESSION_BUTTON_ID = exports.END_SESSION_BUTTON_ID = exports.CHART_CANVAS_ID = exports.WEBCAM_FRAME_ID = exports.WEBCAM_CANVAS_ID = void 0;

var _DecisionAidSystem = require("../Helpers/DecisionAidSystem.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var WEBCAM_FRAME_ID = 'webcamFrame';
exports.WEBCAM_FRAME_ID = WEBCAM_FRAME_ID;
var WEBCAM_CANVAS_ID = 'webcamCanvas';
exports.WEBCAM_CANVAS_ID = WEBCAM_CANVAS_ID;
var CHART_CANVAS_ID = 'chartCanvas';
exports.CHART_CANVAS_ID = CHART_CANVAS_ID;
var BEGIN_SESSION_BUTTON_ID = 'beginSessionButtonId';
exports.BEGIN_SESSION_BUTTON_ID = BEGIN_SESSION_BUTTON_ID;
var END_SESSION_BUTTON_ID = 'endSessionButtonId';
exports.END_SESSION_BUTTON_ID = END_SESSION_BUTTON_ID;
var SAVE_DATASET_CANVAS_ID = 'saveDatasetCanvas';
exports.SAVE_DATASET_CANVAS_ID = SAVE_DATASET_CANVAS_ID;
var TAG_LAPSE_ID = 'tagLapseId';
exports.TAG_LAPSE_ID = TAG_LAPSE_ID;
// Frequency constants
var MAX_FREQUENCY_IN_FRAMES = 300;
exports.MAX_FREQUENCY_IN_FRAMES = MAX_FREQUENCY_IN_FRAMES;

var MAX_FREQ_RANGE = _toConsumableArray(Array(MAX_FREQUENCY_IN_FRAMES).keys());

exports.MAX_FREQ_RANGE = MAX_FREQ_RANGE;
var META_INFORMATION_WINDOW = ~~(MAX_FREQUENCY_IN_FRAMES / 10);
exports.META_INFORMATION_WINDOW = META_INFORMATION_WINDOW;
var COUNT_STD_FROM_PERCENTILE = 0.5;
exports.COUNT_STD_FROM_PERCENTILE = COUNT_STD_FROM_PERCENTILE;
var POINTS_TO_LINE_THRESHOLD = 0.025;
exports.POINTS_TO_LINE_THRESHOLD = POINTS_TO_LINE_THRESHOLD;
var MILISECONDS_BETWEEN_CONSISTENCY_UPDATES = 500;
exports.MILISECONDS_BETWEEN_CONSISTENCY_UPDATES = MILISECONDS_BETWEEN_CONSISTENCY_UPDATES;
//Colors
var TRANSPARENT_RED = 'rgba(255, 99, 132, 0.4)';
exports.TRANSPARENT_RED = TRANSPARENT_RED;
var TRANSPARENT_BLUE = 'rgba(99, 132, 255, 0.4)';
exports.TRANSPARENT_BLUE = TRANSPARENT_BLUE;
var TRANSPARENT_WHITE = 'rgba(255, 255, 255, 0.4)';
exports.TRANSPARENT_WHITE = TRANSPARENT_WHITE;
// Chart constants
var CHART_LINE_COLOR = 'rgba(255, 99, 132, 1)';
exports.CHART_LINE_COLOR = CHART_LINE_COLOR;
var CHART_BACKGROUND_COLOR = TRANSPARENT_RED;
exports.CHART_BACKGROUND_COLOR = CHART_BACKGROUND_COLOR;
var CHART_LABEL = 'Frequency';
exports.CHART_LABEL = CHART_LABEL;
var INVERT_Y_AXIS = true;
exports.INVERT_Y_AXIS = INVERT_Y_AXIS;
//Video Canvas constants
var DEFAULT_CANVAS_HEIGHT = 480;
exports.DEFAULT_CANVAS_HEIGHT = DEFAULT_CANVAS_HEIGHT;
var DEFAULT_CANVAS_WIDTH = 600;
exports.DEFAULT_CANVAS_WIDTH = DEFAULT_CANVAS_WIDTH;
var DRAWN_POINTS_RADIUS = 6;
exports.DRAWN_POINTS_RADIUS = DRAWN_POINTS_RADIUS;
var SHOW_STD_DIRECTION = true;
exports.SHOW_STD_DIRECTION = SHOW_STD_DIRECTION;
var PLOT_BASE_POSE = true;
exports.PLOT_BASE_POSE = PLOT_BASE_POSE;
//PoseNet constants
var MIN_PART_CONFIDENCE = 0.4;
exports.MIN_PART_CONFIDENCE = MIN_PART_CONFIDENCE;
var POSENET_CLEANED_PART_NAMES = ["head", "leftShoulder", "rightShoulder", "leftElbow", "rightElbow", "leftWrist", "rightWrist", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle"];
exports.POSENET_CLEANED_PART_NAMES = POSENET_CLEANED_PART_NAMES;
var AVERAGED_PARTS = {
  "head": ["nose", "leftEye", "rightEye", "leftEar", "rightEar"]
};
exports.AVERAGED_PARTS = AVERAGED_PARTS;
var SKELETON_CONNECTIONS = [["leftShoulder", "rightShoulder"], ["leftShoulder", "leftElbow"], ["leftShoulder", "leftHip"], ["rightShoulder", "rightElbow"], ["rightShoulder", "rightHip"], ["leftElbow", "leftWrist"], ["rightElbow", "rightWrist"], ["leftHip", "rightHip"], ["leftHip", "leftKnee"], ["rightHip", "rightKnee"], ["leftKnee", "leftAnkle"], ["rightKnee", "rightAnkle"]];
exports.SKELETON_CONNECTIONS = SKELETON_CONNECTIONS;
//Exercise Estimation Constants
var MEASURE_ONLY_ON_PREDOMINANT_AXIS = false;
exports.MEASURE_ONLY_ON_PREDOMINANT_AXIS = MEASURE_ONLY_ON_PREDOMINANT_AXIS;
var BASE_POSE_CRITERIA = [[_DecisionAidSystem.DecisionAidSystem.maximizeVisibleBodyParts, 0.2], [_DecisionAidSystem.DecisionAidSystem.minimizeAveragePositionOnStdDirection, 0.8]];
exports.BASE_POSE_CRITERIA = BASE_POSE_CRITERIA;
var OBJECTIVE_POSE_CRITERIA = [[_DecisionAidSystem.DecisionAidSystem.maximizeVisibleBodyParts, 0.2], [_DecisionAidSystem.DecisionAidSystem.maximizeAveragePositionOnStdDirection, 0.8]];
exports.OBJECTIVE_POSE_CRITERIA = OBJECTIVE_POSE_CRITERIA;
//Others
var EPSILON = 0.0001;
exports.EPSILON = EPSILON;