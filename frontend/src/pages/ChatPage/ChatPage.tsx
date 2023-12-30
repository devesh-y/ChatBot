import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getCookie} from "@/utilities/getSetCookie.ts";

export const ChatPage=()=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    useEffect(() => {
        const cookie=getCookie();
        if(!cookie){
            navigate("/login",{replace:true})
        }
        else{
            const {email}=JSON.parse(cookie);
            setEmail(email)
        }
    }, [navigate]);
    return <>
    </>
}