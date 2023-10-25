// ResetPasswordComponent.js
import React, { useState } from 'react';
import { Inputs } from './Inputs';
import { Button } from './Buttons.jsx';
import { useDarkLightMode } from "../context/data/dataStore.jsx";

export const ResetPasswordComponent = () => {
    const { lightMode, setDarkMode } = useDarkLightMode();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const sendResetLink = () => {

        if (email) {
            const resetMessage = "Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet.";
            setMessage(resetMessage);
        } else {
            setMessage("Bitte geben Sie Ihre E-Mail-Adresse ein.");
        }
    };

    return (
        <div
            className={`font-orbitron grid grid-cols-1 lg:grid-cols-2 w-screen h-screen sm:bg-cover sm:bg-center bg-no-repeat lg:bg-contain lg:bg-right ${lightMode ? "dark" : "light"
                }`}
        >

            <div className='flex justify-center items-center flex-col bg-cover h-screen '  >
                <h1 className='text-cyan-700'>Forgot Something?</h1>
                <p>Bitte geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen.</p>

                <Inputs label="email" ph="enter your email" type="email" >enter your email to reset your pw</Inputs>


                <Button onClick={sendResetLink}>Submit</Button>

                <p>{message}</p>
            </div>
        </div>
    );
}
