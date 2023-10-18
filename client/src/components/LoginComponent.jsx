
import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonGoogle } from '../components/Buttons.jsx';
import { ButtonLogin } from '../components/Buttons.jsx';
import { ButtonSignIn } from '../components/Buttons.jsx';
import { Inputs } from './Inputs.jsx';

export const LoginComponent = () => {
    return (
        <div className='flex items-center justify-center' style={{ background: 'url("./src/assets/bg1.jpg")', backgroundPosition:'center' }}>
            <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="text-4xl text-white-bold text-center mb-6">LOGIN</h1>
                <ButtonGoogle />
                <form action="" method="post">
                    <Inputs ph="Your Email">your email</Inputs>
                    <Inputs ph="Your Password">your password</Inputs>
                    <div>
                        <div>
                            <input type="checkbox" name="checkbox" id="checkbox" />
                            <label htmlFor="checkbox">Remember Me</label>
                        </div>
                        <ButtonLogin />
                        <span>Forgot Password</span>
                    </div>
                    <div>
                        <span>New here? <Link to='/Signup'><ButtonSignIn /></Link> </span>
                    </div>
                </form>
            </div>
        </div>
    );

};
