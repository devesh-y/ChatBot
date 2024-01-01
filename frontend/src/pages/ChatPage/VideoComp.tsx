import React, {memo, useCallback, useContext} from "react";
import ReactPlayer from "react-player";
import {Button} from "@/components/ui/button.tsx";
import cameraBackgroud from "../../assets/cameraImage.png"
import {toast} from "sonner";
import {StreamContext} from "@/pages/ChatPage/StreamContextComp.tsx";

export const VideoComp=memo(()=>{
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
            toast("Camera device not found", {
                description:"Make sure to give camera permission to Browser",
                action: {
                    label: "Close",
                    onClick: () => console.log("close"),
                },
            })
        }

    },[setStream])
    return <>
    {stream?
        <div className={"flex-grow h-5/6 aspect-video flex justify-center items-center overflow-hidden"}>
            <div className={"rounded-xl border-4 border-white overflow-hidden h-full max-[450px]:h-3/5 flex justify-center items-center aspect-video"}>
                <ReactPlayer url={stream} playing={true} muted={true} />
            </div>
        </div> :
        <div className={"flex-grow h-5/6 flex justify-center items-center overflow-hidden relative box-border"}>
            <img alt={'image'} src={cameraBackgroud}
                 className={"h-full max-[450px]:h-3/5  rounded-xl border-4 border-white"}/>
            <Button className={"bg-transparent backdrop-blur-3xl font-extrabold absolute max-[450px]:hidden"} onClick={turnVideo}> Turn On Camera</Button>
        </div>
        }

    </>
})