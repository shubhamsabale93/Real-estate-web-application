import mongoose from "mongoose";
import { Schema,model } from "mongoose";

const userSchema=new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    dob:{
        type:Date,
        required:true
    }
}
,{
    timestamps:true
})

const user=model("User",userSchema)
export default user

