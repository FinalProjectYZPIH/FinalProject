import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonGoogle } from '../components/Buttons.jsx';
import { ButtonLogin } from '../components/Buttons.jsx';
import { ButtonSignIn } from '../components/Buttons.jsx';


export const LoginComponent = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    
    return (
        <div className='flex items-center justify-center'>
            <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="text-4xl text-white-bold text-center mb-6">LOGIN</h1>
                <ButtonGoogle />
                <form action="" method="post" onSubmit={handleSubmit}>
                    <div className="relative my-4">
                        <input type="email" name='email' className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600" />
                        <label htmlFor="email" className="absolute text-sm text-white bg-transparent duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75">Your Email</label>
                    </div>

                    <div className="relative my-4">
                        <input type="password" name="password" className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600" />
                        <label htmlFor="password" className="absolute text-sm text-white bg-transparent duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75">Your Password</label>
                    </div>
                    <div>
                        <div>
                            <input type="checkbox" name="checkbox" id="checkbox" />
                            <label htmlFor="">Remember Me</label>
                        </div>
                        <button type='sumbit' className='border border-1 bg-red-100'>Login</button>
                        <ButtonLogin>Login</ButtonLogin>
                        <span>Forgot Password</span>
                    </div>
                    <div>
                        {/* <span>New here? <Link to='/Signup'><ButtonSignIn /></Link> </span> */}
                    </div>
                </form>
            </div >
        </div >
    )
}
