
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Buttons.jsx';
import { MediaButtons } from './Buttons.jsx';
import { GoogleIcons } from '../assets/Icons.jsx';
import { FacebookIcons } from '../assets/Icons.jsx';
import { Inputs } from './Inputs.jsx';
import backgroundImages from '../../tailwind.config.js';

export const LoginComponent = () => {
    return (
        <div className='flex items-center justify-center bg-bgLightMode bg-cover h-screen w-screen-sm bg-cover' >
            <div className="p-10 m-10 h-screen-sm w-screen-sm bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-25">
                <h1 className="text-4xl font-orbitron text-cyan-500 text-center mb-11 border-b-4  border-cyan-400 p-4 ">LOGIN</h1>

                <form action="" method="post">

                    <Inputs label="email" ph="enter your @" type="email">email</Inputs>
                    <Inputs label="password" ph="enter your password" type="password">password</Inputs>
                    <div>

                        <Button>Login</Button>
                        <p className='text-cyan-400 p-5  text-sm text-center'>Forgot Password</p>
                        <div className='text-center'>
                            <input type="checkbox" name="checkbox" id="checkbox" />
                            <label htmlFor="checkbox" className='text-cyan-400 p-5'>Remember Me</label>
                            <p className='text-cyan-400 p-5 text-center'>or </p>
                        </div>

                        <div className='h-24'>

                            <MediaButtons> <GoogleIcons />sign in with google</MediaButtons>
                            <MediaButtons><FacebookIcons />sign in with facebook</MediaButtons>
                        </div>

                    </div>
                    <div>
                        <p className='text-cyan-400 p-5 text-sm text-center'>New here? <Link to='/Signup'><Button>Sign In</Button></Link> </p>
                    </div>
                </form>
            </div>
        </div >
    );

};
