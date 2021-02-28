import {INVERT_Y_AXIS, DRAWN_POINTS_RADIUS} from "../Model/Constants.js";

class PosePainter{
    constructor(webcamCanvas, exerciseStreamController){
        this.webcamCanvas = webcamCanvas;
        this.exerciseStreamController = exerciseStreamController;
    }
    
    drawPose(pose, invertYAxis = INVERT_Y_AXIS, pointsRadius = DRAWN_POINTS_RADIUS){
        //TODO: Improve it
        const width = this.webcamCanvas.width;
        const height = this.webcamCanvas.height;
        this.webcamCanvas.clearCanvas();
        for (const [part, position] of Object.entries(pose)){
            this.webcamCanvas.drawPoint(position.x*width, (invertYAxis-position.y)*height, pointsRadius, this.selectColorForPart(part));
        }
    }

    selectColorForPart(part){
        return "red"
    }
}
export{PosePainter};