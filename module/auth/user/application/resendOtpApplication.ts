import { sendOtpMail } from "../../../../utils/nodemailer"
import { otpGenerate } from "../../../../utils/otpGeneration"
import { OtpEntitie } from "../domain/otpEntitie"
import { UserSignupRepo } from "../interface/repositories/signupRepositories"

export const resendOtpApplication=async(data:any,userRepo:UserSignupRepo)=>{

    try {
        if(!data){
            let error:any="something went wrong"
            error.statusCode=500
            throw error;
        }
        const otp=await otpGenerate()
        let otpObj:OtpEntitie={
            email:data.email,
            otp:otp.hashedOtp,
            expiresAt:new Date(Date.now()+60*1000)
        }
        await userRepo.saveOtp(otpObj);
        sendOtpMail(data.email, otp.otp).catch(err => {
        console.error("Failed to send OTP email:", err)
        });
        return data;
    } catch (error:any) {
        throw error
    }
}