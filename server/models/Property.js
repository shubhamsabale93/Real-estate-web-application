import mongoose from "mongoose";
import { Schema,model } from "mongoose";

const propertySchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required:true
    },
    description:{
        type:String,
        required:true
    }
    
  },{
    timestamps: true,
  });
  
  const property= model("Property", propertySchema);
  
  export default property;
  