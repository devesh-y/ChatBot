import {hashString} from "@/utilities/hashPassword.ts";

export const HandleLogin=async ({email,password}:{email:string,password:string})=>{
    return new Promise((resolve, reject)=>{
        const pass=hashString(password);
        const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if( !emailRegex.test(email)){
            resolve({error:"Invalid Email Address"})
            return;
        }
        fetch(`${import.meta.env.VITE_BACKEND}/login`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({email,password:pass})
        }).then((res)=>res.json()).then((result)=>{
            resolve(result);
        }).catch(()=>{
            reject();
        })
    })


}