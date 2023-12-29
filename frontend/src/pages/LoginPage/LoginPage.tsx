import {LoginCard} from "@/pages/LoginPage/LoginCard.tsx";
import backgroundImage from "../../../public/background.png"
import IntroImage from "../../../public/goodspaceIntro.png"
import logo from "../../../public/goodspaceLogo.png"
export const LoginPage=()=>{
    return <div className={"h-screen w-screen bg-cover flex flex-col bg-fixed overflow-auto" } style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className={"pl-20 pt-5 pb-5 bg-transparent backdrop-blur-sm"}><img alt={"logo"} src={logo} width={200} height={200}/></div>
        <div className={"w-full gap-6 flex flex-col items-center ml-auto mr-auto sm:flex-row sm:flex-grow sm:gap-0 "}>
            <img alt={"intro"} src={IntroImage} className={"w-5/6 sm:w-1/2 sm:pl-6"} />
            <div className={"w-5/6 sm:w-1/2 flex justify-center "}>
                <LoginCard/>
            </div>
        </div>

    </div>
}
