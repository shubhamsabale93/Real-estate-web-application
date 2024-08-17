import React from 'react'
import "./PropertyCard.css"
import axios from 'axios'
import toast,{Toaster} from 'react-hot-toast'
import { Link } from 'react-router-dom'

function PropertyCard({_id,title,imageURL,contact,description,loadProperty}) {
  const deleteProperty=async(Propertyid)=>{
    const response= await axios.delete(`${process.env.REACT_APP_URL}/deleteProperty/${Propertyid}`)
    toast.success(response.data.message)
    loadProperty()


}
  
  return (
    <div className='container'>
      <h1 className='head'>{title}</h1>
      <p className='elements'>Address:{description}</p>
      <p className='elements'>Contact:{contact}</p>
      <img src={imageURL} alt="image" className='IMG'/>
      <br/>

      <button type='button' onClick={()=>{
        deleteProperty(_id)
      }} className='btn'>Delete</button>


      <Link to={`/UpdateProperty/${_id}`}  className="action-button">Update</Link>




    
      
   

      
        <Toaster/>
    </div>
  )
}

export default PropertyCard