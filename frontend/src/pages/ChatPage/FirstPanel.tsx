import {VideoComp} from "@/pages/ChatPage/VideoComp.tsx";
import { Volume2} from "lucide-react";
import {ChatsComp} from "@/pages/ChatPage/ChatsComp.tsx";
import {Paperclip,SendHorizonal,Mic,MicOff} from "lucide-react"
import {Button} from "@/components/ui/button.tsx";
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import React, {useCallback, useState,memo} from "react";
import {toast} from "sonner";
import {socket} from "@/utilities/SocketConnection.ts";

export const FirstPanel=memo(({firstPanel,setMic,mic,chats,setChats,email}:{firstPanel:string,mic:boolean,setMic: React.Dispatch<React.SetStateAction<boolean>>,chats:{from: string, message: string}[],setChats:React.Dispatch<React.SetStateAction<{from: string, message: string}[]>>,email:string})=>{

    const { browserSupportsSpeechRecognition,transcript,resetTranscript} = useSpeechRecognition();
    const [chatInput,setChatInput]=useState("");
    const [accessAudio,setAccessAudio]=useState<null|MediaStream>(null);
    const sendQuestion=useCallback((data:string)=>{
        data=data.trim();
        if(data===""){
            return;
        }
        socket.emit("chat",{email,message:data});
        setChatInput("");
        setChats([...chats,{from:"Me",message:data},{from:"AI",message:"Wait..." }])


    },[chats, email, setChats])
    const turnMicOnOff=useCallback(async ()=>{
        if(!mic && !browserSupportsSpeechRecognition ){

            toast("Browser doesn't support speech recognition", {
                action: {
                    label: "Close",
                    onClick: () => console.log("close"),
                },
            })
        }
        else{
            if(!mic){
                try{
                    if(!accessAudio){
                        const stream=await navigator.mediaDevices.getUserMedia({ audio: true });
                        setAccessAudio(stream);
                    }
                    resetTranscript();
                    SpeechRecognition.startListening({continuous:true,language:'en-IN'}).catch(()=>{
                        console.log("error in transcription")
                    })
                    setMic(true);
                }
                catch (e){
                    toast("Please grant Mic permission", {
                        action: {
                            label: "Close",
                            onClick: () => console.log("close"),
                        },
                    })
                }
            }
            else{
                SpeechRecognition.abortListening().then(()=>{
                    const data=JSON.stringify(transcript);
                    sendQuestion(data);
                    console.log("listening closed")
                    resetTranscript();

                })
                accessAudio?.getAudioTracks().forEach((track) => track.stop());
                setAccessAudio(null);
                setMic(false);
            }


        }


    },[accessAudio, browserSupportsSpeechRecognition, mic, resetTranscript, sendQuestion, setMic, transcript])


    return <>
        {firstPanel === "Video" ?
            <div className={"bg-transparent backdrop-blur-md w-full h-[300px] rounded-[40px] mb-5 flex gap-5 items-center justify-between pl-8 pr-8"}>
                <VideoComp/>
                <div className={"flex justify-between items-center gap-8 h-full"}>
                    <div className={"flex justify-center items-center flex-col gap-4 w-20 max-sm:w-9"}>
                        <div
                            className={"bg-[#2867ad] rounded-full w-2/3 aspect-square flex justify-center items-center  shadow-[0_0_2px_15px_#61525c] "} onClick={turnMicOnOff}>
                            {mic?<Mic color={"white"} size={30}/>:<MicOff color={"white"} size={30}/>}
                        </div>
                        <div className={"text-white font-bold"}>{mic?"Stop":"Ask"} </div>
                    </div>
                    <div className={"flex justify-center items-center flex-col gap-4 h-full w-8 max-sm:w-4"}>
                        <div
                            className={" w-[150px] h-[60px] max-sm:h-[40px] bg-black flex justify-center items-center origin-center -rotate-90 rounded-lg gap-1"}>
                            <Volume2 color={"white"}/>
                            <input type="range" min="0" max="100" step="0.5"
                                   className={"w-2/3 accent-amber-50"}/>
                        </div>
                    </div>
                </div>

            </div>:
            <div className={"bg-transparent backdrop-blur-md w-full h-[300px] rounded-[40px] mb-5 flex flex-col gap-5  pl-8 pr-8"}>
                <ChatsComp chats={chats}/>
                <div className={"flex gap-4 items-center justify-between pl-3 pr-3 pt-1 pb-1 rounded-md overflow-hidden"} style={{backgroundColor:"rgb(250,250,250,0.4)"}}>
                    <input type={"text"} placeholder="Type message" className={"bg-transparent outline-none placeholder:text-black flex-grow"} value={chatInput} onChange={(e)=>setChatInput(e.target.value)} onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            sendQuestion(chatInput);
                        }
                    }} />
                    <div className={"flex justify-between items-center gap-3"}  >
                        <Paperclip />
                        <Button className={"bg-[#297bca]"} onClick={()=>sendQuestion(chatInput)}>
                            <SendHorizonal color={"white"}/>
                        </Button>
                    </div>
                </div>
                <div/>
            </div>

        }
    </>

})