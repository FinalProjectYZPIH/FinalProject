//external module
import express from "express";
import nodemailer from "nodemailer"

import * as authController from "../controllers/auth.controller.js";
//config
import { loginLimiter } from "../config/loginLimiter.js";

//helper



const router = express.Router();

// router.use(verifyRole)


router  //register is at user.controller with createUser function
  .post("/login",loginLimiter, authController.login) //or add with loginLimiter as middleware 
  .get("/tokenRefresh", authController.sessionRefreshHandler)
  .post("/logout", authController.logout)
  .post("mailVerify", sendMailVerify) // on testing

export default router;


async function sendMailVerify(req, res, next){
  const { subject, recipient } = req.body;
//trannsport dienst einstellen SMTP Sendmail oder was anderes

// gmail beispiel  SMTP-Server und Port: Du musst den SMTP-Server und den Port deines E-Mail-Anbieters kennen. Für Gmail ist dies in der Regel smtp.gmail.com und der Port ist 587.

//Authentifizierung: Du musst die Anmeldeinformationen (E-Mail-Adresse und Passwort) für das E-Mail-Konto bereitstellen, von dem aus du die E-Mails senden möchtest. Beachte, dass du für Gmail möglicherweise ein "weniger sicheres App-Passwort" generieren musst, wenn du die E-Mail-Adresse und das reguläre Passwort verwendest.

//TLS/SSL: Gmail erfordert in der Regel eine verschlüsselte Verbindung über TLS/SSL. Du solltest sicherstellen, dass die TLS/SSL-Optionen für den Transport richtig konfiguriert sind.

//etc...

  const transporter = nodemailer.createTransport({ 
    service: process.env.MAILSERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  })
  const mailOptions = {   
    from: "your email",
    to: recipient,
    subject: subject,
    test: "this is a test email"
  };
  
  transporter.sendMail(mailOptions, (error, info) => {  
    if (error) {
      console.log('Fehler beim Senden der E-Mail:', error);
    } else {
      console.log('E-Mail wurde erfolgreich gesendet:', info.response);
    }
  });
}
