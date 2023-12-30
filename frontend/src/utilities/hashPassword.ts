
import {SHA256} from "crypto-js";
export function hashString(input:string) {
    const salt=`${import.meta.env.VITE_SALT}`
    const value=input+salt;
    return SHA256(value).toString();

}