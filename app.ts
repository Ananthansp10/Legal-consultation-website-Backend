const express=require('express')
const app=express()
const env=require('dotenv')
const userRouter=require('../Backend/routes/userRouter')
const lawyerRouter=require('../Backend/routes/lawyerRouter')
const adminRouter=require('../Backend/routes/adminRouter')

env.config()

app.use(express.json());

app.use('/api/user',userRouter)
app.use('/api/lawyer',lawyerRouter)
app.use('/api/admin',adminRouter)

export default app;