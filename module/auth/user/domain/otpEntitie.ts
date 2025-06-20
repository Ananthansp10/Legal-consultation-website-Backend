export interface OtpEntitie{
    email:string;
    otp:string;
    hashedOtp ? :string;
    expiresAt:Date;
}