/**
 * Copyright (c) 2021
 *
 * Summary. Defines the configuration for the project.
 * Description. Defines the constants that will be used through the project.
 *              In this way all the internal configuration is gathered here. 
 * 
 * @author Eric Cañas <elcorreodeharu@gmail.com>
 * @file   This file defines the constants of the project.
 * @since  0.0.1
 */

import {DecisionAidSystem} from '../Helpers/DecisionAidSystem.js'


//HTML IDs
const WEBCAM_FRAME_ID = 'webcamFrame';
const WEBCAM_CANVAS_ID = 'webcamCanvas';
const CHART_CANVAS_ID = 'chartCanvas';
const BEGIN_SESSION_BUTTON_ID = 'beginSessionButtonId';
const END_SESSION_BUTTON_ID = 'endSessionButtonId';
const SAVE_DATASET_CANVAS_ID = 'saveDatasetCanvas';
const TAG_LAPSE_ID = 'tagLapseId';

export {WEBCAM_CANVAS_ID, WEBCAM_FRAME_ID, CHART_CANVAS_ID, END_SESSION_BUTTON_ID, BEGIN_SESSION_BUTTON_ID, SAVE_DATASET_CANVAS_ID, TAG_LAPSE_ID};

// Frequency constants
const MAX_FREQUENCY_IN_FRAMES = 300;
const MAX_FREQ_RANGE = [...Array(MAX_FREQUENCY_IN_FRAMES).keys()];
const META_INFORMATION_WINDOW = ~~(MAX_FREQUENCY_IN_FRAMES/10)
const COUNT_STD_FROM_PERCENTILE = 0.5;
const POINTS_TO_LINE_THRESHOLD = 0.025;
const MILISECONDS_BETWEEN_CONSISTENCY_UPDATES = 500;
export {MAX_FREQUENCY_IN_FRAMES, MAX_FREQ_RANGE, META_INFORMATION_WINDOW,
        COUNT_STD_FROM_PERCENTILE, POINTS_TO_LINE_THRESHOLD, MILISECONDS_BETWEEN_CONSISTENCY_UPDATES};

//Colors
const TRANSPARENT_RED = 'rgba(255, 99, 132, 0.4)';
const TRANSPARENT_BLUE = 'rgba(99, 132, 255, 0.4)';
const TRANSPARENT_WHITE = 'rgba(255, 255, 255, 0.4)'
export {TRANSPARENT_RED, TRANSPARENT_WHITE, TRANSPARENT_BLUE};

// Chart constants
const CHART_LINE_COLOR = 'rgba(255, 99, 132, 1)';
const CHART_BACKGROUND_COLOR = TRANSPARENT_RED;
const CHART_LABEL = 'Frequency';
const INVERT_Y_AXIS = true;
export {CHART_LINE_COLOR, CHART_BACKGROUND_COLOR, CHART_LABEL, INVERT_Y_AXIS};


//Video Canvas constants
const DEFAULT_CANVAS_HEIGHT = 480;
const DEFAULT_CANVAS_WIDTH = 600;
const DRAWN_POINTS_RADIUS = 6;
const SHOW_STD_DIRECTION = true;
const PLOT_BASE_POSE = true;
export {DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, DRAWN_POINTS_RADIUS, SHOW_STD_DIRECTION, 
        PLOT_BASE_POSE};


//PoseNet constants
const MIN_PART_CONFIDENCE = 0.4;
const POSENET_CLEANED_PART_NAMES = ["head", "leftShoulder", "rightShoulder", "leftElbow", "rightElbow",
                                    "leftWrist", "rightWrist", "leftHip", "rightHip", "leftKnee", 
                                    "rightKnee", "leftAnkle", "rightAnkle"];

const AVERAGED_PARTS = {"head" : ["nose", "leftEye", "rightEye", "leftEar", "rightEar"]}
const SKELETON_CONNECTIONS = [["leftShoulder", "rightShoulder"], ["leftShoulder", "leftElbow"], ["leftShoulder", "leftHip"],
                              ["rightShoulder", "rightElbow"], ["rightShoulder", "rightHip"], ["leftElbow", "leftWrist"], 
                              ["rightElbow", "rightWrist"], ["leftHip", "rightHip"], ["leftHip", "leftKnee"], 
                              ["rightHip", "rightKnee"], ["leftKnee", "leftAnkle"], ["rightKnee", "rightAnkle"]]

export {MIN_PART_CONFIDENCE, POSENET_CLEANED_PART_NAMES, SKELETON_CONNECTIONS, AVERAGED_PARTS}

//Exercise Estimation Constants
const MEASURE_ONLY_ON_PREDOMINANT_AXIS = false;
const BASE_POSE_CRITERIA = [[DecisionAidSystem.maximizeVisibleBodyParts, 0.2], [DecisionAidSystem.minimizeAveragePositionOnStdDirection, 0.8]];
const OBJECTIVE_POSE_CRITERIA = [[DecisionAidSystem.maximizeVisibleBodyParts, 0.2], [DecisionAidSystem.maximizeAveragePositionOnStdDirection, 0.8]];
export {MEASURE_ONLY_ON_PREDOMINANT_AXIS, BASE_POSE_CRITERIA, OBJECTIVE_POSE_CRITERIA};

//Others
const EPSILON = 0.0001;
const DATASET_PATH = 'data/tagged_poses'
export {EPSILON, DATASET_PATH};