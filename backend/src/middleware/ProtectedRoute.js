import User from "../models/user.model.js";
import jwt, { decode } from 'jsonwebtoken'


export const protectedRoutes=async(req,res,next)=>{
    try{
        const token = req.cookies.token
        console.log("token",token)
        if(!token){
            return res.status(401).json({message:"you need to login first"})
        }
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            if(!decoded){
                return res.status(400).json({message:"Invalid token"})
            }
        const user = await User.findById(decoded.userId).select(-"password")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        req.user =user;
        next();

    }catch(error){
        console.log("error in protectedRoutes",error)
        return res.status(500).json({message:"Internal server error"})
    }
}
