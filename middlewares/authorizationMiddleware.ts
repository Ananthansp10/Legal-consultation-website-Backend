import {Request,Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
export const verifyToken=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        //console.log(req.body.role)
        const accessToken=req.cookies?.accessToken as string | undefined
        const refreshToken=req.cookies?.refreshToken as string | undefined
        if(!accessToken && !refreshToken){
            res.status(401).json({success:false})
            return;
        }else{
            const decodeAccessToken:any=jwt.verify(accessToken!,process.env.JWT_ACCESS_TOKEN_SECRET!)
            if(decodeAccessToken && Date.now()> decodeAccessToken.exp*1000){
                let decodeRefreshToken:any=jwt.verify(refreshToken!,process.env.JWT_REFRESH_TOKEN_SECRET!)
                if(decodeRefreshToken && Date.now()>decodeRefreshToken.exp*1000){
                    res.status(401).json({success:false})
                    return;
                }else{
                    let newAccessToken=await jwt.sign({id:decodeRefreshToken.id,role:decodeRefreshToken.role},process.env.JWT_ACCESS_TOKEN_SECRET!,{expiresIn:"30m"})
                    let decodeNewAccessToken:any=jwt.verify(newAccessToken,process.env.JWT_ACCESS_TOKEN_SECRET!);
                    (req as any).role=decodeNewAccessToken.role
                    if(decodeNewAccessToken.role=='user'){
                        res.cookie("accessToken", newAccessToken, {
                            httpOnly: true,     
                            secure: true,            
                            sameSite: "none",       
                            maxAge: 1000 * 60 * 30,
                        });
                    }else if(decodeNewAccessToken.role=='lawyer'){
                        res.cookie("lawyerAccessToken", newAccessToken, {
                            httpOnly: true,     
                            secure: true,            
                            sameSite: "none",       
                            maxAge: 1000 * 60 * 30,
                        });
                    }else{
                        res.cookie("adminAccessToken", newAccessToken, {
                            httpOnly: true,     
                            secure: true,            
                            sameSite: "none",       
                            maxAge: 1000 * 60 * 30,
                        });
                    }
                    return next();
                }
            }else{
                (req as any).role=decodeAccessToken.role
                return next();
            }
        }
    } catch (error) {
        throw error;
    }
}