import React from 'react'
import { ButtonSignIn } from './Buttons'
import { Inputs } from './Inputs'

export const SignUpComponent = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className="p-10 m-10 h-screen w-screen-sm bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="text-4xl text-white-bold text-center mb-6">SIGN UP</h1>
                <form action="">
                    <Inputs ph="firstname">firstname</Inputs>
                    <Inputs ph="lastname">lastname</Inputs>
                    <Inputs ph="username">username</Inputs>
                    <Inputs ph="email">email</Inputs>
                    <Inputs ph="confirm email">confirm email</Inputs>
                    <Inputs ph="birthday">birthday</Inputs>
                    <Inputs ph="password">password</Inputs>
                    <Inputs ph="confirm password">confirm password</Inputs>
                    <ButtonSignIn />
                </form>
            </div>
        </div>
    )
}
