import mongoose from "mongoose";

 const taskSchema =  mongoose.Schema({
    title : {
        type: String,
        required : true,
        minLenght : [2, "too short task name"]
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending'
    },
    time :{
        type: String,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    
    
}, {timeStamps : true})


export const taskModel = mongoose.model("Task", taskSchema)