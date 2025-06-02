import { text } from "express";
import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId, //
        ref:"User", // Reference to the User model
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref:"User",
        required:true
    },
    text    :{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
},{timestamps:true})

const Message = mongoose.model("Message",messageSchema);

export default Message;

