// external module
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import session from "express-session";

// routes
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import googleAuthRoute from "./routes/google.auth.js";
import facebookAuthRoute from "./routes/facebook.auth.js";
import messengerTestRoute from "./routes/messengerTest.route.js";
import friendRequestRoute from "./routes/friendRequest.route.js";
// import chatRoute from "./routes/chat.route.js";

// config
import { corsOptions } from "./config/allowesOrigins.js";
import dbConnection from "./config/dbConnection.js";

// importieren passportConfig.js
import passport from "./config/passport.Config.js";

// helper
import { errorHandler } from "./helpers/middleware/errorHandler.js";
import { logError } from "./helpers/utils/writeFile.js";
import deserializeUser from "./helpers/middleware/deserializeUser.js";
import logger from "./helpers/middleware/logger.js";
import deleteExpiredMessages from "./helpers/middleware/deleteExpiredMessages.js";

//socketio
import { createSocket, socketInitiation } from "./socketio/app.js";

// generate random Token 32bit for bcrypt

// import crypto from "crypto"
// const generateRandomKey = (length) => {
//   return crypto.randomBytes(length).toString('base64');
// };
// console.log(generateRandomKey(32));


import {instrument} from "@socket.io/admin-ui"

dotenv.config();
const port = process.env.PORT || 3500;
const app = express();

// nutze express-session
app.use(session({
    secret: "commet-chat-app",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
  })
);

app.use(cors(corsOptions));

export const { httpServer, io } = createSocket(app);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// console Übersicht logs   anpassbar short tiny combined dev >>https://github.com/expressjs/morgan#readme
// app.use(morgan("short"))

dbConnection();

//lösche die abgelaufene Nachrichten
deleteExpiredMessages();

app.use(mongoSanitize()); // Schützt vor absichtigen query Befehleangriffe bei mongodb
app.use(helmet());

app.use(helmet.contentSecurityPolicy()); //Aktiviert eine Content-Security-Policy, um XSS-Angriffe zu verhindern. (die Verwendung von nicht vertrauenswürdigem JavaScript und anderen Ressourcen auf Ihren Seiten einschränkt)
app.use(helmet.frameguard({ action: "deny" })); //Verhindert Klickjacking-Angriffe, indem es die Verwendung von iframes und Frames auf Ihren Seiten steuert
app.use(helmet.hsts()); //Aktiviert HTTP Strict Transport Security (HSTS) für sichere Verbindungen. (Man-in-the-Middle-Angriffen)
app.use(helmet.ieNoOpen()); //Verhindert, dass IE Inhalte in der Zone "Internet" öffnet.
app.use(helmet.noSniff()); //Verhindert das Sniffen von MIMETypen. (MIME-Spoofing-Angriffe)
app.use(helmet.permittedCrossDomainPolicies()); //Legt den Wert des X-Permitted-Cross-Domain-Policies-Headers fest, um Sicherheitsprobleme im Zusammenhang mit Cross-Domain-Policies zu adressieren.
app.use(helmet.referrerPolicy()); //Setzt den Referrer-Policy-Header.
app.use(helmet.xssFilter()); //Aktiviert den X-XSS-Protection-Header. (XSS-Angriffe in einigen Webbrowsern zu verhindern)

app.use(compression()); // verringert die datenverkehrsgröße und erhöht die geschwindigkeit der datenverkehr paket>> https://www.npmjs.com/package/compression
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.disable("x-powered-by");

// app.use(express.static("public"))

// Passport nutzen
app.use(passport.initialize());

// socketio
socketInitiation();

// Friendrequest route
app.use("api/friendRequests", friendRequestRoute);

// Chat erstellen route
// app.use("chat", chatRoute);

// google auth routes nutzen
//Hinweis : /api/auth kann oauth nicht akzeptieren so es soll nur /auth sein
app.use("/auth/google", googleAuthRoute);
app.use("/auth/facebook", facebookAuthRoute);

app.use(deserializeUser) || app.use(passport.session());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/test", messengerTestRoute);
// app.use("/dbUpload", fileRoute)

app.use(errorHandler);

// Bei der einmalige connection mit Datenbank wird app.listen erst aufgerufen
mongoose.connection.once("open", () => {
  logger.info("DB connected");
  httpServer.listen(port, () =>
    console.log(`server started at port http://localhost:${port}`)
  );
});

mongoose.connection.on("error", (err) => {
    logger.error(err, "MONGODB FEHLER >>")
    // console.log(err, `${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`);
  });