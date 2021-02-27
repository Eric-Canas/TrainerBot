import {DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT} from "./Constants.js";
class WebcamCanvas{
    constructor(){
        this.videoStream = document.getElementById('webcamFrame');
        if (navigator.mediaDevices.getUserMedia) {
            this.webcamPromise = navigator.mediaDevices.getUserMedia({ video: true });
            this.webcamPromise.then(stream => this.videoStream.srcObject = stream)
                              .catch(error => this.noWebcamAccessError(error));
        } else {
            this.webcamPromise = null;
        }
    }
    
    noWebcamAccessError(error){
        this.webcamPromise = null;
        this.videoStream.srcObject = null;
        alert("Impossible to access to the camera :(");
    }
}
export {WebcamCanvas};