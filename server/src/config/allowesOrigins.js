import { CorsOptions } from "cors";
import "dotenv/config";

const localPort = `http://localhost:${process.env.PORT || 3500}`;
const dbPort = "http://localhost:5173";  //https://example.com"  //ProductionUrl

const allowedOrigins = [localPort, dbPort];

export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin ) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
