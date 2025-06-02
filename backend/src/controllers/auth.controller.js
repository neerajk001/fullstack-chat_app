import cloudinary from "../lib/cloudinary.js"
import { generteAndSetTokens } from "../lib/utils/generateTokensAndCookies.js"
import User from "../models/user.model.js"
import bcrypt, { genSalt } from 'bcryptjs'

export const  signup = async(req,res)=>{
   

  
   
   try{
     const {email,fullName,password}= req.body
  
   if(!email || !fullName || !password){
    return res.status(400).json({
        error:"All fields are required"
    })
   }
 

   if(password.length<6){
    return res.status(400).json({
        message:"password  must be six character or more"
    })
   }

   const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                error:"Invalid email format"
            })
        }

        const existingEmail = await User.findOne({
            email:email
        })

        if(existingEmail){
            return res.status(400).json({
                message:"email already exist"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(password ,salt)
        const newUser = new User({
    email,
    fullName,
    password:hashedPassword

})

if(newUser){
    generteAndSetTokens(newUser._id ,res)
    await newUser.save()
    res.status(201).json({
        _id:newUser._id,
        email:newUser.email,
        fullName:newUser.fullName
    })
}else{
    return res.status(500).json({
        error:"something went wrong"
    })
}

   }
    catch(error){
        console.log("error in signup",error)
        return res.status(500).json({
            message:"something went wrong in controller"
        })
   }



}



export const signin =async(req,res)=>{
    try{
        const {email ,password} = req.body
        console.log(email)
        if(!email || !password){
            console.log("all  fields are required")
        }

        const user = await User.findOne({
            email
        })
        console.log("user",user)
        const isPasswordCorrect = await bcrypt.compare(password ,user?.password || "")
        console.log( "ispassword",isPasswordCorrect)
        
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid password/email"})
        }
        generteAndSetTokens(user._id,res)

        res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            message:"login successfull"
        })
        

    }catch(error){
        console.log("error in login",error)
    }
}

export const logout =(req,res)=>{
    try{
        res.clearCookie("token");
    res.status(200).json({message:"loggedOut successfully"})
    }catch(error){
        console.log("error in logout AbortController",error)
        res.status(500).json({
            message:"Interval server error "
        })
    }
}


export const updatProfile =async(req ,res)=>{
   try{
     const {profilePic} =req.body;
    const userId = req.user._id
    if(!profilePic){
        return res.status(400).json({message:"profile pic is required"})
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(
        userId,
        {profilePic:uploadResponse.secure_url},
        {new:true}
            
    )
    res.status(200).json(updateUser)
   }catch(error){
    console.log("error in uploading profilePic",error)
    return res.status(500).json({message:"Internal server error"})
   }

}

export const checkAuth =async(req,res)=>{
    try{
        message:"you are authenticated"
        res.status(200).json(req.user)
    }catch(error){
        console.log("error in auth",error)
        res.status(500).json({message:"Internal server error"})
    }
}