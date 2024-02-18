import React from 'react'
import './login.css'
import '../SignUp/SignUp'
import { FaUser, FaLock } from "react-icons/fa";
import SignUp from '../SignUp/SignUp';


const Login = () => {
    return (
        <div className="container">
            <div className='wrapper'>
                <form action="">
                    <h1>Sign In</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Username' />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Password' />
                        <FaLock className='icon' />
                    </div>
                    <div className="remember-forget">
                        <label>
                            <input type='checkbox' /> Remeber me
                        </label>
                        <a href='#'> Forget password?</a>
                    </div>
                    <button type='submit'>Log in</button>

                    <div className="register-link">
                        <p> Don't have an account ? <a href={<SignUp />}>Sign Up</a></p>
                    </div>
                </form>
            </div>
        </div>

    );
};
export default Login;
