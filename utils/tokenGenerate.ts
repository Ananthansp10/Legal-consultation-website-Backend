import jwt from 'jsonwebtoken'

const accessTokenSecret=process.env.JWT_ACCESS_TOKEN_SECRET as string
const refreshTokenSecret=process.env.JWT_REFRESH_TOKEN_SECRET as string


export const generateAccessToken=(id:string|null)=>{
    const accessToken=jwt.sign({id:id,role:"user"},accessTokenSecret,{expiresIn:"30m"})
    return accessToken;
}

export const generateRefreshToken=(id:string)=>{
    const refreshToken=jwt.sign({id:id,role:"user"},refreshTokenSecret,{expiresIn:"7d"})
    return refreshToken;
}

