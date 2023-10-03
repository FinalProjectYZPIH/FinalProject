

// Für das Zeigen von Befehle und Pfade und Zeiten zur Übersicht
const logger = async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
  const { method, path, params } = req;

  const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // Monat ist 0-basiert
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const formattedTime = `${year}-${month}${hours}:${minutes}`;
  console.log(`Development Mode: ${method} ${path} ${formattedTime}`);
  console.log("Parameters:", params);

  if (method === "GET") {
  } else if (method === "POST") {
  }

//   Sie können auch Fehlerausgaben hinzufügen, um Fehler zu debuggen
  console.error('An error occurred during development.');
  next();

    } else {
      // Wenn nicht im Entwicklungsmodus, führen Sie die nächste Middleware aus
      next();
    }
};

export default logger;
