import { UserSignupRepo } from "../interface/repositories/signupRepositories";
const bcrypt=require('bcrypt')

export const otpVerificationApplication=async(data:any,userRepo:UserSignupRepo)=>{
    try {
        let otpData=await userRepo.findOtp(data.userDetails.email)
        if(!otpData){
            const error:any=new Error("OTP expired")
            error.statusCode=401
            throw error;
        }else{
            let isOtpMatch=await bcrypt.compare(data.otp,otpData.otp)
            if(isOtpMatch){
                if(data.userDetails.forgotPassword){
                    return data.userDetails;
                }else{
                    let activate=await userRepo.activateUser(data.userDetails.email)
                    if(activate){
                        return data.userDetails;
                    }
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