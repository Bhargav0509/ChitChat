import User from "../models/user.js"
import jwt from "jsonwebtoken"


export const protectRoute = async (req , res , next) =>{

    try{
        const token = req.headers.token

        if (!token) {
            return res.json({ success: false, message: 'Not authorized, please login' })
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId).select('-password')

        if(!user)
            return res.json({success : false , message : 'User not found'})

        req.user = user

        next();
    }
    catch(err){
        console.log(err.message)
        res.json({success : false , message : 'Not authorized , token failed'})
    }
}