import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getCookie} from "@/utilities/getSetCookie.ts";
import {ChatPanel} from "@/components/ChatPanel.tsx";
import {toast} from "sonner";
export const ChatPage=()=>{
    const navigate=useNavigate();
    const [chats,setChats]=useState<{from:string,message:string}[]>([])
    const [email,setEmail]=useState("");
    const getChats=useCallback((email:string)=>{
        fetch(`${import.meta.env.VITE_BACKEND}/getChats`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({email})
        }).then((res)=>res.json()).then((result)=>{
            if(result.chats){
                setChats(result.chats);
            }
            else if(result.error){
                toast(result.error, {
                    action: {
                        label: "Close",
                        onClick: () => console.log("close"),
                    },
                })
            }

        }).catch(()=>{
            toast("Bad Request to fetch chats", {
                action: {
                    label: "Close",
                    onClick: () => console.log("close"),
                },
            })
        })
    },[])
    useEffect(() => {
        const cookie=getCookie();
        if(!cookie){
            navigate("/login",{replace:true})
        }
        else{
            const {email}=JSON.parse(cookie);
            setEmail(email)
            getChats(email);
        }
    }, [getChats, navigate]);

    return <div className={"h-full flex justify-center"}>
        <ChatPanel chats={chats} setChats={setChats} email={email}/>

    </div>

}