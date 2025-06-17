import { UserSignupRepo } from "../interface/repositories/signupRepositories";
const bcrypt=require('bcrypt')

export const otpVerificationApplication=async(data:any,userRepo:UserSignupRepo)=>{
    try {
        let otpData=await userRepo.findOtp(data.userDetails._id)
        if(!otpData){
            const error:any=new Error("OTP expired")
            error.statusCode=401
            throw error;
        }else{
            let isPasswordMatch=await bcrypt.compare(data.otp,otpData.otp)
            if(isPasswordMatch){
                let activate=await userRepo.activateUser(data.userDetails.email)
                if(activate){
                    return data.userDetails;
                }
            }
            else{
                const error:any=new Error("Invalid OTP")
                error.statusCode=410
                throw error;
            }
        }
    } catch (error:any) {
        throw error;
    }
}