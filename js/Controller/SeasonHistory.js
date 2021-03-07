class SeasonHistory{
    constructor(onUpdateCallbacks = [], exercisesPerformed = ['Dummy'], repetitionsPerformed = [0]){
        this.onUpdateCallbacks = onUpdateCallbacks;
        this.exercisesPerformed = exercisesPerformed;
        this.repetitionsPerformed = repetitionsPerformed;
    }

    addRepetition(){
        this.repetitionsPerformed[this.repetitionsPerformed.length-1]++;
        for (const callback of this.onUpdateCallbacks){
            callback(this.exercisesPerformed[this.exercisesPerformed.length-1], this.repetitionsPerformed[this.repetitionsPerformed.length-1]);
        }
    }
    
    changeExercise(newExercise){
        this.exercisesPerformed.push(newExercise);
        this.repetitionsPerformed.push(0);
        for (const callback of this.onUpdateCallbacks){
            callback(this.exercisesPerformed[this.exercisesPerformed.length-1], this.repetitionsPerformed[this.repetitionsPerformed.length-1]);
        }
    }


}