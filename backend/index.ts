import express from "express"
import {config} from "dotenv"
import http from "http"
import {Server} from "socket.io";
import cors from "cors"
import {OpenAI} from "openai"
config();
import {generateCookie} from "./utilities/generateCookie";
import {createConversation, createUser, findCoversation, findUser} from "./utilities/dbUtilities";
const app=express();
app.use(cors({
    origin: [`${process.env.WEBSITE}`],
    methods:['GET','POST']
}))
const openai=new OpenAI({
    apiKey:process.env.API_KEY
})
const httpServer=http.createServer(app);
const io=new Server(httpServer,{
    cors: {
        origin: [`${process.env.WEBSITE}`],
    }
})
app.use(express.json());
app.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await findUser(email)
        if(!user){
            const cookie=generateCookie();
            createUser(email,password,cookie).save().then(()=>{
                res.status(200).send(JSON.stringify({message:"Account Created Successfully",cookie}))
            }).catch(()=>{
                res.status(500).send(JSON.stringify({error:"Internal Server Error"}))
            });
        }
        else if(user.password!==password){
            res.status(401).send(JSON.stringify({error:"Invalid Credentials"}))
        }
        else{
            const cookie=generateCookie();
            user.cookie=cookie;
            await user.save();
            res.status(200).send(JSON.stringify({message:"Login Successfully",cookie}))
        }
    }catch (err) {
        console.log(err)
        res.status(500).send(JSON.stringify({error:"Internal Server Error"}))
    }

})
app.post("/getChats",async (req,res)=>{
    const {email}=req.body;
    try{
        let user=await findCoversation(email);
        if(!user){
            user=await createConversation(email).save();
            res.status(200).send(JSON.stringify([]));
            return;
        }
        if(user){
            res.status(200).send(JSON.stringify({chats:user.chats}));
        }
    }
    catch (err){
        console.log(err)
        res.status(500).send(JSON.stringify({error:"Internal Server Error"}))
    }


})
httpServer.listen(process.env.PORT,()=>{
    console.log(`server is listening on`,process.env.PORT)
})

io.on("connection", (socket)=>{
    socket.on("chat",async ({email, message}:{email:string,message:string})=>{
        //store in db
        let user=await findCoversation(email);
        if(!user){
            user=await createConversation(email).save();
        }
        if(user){
            user.chats.push({from:"Me",message});
            const promise1=user.save();
            const promise2=openai.chat.completions.create({
                "model": "gpt-3.5-turbo",
                "messages": [
                    {"role": "user", "content": message}
                ]
            })
            Promise.all([promise1,promise2]).then((response)=>{
                const answer=response[1].choices[0].message.content;
                socket.emit("chat",{answer});
                if(user){
                    user.chats.push({from:"AI",message:answer})
                    user.save().catch(()=>{
                        console.log("error in storing message of gpt")
                    });
                }
            }).catch(()=>{
                socket.emit("chat",{error:"Server Error. Try Again"});
            })

        }


    })
})
