import "dotenv/config";


// hier werden die Whitelists festgelegt
const localPort = `http://localhost:${process.env.PORT || 3500}`;
const dbPort = "http://localhost:5173"; 

const allowedOrigins = [localPort, dbPort];

// Cors Einstellungsobjekt
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
