export interface OtpEntitie{
    userId:any;
    otp:string;
    hashedOtp ? :string;
    expiresAt:Date;
}