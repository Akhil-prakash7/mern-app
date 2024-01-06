import User from "../models/userModel.js"
import { customErrorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test = async(req,res)=>{
    res.json({message:'hellow world'})
}


export const updateUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(customErrorHandler(401,'not authorized'));
    const {username,email,avatar} = req.body
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }
        const UpdatedUser = await User.findByIdAndUpdate(req.params.id,{$set:{username,email,password:req.body.password,avatar}},{new:true})
        const {password,...rest} = UpdatedUser._doc;
        res.status(200).json({success:true,
        message:'user updated successfully',
        user:rest})
    } catch (error) {
        next(error)
    }

}

