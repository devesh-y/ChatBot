import backgroundImage from "../assets/backGroundImage.svg"
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
    return <div className={"h-svh bg-cover"}
             style={{background: `url(${backgroundImage})`}}>
            <Outlet/>
            <Toaster/>
        </div>

}
