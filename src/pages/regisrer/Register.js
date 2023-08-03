import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './register.css';
import api from '../../api';

function Register() {
  const navigate = useNavigate();
  const fullname = useRef();
  const username = useRef();
  const emailid = useRef();
  const password = useRef();
  const confirmpassword = useRef();
  axios.defaults.withCredentials = true;

  const [errFeedback, setErrFeedback] = useState('');

  useEffect(() => {
    api
      .get('/auth/')
      .then((res) => {
        if (res.data._id) {
          navigate('/feed');
        }
      })
      .catch((err) => console.log(err));
    console.log(emailid.current.value);
  }, []);

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
        await api
          .post('/auth/register', user)
          .then((response) => {
            console.log('Response data:', response.data);
            navigate('/getinfo/' + response.data._id);
          })
          .catch((error) => {
            console.log('Error:', error.response);
            setErrFeedback(error.response.data);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register-register">
      <div className="register-container">
        <div className="register-left-container">
          <h2 className='register-hey'>HEY THERE!</h2>
          <p>Start your first step out of the BOX</p>
        </div>

        <div className="register-right-container">
          <div className="register-right-content">
            <h2>Create Account</h2>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="register-input">
                <label for="fullname">Full Name</label>
                <input type="text" ref={fullname} id="fullname" required />
              </div>

              <div className="register-input">
                <label for="username">Username</label>
                <input type="text" ref={username} id="username" required />
              </div>

              <div className="register-input">
                <label for="email">Email</label>
                <input type="email" ref={emailid} id="email" required />
              </div>

              <div className="register-input">
                <label for="password">Password</label>
                <input type="password" ref={password} id="password" required />
              </div>

              <div className="register-input">
                <label for="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  ref={confirmpassword}
                  id="confirm-password"
                  required
                />
              </div>

              <div className="register-policy">
                <a href="#">Check Policy</a>
                <label className="register-policy-content">
                  <input className="register-checkbox" type="checkbox" required />
                  <span className="register-policy-text">
                    Please confirm that you agree to our privacy policy
                  </span>
                </label>
              </div>

              <button className='register-button' type="submit">Create Account</button>
              {errFeedback && (
                <span className="register-error-feedback">* {errFeedback}</span>
              )}
            </form>
          </div>
          <div className="register-form-footer">
            Already Have An Account? <a href="/login">Login Here</a>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
