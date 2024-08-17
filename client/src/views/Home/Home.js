import React ,{useState,useEffect} from 'react'
import PropertyCard from '../../component/PropertyCard/PropertyCard'
import axios from 'axios'
import toast ,{Toaster} from 'react-hot-toast'
import "./Home.css"
import AddProperty from '../AddProperty/AddProperty'
import { Link } from 'react-router-dom'



function Home() {

  const[Propertys,setPropertys]=useState([])

  const loadProperty=async()=>{
    toast.loading("Loading properties")
        const response= await axios.get(`${process.env.REACT_APP_URL}/getProperty`)
      
        toast.dismiss()
        toast.success("New Property fetched")
       setPropertys(response.data.data)
  }

  useEffect(()=>{
    loadProperty()
    
},[])


  return (
    
    <div>
      <h2 className='h2-head'>RealEstate Management System</h2>
      <span className='home-logout' onClick={() => {
        localStorage.clear()
        toast.success('Logged out successfully')

        setTimeout(()=>{
          window.location.href = '/login'
        }, 3000)
      }}>
        Logout
      </span>
      <AddProperty/>
      <br/><br/>
    
     

     
      <h1 className='App-heading'>Property-List</h1>

   
    <div className='Home'>
       
      <div className='card'>
       
        {
        Propertys.map((Property,i)=>{
            const{_id,
                title,
                imageURL
                ,contact,
                description}
                =Property
            return (<PropertyCard
                key={i}
                 _id={_id} 
                 title={title}
                 imageURL={imageURL}
                 contact={contact}
                 description={description}
                 loadProperty={loadProperty} />)
        })
    }
    </div>
    <Toaster/>
    </div>
    </div>
  )
}

export default Home