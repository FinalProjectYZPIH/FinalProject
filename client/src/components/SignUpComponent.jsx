import React from 'react';
import { ButtonSignIn } from './Buttons';
import { Inputs } from './Inputs';

export const SignUpComponent = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className="p-10 m-10 h-screen w-screen-sm bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="text-4xl text-white-bold text-center mb-6">SIGN UP</h1>
                <form action="">
                    <Inputs label="First Name" ph="Enter your first name" />
                    <Inputs label="Last Name" ph="Enter your last name" />
                    <Inputs label="Username" ph="Choose a username" />
                    <Inputs label="Email" ph="Enter your email" type="email" />
                    <Inputs label="Confirm Email" ph="Confirm your email" />
                    <Inputs label="Birthday" ph="Enter your birthday" />
                    <Inputs label="Password" ph="Choose a password" />
                    <Inputs label="Confirm Password" ph="Confirm your password" />
                    <ButtonSignIn />
                </form>
            </div>
        </div>
    );
};