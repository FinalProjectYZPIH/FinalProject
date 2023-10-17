import React from 'react'
import { ButtonSignIn } from './Buttons'

export const SignUpComponent = () => {
    return (
        <div className='flex items-center justify-center' >
            <div className="p-10 m-10 h-screen w-screen-sm bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="text-4xl text-white-bold text-center mb-6">SIGN UP</h1>
                <form action="">
                    <div className='flex justify-center items-center'>
                        <label htmlFor="firstname" className="my-4 text-sm text-white bg-transparent duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75">firstname</label>
                        <input className="my-2 block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600" type="text" placeholder="firstname" />


                    </div>
                    <div className='flex justify-center items-center'>
                        <label htmlFor="lastname" className="my-4 text-sm text-white bg-transparent duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75">lastname</label>

                        <input className=" my-2 block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600" type="text" placeholder="lastname" />

                    </div>

                    <div className='flex justify-center items-center'>
                        <label htmlFor="username" className="my-4 text-sm text-white bg-transparent duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75">username</label>

                        <input className=" my-2 block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600" type="text" placeholder="username" />

                    </div>
                    <div className='flex justify-center items-center'>
                        <label htmlFor="email" className="my-4 text-sm text-white bg-transparent duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75">email</label>

                        <input className="my-2 block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600" type="email" placeholder="email" />
                    </div>

                    <div className='flex justify-center items-center'>
                        <label htmlFor="confirm email" className="my-4 text-sm text-white bg-transparent duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75">confirm email</label>
                        <input className="my-2 block w-72 py-2.3 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600" type="email" placeholder="confirm email" />
                    </div>

                    <div className='flex justify-center items-center'>
                        <label htmlFor="birthday" className="my-4 text-sm text-white bg-transparent duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75">birthday</label>
                        <input className=" my-2 block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600" type="date" placeholder="birthday" />
                    </div>

                    <div className='flex justify-center items-center'>
                        <label htmlFor="password" className="my-4 text-sm text-white bg-transparent duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75">password</label>
                        <input className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600" type="password" placeholder="password" />
                    </div>

                    <div className='flex justify-center items-center'>
                        <label htmlFor="confirm password" className="pl-0 pr-0 my-4 text-sm text-white bg-transparent duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75">confirm password</label>
                        <input className="pr-0 pl-0 block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600" type="password" placeholder="confirm password" />
                    </div>
                    <ButtonSignIn />

                </form>


            </div>
        </div>
    )
}

