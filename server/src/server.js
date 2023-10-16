// external module
import express from "express";
import {Server} from "socket.io";
import { createServer } from "http";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";


// routes
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import messengerTestRoute from "./routes/messengerTest.route.js";


// config 
import corsOptions from "./config/allowesOrigins.js";
import dbConnection from "./config/dbConnection.js";


// helper
import logger from "./helpers/middleware/logger.js";
import { errorHandler } from "./helpers/middleware/errorHandler.js";
import { logError } from "./helpers/utils/writeFile.js";
import deserializeUser from "./helpers/middleware/deserializeUser.js";


// generate random Token
// import crypto from "crypto"
// const generateRandomKey = (length) => {
//   return crypto.randomBytes(length).toString('base64');
// };
// console.log(generateRandomKey(32));


dotenv.config();
const port = process.env.PORT || 3500;
const app = express();

app.use(cors(corsOptions));  
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Hier können Sie die gewünschten Ursprünge festlegen oder "*" verwenden, um alle Ursprünge zuzulassen
    methods: ["GET", "POST", "PATCH"], // Erlaubte HTTP-Methoden
  }})
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(morgan("short"))  // console Übersicht logs   anpassbar short tiny combined dev >>https://github.com/expressjs/morgan#readme
dbConnection();


app.use(mongoSanitize()) // Schützt vor absichtigen query Befehleangriffe bei mongodb
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
app.disable("x-powered-by");

// app.use(express.static("public"))


io.on("connection", (socket) => {
  console.log("a user connected"),
  console.log(socket.id)
  socket.on("message", (message) => {
    console.log(message)
    io.emit('socket', `${socket.id.substring(0,2)} said ${message}`)
  })
})

app.use(deserializeUser)

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/test", messengerTestRoute)
// app.use("/dbUpload", fileRoute)

app.use(errorHandler)

// Bei der einmalige connection mit Datenbank wird app.listen erst aufgerufen
mongoose.connection.once("open", () => {
  console.log("DB connected");
  httpServer.listen(port, () => console.log(`server started at port http://localhost:${port}`));
});

mongoose.connection.on("error", (err) => {
    logError(err, "MONGODB FEHLER >>")
    // console.log(err, `${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`);
  });