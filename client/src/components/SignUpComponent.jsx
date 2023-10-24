
import React from 'react';
import '../index.css'
// import { useNavigate } from 'react-router-dom';
import { Button } from './Buttons'
import { Inputs } from './Inputs';
import backgroundImages from '../../tailwind.config.js'
export const SignUpComponent = () => {

    return (
        <div className='flex items-center justify-center bg-bgLightMode2 h-screen sm:w-screen bg-center bg-no-repeat bg-cover'  >
            {/* <div className='bg-violet-950 bg-opacity-25 mt-8'> */}
            <div className="p-10 m-8 mt-10 h-auto bg-slate-800 border border-slate-400 rounded-md  shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-25">
                <h1 className="text-4xl font-orbitron text-cyan-500 text-center border-b-4  border-cyan-400 p-4 mt-2 mb-6">SIGN UP</h1>
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

