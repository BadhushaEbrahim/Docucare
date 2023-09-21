import jwt from "jsonwebtoken"
import {format} from "date-fns"
import {createTokenDocument} from '../utilities/token.js'
//generate new Access tokens
const generateAccessToken =async (user)=>{
    try {
        const accessToken=jwt.sign(user,process.env.ACCESS_SECERET_KEY,{
            expiresIn:"1h"
        });
        return accessToken;
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
};
//generate new Refresh tokens
const generateRefreshToken=async(user)=>{
    try {
        const expiry="1d"
        const refreshToken=jwt.sign(user,process.env.REFRESH_SECERT_KEY,{
            expiresIn:expiry
        });
        const {id} =user;
        const decoded=await jwt.decode(refreshToken);
        const decodedtime=new Date(decoded.exp*1000)
        const expirationTime=format(decodedtime,"yyyy-MM-dd HH:mm:ss")
        const userDetails={
            userId:id,
            token:refreshToken,
            expiration:expirationTime
        };
        await createTokenDocument(userDetails);
        return refreshToken
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

export {generateAccessToken,generateRefreshToken}