
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from '../lib/cloudinary.js'
import { getReceiverSocketId,io } from '../lib/socket.js';

export const getUserForSidebar = async (req, res) => {
    try{
        const loggedInUser =req.user._id;
        const filteredUser = await User.find({_id:{$ne:loggedInUser}}).select("-password")
        res.status(200).json(filteredUser)
    }catch(error){
        console.log("error in getUserForSidebar", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const getMessages =async(req,res)=>{
    try{
          const { id: userToChatId } = req.params;
    const myId = req.user._id;
    
    // Add this additional check
    if (!mongoose.Types.ObjectId.isValid(userToChatId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        res.status(200).json(messages);
    }catch(error){
         console.log("error in getmessages", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const sendMessages = async (req, res) => {
    try{
        const {text,image} = req.body;
        const {id:receiverId}=req.params;
        const senderId = req.user._id;
        let imageUrl ;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        });
       await newMessage. save();
        res.status(201).json(newMessage);

        // realtime message sending logic can be added here through socket.io or any other real-time communication library
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }


    }catch(error){
        console.log("error in sendMessages", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}