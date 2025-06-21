import { OtpEntitie } from "../../domain/otpEntitie";
import { UserSignup } from "../../domain/userSignup";
import { userRepositories } from "../../interface/repositories/userRepositories";
import { otpModel } from "../model/otpModel";
import { UserModel } from "../model/userModel";

export class UserMongoRepositories implements userRepositories{
    async saveOTP(data: OtpEntitie): Promise<OtpEntitie> {
        const result=await otpModel.create(data)
        return result;
    }

    async findEmail(email: string): Promise<UserSignup | null> {
        const result=await UserModel.findOne({email:email})
        return result;
    }

    async saveNewPassword(email: string, password: string): Promise<boolean> {
        let result=await UserModel.updateOne({email:email},{$set:{password:password}})
        return result.modifiedCount>0;
    }

    
}