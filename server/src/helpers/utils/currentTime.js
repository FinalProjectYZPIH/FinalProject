export function getCurrentTime() {
    const now = new Date(); // Aktuelles Datum und Uhrzeit
    const hours = now.getHours().toString().padStart(2, '0'); // Stunden mit führender Null
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Minuten mit führender Null
    return `${hours}:${minutes}`;
  }