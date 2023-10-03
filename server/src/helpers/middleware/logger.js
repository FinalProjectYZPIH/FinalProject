import morgan from "morgan";
import { logError, logRequest } from "../utils/writeFile.js";
import {nanoid} from "nanoid"


// Für das Zeigen von Befehle und Pfade und Zeiten zur Übersicht
const logger = async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
  // const { method, path, params } = req;
  // console.log(`Development Mode: ${method} ${path}`);
  // console.log("Parameters:", params);
  logRequest(req)

  // if (method === "GET") {
  // } else if (method === "POST") {
  // }

//   Sie können auch Fehlerausgaben hinzufügen, um Fehler zu debuggen
  next();

    } else {
      // Wenn nicht im Entwicklungsmodus, führen Sie die nächste Middleware aus
      next();
    }
};

export default logger;
