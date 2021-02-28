import {INVERT_Y_AXIS, DRAWN_POINTS_RADIUS, SKELETON_CONNECTIONS} from "../Model/Constants.js";

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
        this.drawSkeleton(pose, invertYAxis);
    }

    drawSkeleton(pose, invertYAxis = INVERT_Y_AXIS){
        const width = this.webcamCanvas.width;
        const height = this.webcamCanvas.height;
        const detectedParts = Object.keys(pose);
        for (const part of detectedParts){
            for (const connection of SKELETON_CONNECTIONS){
                if ((part === connection[0]) && (detectedParts.includes(connection[1]))){
                    const p1X = pose[part].x*width;
                    const p1Y = (invertYAxis-pose[part].y)*height;
                    const p2X = pose[connection[1]].x*width;
                    const p2Y = (invertYAxis-pose[connection[1]].y)*height;
                    this.webcamCanvas.drawSegment([p1X, p1Y], [p2X, p2Y], "white", DRAWN_POINTS_RADIUS/2)
                }
            }
        }
    }

    selectColorForPart(part){
    const xStd = this.exerciseStreamController.xStd[this.exerciseStreamController.xStd.length-1][part];
    const yStd = this.exerciseStreamController.yStd[this.exerciseStreamController.yStd.length-1][part];
    //const i = 128 - (((xStd + yStd)/2) * 128 / (0.5));
    //return 'hsl(' + i + ',100%,50%)';
    const i = (((xStd + yStd)/2) * 255 / 0.5);
    const r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
    const g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
    const b = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}
export{PosePainter};