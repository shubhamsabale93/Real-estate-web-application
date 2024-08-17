import React, {useState}from 'react'
import toast,{Toaster} from 'react-hot-toast'
import axios from 'axios'
import './AddProperty.css'

function AddProperty() {
    const[title,settitle]=useState('')
    const[description,setdescription]=useState('')
    const[imageURL,setimageURL]=useState('')
    const[contact,setcontact]=useState('')

    const addProperty=async()=>{
        if(!title|| !imageURL|| !contact|| !description){
            toast.error("Please enter all details");
            return
           
        }
        const response= await axios.post(`${process.env.REACT_APP_URL}/postProperty`,{
          title:title,
          description:description,
          imageURL:imageURL,
          contact:contact
        })
        

        settitle('')
        setimageURL('')
        setcontact('')
        setdescription('')
      

        toast.success(response.data.message)

          
        
    }
  return (
    <div>
        <h1 className='App-heading'>Add A New Property</h1>
       <from className='form-head'>
        <input type='text' placeholder='Enter Title of Property' className='btn-input'
        value={title}
         onChange={(e)=>settitle(e.target.value)}
        />
        

        <input type='text' placeholder=' contact' className='btn-input'
          value={contact} onChange={(e)=>setcontact(e.target.value)}/>
          <br/>

        
        <input type='text' placeholder='ImageURL' className='btn-input'
         value={imageURL} onChange={(e)=>setimageURL(e.target.value)} />

        <input type='text' placeholder='Address' className='btn-input'
          value={description} onChange={(e)=>setdescription(e.target.value)}/>

       

        </from>
        <br/>
        <button type='Button' onClick={addProperty} className='btn-addplant'>Add</button>
        <Toaster/>
    </div>
  )
}

export default AddProperty