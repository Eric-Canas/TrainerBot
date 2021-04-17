import {TAG_LAPSE_ID, POSENET_CLEANED_PART_NAMES} from '../../Model/Constants.js'
import {saveCSV} from '../../Helpers/Utils.js'
class DataTagging{
    constructor(historyToTag, posePainter, lapseButton = TAG_LAPSE_ID, fps = 24*2){
       this.historyToTag = historyToTag;
       this.posePainter = posePainter;
       this.lapseButton = document.getElementById(lapseButton);
       this.lapseButton.addEventListener('click', this.tagLastSet.bind(this), false);
       this.fps = fps
       this.requireTag = false;
       this.posesTagged = [];
       this.temporalTags = [];
    }
    // THIS WHOLE SHIT IS FOR RAPID DEBUGGING. IN RELEASE IT SHOULD BE COMPLETELY CHANGED FOR IMPROVING USER EXPERIENCE.
    // (helping with this tagging could be rewarded with beta functions availability or ads avoidance)
    async startTagging(){
        let tagIt = true;
        while (this.posesTagged.length == 0 && tagIt){
            for(const poseInfo of this.historyToTag.poses){
                await new Promise(resolve => setTimeout(resolve, 1000/this.fps));
                this.posePainter.drawPose(poseInfo.pose, poseInfo.normStd, false);
                if(this.requireTag){
                    this.tagTemporalInfo();
                    this.requireTag = false;
                }
                this.temporalTags.push(poseInfo);
            }

            console.log(this.posesTagged)
            if (this.posesTagged.length == 0){
                if(window.confirm('Nothing Tagged. RepeatTagging?')){
                    this.posesTagged = [];
                    this.temporalTags = [];
                } else{
                    tagIt = false;
                }
            } else {
                if (window.confirm('Is it correctly tagged?')){
                    saveCSV(this.posesTagged)
                } else {
                    if(window.confirm('Repeat Tagging?')){
                        this.posesTagged = [];
                        this.temporalTags = [];
                    } else{
                        tagIt = false;
                    }
                }
            }
        }
    }


    tagTemporalInfo(){
        const tag = prompt("To which exercise these poses correspond? (Don't tag for discarding)", "");
        console.log(tag);
        if (tag !== ""){
            const posesAsCSV = this.posesToCSV(this.temporalTags, tag)
            //concat doesn't work? 
            for (const pose of posesAsCSV){
                this.posesTagged.push(pose);
            }
        }
        this.temporalTags = [];
        
    }

    posesToCSV(solvedPosesList, tag, missingValue = '?', decimal_precision = 5){
        decimal_precision = Math.pow(10, decimal_precision);
        let result = [];
        for (const poseInfo of solvedPosesList){
            let currentPoseCSV = []
            for (const [key, positions] of Object.entries(poseInfo)){
                const availablePartsOfBody = Object.keys(positions);
                for (const partOfBody of POSENET_CLEANED_PART_NAMES){
                    if (availablePartsOfBody.includes(partOfBody)){                        
                        for(const dim of ['x', 'y']){
                            const valueAsStr = (Math.round(positions[partOfBody][dim]*decimal_precision)/decimal_precision).toString();
                            currentPoseCSV.push(valueAsStr);
                        }
                    } else {
                        currentPoseCSV.push(missingValue)
                        currentPoseCSV.push(missingValue)
                    }
                }
            }
            currentPoseCSV.push(tag)
            result.push(currentPoseCSV)
        }
        return result;
    }

    tagLastSet(){
        this.requireTag = true;
    }




}
export {DataTagging};