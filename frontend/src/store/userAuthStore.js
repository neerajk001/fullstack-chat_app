import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { data } from "react-router-dom";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useEffect } from "react";
// import { LogOut } from "lucide-react";


const SOCKET_URL = "http://localhost:5001"; // Update with your server URL

export const userAuthSore = create((set,get)=>({    
    authUser: null,
    isSigningIn: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isAuthenticated: true,
    onlineUsers:[],
    socket: null,


   
  checkAuth: async()=>{
    try{
        const res = await axiosInstance.get('/auth/check')
        set({authUser:res.data})
        get().connectSocket()
    }catch(error){
        set({authUser:null})
        console.log("error in authenticating the user",error)
    }finally{
        set({isAuthenticated:false})
    }
  },

  signup: async(data)=>{
    console.log("signing called with",data)
    set({isSigningIn:true})
    try{
      const res = await axiosInstance.post('/auth/signup',data)
      set({authUser:res.data})
      toast.success("aacount created successfully")
      get().connectSocket()
    }catch(error){
      toast.error(error.res.data.message)
    }
    finally{
      set({isSigningIn:false})
    }

  },

  logout: async()=>{
    try{
      await axiosInstance.post("/auth/logout")
      set({authUser:null})
      toast.success("logout successfully")
      get().disconnectSocket()
      set({ authUser: null, onlineUsers: [] });
      
    }catch(error){
      toast.error(error.response.data.message)
    }
  },
  login: async(data)=>{
    set({isSigningIn:true})
    try{
    const res =  await axiosInstance.post("/auth/signin",data)
    set({authUser:res.data})
    toast.success("login successfully")
    get().connectSocket()

    }catch(error){
      toast.error("error while login",error)

    }finally{
      set({isLoggingIn:false})
    }
  },
  updateProfile: async(data)=>{
    set({isUpdatingProfile:true})
    try{
      const res = await axiosInstance.put('/auth/update-profile',data)
      set({authUser:res.data})
      toast.success("profile updated successfully")
    }catch(error){
        toast.error("error in updating a profile",error)

    }finally{
      set({isUpdatingProfile:false})
    }
  },
  connectSocket:async()=>{
    const {authUser}= get()
    if(!authUser || get().socket?.connected) return;
    const socket = io(SOCKET_URL,{
      query: {
        userId: authUser._id // Assuming userId is sent as a query parameter
      },
      transports: ['websocket'], // Use WebSocket transport
      reconnectionAttempts: 5, // Optional: number of reconnection attempts
      reconnectionDelay: 1000, // Optional: delay between reconnection attempts
    })
    socket.connect();
    set({socket: socket});

    socket.on('userConnected', (users) => {
      // console.log("connected users",users)    
      set({onlineUsers: users});
   
    },
    );
    
},
  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
