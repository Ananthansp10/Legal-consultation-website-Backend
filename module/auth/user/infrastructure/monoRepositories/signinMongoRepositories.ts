import { UserSignup } from "../../domain/userSignup";
import { SigninRepo } from "../../interface/repositories/signinRepositories";
import { UserModel } from "../model/userModel";

export class SigninMongoRepo implements SigninRepo{
    async findUser(email: string): Promise<UserSignup | null> {
        let user=await UserModel.findOne({email:email})
        if(user){
            return user;
        }else{
            return null;
        }
    }
}