import { Request,Response } from "express";
import { SignupMongoRepo } from "../../infrastructure/monoRepositories/signupMongoRepositories";
import { userSignupApplication } from "../../application/signupApplication";
const signupMongoRepo=new SignupMongoRepo()

   export const registerUser=async(req:Request,res:Response)=>{
        try {
            let {name,email,password,phoneNumber}=req.body as{
                name:string;
                email:string;
                password:string;
                phoneNumber:number;
            }
            let result=await userSignupApplication({name,email,password,phoneNumber,isActive:false,createdAt:new Date()},signupMongoRepo)
            res.status(200).json({success:true,message:"User created successfully",data:result})
        } catch (error:any) {
            let statusCode=error.statusCode ? error.statusCode : 500
            res.status(statusCode).json({sucsess:false,message:error.message})
        }
    }
