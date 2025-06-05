import express from 'express';
import authRoutes from './routes/auth.route.js';
import mongoConnect from './lib/mongoConnect.js';
import messageRoutes from './routes/message.route.js';
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

import { app,server } from './lib/socket.js';
dotenv.config();



const port  = 5001;
app.use(cookieParser())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
}))



app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)




server.listen(port,()=>{
    mongoConnect()
    console.log(`Server is running on http://localhost:${port}`);
    
})









