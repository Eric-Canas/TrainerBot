import {INVERT_Y_AXIS, DRAWN_POINTS_RADIUS, SKELETON_CONNECTIONS, 
        SHOW_STD_DIRECTION, POINTS_TO_LINE_THRESHOLD, PLOT_BASE_POSE,
        TRANSPARENT_RED, TRANSPARENT_WHITE, TRANSPARENT_BLUE} from "../Model/Constants.js";

class PosePainter{
    constructor(webcamCanvas, movementStateController){
        this.webcamCanvas = webcamCanvas;
        this.movementStateController = movementStateController;
    }
    
    drawPose(pose, std=null, plotBaseAndObjectivePose = PLOT_BASE_POSE, invertYAxis = INVERT_Y_AXIS, pointsRadius = DRAWN_POINTS_RADIUS, showStdDirection = SHOW_STD_DIRECTION, pointToLineThreshold = POINTS_TO_LINE_THRESHOLD){
        //TODO: Improve it
        const width = this.webcamCanvas.canvas.width;
        const height = this.webcamCanvas.canvas.height;
        this.webcamCanvas.clearCanvas(width, height);
        if (showStdDirection){
            for (const [part, position] of Object.entries(pose)){
                let basePositionX =  position.x*width
                let basePositionY = (invertYAxis-position.y)*height
                if (std===null){
                    std = this.movementStateController.std[this.movementStateController.std.length-1][part];
                }
                if ((std.x > pointToLineThreshold) || (std.y > pointToLineThreshold)){
                    let xStd = null;
                    let yStd = null;
                    [xStd, yStd] = [(std.x/(Math.max(std.x, std.y)+0.0001))*pointsRadius*2, (std.y/(Math.max(std.x, std.y)+0.0001))*pointsRadius*2]
                    this.webcamCanvas.drawSegment([basePositionX-xStd, basePositionY-yStd], [basePositionX+xStd, basePositionY+yStd], this.selectColorForPart(part), pointsRadius);
                } else {
                    this.webcamCanvas.drawPoint(basePositionX, basePositionY, pointsRadius, this.selectColorForPart(part));
                }
            }
        } else {
            for (const [part, position] of Object.entries(pose)){
                this.webcamCanvas.drawPoint(position.x*width, (invertYAxis-position.y)*height, pointsRadius, TRANSPARENT_RED);
            }
        }
        this.drawSkeleton(pose, invertYAxis);
        
        if(plotBaseAndObjectivePose && this.movementStateController.basePose !== null){
            for (const [part, position] of Object.entries(this.movementStateController.basePose)){
                this.webcamCanvas.drawPoint(position.x*width, (invertYAxis-position.y)*height, pointsRadius, TRANSPARENT_RED);
            }
            this.drawSkeleton(this.movementStateController.basePose, invertYAxis, TRANSPARENT_WHITE);
        }
        
        if(plotBaseAndObjectivePose && this.movementStateController.objectivePose !== null){
            for (const [part, position] of Object.entries(this.movementStateController.objectivePose)){
                this.webcamCanvas.drawPoint(position.x*width, (invertYAxis-position.y)*height, pointsRadius, TRANSPARENT_BLUE);
            }
            this.drawSkeleton(this.movementStateController.objectivePose, invertYAxis, TRANSPARENT_WHITE);
        }
    }

    drawSkeleton(pose, invertYAxis = INVERT_Y_AXIS, color = "white"){
        const width = this.webcamCanvas.canvas.width;
        const height = this.webcamCanvas.canvas.height;
        const detectedParts = Object.keys(pose);
        for (const part of detectedParts){
            for (const connection of SKELETON_CONNECTIONS){
                if ((part === connection[0]) && (detectedParts.includes(connection[1]))){
                    const p1X = pose[part].x*width;
                    const p1Y = (invertYAxis-pose[part].y)*height;
                    const p2X = pose[connection[1]].x*width;
                    const p2Y = (invertYAxis-pose[connection[1]].y)*height;
                    this.webcamCanvas.drawSegment([p1X, p1Y], [p2X, p2Y], color, DRAWN_POINTS_RADIUS/2);
                }
            }
        }
    }

    selectColorForPart(part){
    const std = this.movementStateController.std[this.movementStateController.std.length-1][part];
    const i = (((std.x + std.y)/2) * 255 / 0.5);
    const r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
    const g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
    const b = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
    /* //Version for going from green to red
    const i = 128 - (((std.x + std.y)/2) * 128 / (0.5));
    return 'hsl(' + i + ',100%,50%)';
    */
    }
}
export{PosePainter};