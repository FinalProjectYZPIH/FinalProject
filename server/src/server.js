import express from "express";
import helmet from "helmet"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "./helpers/middleware/logger.js";
import cors from "cors";
import corsOptions from "./config/allowesOrigins.js";
import compression from "compression"
import dbConnection from "./config/dbConnection.js";
import morgan from "morgan"
import { errorHandler } from "./helpers/middleware/errorHandler.js";
import { logError } from "./helpers/utils/writeFile.js";
import userRoute from "./routes/user.route.js"

dotenv.config();
const port = process.env.PORT || 3500;
const app = express();
app.use(morgan("short"))  // console Übersicht logs   anpassbar short tiny combined dev >>https://github.com/expressjs/morgan#readme
dbConnection();

app.use(helmet());



app.use(helmet.contentSecurityPolicy());  //Aktiviert eine Content-Security-Policy, um XSS-Angriffe zu verhindern. (die Verwendung von nicht vertrauenswürdigem JavaScript und anderen Ressourcen auf Ihren Seiten einschränkt)
app.use(helmet.frameguard({ action: "deny" })); //Verhindert Klickjacking-Angriffe, indem es die Verwendung von iframes und Frames auf Ihren Seiten steuert
app.use(helmet.hsts()); //Aktiviert HTTP Strict Transport Security (HSTS) für sichere Verbindungen. (Man-in-the-Middle-Angriffen)
app.use(helmet.ieNoOpen()); //Verhindert, dass IE Inhalte in der Zone "Internet" öffnet.
app.use(helmet.noSniff()); //Verhindert das Sniffen von MIMETypen. (MIME-Spoofing-Angriffe)
app.use(helmet.permittedCrossDomainPolicies()); //Legt den Wert des X-Permitted-Cross-Domain-Policies-Headers fest, um Sicherheitsprobleme im Zusammenhang mit Cross-Domain-Policies zu adressieren.
app.use(helmet.referrerPolicy()); //Setzt den Referrer-Policy-Header.
app.use(helmet.xssFilter()); //Aktiviert den X-XSS-Protection-Header. (XSS-Angriffe in einigen Webbrowsern zu verhindern)



app.use(logger); // zum aufzeichnen der befehle etc,  kann jederzeit modifiziert werden oder wenn es nicht nötig ist, nicht benutzen.
app.use(compression()) // verringert die datenverkehrsgröße und erhöht die geschwindigkeit der datenverkehr paket>> https://www.npmjs.com/package/compression
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));  
app.disable("x-powered-by");

// app.use(express.static("public"))

// app.use(deserializeUser)


// app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
// app.use("/dbUpload", fileRoute)
// app.listen(port, () => console.log(`server started at port http://localhost:${port}`));

app.use(errorHandler)

// Bei der einmalige connection mit Datenbank wird app.listen erst aufgerufen
mongoose.connection.once("open", () => {
  console.log("DB connected");
  app.listen(port, () => console.log(`server started at port http://localhost:${port}`));
});

mongoose.connection.on("error", (err) => {
    logError(err, "MONGODB FEHLER >>")
    // console.log(err, `${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`);
  });