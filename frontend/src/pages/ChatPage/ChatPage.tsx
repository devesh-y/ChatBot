import { useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getCookie} from "@/utilities/getSetCookie.ts";
import AIGirl from "../../assets/aiGirl.png"
import {FirstPanel} from "@/pages/ChatPage/FirstPanel.tsx";
import {SecondPanel} from "@/pages/ChatPage/SecondPanel.tsx";
import {StreamContextComp} from "@/pages/ChatPage/StreamContextComp.tsx";
export const ChatPage=()=>{
    const navigate=useNavigate();
    const [_email,setEmail]=useState("");
    const [firstPanel,setFirstPanel]=useState<string>("Chat");

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
            <StreamContextComp>
                <FirstPanel firstPanel={firstPanel}/>
                <SecondPanel setFirstPanel={setFirstPanel} firstPanel={firstPanel}/>
            </StreamContextComp>

        </div>
        <div className={"max-xl:hidden flex-grow flex justify-center items-center overflow-hidden"}>
            <img src={AIGirl} alt={"ai_girl"} className={"object-cover"}/>
        </div>
    </div>
}