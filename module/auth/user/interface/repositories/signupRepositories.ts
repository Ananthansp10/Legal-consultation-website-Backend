import { OtpEntitie } from "../../domain/otpEntitie";
import { UserSignup } from "../../domain/userSignup";

export interface UserSignupRepo{
    findByEmail(email:string):Promise<UserSignup | null>;
    create(data:UserSignup):Promise<UserSignup>;
    activateUser(email:string):Promise<boolean>;
    saveOtp(otp:OtpEntitie):Promise<void>;
    findOtp(email:string):Promise<OtpEntitie | null>;
}