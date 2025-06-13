import {UserSignup} from '../../domain/userSignup'
import mongoose, {Schema} from 'mongoose'

const userSchema=new Schema <UserSignup>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    },
    createdAt:{
        type:Date
    }
})

export const UserModel=mongoose.model<UserSignup>("users",userSchema)