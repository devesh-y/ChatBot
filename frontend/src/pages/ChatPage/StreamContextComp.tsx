import React, {createContext, ReactNode, useState} from "react";

export const StreamContext=createContext< {
    stream: MediaStream | null, setStream: React.Dispatch<React.SetStateAction<MediaStream | null>> }|null>(null);
export const StreamContextComp=({children}:{children:ReactNode})=>{
    const [stream,setStream]=useState<MediaStream|null>(null);
    return <StreamContext.Provider  value={{stream,setStream}}>
        {children}
    </StreamContext.Provider>
}
