
import React from 'react';
import '../index.css';
// import { useNavigate } from 'react-router-dom';
import { Button } from './Buttons'
import { Inputs } from './Inputs';
import backgroundImages from '../../tailwind.config.js'
import { useColorStore, useDarkLightMode } from "../context/data/dataStore";
export const SignUpComponent = () => {
    const { lightMode, setDarkMode } = useDarkLightMode();
    return (
        <div
            className={`font-orbitron grid grid-cols-1 lg:grid-cols-2 w-screen h-screen sm:bg-cover sm:bg-center bg-no-repeat lg:bg-contain lg:bg-right ${lightMode ? "dark" : "light"
                }`}
        >
            <div className='flex items-center justify-center  bg-cover bg- h-screen'  >
                <div className="flex flex-col justify-evenly items-center w-2/3 lg:w-auto h-screen">
                    <div className=" m-10 h-screen-sm w-screen-sm border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-25">
                        <h1 className="text-4xl text-blue-600 text-center mb-6">SIGN UP</h1>
                        <form action="">
                            <Inputs label="First Name" ph="Enter your first name" type="text" />
                            <Inputs label="Last Name" ph="Enter your last name" type="text" />
                            <Inputs label="Username" ph="Choose a username" type="text" />
                            <Inputs label="Email" ph="Enter your email" type="email" />
                            <Inputs label="Confirm Email" ph="Confirm email" type="email" />
                            <Inputs label="Birthday" ph="Enter your birthday" type="date" />
                            <Inputs label="Password" ph="Choose a password" type="password" />
                            <Inputs label="Confirm Password" ph="confirm password" type="password" />
                            <div className='text-center'>
                                <input type="checkbox" name="checkbox" id="checkbox" />
                                <label htmlFor="checkbox" className='text-cyan-400 p-5'>agree2theTermsOfUse</label>
                            </div>
                            <Button>Sign In </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

