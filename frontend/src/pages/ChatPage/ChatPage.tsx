import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getCookie} from "@/utilities/getSetCookie.ts";
import AIGirl from "../../assets/aiGirl.png"
import {FirstPanel} from "@/pages/ChatPage/FirstPanel.tsx";
import {SecondPanel} from "@/pages/ChatPage/SecondPanel.tsx";
import {StreamContextComp} from "@/pages/ChatPage/StreamContextComp.tsx";
import {socket} from "@/utilities/SocketConnection.ts";
import {toast} from "sonner";
export const ChatPage=()=>{
    const navigate=useNavigate();
    const [chats,setChats]=useState<{from:string,message:string}[]>([])
    const [email,setEmail]=useState("");
    const [firstPanel,setFirstPanel]=useState<string>("Chat");
    const [mic,setMic]=useState(false);
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
    const getResponse=useCallback(({answer,error}:{answer?:string,error?:string})=>{
        if(error){
            toast(error, {
                action: {
                    label: "Close",
                    onClick: () => console.log("close"),
                },
            })
        }
        else if(answer){
            const tempchats=chats;
            tempchats.pop();
            setChats([...tempchats,{from:"AI",message:answer}])
            const value=new SpeechSynthesisUtterance(answer);
            window.speechSynthesis.speak(value)
        }
    },[chats])

    useEffect(() => {
        socket.on("chat",getResponse);
        return ()=>{
            socket.off("chat",getResponse)
        }
    },[getResponse])
    useEffect(()=>{
        if(email){
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
        }

    },[email])
    return <div className={"flex-grow flex max-xl:justify-center ml-5 mr-5"}>
        <div className={"w-2/3 max-xl:w-full"}>
            <StreamContextComp>
                <FirstPanel firstPanel={firstPanel} mic={mic} setMic={setMic} chats={chats} setChats={setChats} email={email}/>
                <SecondPanel setFirstPanel={setFirstPanel} firstPanel={firstPanel} setMic={setMic} chats={chats} />
            </StreamContextComp>

        </div>
        <div className={"max-xl:hidden flex-grow flex justify-center items-center overflow-hidden"}>
            <img src={AIGirl} alt={"ai_girl"} className={"object-cover"}/>
        </div>
    </div>
}