import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//variables
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export async function writeToLogFile(logData, logFilePath) {
  try {
    // Erstellen Sie die WriteStream für die Datei
    const writeStream = fs.createWriteStream(logFilePath, { flags: "a" });

    // Schreiben Sie die Protokolldaten in die Datei
    writeStream.write(logData + "\n");
    writeStream.end();
  } catch (error) {
    console.error("Fehler beim Schreiben in di Protokolldatei", error);
  }
}

export function logRequest(req) {
  const accessPath = path.join(__dirname, "../../..", "access.log");

  // Überprüfen Sie, ob das Verzeichnis für die Datei existiert. Wenn nicht, erstellen Sie es.
  const logDirectory = path.dirname(accessPath);
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
  }
  const logData = `Request Anfrage empfangen: ${req.method} ${req.url}`; 
  writeToLogFile(logData, accessPath);
}

export function logError(error, ettiket="") {
    const errorPath = path.join(__dirname, "../../..", "error.log");
  const errorDirectory = path.dirname(errorPath);
  if (!fs.existsSync(errorDirectory)) {
    fs.mkdirSync(errorDirectory, { recursive: true });
  }
  const logData = `${ettiket} Fehler aufgetreten ${error}`;
  writeToLogFile(logData, errorPath);
}
