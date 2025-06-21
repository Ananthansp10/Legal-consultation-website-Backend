import { userRepositories } from "../interface/repositories/userRepositories"
const bcrypt=require('bcrypt')

export const changePasswordApplication=async(email:string,password:string,userRepo:userRepositories)=>{
    try {
        let error:any
        let emailExist=await userRepo.findEmail(email)
        if(!emailExist){
            error.message="Email not exist"
            error.statusCode=404
            throw error;
        }else{
            let hashedPassword=await bcrypt.hash(password,10)
            return await userRepo.saveNewPassword(email,hashedPassword)
        }
    } catch (error) {
        throw error;
    }
}