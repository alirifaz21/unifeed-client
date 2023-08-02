import React, { useEffect } from 'react'
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "./login.css"


function Login() {
  const navigate = useNavigate();

    const username = useRef();
 
    const password = useRef();
   
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8800/api/auth/')
    .then(res=>{
      if(res.data._id){
        navigate('/feed')
      }
    }).catch(err => console.log(err))
  
    
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const user = {
      userName: username.current.value,
     
      password: password.current.value,
    };
  
    try {
      const response = await axios.post("http://localhost:8800/api/auth/login", user);
      console.log("Response data:", response.data);
      navigate('/feed');
    } catch (error) {
      console.log("Error:", error);
    }
  };
        
     

  return (
    <div className='register'>
          <div class="container">
        <div className="left-container">
            <h2>Welcome!</h2>
            <p>Please fill in the form to create an account.</p>
        </div>
        <div className='right-container'>
        <div className='right-content'>
        <h2>Login</h2>
        <form className='form' onSubmit={handleSubmit}>
             

                <div className='input'>
                <label for="username">Username</label>
                <input type="text" ref={username} id="username" required/>
                </div>

            

                <div className='input'>
                <label for="password">Password</label>
                <input type="password" ref={password} id="password" required/>
                </div>



              

                <button type="submit">Submit</button>
            </form>
        </div>
        
       
           
        </div>
        </div>
    </div>
  )
}

export default Login