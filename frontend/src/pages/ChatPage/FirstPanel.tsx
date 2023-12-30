import {VideoComp} from "@/pages/ChatPage/VideoComp.tsx";
import {MessageSquare, Volume2} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

export const FirstPanel=({firstPanel}:{firstPanel:string})=>{
    return <>
        {firstPanel==="video"?
            <div className={"bg-transparent backdrop-blur-md w-full h-[300px] rounded-[40px] mb-5 flex gap-10 items-center justify-between pl-8 pr-8"}>
                <VideoComp/>
                <div className={"flex justify-between items-center gap-8 h-full"}>
                    <div className={"flex justify-center items-center flex-col gap-4 w-20"}>
                        <div className={"bg-[#2867ad] rounded-full w-2/3 aspect-square flex justify-center items-center  shadow-[0_0_2px_15px_#61525c] "}>
                            <MessageSquare fill={"white"} color={"white"} size={30}/>
                        </div>
                        <div className={"text-white font-bold"}>Mute</div>
                    </div>
                    <div className={"flex justify-center items-center flex-col gap-4 h-full w-8"}>
                        <div className={" w-[150px] h-[60px] bg-black flex justify-center items-center origin-center -rotate-90 rounded-lg gap-1"}>
                            <Volume2 color={"white"}/>
                            <input type="range" min="0" max="100" step="0.5" className={"w-2/3 accent-amber-50"}/>
                        </div>
                    </div>
                </div>

            </div> :
            <ScrollArea className={"bg-transparent backdrop-blur-md w-full h-[300px] rounded-[40px] mb-5"}>

            </ScrollArea>
        }
    </>
}