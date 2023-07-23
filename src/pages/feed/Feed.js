import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Feed() {
  axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    useEffect(() => {
      axios.get('https://unifeed-server.onrender.com/api/auth/')
      .then(res=>{
        if(!res.data._id){
          navigate('/register')
        }
      }).catch(err => console.log(err))
    
      
    }, [])
    
    const handlelogout =() =>{
      axios.get('https://unifeed-server.onrender.com/api/auth/logout')
      .then(res =>{
        navigate('/login')
      }).catch(err=>console.log(err))
    }
    
    return (
      <div>
      <button onClick={handlelogout}>Logout</button>
      <div>feed</div>
      </div>
    )
}

export default Feed