import {VideoComp} from "@/pages/ChatPage/VideoComp.tsx";
import {MessageSquare, Volume2} from "lucide-react";
import {ChatsComp} from "@/pages/ChatPage/ChatsComp.tsx";
import {Paperclip,SendHorizonal} from "lucide-react"
import {Button} from "@/components/ui/button.tsx";
export const FirstPanel=({firstPanel}:{firstPanel:string})=>{
    return <>
        {firstPanel === "Video" ?
            <div className={"bg-transparent backdrop-blur-md w-full h-[300px] rounded-[40px] mb-5 flex gap-5 items-center justify-between pl-8 pr-8"}>
                <VideoComp/>
                <div className={"flex justify-between items-center gap-8 h-full"}>
                    <div className={"flex justify-center items-center flex-col gap-4 w-20"}>
                        <div
                            className={"bg-[#2867ad] rounded-full w-2/3 aspect-square flex justify-center items-center  shadow-[0_0_2px_15px_#61525c] "}>
                            <MessageSquare fill={"white"} color={"white"} size={30}/>
                        </div>
                        <div className={"text-white font-bold"}>Mute</div>
                    </div>
                    <div className={"flex justify-center items-center flex-col gap-4 h-full w-8"}>
                        <div
                            className={" w-[150px] h-[60px] bg-black flex justify-center items-center origin-center -rotate-90 rounded-lg gap-1"}>
                            <Volume2 color={"white"}/>
                            <input type="range" min="0" max="100" step="0.5"
                                   className={"w-2/3 accent-amber-50"}/>
                        </div>
                    </div>
                </div>

            </div>:
            <div className={"bg-transparent backdrop-blur-md w-full h-[300px] rounded-[40px] mb-5 flex flex-col gap-5  pl-8 pr-8"}>
                <ChatsComp/>
                <div className={"flex gap-4 items-center justify-between pl-3 pr-3 pt-1 pb-1 rounded-md"} style={{backgroundColor:"rgb(250,250,250,0.4)"}}>
                    <input type={"text"} placeholder="Type message" className={"bg-transparent outline-none placeholder:text-black flex-grow"}/>
                    <div className={"flex justify-between items-center gap-3"}  >
                        <Paperclip />
                        <Button className={"bg-[#297bca]"}>
                            <SendHorizonal color={"white"}/>
                        </Button>
                    </div>
                </div>
                <div/>
            </div>

        }
    </>

}