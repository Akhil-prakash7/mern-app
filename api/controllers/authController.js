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

export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRETE);
        const { password: pass, ...rest } = user._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-4),
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.photo,
        });
        await newUser.save();
        const token = Jwt.sign({ id: newUser._id }, process.env.JWT_SECRETE);
        const { password: pass, ...rest } = newUser._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };

  export const signOut = async (req,res,next)=>{
    try {
      res.clearCookie('access_token');
      res.status(200).json({message:'signout successfull'})
      
    } catch (error) {
      next(error)
    }
  }