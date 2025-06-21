import { OtpEntitie } from "../../domain/otpEntitie"
import { UserSignup } from "../../domain/userSignup";

export interface userRepositories{
     saveOTP(data:OtpEntitie):Promise<OtpEntitie>;
     findEmail(email:string):Promise<UserSignup | null>;
     saveNewPassword(email:string,password:string):Promise<boolean>;
}