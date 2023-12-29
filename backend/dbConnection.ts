import {Mongoose} from "mongoose";

const mongodbUrl=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@users.cpu4cek.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

export const dbInstance=new Mongoose();
dbInstance.connect(mongodbUrl).then(()=>{
    console.log("connected to DB")
}).catch((err)=>{
    console.log(err)
})

