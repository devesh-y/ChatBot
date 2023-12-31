import React, {useCallback, useContext} from "react";
import ReactPlayer from "react-player";
import {Button} from "@/components/ui/button.tsx";
import cameraBackgroud from "../../assets/cameraImage.png"
import {toast} from "sonner";
import {StreamContext} from "@/pages/ChatPage/StreamContextComp.tsx";

export const VideoComp=()=>{
    const {stream,setStream}=useContext(StreamContext) as {stream:MediaStream|null,setStream:React.Dispatch<React.SetStateAction<MediaStream | null>>};

    const turnVideo=useCallback(async ()=>{
        try{
            const stream= await navigator.mediaDevices.getUserMedia({
                video:true,audio:false
            });
            setStream(stream);
        }
        catch (e) {
            console.log(e)
            toast("Error in turning camera on", {
                action: {
                    label: "Close",
                    onClick: () => console.log("close"),
                },
            })
        }

    },[setStream])
    return <>
    {stream?
        <div className={"flex-grow h-5/6 aspect-video flex justify-center items-center rounded-xl border-4 border-white overflow-hidden"}>
            <ReactPlayer url={stream} playing={true} muted={true} height={"100%"} />
        </div>:
        <div className={"flex-grow h-5/6 flex justify-center items-center overflow-hidden"}>
            <div className={"w-fit h-full flex items-center justify-center relative"}>
                <img alt={'image'} src={cameraBackgroud} className={"h-full rounded-xl border-4 border-white"} />
                <Button className={"bg-transparent backdrop-blur-3xl font-extrabold absolute"} onClick={turnVideo}> Turn On Camera</Button>
            </div>


        </div>
        }

    </>
}