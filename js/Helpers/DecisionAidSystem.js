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

    decide(candidatePoses){
        let scores = [];
        // Extract the N scores arrays
        for (const [criteria, args] of this.criterias){
            scores.push(criteria(candidatePoses, ...args));
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

    // ----------------- All available static criterias -----------------
    static maximizeVisibleBodyParts(candidatePoses, weight = 1){
        const maxParts = POSENET_CLEANED_PART_NAMES.length;
        return candidatePoses.map(pose => (Object.keys(pose).length / maxParts)*weight);
    }

    static minimizeAverageYPosition(candidatePoses, weight = 1){
        let scores = [];
        for (const pose of candidatePoses){
            let avg = 0;
            for (const position of Object.values(pose)){
                avg += position.y;
            }
            scores.push(1-(avg/Object.keys(pose).length));
        }
        return scores;
    }
}

export {DecisionAidSystem};