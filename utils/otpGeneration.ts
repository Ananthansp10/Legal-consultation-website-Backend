const bcrypt=require('bcrypt')

export const otpGenerate=async(): Promise<{otp:string;hashedOtp:string}>=>{
    const otp=Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp=await bcrypt.hash(otp,10)
    return {otp,hashedOtp}
}