
import {useEffect, useRef,memo} from "react";


export const Chats=memo(({chats}:{chats:{from: string, message: string}[]})=>{
    const scrollRef=useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(scrollRef.current){
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chats]);
    return <div ref={scrollRef} className={"flex-grow flex flex-col overflow-auto"}>
            {chats.map((value,index)=>{
                if(value.from==="AI") {
                    return <div key={index} className={"self-start w-fit max-w-[70%] "}>
                        <div >AI</div>
                        <div className={`bg-[#e9e9eb] rounded-xl p-2 text-black`}>{value.message}
                        </div>
                    </div>
                }
                else {
                    return <div key={index} className={"self-end w-fit max-w-[70%]"}>
                        <div >Me</div>
                        <div className={`bg-[#2e9dfb] rounded-xl p-2 text-white `}>{value.message}</div>
                    </div>
                }

            })}

        </div>



})