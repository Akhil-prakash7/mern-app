import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { customErrorHandler } from "../utils/error.js";
import  Jwt  from "jsonwebtoken";

export const signup = async(req,res,next)=>{
  try {
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({username,email,password:hashedPassword})
    await newUser.save();
    res.status(201).json({
     message:'user created successfully',
     user:newUser
 })
 
    
  } catch (error) {
    next(error)
  }
}

export const signin = async (req,res,next)=>{
    try {
        const {email,password} = req.body;
        const validUser = await User.findOne({email});
        if(!validUser) return next(customErrorHandler(404,"user not found"))
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword) return next(customErrorHandler(401,"wrong password!"))
        const token = Jwt.sign({id:validUser._id},process.env.JWT_SECRETE,{expiresIn:'1d'});
    const {password:pass,...rest} = validUser._doc
    res.cookie('access_token',token,{httponly:true})
       .status(200)
       .json(rest)
        
        
    } catch (error) {
        next(error)
    }
}