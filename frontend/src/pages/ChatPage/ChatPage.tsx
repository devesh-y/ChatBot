import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getCookie} from "@/utilities/getSetCookie.ts";
import AIGirl from "../../assets/aiGirl.png"
import {FirstPanel} from "@/pages/ChatPage/FirstPanel.tsx";
import {SecondPanel} from "@/pages/ChatPage/SecondPanel.tsx";
export const ChatPage=()=>{
    const navigate=useNavigate();
    const [_email,setEmail]=useState("");
    const [firstPanel,_setFirstPanel]=useState<string>("chats");
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
    return <div className={"flex-grow flex max-xl:justify-center ml-5 mr-5"}>
        <div className={"w-2/3 max-xl:w-full"}>
            <FirstPanel firstPanel={firstPanel}/>
            <SecondPanel/>
        </div>
        <div className={"max-xl:hidden flex-grow flex justify-center items-center overflow-hidden"}>
            <img src={AIGirl} alt={"ai_girl"} className={"object-cover"}/>
        </div>
    </div>
}