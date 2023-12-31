
import {useEffect, useRef} from "react";


export const ChatsComp=({chats}:{chats:{from: string, message: string}[]})=>{
    const scrollRef=useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(scrollRef.current){
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chats]);
    return <div ref={scrollRef} className={"flex-grow flex flex-col h-full overflow-auto pr-2"}>
            {chats.map((value,index)=>{
                if(value.from==="AI") {
                    return <div key={index} className={"self-start w-fit max-w-[70%] "}>
                        <div className={"text-white"}>AI</div>
                        <div className={`bg-[#e9e9eb] rounded-xl p-2 text-black`}>{value.message}
                        </div>
                    </div>
                }
                else {
                    return <div key={index} className={"self-end w-fit max-w-[70%]"}>
                        <div className={"text-white"}>Me</div>
                        <div className={`bg-[#2e9dfb] rounded-xl p-2 text-white `}>{value.message}</div>
                    </div>
                }

            })}

        </div>



}