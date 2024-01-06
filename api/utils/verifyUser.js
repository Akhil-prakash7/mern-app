import { customErrorHandler } from "./error.js"
import Jwt  from "jsonwebtoken"

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token
    if(!token) return next(customErrorHandler(401,'unauthorized user'))
    Jwt.verify(token,process.env.JWT_SECRETE,(err,user)=>{
        if(err) return next(customErrorHandler(403,'forbidden'))
        req.user = user;
    next();
})

}