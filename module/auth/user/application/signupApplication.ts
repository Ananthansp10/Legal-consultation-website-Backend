import { UserSignup } from "../domain/userSignup";
import { UserSignupRepo } from "../interface/repositories/signupRepositories"
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
        return newUser;
    }
    } catch (error:any) {
        error.statusCode=409
        throw error;
    }
}