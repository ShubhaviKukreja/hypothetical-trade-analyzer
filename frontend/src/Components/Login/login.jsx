import React, { useState } from 'react';
import './login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import SignUp from '../SignUp/SignUp';
import Main from '../MainPage/mainpage';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    if(e)e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password
      });
      
      console.log(response.data); // Assuming backend returns some data
      // Set login status to true after successful login
      setLoggedIn(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
      <div className="wrapper" style={{backgroundColor: 'blue'}}>
        {loggedIn ? (
          // Render the Main component when logged in
          <Main />
        ) : (
          // Render the login form when not logged in
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
            <div className="remember-forget">
              <label>
                <input type="checkbox" /> Remember me?
              </label>
              <a href="#"> Forget password?</a>
            </div>
            <button type="submit">Log in</button>

            <div className="register-link">
              <p>
                {' '}
                Don't have an account ? <a href={<SignUp/>}>Sign Up</a>
              </p>
            </div>
          </form>
        )}
      </div>
  );
};

export default Login;
