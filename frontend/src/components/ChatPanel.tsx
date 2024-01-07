import {Chats} from "@/components/Chats.tsx";
import {Mic, MicOff, SendHorizonal} from "lucide-react"
import 'regenerator-runtime/runtime'
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import React, {memo, useCallback, useEffect, useState} from "react";
import {toast} from "sonner";
import {socket} from "@/utilities/SocketConnection.ts";

export const ChatPanel=memo(({chats,setChats,email}:{chats:{from: string, message: string}[],setChats:React.Dispatch<React.SetStateAction<{from: string, message: string}[]>>,email:string})=>{
    const [mic,setMic]=useState(false);
    const { browserSupportsSpeechRecognition,transcript,resetTranscript} = useSpeechRecognition();
    const [chatInput,setChatInput]=useState("");
    const [accessAudio,setAccessAudio]=useState<null|MediaStream>(null);
    const [allowSend,setAllowSend]=useState(true);
    const sendQuestion=useCallback((data:string)=>{
        data=data.trim();
        if(data===""){
            return;
        }
        socket.emit("chat",{email,message:data});
        setChatInput("");
        setAllowSend(false)
        setChats([...chats,{from:"Me",message:data},{from:"AI",message:"Wait..." }])

    },[chats, email, setChats])
    useEffect(() => {
        setChatInput(transcript)
    }, [transcript]);

    const getResponse=useCallback(({answer,error}:{answer?:string,error?:string})=>{
        if(error){
            toast(error, {
                action: {
                    label: "Close",
                    onClick: () => console.log("close"),
                },
            })
        }
        else if(answer){
            const tempchats=chats;
            tempchats.pop();
            setChats([...tempchats,{from:"AI",message:answer}])
            const value=new SpeechSynthesisUtterance(answer);
            window.speechSynthesis.speak(value)
            setAllowSend(true)
        }
    },[chats, setChats])

    useEffect(() => {
        socket.on("chat",getResponse);
        return ()=>{
            socket.off("chat",getResponse)
        }
    },[getResponse])
    const turnMicOnOff=useCallback(async ()=>{
        if(!browserSupportsSpeechRecognition ){

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
                    sendQuestion(transcript);
                    console.log("listening closed")
                    resetTranscript();

                })
                accessAudio?.getAudioTracks().forEach((track) => track.stop());
                setAccessAudio(null);
                setMic(false);
            }


        }


    },[accessAudio, browserSupportsSpeechRecognition, mic, resetTranscript, sendQuestion, transcript])

    return <div className={"bg-transparent backdrop-blur-md  h-full flex flex-col gap-5 w-[1000px] p-2 max-sm:w-full max-sm:p-1"}>
                <Chats chats={chats}/>
                <div className={"flex gap-4 items-center rounded-lg  p-3 bg-white border-gray-400 border-2"} >
                    <input disabled={!allowSend} type={"text"} placeholder="Type message" className={" outline-none  placeholder:bg-white placeholder:outline-none flex-grow"} value={chatInput} onChange={(e)=>setChatInput(e.target.value)} onKeyDown={(event) => {
                        if (event.key === "Enter") {
                                sendQuestion(chatInput);
                        }
                    }} />

                    <div style={{visibility:allowSend?"visible":"hidden"}} className={"flex justify-between items-center gap-4"}  >
                        {mic?<Mic onClick={turnMicOnOff}/>:<MicOff onClick={turnMicOnOff}/>}
                        <SendHorizonal onClick={()=>{
                                sendQuestion(chatInput);
                        }} />
                    </div>
                </div>

            </div>
})