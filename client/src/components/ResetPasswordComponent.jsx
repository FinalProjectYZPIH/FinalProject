// ResetPasswordComponent.js
import React, { useState } from 'react';

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

            <input
                type="email"
                placeholder="Ihre E-Mail-Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendResetLink}>Passwort zurücksetzen</button>

            <p>{message}</p>
        </div>
    );
}
