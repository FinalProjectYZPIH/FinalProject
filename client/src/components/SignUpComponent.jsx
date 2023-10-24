
import React from 'react';
import '../index.css'
// import { useNavigate } from 'react-router-dom';
import { Button } from './Buttons'
import { Inputs } from './Inputs';
import backgroundImages from '../../tailwind.config.js'
export const SignUpComponent = () => {

    return (
        <div className='flex items-center justify-center bg-bgLightMode bg-cover  h-screen'  >
            <div className=" m-10 h-screen-sm w-screen-sm bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-25">
                <h1 className="text-4xl text-blue-600 text-center mb-6">SIGN UP</h1>
                <form action="">
                    <Inputs label="First Name" ph="Enter your first name" type="text" />
                    <Inputs label="Last Name" ph="Enter your last name" type="text" />
                    <Inputs label="Username" ph="Choose a username" type="text" />
                    <Inputs label="Email" ph="Enter your email" type="email" />
                    <Inputs label="Confirm Email" ph="Confirm your email" type="email" />
                    <Inputs label="Birthday" ph="Enter your birthday" type="date" />
                    <Inputs label="Password" ph="Choose a password" type="password" />
                    <Inputs label="Confirm Password" ph="Confirm your password" type="password" />
                    <div className='text-center'>
                        <input type="checkbox" name="checkbox" id="checkbox" />
                        <label htmlFor="checkbox" className='text-cyan-400 p-5'>agree2theTermsOfUse</label>
                    </div>
                    <Button>Sign In </Button>
                </form>
            </div>
        </div>
        // </div>
    );
};

