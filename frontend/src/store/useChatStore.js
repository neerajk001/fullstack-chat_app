import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { userAuthSore } from "./userAuthStore";

// Add this at the very top of the file
const isValidUserId = (id) => {
  return id && /^[0-9a-fA-F]{24}$/.test(id);
};
export const useChatStore=create((set ,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,


    getUser:async()=>{
        set({isUserLoading:true});
        try{
            const res =await axiosInstance('/message/user');
            set({users:res.data})
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({isUserLoading:false})
        }
    },
    sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
     if (!selectedUser || !isValidUserId(selectedUser._id)) {
    toast.error("Please select a valid user to send the message");
    return;
  }
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

    getMessages:async(userId)=>{
        set({isMessagesLoading:true})
        try{
            const res = await axiosInstance.get(`/message/${userId}`)
            // console.log("messages",res)
            set({messages:res.data})
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({isMessagesLoading:false})
        }
    },

    subscribeToMessages:()=>{
        const {selectedUser} = get();
        if(!selectedUser || !selectedUser._id) return;
            const socket = userAuthSore.getState().socket;
            socket.on('newMessage',(newMessage)=>{
                // if(newMessage.sender._id !== selectedUser._id) return;
                set({
                    messages:[...get().messages, newMessage]
                })
            })
    },

    unsubscribeFromMessages:()=>{
       const socket = userAuthSore.getState().socket;
       socket.off('newMessage');
    },
    // optimise this later

    setSelectedUser: (selectedUser) => {
  // Add validation before setting
  if (selectedUser && isValidUserId(selectedUser._id)) {
    set({ selectedUser });
  } else {
    toast.error("Invalid user selected");
  }
},
}))