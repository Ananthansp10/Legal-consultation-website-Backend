import express from "express";
import { changePaasword, checkAuth, forgotPassword, logoutUser, otpVerification, resendOtp, resetPassword, signin } from "../module/auth/user/interface/controllers/userAuthController";
import { verifyToken } from "../middlewares/authorizationMiddleware";
const router=express.Router()
const {registerUser}=require('../module/auth/user/interface/controllers/userAuthController')

router.post('/signup',registerUser)

router.post('/otp-verification',otpVerification)

router.post('/resend-otp',resendOtp)

router.post('/signin',signin)

router.post('/logout/:userId',logoutUser)

router.post('/forgot-password',forgotPassword)

router.post('/change-password',changePaasword)

router.post('/reset-password',resetPassword)

router.get('/checkAuth',verifyToken,checkAuth)

module.exports=router;