import backgroundImage from "../assets/background.png"
import logo from "../assets/goodspaceLogo.png"
import {Toaster} from "@/components/ui/sonner.tsx";
import {useEffect} from "react";
import {getCookie} from "@/utilities/getSetCookie.ts";
import {Outlet, useNavigate} from "react-router-dom";
export const HomePage=()=>{
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
    return <div className={"h-screen w-screen bg-cover flex flex-col bg-fixed overflow-auto" } style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className={"pl-20 pt-5 pb-5 bg-transparent backdrop-blur-sm"}><img alt={"logo"} src={logo} width={200} height={200}/></div>
        <Outlet/>
        <Toaster/>
    </div>
}
