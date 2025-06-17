import mongoose, { Schema } from "mongoose";
import { OtpEntitie } from "../../domain/otpEntitie";

const otpSchema=new Schema<OtpEntitie>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
})

export const otpModel=mongoose.model<OtpEntitie>('otp',otpSchema)

export const otpDelete=()=>{
    let currentDate=new Date()
    otpModel.deleteMany({expiresAt:{$lte:currentDate}}).then((response)=>{
        if(response.deletedCount>=1){
            console.log("otp has deleted")
        }
    })
}