// ResetPasswordComponent.js
import React, { useState } from 'react';
import { Inputs } from './Inputs';
import { Button } from './Buttons.jsx';


export const ResetPasswordComponent = () => {
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
        <div>
            <h1>Forgot Password</h1>
            <p>Bitte geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen.</p>

            <Inputs label="email" ph="enter your email" type="email">enter your email to reset your pw</Inputs>


            <Button onClick={sendResetLink}>Passwort zurücksetzen</Button>

            <p>{message}</p>
        </div>
    );
}
