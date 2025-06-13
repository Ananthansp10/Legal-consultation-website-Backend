import { UserSignup } from "../../domain/userSignup";
import { UserSignupRepo } from "../../interface/repositories/signupRepositories";
import { UserModel } from "../model/userModel";

export class SignupMongoRepo implements UserSignupRepo{

    async findByEmail(email: string): Promise<UserSignup | null> {
        const userExist=await UserModel.findOne({email:email})
        if(userExist){
            return userExist
        }else{
            return null;
        }
    }

    async create(data: UserSignup): Promise<UserSignup> {
        let newUser=await UserModel.create(data)
        return newUser;
    }

    async activateUser(email: string): Promise<boolean> {
        let user=await UserModel.updateOne({email:email},{$set:{isActive:true}})
        return user.modifiedCount>0;
    }

}