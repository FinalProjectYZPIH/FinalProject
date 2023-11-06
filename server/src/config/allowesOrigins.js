import "dotenv/config";
import logger from "../helpers/middleware/logger.js";

// hier werden die Whitelists festgelegt
const localPort = `http://localhost:${process.env.PORT || 3500}`;
const dbPort = "http://localhost:5173";
const googleauth = "http://localhost:3000/auth/google";
const adminUi = "https://admin.socket.io"; 

const allowedOrigins = [localPort, dbPort, googleauth, adminUi];
console.log("CORS Boolean",allowedOrigins.includes(dbPort)) 
// Cors Einstellungsobjekt
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  credentials: true,
};

export { corsOptions, allowedOrigins };
