
import express from "express"
import http from "http"
import {Server} from "socket.io";
const app=express();
const httpServer=http.createServer(app);
const io=new Server(httpServer,{
    cors: {
        origin: [`${process.env.WEBSITE}`],
        methods:['GET','POST']
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

