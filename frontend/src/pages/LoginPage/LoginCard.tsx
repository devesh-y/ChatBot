import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useCallback, useState} from "react";
import {toast} from "sonner";
import {HandleLogin} from "@/pages/LoginPage/HandleLogin.ts";
import {setCookie} from "@/utilities/getSetCookie.ts";
import {useNavigate} from "react-router-dom";
import {Loader2} from "lucide-react"
export const LoginCard=()=> {
    const navigate=useNavigate();
    const [userInfo,setUserInfo]=useState({email:"",password:""});
    const [loading,setLoading]=useState(false);
    const loginFunc=useCallback(()=>{
        if(userInfo.email=="" || userInfo.password==""){
            toast("Enter Credentials", {
                action: {
                    label: "Close",
                    onClick: () => console.log("close"),
                },
            })
        }
        else{
            setLoading(true);
            HandleLogin(userInfo).then((res)=>{
                const {error,cookie,message}= res as {error?:string,message?:string,cookie?:string};
                if(error){

                    console.log(error)
                    toast(error, {
                        action: {
                            label: "Close",
                            onClick: () => console.log("close"),
                        },
                    })
                }
                else{
                    console.log(message)
                    setCookie(userInfo.email,cookie!)
                    navigate("/chat",{replace:true})
                }
                setLoading(false);
            }).catch(()=>{
                setLoading(false);
                toast("Bad Request", {
                    action: {
                        label: "Close",
                        onClick: () => console.log("close"),
                    },
                })
            })
        }

        
    },[navigate, userInfo])
    return <Card className="pl-5 pr-5 pb-10 pt-5 text-white bg-transparent backdrop-blur-xl w-full  sm:max-w-[400px]  border-none shadow-[0_0_1.5px_0_white]">
        <CardHeader className={"mb-4"}>
            <CardTitle>Signup/Login</CardTitle>
        </CardHeader>
        <CardContent className={"mb-4"}>
            <form>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Your Email id</Label>
                        <Input autoComplete={"true"} className={"text-black focus-visible:ring-0 focus-visible:ring-offset-0 "} id="email" placeholder="Enter your Email Address" value={userInfo.email} onChange={(e)=>setUserInfo({email:e.target.value,password:userInfo.password})} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input autoComplete={"true"} className={"text-black focus-visible:ring-0 focus-visible:ring-offset-0"}  type={"password"} id="password" placeholder="Enter your Password" value={userInfo.password} onChange={(e)=>setUserInfo({email:userInfo.email,password:e.target.value})} />
                    </div>
                </div>
            </form>
        </CardContent>
        <CardFooter className="flex justify-center">
            <Button className={"w-full bg-blue-600 hover:bg-blue-700"} variant={"default"} onClick={loginFunc}>{loading?<Loader2 className={"animate-spin"}/>:"Lets Go!!"}</Button>
        </CardFooter>
    </Card>
}