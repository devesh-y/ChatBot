import {LoginCard} from "@/pages/LoginPage/LoginCard.tsx";
import backgroundImage from "../../../public/background.png"
import IntroImage from "../../../public/goodspaceIntro.png"
import logo from "../../../public/goodspaceLogo.png"
export const LoginPage=()=>{
    return <div className={"h-screen w-screen bg-cover flex flex-col bg-fixed overflow-auto" } style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className={"pl-20 pt-5 pb-5 bg-transparent backdrop-blur-sm"}><img alt={"logo"} src={logo} width={200} height={200}/></div>
        <div className={"w-full flex justify-between items-center pl-16 pr-16"}>
            <img alt={"intro"} src={IntroImage} width={600} height={600}/>
            <LoginCard/>
        </div>

    </div>
}
