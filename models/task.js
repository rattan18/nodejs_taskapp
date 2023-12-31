import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true,
    },
    isCompleted : {
        type : Boolean,
        default : false
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    createdOn : {
        type : Date,
        default : Date.now
    }
});

export const Task = new mongoose.model("Task", schema);