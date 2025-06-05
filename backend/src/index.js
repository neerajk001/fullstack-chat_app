import express from 'express';
import authRoutes from './routes/auth.route.js';
import mongoConnect from './lib/mongoConnect.js';
import messageRoutes from './routes/message.route.js';
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import path from 'path';

import { app,server } from './lib/socket.js';
dotenv.config();



const port  = 5001;
const __dirname = path.resolve();
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


server.listen(port,()=>{
    mongoConnect()
    console.log(`Server is running on http://localhost:${port}`);
    
})









