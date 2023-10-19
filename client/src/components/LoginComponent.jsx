
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Buttons.jsx';
import { MediaButtons } from './Buttons.jsx';
import { GoogleIcons } from '../assets/Icons.jsx';
import { FacebookIcons } from '../assets/Icons.jsx';
import { Inputs } from './Inputs.jsx';
import backgroundImages from '../../tailwind.config.js';



// style={{ background: 'url("./src/assets/bg1.jpg")', backgroundPosition: 'center' }}

export const LoginComponent = () => {
    return (
        <div className='flex items-center justify-center bg-bgLightMode bg-cover' >
            <div className="bg-slate-800 bg-opacity-75 md:bg-opacity-25 p-10 m-10 h-screen w-screen  border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm ">
                <h1 className="text-4xl text-white-bold text-center mb-6">LOGIN</h1>
                <MediaButtons> <GoogleIcons />sign in with google</MediaButtons>
                <MediaButtons><FacebookIcons /> sign in with facebook</MediaButtons>
                <form action="" method="post">
                    <Inputs ph="Your Email">your email</Inputs>
                    <Inputs ph="Your Password">your password</Inputs>
                    <div>
                        <div>
                            <input type="checkbox" name="checkbox" id="checkbox" />
                            <label htmlFor="checkbox">Remember Me</label>
                        </div>
                        <Button>Login</Button>
                        <span>Forgot Password</span>
                    </div>
                    <div>
                        <span>New here? <Link to='/Signup'><Button>Sign In</Button></Link> </span>
                    </div>
                </form>
            </div>
        </div >
    );

};
