import {ScrollArea} from "@/components/ui/scroll-area.tsx";

export const ChatsComp=()=>{
    return <ScrollArea className={"flex-grow "}>
        <div className={"flex flex-col h-full"}>
            <div className={"self-end w-fit max-w-[70%]"}>
                <div className={"text-white"}>Me</div>
                <div className={`bg-[#2e9dfb] rounded-xl p-2 text-white `}>kjorwkj
                    fkdskjfl dskfjsk dlsfkj skdhja hjkfhsdjk fskfdhk sfdskhf jshfk dshfkjdsf
                </div>
            </div>
            <div className={"self-start w-fit max-w-[70%] "}>
                <div className={"text-white"}>AI</div>
                <div className={`bg-[#e9e9eb] rounded-xl p-2 text-black`}>kjorwkj
                    fkdskjfl dskfjsk dl
                </div>
            </div>

        </div>

    </ScrollArea>

}