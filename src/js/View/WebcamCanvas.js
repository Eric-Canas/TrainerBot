import {WEBCAM_CANVAS_ID} from "../Model/Constants.js";

class WebcamCanvas{
    constructor(webcamCanvasID=WEBCAM_CANVAS_ID){
        this.canvas = document.getElementById(webcamCanvasID);
        this.context = this.canvas.getContext('2d');
    }

    clearCanvas(width, height){
        this.context.clearRect(0, 0, width, height);
    }

    drawPoint(x, y, radius, color){
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.fillStyle = color;
        this.context.fill();
    }

    drawSegment([ax, ay], [bx, by], color, lineWidth) {
        this.context.beginPath();
        this.context.moveTo(ax, ay);
        this.context.lineTo(bx, by);
        this.context.lineWidth = lineWidth;
        this.context.strokeStyle = color;
        this.context.stroke();
    }
}

export {WebcamCanvas}