import express from "express";
const router=express.Router()
const {registerUser}=require('../module/auth/user/interface/controllers/userAuthController')

router.post('/signup',registerUser)

module.exports=router;