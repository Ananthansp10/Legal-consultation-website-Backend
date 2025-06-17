import express from "express";
import { otpVerification, resendOtp, signin } from "../module/auth/user/interface/controllers/userAuthController";
const router=express.Router()
const {registerUser}=require('../module/auth/user/interface/controllers/userAuthController')

router.post('/signup',registerUser)

router.post('/otp-verification',otpVerification)

router.post('/resend-otp',resendOtp)

router.post('/signin',signin)

module.exports=router;