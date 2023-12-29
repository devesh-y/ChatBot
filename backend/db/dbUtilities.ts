import {Mongoose, Schema} from "mongoose";

// const mongodbUrl=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@users.cpu4cek.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const mongodbUrl=`mongodb://localhost:27017/${process.env.DB_NAME}`
export const dbInstance=new Mongoose();
dbInstance.connect(mongodbUrl).then(()=>{
    console.log("connected to DB")
}).catch((err)=>{
    console.log(err)
})

const userSchema=new Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
})

const conversationSchema=new Schema({
    _id:{type:String,required:true},
    chats:[{from:String,to:String,message:String,}]
})

const userModel=dbInstance.model("userCredentials",userSchema,'userCredentials');
const conversationModel=dbInstance.model("conversations",conversationSchema);

export const findUser=(email:string)=>userModel.findOne({email});
export const createUser=(email:string,password:string)=>new userModel({email,password});