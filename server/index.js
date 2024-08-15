import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();


import User from './models/User.js'
import Property from './models/Property.js'







const app=express()

app.use(express.json())
app.use(cors())



const connectDB=()=>{
    const conn=mongoose.connect(process.env.MongoDB_URL);
    if(conn){
        console.log(`MongoDB Connected😊`)
    }else{
        console.log(`Please connect mongoDB📞`)
    }
}

connectDB();

app.post("/postSignup",async(req,res)=>{
    const{fullName,email,password,dob}=req.body;
    const user=new User({
        fullName,
        email,
        password,
        dob:new Date(dob)
    });

    try{
        const saveduser= await user.save()
        res.json({
            success:true,
            message:"Signup Successful",
            data:saveduser
        })

    }
    catch(e){
        res.json({
            success:false,
            message:e.message,
            data:null
        })
    }
})


app.post("/postLogin",async(req,res)=>{
    const{email,password}=req.body;

    const user= await User.findOne({
        email:email,
        password:password
    })

    if(user){
        return res.json({
            success:true,
            message:"Login Succssfully",
            data:user
        })
    }else{
        return res.json({
            sucess:true,
            message:"Invalid Crendtials",
            data:null
        })
    }

})



app.get("/health",(req,res)=>{
    res.json({
        success:true,
        message:"API Healthy"
    })
})


//Property API

app.post("/postProperty",async(req,res)=>{
    const { title, imageURL,contact,description } = req.body;

  const property= new Property({
    title,
    imageURL,
    contact,
    description
   
  });

  try {
    const savedProperty = await property.save();

    res.json({
      success: true,
      message: `Property Sucessfully Saved`,
      data: savedProperty
    })
  }
  catch (e) {
    res.json({
      success: false,
      message: e.message,
      data: null
    })
  }
})


app.get("/getProperty",async(req,res)=>{
    

        const allProperty= await Property.find().sort({updatedAt: -1})
    
        res.json({
            sucess:true,
            Data:allProperty,
            message:"Data Fetched Sucessfully"
        })
    
    
})


app.get("/getProperty/:title",async (req,res)=>{
    const {title}=req.params

    const property=await Property.findOne({title:title})
    res.json({
        success:property ? true:false,
        data:property|| null,
        message:property ? "Plant Fetched Sucessfully":"Cannot Be Found"
    })
})


app.put("/updateProperty/:id",async(req,res)=>{
    const{title,imageURL,contact,description}=req.body
    const {id}=req.params
    const updatedResult= await Property.updateOne({_id:id},{
        $set:{
            title:title,
            imageURL:imageURL,
            contact:contact,
            description:description


        }
    })

    const updatedProperty=await Property.findById(id)
    res.json({
        Success:true,
        message:"Plant Updated Successfully",
        data:updatedProperty
       
    })

})



app.delete("/deleteProperty/:id",async(req,res)=>{
   
    

    const {id}=req.params

    await property.deleteOne(
    {
        _id:id

    })

    
    res.json({
        success:true,
        message:"Property Deleted Sucessfully",
        data:null
    })
})



const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})

