const express=require('express')
const app=express()
const env=require('dotenv')
const userRouter=require('../Backend/routes/userRouter')
const lawyerRouter=require('../Backend/routes/lawyerRouter')
const adminRouter=require('../Backend/routes/adminRouter')
import cors from 'cors';
import { otpDelete } from './module/auth/user/infrastructure/model/otpModel'
const cron=require('node-cron')
import cookieParser from 'cookie-parser'
env.config()

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true   
}));

app.use(cookieParser());

app.use(express.json());

cron.schedule('*/1 * * * * *',(()=>{
   otpDelete();
}))

app.use('/api/user',userRouter)
app.use('/api/lawyer',lawyerRouter)
app.use('/api/admin',adminRouter)

export default app;