import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js'
import { errorHandler } from './midlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

dotenv.config()
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('database connected')
}).catch((err)=>{
    console.log(err)
});
const app = express();

app.use(express.json())

app.use(cookieParser())

app.listen(3000,()=>{
    console.log('server is running on port 3000')
});

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter)



app.use(errorHandler)