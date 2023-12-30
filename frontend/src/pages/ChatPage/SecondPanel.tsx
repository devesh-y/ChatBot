import {MessageSquare, Pause} from "lucide-react";
import {ChatsComp} from "@/pages/ChatPage/ChatsComp.tsx";

export const SecondPanel=()=>{
    return <div className={"flex items-center gap-4 h-[250px] w-full max-xl:flex-col max-xl:h-fit"}>
            <div className={"flex-grow h-full bg-transparent backdrop-blur-md rounded-[40px] flex max-xl:w-full max-xl:h-[250px]"}>
                <ChatsComp/>
                <div className={"w-[200px] h-full flex justify-center items-center flex-col gap-4 "}>
                    <div
                        className={"bg-[#2867ad] rounded-full w-1/3 aspect-square flex justify-center items-center  shadow-[0_0_2px_15px_#61525c] "}>
                        <MessageSquare fill={"white"} color={"white"} size={30}/>
                    </div>
                    <div className={"text-white font-bold"}>Chat</div>
                </div>
            </div>
            <div className={"w-[200px] h-full bg-transparent backdrop-blur-md rounded-[40px] flex flex-col justify-center items-center gap-4 max-xl:w-full max-xl:h-[150px]"}>
                <div className={"bg-[#2867ad] w-1/3 rounded-full aspect-square flex justify-center items-center  shadow-[0_0_2px_15px_#61525c] max-xl:w-[60px] "}>
                    <Pause color={"white"} size={30}/>
                </div>
                <div className={"text-white font-bold"}>Pause</div>

            </div>
        </div>

}