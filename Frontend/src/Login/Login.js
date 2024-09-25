import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Use useNavigate hook
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post('http://localhost:8081/login', { email, password })
      .then((res) => {
        setLoginStatus(res.data.status);

        if (res.data.status === 'Login success') {
          // Redirect based on the received path
          navigate(res.data.redirect);
        } else {
          // Show error message if login fails
          setShowErrorMessage(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowErrorMessage(true);
      });
  }

  return (
    <div className='background'>
      <div className='shape-one'></div>
      <div className='shape-two'></div>

      <form onSubmit={handleSubmit} className='login-form'>
      <h3 style={{ color: 'black' }}>Login Here</h3>


      <label htmlFor='username' style={{ color: 'black' }}>Username</label>


        <input
          type='text'
          placeholder='Enter email '
          id='username'
          className='form-control'
          onChange={(e) => setEmail(e.target.value)}
        />

<label htmlFor='password' style={{ color: 'black' }}>Password</label>


        <input
          type='password'
          placeholder='Enter password'
          id='password'
          className='form-control'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit'>Log In</button>

        {showErrorMessage && (
          <div className='message-container'>
            <p className='error'>Invalid credentials</p>
            <button onClick={() => setShowErrorMessage(false)}>Try Again</button>
          </div>
        )}

        
      </form>
    </div>
  );
}

export default Login;
