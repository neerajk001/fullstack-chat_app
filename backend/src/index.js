import express from 'express';
import authRoutes from './routes/auth.route.js';
import mongoConnect from './lib/mongoConnect.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
dotenv.config();


const app = express();
const port  = 5001;
app.use(cookieParser())
app.use(express.json())



app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)




app.listen(port,()=>{
    mongoConnect()
    console.log(`Server is running on http://localhost:${port}`);
    
})









