import { sendOtpMail } from "../../../../utils/nodemailer";
import { otpGenerate } from "../../../../utils/otpGeneration";
import { OtpEntitie } from "../domain/otpEntitie";
import { userRepositories } from "../interface/repositories/userRepositories";


export const forgotPasswordApplication=async(email:string,userRepo:userRepositories)=>{
    try {
        let error:any
        let emailExist=await userRepo.findEmail(email)
        if(!emailExist){
            error.message="Email is invalid"
            error.statusCode=404
            throw error;
        }else{
            const otp=await otpGenerate()
            let otpObj:OtpEntitie={
                email:email,
                otp:otp.hashedOtp,
                expiresAt:new Date(Date.now()+60*1000)
            }
            await userRepo.saveOTP(otpObj)
            sendOtpMail(email,otp.otp).then(()=>{
                return;
            })
            return emailExist;
        }
    } catch (error) {
        throw error;
    }
}