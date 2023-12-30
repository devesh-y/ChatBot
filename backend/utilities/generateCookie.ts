import crypto from "crypto";


export const generateCookie=()=>{
    return crypto.randomBytes(32).toString('base64')
}