import {Mongoose, Schema} from "mongoose";

// const mongoUserDbUrl=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@users.cpu4cek.mongodb.net/${process.env.USER_DB}?retryWrites=true&w=majority`
// const mongoChatDbUrl=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@users.cpu4cek.mongodb.net/${process.env.CHAT_DB}?retryWrites=true&w=majority`
const mongoUserDbUrl=`mongodb://localhost:27017/${process.env.USER_DB}`
const mongoChatDbUrl=`mongodb://localhost:27017/${process.env.CHAT_DB}`
export const userDbInstance=new Mongoose();
export const chatDbInstance=new Mongoose();
const Prom1=userDbInstance.connect(mongoUserDbUrl);
const Prom2=chatDbInstance.connect(mongoChatDbUrl)
Promise.all([Prom1,Prom2]).then(()=>{
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
    chatName:{type:String,required:String},
    chats:[{from:String,message:String}]
})

const userModel=userDbInstance.model("userCredentials",userSchema,'userCredentials');
// const conversationModel=chatDbInstance.model("conversations",conversationSchema);

export const findUser=(email:string)=>userModel.findOne({email});
export const createUser=(email:string,password:string,cookie:string)=>new userModel({email,password,cookie});