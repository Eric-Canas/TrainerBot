/**
 * Copyright (c) 2021
 *
 * Summary. Decision Aid System that helps to decide which is the best pose within an array,
 *          based in given composed criteria.
 * Description. This system defines a basic approach that aims to be simple and efficient.
 *              In futures interations it could be changed by a more complex and robust
 *              system like ELECTRE TRI.
 * 
 * @author Eric Cañas <elcorreodeharu@gmail.com>
 * @file   This file defines the DecisionAidSystem class.
 * @since  0.0.1
 */

import {POSENET_CLEANED_PART_NAMES} from "../Model/Constants.js";

class DecisionAidSystem{
    /**
     * 
     * @param {Array} criterias. Array of [callback, args]
     */
    constructor(criterias){
        this.criterias = criterias;
    }

    decide(candidatePoses, additionalArgs = []){
        let scores = [];
        // Extract the N scores arrays
        for (const [criteria, weight] of this.criterias){
            scores.push(criteria(candidatePoses, weight, ...additionalArgs));
        }
        // Sum them up
        if (scores.length > 0){
            let finalScore = scores[0];
            for (const arr of scores.slice(1)){
                for (let i = 0; i < arr.length; i++){
                    finalScore[i] += arr[i];
                }
            }
            // Find the pose with best punctuation 
            //TODO: (Maybe its better to create a histogram of scores and then to find the most common pose in the lower representative bin)
            let bestPose = null;
            let bestScore = -1;
            for (let i=0; i<finalScore.length; i++){
                if (finalScore[i] >= bestScore){
                    bestScore = finalScore[i];
                    bestPose = candidatePoses[i];
                }
            }
            return bestPose;
            
        } else {
            return null
        }
    }

    // ----------------- All available criterias -----------------

    static maximizeVisibleBodyParts(candidatePoses, weight = 1){
        const maxParts = POSENET_CLEANED_PART_NAMES.length;
        return candidatePoses.map(pose => (Object.keys(pose).length / maxParts)*weight);
    }

    static minimizeAveragePositionOnStdDirection(candidatePoses, weight = 1, normXStd, normYStd){
        return DecisionAidSystem.optimizeAveragePositionOnStdDirection(candidatePoses, weight, normXStd, normYStd, true)
    }

    static maximizeAveragePositionOnStdDirection(candidatePoses, weight = 1, normXStd, normYStd){
        return DecisionAidSystem.optimizeAveragePositionOnStdDirection(candidatePoses, weight, normXStd, normYStd, false);
    }

    static optimizeAveragePositionOnStdDirection(candidatePoses, weight = 1, normXStd, normYStd, minimize){
        let scores = [];
        // If false it is 0, so max score will be at position {x:1, y:1}, if true it is 1, so it will be the complementary ({x:0, y:0})
        for (const pose of candidatePoses){
            let avg = 0;
            for (const [part, position] of Object.entries(pose)){
                avg += position.x*normXStd[part] + position.y*normYStd[part];
            }
            if (minimize){
                scores.push(1- (avg/Object.keys(pose).length));
            } else {
                scores.push((avg/Object.keys(pose).length));
            }
            
        }
        return scores;
    }
}

export {DecisionAidSystem};