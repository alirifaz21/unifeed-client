import React, { useEffect } from 'react';
import axios from "axios";
import { useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
import api from "../../api";
import bgImage from "./background.png";
import './login.css';

function Login() {
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    api.get('/auth')
      .then(res => {
        if (res.data._id) {
          navigate('/feed');
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      userName: username.current.value,
      password: password.current.value,
    };

    try {
      const response = await api.post("/auth/login", user);
      console.log("Response data:", response.data);
      navigate('/feed');
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className='login-login-container'>
      <div className='login-left-container'>
        <h2>Welcome<br class="mobile-hidden" />&nbsp;Back!</h2>
        <p>Please fill in the form to log in.</p>
      </div>
      <img className='login-bgYellow' src={bgImage} alt="background" />
      <div className='login-right-container'>
        <div className='login-right-content'>
          <form className='login-form' onSubmit={handleSubmit}>
            <h2 className='login-logintext'>Login</h2>
            <div className='login-input'>
              <label htmlFor="username">Username or email</label>
              <input type="text" ref={username} id="username" required />
            </div>
            <div className='login-input'>
              <label htmlFor="password">Password</label>
              <input type="password" ref={password} id="password" required />
            </div>
            <div className='login-input check'>
              <input type="checkbox" /> <span className='login-span'>&nbsp;Keep me signed in</span>
            </div>
            <button className='login-button' type="submit">Login</button>
          </form>
        </div>
        <div className="login-right-bottom">
          Want To Create A New Account? &nbsp; <Link to="/register" className='login-linktext'>Sign Up</Link>
        </div>
      </div>






    </div>
  );
}

export default Login;
