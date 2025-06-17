import { Request,Response } from "express";
import { SignupMongoRepo } from "../../infrastructure/monoRepositories/signupMongoRepositories";
import { userSignupApplication } from "../../application/signupApplication";
import { otpVerificationApplication } from "../../application/otpApplication";
import { resendOtpApplication } from "../../application/resendOtpApplication";
import { SigninMongoRepo } from "../../infrastructure/monoRepositories/signinMongoRepositories";
import { signinApplication } from "../../application/signinApplication";

const signupMongoRepo=new SignupMongoRepo()
const signinMongoRepo=new SigninMongoRepo()

   export const registerUser=async(req:Request,res:Response)=>{
        try {
            let {name,email,password,phoneNumber}=req.body as{
                name:string;
                email:string;
                password:string;
                phoneNumber:number;
            }
            let result=await userSignupApplication({name,email,password,phoneNumber,isActive:false,createdAt:new Date()},signupMongoRepo)
            if(result){
                res.status(200).json({success:true,message:"OTP has successfully send to your email",data:result})
            }
        } catch (error:any) {
            let statusCode=error.statusCode ? error.statusCode : 500
            res.status(statusCode).json({success:false,message:error.message})
        }
    }

    export const otpVerification=async(req:Request,res:Response)=>{
        try {
            let result=await otpVerificationApplication(req.body,signupMongoRepo)
            if(result){
                res.status(200).json({success:true,message:"User created successfully",data:result})
            }
        } catch (error:any) {
            res.status(error.statusCode | 500).json({success:false,message:error.message})
        }
    }

    export const resendOtp=async(req:Request,res:Response)=>{
        try {
            let result:any=await resendOtpApplication(req.body,signupMongoRepo)
            if(result){
                res.status(200).json({success:true,message:"OTP has successfully send to your email",data:result})
            }
        } catch (error) {
            res.status(500).json({success:false,message:"Something went wrong please try again"})
        }
    }

    export const signin=async(req:Request,res:Response)=>{
        try {
            let result = await signinApplication(req.body,signinMongoRepo)
            if(result){
                res.status(200).json({success:true, message:"User login successfully" ,user:{name:result.userExist.name , email:result.userExist.email}, accessToken:result.accessToken, refreshToken:result.refreshToken})
            }
        } catch (error:any) {
            res.status(error.statusCode || 500).json({success:false,message:error.message})
        }
    }
