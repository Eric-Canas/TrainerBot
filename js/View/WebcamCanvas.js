import {WEBCAM_CANVAS_ID} from "../Model/Constants.js";

class WebcamCanvas{
    constructor(webcamCanvasID=WEBCAM_CANVAS_ID){
        this.webcamCanvas = document.getElementById(webcamCanvasID).getContext('2d');
    }

    clearCanvas(width, height){
        this.webcamCanvas.clearRect(0, 0, width, height);
    }

    drawPoint(x, y, radius, color){
        this.webcamCanvas.beginPath();
        this.webcamCanvas.arc(x, y, radius, 0, 2 * Math.PI);
        this.webcamCanvas.fillStyle = color;
        this.webcamCanvas.fill();
    }

    drawSegment([ax, ay], [bx, by], color, lineWidth) {
        this.webcamCanvas.beginPath();
        this.webcamCanvas.moveTo(ax, ay);
        this.webcamCanvas.lineTo(bx, by);
        this.webcamCanvas.lineWidth = lineWidth;
        this.webcamCanvas.strokeStyle = color;
        this.webcamCanvas.stroke();
    }
}

export {WebcamCanvas}