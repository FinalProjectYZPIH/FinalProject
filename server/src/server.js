import express from "express";
import helmet from "helmet"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./helpers/middleware/logger.js";
import cors from "cors";
import corsOptions from "./config/allowesOrigins.js";
import compression from "compression"


dotenv.config();
const port = process.env.PORT || 3500;
const app = express();
// dbConnection();

app.use(helmet());


app.use(helmet.contentSecurityPolicy());  //Aktiviert eine Content-Security-Policy, um XSS-Angriffe zu verhindern. (die Verwendung von nicht vertrauenswürdigem JavaScript und anderen Ressourcen auf Ihren Seiten einschränkt)
app.use(helmet.frameguard({ action: "deny" })); //Verhindert Klickjacking-Angriffe, indem es die Verwendung von iframes und Frames auf Ihren Seiten steuert
app.use(helmet.hsts()); //Aktiviert HTTP Strict Transport Security (HSTS) für sichere Verbindungen. (Man-in-the-Middle-Angriffen)
app.use(helmet.ieNoOpen()); //Verhindert, dass IE Inhalte in der Zone "Internet" öffnet.
app.use(helmet.noSniff()); //Verhindert das Sniffen von MIMETypen. (MIME-Spoofing-Angriffe)
app.use(helmet.permittedCrossDomainPolicies()); //Legt den Wert des X-Permitted-Cross-Domain-Policies-Headers fest, um Sicherheitsprobleme im Zusammenhang mit Cross-Domain-Policies zu adressieren.
app.use(helmet.referrerPolicy()); //Setzt den Referrer-Policy-Header.
app.use(helmet.xssFilter()); //Aktiviert den X-XSS-Protection-Header. (XSS-Angriffe in einigen Webbrowsern zu verhindern)


app.use(compression()) // verringert die datenverkehrsgröße und erhöht die geschwindigkeit der datenverkehr paket>> https://www.npmjs.com/package/compression

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cookieParser());
app.use(cors(corsOptions));  
app.disable("x-powered-by");

app.use(express.static("public"))

// app.use(deserializeUser)


// app.use("/api/auth", authRoute);
// app.use("/api/user", userRoute);
// app.use("/dbUpload", fileRoute)
app.listen(port, () => console.log(`server started at port http://localhost:${port}`));



// mongoose.connection.once("open", () => {
//   console.log("DB connected");
//   app.listen(port, () => console.log(`server started at port http://localhost:${port}`));
// });

