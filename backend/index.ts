import {createUser, findUser} from "./db/dbUtilities";
import express from "express"
import http from "http"
import {Server} from "socket.io";
import cors from "cors"
import {generateCookie} from "./utilities/generateCookie";
const app=express();
app.use(cors({
    origin: [`${process.env.WEBSITE}`],
    methods:['GET','POST']
}))
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
httpServer.listen(process.env.PORT,()=>{
    console.log(`server is listening on`,process.env.PORT)
})

io.on("connection",(socket)=>{
    socket.on("chat",(message:string,conversation_id:string,from:string, to:string)=>{
        //store in db
        socket.to(to).emit(message);
    })
})

