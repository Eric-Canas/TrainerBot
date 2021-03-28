import {TAG_LAPSE_ID} from '../../Model/Constants.js'
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
        for(const poseInfo of this.historyToTag.poses){
            await new Promise(resolve => setTimeout(resolve, 1000/this.fps));
            this.posePainter.drawPose(poseInfo.pose, poseInfo.normXStd, poseInfo.normYStd, false);
            if(this.requireTag){
                this.tagTemporalInfo();
                this.requireTag = false;
            }
            this.temporalTags.push(poseInfo);
        }

        console.log(this.posesTagged)
    }


    tagTemporalInfo(){
        const tag = prompt("To which exercise these poses correspond?", 'None');
        this.posesTagged.push({tag : tag, poses : this.temporalTags})
        this.temporalTags = [];
        
    }

    tagLastSet(){
        this.requireTag = true;
    }




}
export {DataTagging};