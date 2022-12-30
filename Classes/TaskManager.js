import Task from "./Task.js";

export default class TaskManager{
    constructor(){
    this.taskArr=[];
}

    addTask(desc){
        this.taskArr.push(desc);
    }

    deleteTask(id){
        this.taskArr= this.taskArr.filter((change)=> change.id != id);
    }

    updateTaskDescription(id, newDesc){
    // let findChange= this.taskArr.find((change)=> change.id==id);
    // לעבור על כל האיברים של המערך
    for(let task of this.taskArr){
        // לבדוק את האיידי שלהם
        if(task.id == id){
    // שינו תיאור המשימה
    task.description = newDesc;
    break;
        }
    }
    }
    completeTask(id){
        for(let task of this.taskArr){
            if(task.id == id){
            task.complete=true;
            break;
            }
        }}
    }
