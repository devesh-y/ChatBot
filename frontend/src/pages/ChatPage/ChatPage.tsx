import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getCookie} from "@/utilities/getSetCookie.ts";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import AIGirl from "../../assets/aiGirl.png"
import {FirstPanel} from "@/pages/ChatPage/FirstPanel.tsx";
import {SecondPanel} from "@/pages/ChatPage/SecondPanel.tsx";
export const ChatPage=()=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [firstPanel,setFirstPanel]=useState<string>("video");
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
    return <div className={"flex flex-col flex-grow"}>
        <Select>
            <SelectTrigger className="ml-20 mt-2 w-[180px]">
                <SelectValue placeholder="Select Conversation" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="new chat" className={"font-bold"}>New chat</SelectItem>

                </SelectGroup>
            </SelectContent>
        </Select>
        <div className={"flex-grow flex max-xl:justify-center ml-5 mr-5"}>
            <div className={"w-2/3 max-xl:w-full"}>
                <FirstPanel firstPanel={firstPanel}/>
                <SecondPanel/>
            </div>
            <div className={"max-xl:hidden flex-grow flex justify-center items-center"}>
                <img src={AIGirl} alt={"ai_girl"} className={"h-[585px]"}/>
            </div>
        </div>
    </div>
}