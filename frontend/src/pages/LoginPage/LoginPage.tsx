import {LoginCard} from "@/pages/LoginPage/LoginCard.tsx";
import IntroImage from "../../assets/goodspaceIntro.png"
import {useEffect} from "react";
import {getCookie} from "@/utilities/getSetCookie.ts";
import {useNavigate} from "react-router-dom";
export const LoginPage=()=>{
    const navigate=useNavigate();
    useEffect(() => {
        const cookie=getCookie();
        if(cookie){
            navigate("/chat",{replace:true})
        }
    }, [navigate]);
    return <div className={"w-full gap-6 flex flex-col items-center ml-auto mr-auto sm:flex-row sm:flex-grow sm:gap-0 "}>
        <img alt={"intro"} src={IntroImage} className={"w-5/6 sm:w-1/2 sm:pl-6"}/>
        <div className={"w-5/6 sm:w-1/2 flex justify-center "}>
            <LoginCard/>
        </div>
    </div>
}
