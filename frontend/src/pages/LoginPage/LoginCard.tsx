import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

export const LoginCard=()=> {
    return <Card className="pl-5 pr-5 pb-10 pt-5 text-white bg-transparent backdrop-blur-xl w-full  sm:max-w-[400px]  border-none shadow-[0_0_1.5px_0_white]">
        <CardHeader className={"mb-4"}>
            <CardTitle>Signup/Login</CardTitle>
        </CardHeader>
        <CardContent className={"mb-4"}>
            <form>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Your Email id</Label>
                        <Input className={"text-black focus-visible:ring-0 focus-visible:ring-offset-0 "} id="email" placeholder="Enter your Email Address" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input className={"text-black focus-visible:ring-0 focus-visible:ring-offset-0"}  type={"password"} id="password" placeholder="Enter your Password" />
                    </div>
                </div>
            </form>
        </CardContent>
        <CardFooter className="flex justify-center">
            <Button className={"w-full bg-blue-600 hover:bg-blue-700 "} variant={"default"} >Lets Go!!</Button>
        </CardFooter>
    </Card>
}