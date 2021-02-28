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

// Frequency constants
const MAX_FREQUENCY_IN_FRAMES = 250;
const MAX_FREQ_RANGE = [...Array(MAX_FREQUENCY_IN_FRAMES).keys()];
export {MAX_FREQUENCY_IN_FRAMES, MAX_FREQ_RANGE};


// Chart constants
const CHART_LINE_COLOR = 'rgba(255, 99, 132, 1)';
const CHART_BACKGROUND_COLOR = 'rgba(255, 99, 132, 0.2)';
const CHART_LABEL = 'Frequency';
const INVERT_Y_AXIS = true;
export {CHART_LINE_COLOR, CHART_BACKGROUND_COLOR, CHART_LABEL, INVERT_Y_AXIS};


//Video Canvas constants
const DEFAULT_CANVAS_HEIGHT = 480;
const DEFAULT_CANVAS_WIDTH = 600;
const DRAWN_POINTS_RADIUS = 6;
export {DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, DRAWN_POINTS_RADIUS};


//PoseNet constants
const MIN_PART_CONFIDENCE = 0.4;
export {MIN_PART_CONFIDENCE}