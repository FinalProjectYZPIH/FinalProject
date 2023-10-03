import { logError } from "../utils/writeFile.js";

export async function errorHandler(err, req, res, next) {
  try {
    logError(err);
  } catch (error) {
    // Führen Sie die Fehlerbehandlung durch.
    res.status(500).send("Internal Server Error");
  }
}
