import React, { useEffect } from 'react'
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "./register.css"
import api from "../../api";



function Register() {
  const navigate = useNavigate();
    const fullname = useRef();
    const username = useRef();
    const emailid = useRef();
    const password = useRef();
    const confirmpassword = useRef();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    api.get('/auth/')
    .then(res=>{
      if(res.data._id){
        navigate('/feed')
      }
    }).catch(err => console.log(err))
  console.log(emailid.current.value)
    
  }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (confirmpassword.current.value !== password.current.value) {
            confirmpassword.current.setCustomValidity("Passwords don't match!");
        } else {
          const user = {
            userName: username.current.value,
            fullName: fullname.current.value,
            email: emailid.current.value,
            password: password.current.value,
          };
        
          try {
            await api.post("/auth/register", user)
            .then(response => {
              console.log("Response data:", response.data);
              navigate('/getinfo/'+response.data._id);
              
          })
          .catch(error => {
              console.log("Error:", error);
              
          });
           
          } catch (err) {
            console.log(err);
          }
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
        <h2>Create Account</h2>
        <form className='form' onSubmit={handleSubmit}>
                <div className='input'>
                <label for="fullname">Full Name</label>
                <input type="text" ref={fullname} id="fullname" required/>
                </div>

                <div className='input'>
                <label for="username">Username</label>
                <input type="text" ref={username} id="username" required/>
                </div>

                <div className='input'>
                <label for="email">Email</label>
                <input type="email" ref={emailid} id="email" required/>
                </div>

                <div className='input'>
                <label for="password">Password</label>
                <input type="password" ref={password} id="password" required/>
                </div>

                <div className='input'>
                <label for="confirm-password">Confirm Password</label>
                <input type="password" ref={confirmpassword} id="confirm-password" required/>
                </div>

                <div class="policy">
                    <a href="#">Check Policy</a>
                    <label className="policy-content">
                        <input className='checkbox' type="checkbox" required/>
                        <div>
                        Please confirm that you agree to our privacy policy
                        </div>
                    </label>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
        
       
           
        </div>
        </div>
    </div>
  )
}

export default Register