class SessionHistory{
    constructor(){
        this.poses = [];
    }
    
    push(element){
        this.poses.push(element);
    }
}
export {SessionHistory};