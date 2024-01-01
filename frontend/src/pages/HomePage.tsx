import backgroundImage from "../assets/background.png"
import logo from "../assets/goodspaceLogo.png"
import {Toaster} from "@/components/ui/sonner.tsx";
import {useEffect, useState} from "react";
import {getCookie} from "@/utilities/getSetCookie.ts";
import {Outlet, useNavigate} from "react-router-dom";
import {Loader2} from "lucide-react";
export const HomePage=()=>{
    const [loading,setLoading]=useState(true);
    useEffect(() => {
        const dummy=document.createElement("img");
        dummy.src=backgroundImage;
        dummy.addEventListener("load",()=>{
            setLoading(false);
        })
    }, []);
    const navigate=useNavigate();
    useEffect(() => {
        const cookie=getCookie();
        if(cookie){
            navigate("/chat",{replace:true})
        }
        else{
            navigate("/login",{replace:true})
        }
    }, [navigate]);
    return <>
        {loading ? <div className={"h-svh w-screen flex justify-center items-center"}>
                <Loader2 size={40} color={"black"} className={"animate-spin"}/>
            </div> :
            <div className={"h-screen w-screen bg-cover flex flex-col bg-fixed overflow-auto"}
                 style={{backgroundImage: `url(${backgroundImage})`}}>
                <div className={"pl-20 pt-2 pb-2 bg-transparent backdrop-blur-sm"}><img alt={"logo"} src={logo}
                                                                                        width={200} height={200}/></div>
                <Outlet/>
                <Toaster/>
            </div>
        }

    </>


}
