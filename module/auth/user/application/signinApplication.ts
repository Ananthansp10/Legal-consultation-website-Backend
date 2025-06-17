import { SigninRepo } from "../interface/repositories/signinRepositories"
import { SigninEntitie } from "../domain/signinEntitie"
import { generateAccessToken, generateRefreshToken } from "../../../../utils/tokenGenerate"
const bcrypt=require('bcrypt')

export const signinApplication=async(data:SigninEntitie,signinRepo:SigninRepo)=>{
    try {
        let userExist=await signinRepo.findUser(data.email)
        let error:any
        if(!userExist){
           error=new Error("User not found")
           error.statusCode=404
           throw error;
        }else{
            let isPasswordMatch=await bcrypt.compare(data.password,userExist.password)
            if(!isPasswordMatch){
                error=new Error("Password is wrong")
                error.statusCode=401
                throw error;
            }else{
                let accessToken=generateAccessToken(userExist._id!)
                let refreshToken=generateRefreshToken(userExist._id!)
                return {userExist,accessToken,refreshToken};
            }
        }
    } catch (error) {
        throw error;
    }
}