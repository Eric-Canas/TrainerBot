
// Frequency constants
const MAX_FREQUENCY_IN_FRAMES = 250;
const MAX_FREQ_RANGE = [...Array(MAX_FREQUENCY_IN_FRAMES).keys()];
export {MAX_FREQUENCY_IN_FRAMES, MAX_FREQ_RANGE};


// Chart constants
const CHART_LINE_COLOR = 'rgba(255, 99, 132, 1)';
const CHART_BACKGROUND_COLOR = 'rgba(255, 99, 132, 0.2)';
const CHART_LABEL = 'Frequency';
export {CHART_LINE_COLOR, CHART_BACKGROUND_COLOR, CHART_LABEL};


//Video Canvas constants
const DEFAULT_CANVAS_HEIGHT = 480;
const DEFAULT_CANVAS_WIDTH = 600;
export {DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH};


//PoseNet constants
const MIN_PART_CONFIDENCE = 0.4;
export {MIN_PART_CONFIDENCE}