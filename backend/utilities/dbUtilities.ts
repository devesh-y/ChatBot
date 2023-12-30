import {Mongoose, Schema} from "mongoose";

// const mongoUserDbUrl=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@users.cpu4cek.mongodb.net/${process.env.USER_DB}?retryWrites=true&w=majority`
const mongoUserDbUrl=`mongodb://localhost:27017/${process.env.USER_DB}`
export const dbInstance=new Mongoose();
dbInstance.connect(mongoUserDbUrl).then(()=>{
    console.log("connected to DB")
}).catch(()=>{
    console.log("error in connecting to DB")
})
const userSchema=new Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    cookie:{type:String,required:true},
})

const conversationSchema=new Schema({
    email:String,
    chats:[{from:String,message:String}]
})

const userModel=dbInstance.model("userCredentials",userSchema,'userCredentials');
const conversationModel=dbInstance.model("conversations",conversationSchema);

export const findUser=(email:string)=>userModel.findOne({email});
export const createUser=(email:string,password:string,cookie:string)=>new userModel({email,password,cookie});