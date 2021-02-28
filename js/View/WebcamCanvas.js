/**
 * Copyright (c) 2021
 *
 * Summary. Controls the webcam and the canvas that works over it.
 * Description. Controls the webcam and the canvas that works over it. It allows not only
 *              to access to the videoStream and its information (width, height, framerate...),
 *              but also to draw over it.
 * 
 * @author Eric Cañas <elcorreodeharu@gmail.com>
 * @file   This file defines the WebcamCanvas class.
 * @since  0.0.1
 */
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
        alert(`Impossible to access to the camera :( --> ${error}`);
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

    drawSegment([ax, ay], [bx, by], color, lineWidth) {
        this.webcamCanvas.beginPath();
        this.webcamCanvas.moveTo(ax, ay);
        this.webcamCanvas.lineTo(bx, by);
        this.webcamCanvas.lineWidth = lineWidth;
        this.webcamCanvas.strokeStyle = color;
        this.webcamCanvas.stroke();
    }
}
export {WebcamCanvas};