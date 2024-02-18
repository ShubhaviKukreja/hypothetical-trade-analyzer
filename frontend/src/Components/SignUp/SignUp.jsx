import React from 'react'
import './SignUp.css'
import Login from '../../../../src/Components/Login/login'
import { FaUser,FaLock , FaPhoneAlt , FaUnlock} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const SignUp = () => {
  return (
    <div className='wrapper'>
        <form action="">
            <h1>Create account</h1>
            <div className='input-box'>
                <input type='text' placeholder='Username' />
                <FaUser className='icon'/>
            </div>
            <div className='input-box'>
                <input type='text' placeholder='Email' />
                <MdEmail className='icon'/>
            </div>
            <div className='input-box'>
                <input type='text' placeholder='Mobile Number' />
                <FaPhoneAlt className='icon'/>
            </div>
            <div className='input-box'>
                <input type='password' placeholder='Password' />
                <FaLock className='icon'/>
            </div>
            <div className='input-box'>
                <input type='password' placeholder='Confirm Password' />
                <FaUnlock className='icon'/>
            </div>
            <button type='submit'>Register</button>

            <div className="register-link">
                <p> Already have account ? <a href={<Login/>}>Login</a></p>
            </div>
        </form>
    </div>  
  );
};
export default SignUp;
