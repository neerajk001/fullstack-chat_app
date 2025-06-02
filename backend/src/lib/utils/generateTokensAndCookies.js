import jwt from 'jsonwebtoken'

export const generteAndSetTokens =async(userId ,res)=>{
    const token  = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })

    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !=="development",
        maxAge:1000*60*60*24*15, //15 days
        sameSite:"strict" 
    })
}