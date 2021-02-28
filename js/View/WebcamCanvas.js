import {DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT} from "../Model/Constants.js";
class WebcamCanvas{
    constructor(){
        this.videoStream = document.getElementById('webcamFrame');
        this.webcamCanvas = document.getElementById('webcamCanvas').getContext('2d');
        if (navigator.mediaDevices.getUserMedia) {
            this.webcamPromise = navigator.mediaDevices.getUserMedia({ video: true });
            this.webcamPromise.then(stream => this.videoStream.srcObject = stream)
                              .catch(error => this.noWebcamAccessError(error));
        
        this.width = 1;
        this.height = 1;
        this.videoStream.addEventListener('loadedmetadata', this.updateVideoParameters.bind(this), false);
        } else {
            this.webcamPromise = null;
        }
    }
    
    noWebcamAccessError(error){
        this.webcamPromise = null;
        this.videoStream.srcObject = null;
        alert("Impossible to access to the camera :(");
    }

    updateVideoParameters(){
        this.width = this.videoStream.videoWidth;
        this.height = this.videoStream.videoHeight;
    }
    clearCanvas(){
        this.webcamCanvas.clearRect(0, 0, this.width, this.height);
    }
    drawPoint(x, y, radius, color){
        this.webcamCanvas.beginPath();
        this.webcamCanvas.arc(x, y, radius, 0, 2 * Math.PI);
        this.webcamCanvas.fillStyle = color;
        this.webcamCanvas.fill();
    }

    drawSegment([ay, ax], [by, bx], color, scale) {
        
        this.videoStream.beginPath();
        this.videoStream.moveTo(ax * scale, ay * scale);
        this.videoStream.lineTo(bx * scale, by * scale);
        this.videoStream.lineWidth = lineWidth;
        this.videoStream.strokeStyle = color;
        this.videoStream.stroke();
    }
}
export {WebcamCanvas};