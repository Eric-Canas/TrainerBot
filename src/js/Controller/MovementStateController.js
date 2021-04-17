import {MAX_FREQUENCY_IN_FRAMES, POSENET_CLEANED_PART_NAMES, META_INFORMATION_WINDOW,
        MEASURE_ONLY_ON_PREDOMINANT_AXIS, MILISECONDS_BETWEEN_CONSISTENCY_UPDATES, 
        COUNT_STD_FROM_PERCENTILE, BASE_POSE_CRITERIA, OBJECTIVE_POSE_CRITERIA} from "../Model/Constants.js";
import {DecisionAidSystem} from '../Helpers/DecisionAidSystem.js'
import {mapValue} from '../Helpers/Utils.js'

class MovementStateController{
    constructor(sessionHistory, onStateUpdatedCallbacks = [], checkStdInterval = MILISECONDS_BETWEEN_CONSISTENCY_UPDATES){
        this.basePose = null;
        this.objectivePose = null;
        this.maxQueueLength = MAX_FREQUENCY_IN_FRAMES;
        this.distancesQueue = [];
        this.posesQueue = [];
        this.onStateUpdatedCallbacks = onStateUpdatedCallbacks;
        this.sessionHistory = sessionHistory;
        this.std = [];
        this.normStd = [];
        this.basePoseDecisionSystem = new DecisionAidSystem(BASE_POSE_CRITERIA);
        this.objectivePoseDecisionSystem = new DecisionAidSystem(OBJECTIVE_POSE_CRITERIA);
        
        this.stdprocessID = setInterval(() => this.updateStateParameters.call(this), checkStdInterval)

    }

    /*Pushes a pose in the buffer and calls all the callbacks*/
    updateState(pose){
        this.posesQueue.push(pose);
        if (this.basePose == null){
            this.basePose = this.posesQueue[this.posesQueue.length - 1];
            this.updateStateParameters()
        }
        this.distancesQueue.push(this.distanceToObjectivePose(pose));
        // Maintain it as a finite size queue
        if (this.posesQueue.length > this.maxQueueLength) {
            this.posesQueue.shift();
            this.distancesQueue.shift();
        }
        for (const callback of this.onStateUpdatedCallbacks){
            callback(this.distancesQueue);
        }
        if (pose !== null && this.basePose !== null && this.objectivePose !== null && this.std[this.std.length-1] !== null
            && this.normStd[this.normStd.length-1]){
            let historyEntry = {pose : pose, basePose : this.basePose, objectivePose : this.objectivePose, std : this.std[this.std.length-1],
                                normStd : this.normStd[this.normStd.length-1]};
            this.sessionHistory.push(historyEntry);
        }
    }

    /*Calculates the distance between the pose Map and a base pose.*/
    distanceToObjectivePose(pose, useOnlyPredominantAxis = MEASURE_ONLY_ON_PREDOMINANT_AXIS){
        //pose = this.objectivePose;
        const commonVisibleParts = Object.keys(pose).filter(key => Object.keys(this.basePose).includes(key) && Object.keys(this.objectivePose).includes(key));
        //we do not want to calculate a distance since we must avoid to loss the sign.
        
        const std = this.std[this.std.length-1];
        let difference = 0;
        let totalStd = 0;
        if(useOnlyPredominantAxis){
            for (const part of commonVisibleParts){
                const [predominantAxis, std] = std[part].x > std[part].y? ['x', std[part].x] : ['y', std[part].y];
                const min = Math.min(this.basePose[part][predominantAxis], this.objectivePose[part][predominantAxis]);
                const max = Math.max(this.basePose[part][predominantAxis], this.objectivePose[part][predominantAxis]);
                const partPos= pose[part][predominantAxis];
               
                difference +=  mapValue(partPos, min, max, 0, std);
                totalStd += std;
            }
        } else {
            for (const part of commonVisibleParts){
                const minX = Math.min(this.basePose[part].x, this.objectivePose[part].x);
                const maxX = Math.max(this.basePose[part].x, this.objectivePose[part].x);
                const minY = Math.min(this.basePose[part].y, this.objectivePose[part].y);
                const maxY = Math.max(this.basePose[part].y, this.objectivePose[part].y);

                difference +=  mapValue(pose[part].x, minX, maxX, 0, std[part].x) + mapValue(pose[part].y, minY, maxY, 0, std[part].y);
                totalStd += std[part].x + std[part].y;
            }
        }
    return difference/totalStd;
        
    }

    async updateStateParameters(){
        if (this.basePose !== null){
            this.updateStd();
            if (this.std.length > 0)
            this.optimizeBaseAndObjectivePose();
        }
    }
    
    optimizeBaseAndObjectivePose(){
         //TODO: The best pose is those where the part of the body with more standard deviation is at the lower point. 
        //And preferrably if we are updating during the same exercise, the one closer to the original. It also should have the more body parts visible.
        const basePose = this.basePoseDecisionSystem.decide(this.posesQueue, [this.normStd[this.normStd.length-1]])
        if (basePose !== null){
            this.basePose = basePose;
        }
        const objectivePose = this.objectivePoseDecisionSystem.decide(this.posesQueue, [this.normStd[this.normStd.length-1]])
        if (objectivePose !== null){
            this.objectivePose = objectivePose;
        }

    }
    
    updateStd(startAtPercentile = COUNT_STD_FROM_PERCENTILE){
        let xStd = {};
        let yStd = {};
        let std = {};
        let normStd = {};
        const poseQueueToUse = this.posesQueue.slice(~~(this.posesQueue.length*startAtPercentile));
        for (const part of POSENET_CLEANED_PART_NAMES){
            xStd[part] = [];
            yStd[part] = [];
        }

        for (const pose of poseQueueToUse){
            for (const [part, position] of Object.entries(pose)){
                xStd[part].push(position.x);
                yStd[part].push(position.y);
            }
        }
        
        for(const part of Object.keys(xStd)){
            std[part] = {x : xStd[part].length > 0 ? math.std(xStd[part]) : 0,
                         y : yStd[part].length > 0 ? math.std(yStd[part]) : 0};
            const stdSum = math.sum(std[part].x, std[part].y)
            normStd[part] = {x : stdSum > 0? (std[part].x)/stdSum : 0.5, 
                             y : stdSum > 0? (std[part].y)/stdSum : 0.5}
            
        }

        this.std.push(std);
        this.normStd.push(normStd);
        if (this.std.length > META_INFORMATION_WINDOW){
            this.std.shift();
            this.normStd.shift();
        }
    }

    

}

export {MovementStateController};