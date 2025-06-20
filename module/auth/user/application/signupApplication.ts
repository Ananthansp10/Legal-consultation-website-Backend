import { UserSignup } from "../domain/userSignup";
import { UserSignupRepo } from "../interface/repositories/signupRepositories"
import { sendOtpMail } from "../../../../utils/nodemailer";
import { otpGenerate } from "../../../../utils/otpGeneration";
import { OtpEntitie } from "../domain/otpEntitie";
const bcrypt=require('bcrypt')

export const userSignupApplication=async(data:UserSignup,userRepo:UserSignupRepo)=>{
    try {
        const userExist=await userRepo.findByEmail(data.email)
    if(userExist){
         throw new Error("User already exist with this email")
    }else{
        let hashedPassword=await bcrypt.hash(data.password,10)
        let newUser=await userRepo.create({
            name:data.name,
            email:data.email,
            password:hashedPassword,
            phoneNumber:data.phoneNumber,
            isActive:data.isActive,
            createdAt:new Date()
        })
        const otp=await otpGenerate()
        const otpObj :OtpEntitie={
            email:newUser.email,
            otp:otp.hashedOtp,
            expiresAt:new Date(Date.now()+60*1000)
        }
        await userRepo.saveOtp(otpObj)
        sendOtpMail(newUser.email,otp.otp).then(()=>{
            return newUser;
        })
        return newUser;
    }
    } catch (error:any) {
        error.statusCode=409
        throw error;
    }
}