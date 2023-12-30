import {useCallback, useState} from "react";
import ReactPlayer from "react-player";
import {Button} from "@/components/ui/button.tsx";
import cameraBackgroud from "../../assets/cameraImage.png"
import {toast} from "sonner";

export const VideoComp=()=>{
    const [stream,setStream]=useState<MediaStream|null>(null);
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

    },[])
    return <>
    {stream?
        <div className={"flex-grow h-5/6 aspect-video flex justify-center items-center rounded-xl border-4 border-white overflow-hidden"}>
            <ReactPlayer url={stream} playing={true} muted={true} height={"100%"} />
        </div>:
        <div className={"flex-grow h-5/6 flex justify-center items-center bg-cover rounded-xl border-4 border-white"}
             style={{ backgroundImage: `url(${cameraBackgroud})`} }>
            <Button className={"bg-transparent backdrop-blur-3xl font-extrabold"} onClick={turnVideo}> Turn On Camera</Button>
        </div>
        }

    </>
}