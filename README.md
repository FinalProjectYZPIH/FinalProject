# ☄️ COMET 

COMET is a Chat application that allows users to interact with others by entering different rooms.

## Installation ⚙️
To install COMET, follow these steps:
1. Clone the repository: `git clone git@github.com:FinalProjectYZPIH/FinalProject.git`
2. Fill in the environment template by creating a `.env` file. Make sure to fill in the configuration for both the client and server, ensuring that both ports are set up to match.
3. Navigate to the **client** folder in your terminal and run the following commands:
   - Install dependencies: `pnpm install`
   - Start the development server: `pnpm run dev`
4. Open the **server** folder in your terminal and run the following commands:
   - Install server dependencies: `pnpm install`
   - Start the server: `pnpm run dev`

## Usage 
Using COMET is user-friendly and intuitive. 
1. Start by logging in or signing up.
2. Choose a room or contact.
3. Begin a conversation 🌟 

## How It Works ❓

COMET relies on several key technologies and architectural concepts to provide a seamless chat experience:

- **WebSockets for Real-Time Communication:** WebSockets enable instantaneous message delivery by establishing a persistent connection between the client and server. COMET leverages the power of Socket.io to implement real-time communication, allowing users to exchange messages in the blink of an eye.

- **Client-Server Architecture:** COMET follows a client-server architecture. The client side is responsible for the user interface and user experience, providing a responsive and interactive chat environment. The server side handles the application's logic, manages the database connection, and ensures data integrity. This division of responsibilities creates an efficient and scalable system.

- **MongoDB for Data Storage:** MongoDB, a NoSQL database, plays a central role in COMET. It efficiently stores and retrieves chat messages and user data, ensuring that conversations are always accessible and up to date. The flexibility of MongoDB accommodates the dynamic nature of chat applications.

- **Security with Middleware:** COMET takes security seriously. Middleware components like Helmet enhance the security of the application. Helmet provides various layers of protection, including Content Security Policy, XSS prevention, and other security headers, making the application resistant to common web vulnerabilities.

- **Authentication with Passport:** Passport is used to provide secure authentication options. COMET supports authentication through Google and Facebook, giving users the flexibility to log in with their preferred credentials. This ensures that user accounts are protected and that only authorized individuals can access the application.

## Take a Look 📷 
![code_final-comet](https://github.com/FinalProjectYZPIH/FinalProject/assets/118743727/fa9c3020-44d7-4d1b-b4c0-12a2a7658cc6)


## Tools 🧰

|Frontend                                                            |Backend                                                                                     |
|:------------                                                       |:------------                                                                               |
| Vite: The build tool and development server for the frontend.      | Express: A popular web framework for Node.js, used for creating APIs.                      |
| React: The primary framework for the user interface.               | Node.js: JavaScript runtime environment.                                                   |
| Socket.io: A library for real-time communication over WebSockets.  | socket.io: A library for real-time communication over WebSockets.                          |
| Axios: HTTP client for server communication.                       | MongoDB:  A scalable, document-oriented NoSQL database used for storing and managing data. |
| Tailwind CSS: Utility-first CSS framework.                         | Authentication middleware for Node.js.                                                     |


## What's Next ❔

While COMET already offers an impressive chat experience, our development team is committed to making it even better. Here are some exciting features and enhancements we're planning to implement in the near future:

- **Image Sharing:** Get ready to share images with your friends and contacts. We're working on enabling image sharing to add a visual element to your conversations.

- **Voice Messages:** We understand the importance of voice communication. That's why we're working on integrating voice messaging capabilities, allowing you to send voice recordings effortlessly.

- **Message Storage:** To enhance your chat history, we plan to implement message storage. This feature will ensure that your messages are securely stored, making it easy to access your conversation history.

- **And More:** Our development roadmap includes various other improvements, including user interface enhancements, performance optimizations, and bug fixes. We're continuously striving to provide you with the best chat experience possible.

Stay tuned for these exciting updates as we work to elevate your COMET experience to new heights. Your feedback and suggestions are always welcome as we aim to make COMET the ultimate chat application for you!


## Contributors 🫀
Imad Teryaki, Pawel Wojciechowski, Yanhui Wu, Zoë Rix 


# ☄️ COMET 

COMET ist eine Chat-Anwendung, die es Benutzern ermöglicht, mit anderen in verschiedene Räume einzutreten.

## Installation ⚙️
Um COMET zu installieren, befolgen Sie diese Schritte:
1. Klone das Repository: `git clone git@github.com:FinalProjectYZPIH/FinalProject.git`
2. Fülle die Umgebungsvorlage aus, indem du eine `.env`-Datei erstellst. Stelle sicher, dass die Konfiguration sowohl für den Client als auch den Server ausgefüllt ist und dass beide Ports übereinstimmen.
3. Navigiere in deinem Terminal zum **client**-Ordner und führe folgende Befehle aus:
   - Abhängigkeiten installieren: `pnpm install`
   - Den Entwicklungsserver starten: `pnpm run dev`
4. Öffne den **server**-Ordner in deinem Terminal und führe die folgenden Befehle aus:
   - Server-Abhängigkeiten installieren: `pnpm install`
   - Den Server starten: `pnpm run dev`

## Verwendung 
Die Verwendung von COMET ist benutzerfreundlich und intuitiv. 
1. Beginne mit dem Einloggen oder Registrieren.
2. Wähle einen Raum oder Kontakt.
3. Starte ein Gespräch 🌟 
   Beachte, dass deine Nachrichten nicht auf dem Server gespeichert werden.

## Wie es funktioniert ❓

COMET basiert auf mehreren Schlüsseltechnologien und architektonischen Konzepten, um eine nahtlose Chat-Erfahrung zu bieten:

- **WebSockets für Echtzeitkommunikation:** WebSockets ermöglichen die sofortige Zustellung von Nachrichten, indem sie eine dauerhafte Verbindung zwischen dem Client und dem Server herstellen. COMET nutzt die Leistung von Socket.io, um die Echtzeitkommunikation zu implementieren und Benutzern den Austausch von Nachrichten im Handumdrehen zu ermöglichen.

- **Client-Server-Architektur:** COMET folgt einer Client-Server-Architektur. Die Client-Seite ist für die Benutzeroberfläche und das Benutzererlebnis verantwortlich und bietet eine reaktionsfähige und interaktive Chat-Umgebung. Die Serverseite bearbeitet die Anwendungslogik, verwaltet die Datenbankverbindung und gewährleistet die Datenintegrität. Diese Aufteilung der Verantwortlichkeiten schafft ein effizientes und skalierbares System.

- **MongoDB zur Datenspeicherung:** MongoDB, eine NoSQL-Datenbank, spielt eine zentrale Rolle in COMET. Sie speichert und ruft Chatnachrichten und Benutzerdaten effizient ab, um sicherzustellen, dass Gespräche immer zugänglich und aktuell sind. Die Flexibilität von MongoDB passt sich der dynamischen Natur von Chat-Anwendungen an.

- **Sicherheit durch Middleware:** COMET nimmt Sicherheit ernst. Middleware-Komponenten wie Helmet erhöhen die Sicherheit der Anwendung. Helmet bietet verschiedene Schutzebenen, einschließlich Content Security Policy, XSS-Verhinderung und anderen Sicherheitsheadern, die die Anwendung resistent gegenüber gängigen Web-Schwachstellen machen.

- **Authentifizierung mit Passport:** Passport wird verwendet, um sichere Authentifizierungsoptionen bereitzustellen. COMET unterstützt die Authentifizierung über Google und Facebook, sodass Benutzer sich mit ihren bevorzugten Anmeldedaten anmelden können. Dies gewährleistet, dass Benutzerkonten geschützt sind und nur autorisierte Personen auf die Anwendung zugreifen können.


## Take a Look 📷 
![code_final-comet](https://github.com/FinalProjectYZPIH/FinalProject/assets/118743727/fa9c3020-44d7-4d1b-b4c0-12a2a7658cc6)

## Werkzeuge 🧰

|Frontend                                                            |Backend                                                                                     |
|:------------                                                       |:------------                                                                               |
| Vite: Das Build-Tool und der Entwicklungsserver für das Frontend. | Express: Ein beliebtes Web-Framework für Node.js, das zur Erstellung von APIs verwendet wird. |
| React: Das Hauptframework für die Benutzeroberfläche.               | Node.js: Laufzeitumgebung für JavaScript.                                                   |
| Socket.io: Eine Bibliothek für Echtzeitkommunikation über WebSockets. | socket.io: Eine Bibliothek für Echtzeitkommunikation über WebSockets.                  |
| Axios: HTTP-Client für die Serverkommunikation.                       | MongoDB: Eine skalierbare, dokumentenorientierte NoSQL-Datenbank zur Speicherung und Verwaltung von Daten. |
| Tailwind CSS: Ein Utility-first CSS-Framework.                         | Authentifizierungsmiddleware für Node.js.                                                     |


## Was kommt als Nächstes? ❔

Obwohl COMET bereits ein beeindruckendes Chat-Erlebnis bietet, verfolgt unser Entwicklungsteam das Ziel, es noch besser zu machen. Hier sind einige aufregende Funktionen und Verbesserungen, die wir in naher Zukunft implementieren werden:

- **Bildfreigabe:** Bereiten Sie sich darauf vor, Bilder mit Ihren Freunden und Kontakten zu teilen. Wir arbeiten daran, die Bildfreigabe zu ermöglichen, um Ihren Gesprächen eine visuelle Komponente hinzuzufügen.

- **Sprachnachrichten:** Wir verstehen die Bedeutung der Sprachkommunikation. Daher arbeiten wir an der Integration von Sprachnachrichten, damit Sie Sprachaufnahmen mühelos senden können.

- **Nachrichtenspeicher:** Zur Verbesserung Ihrer Chat-Historie planen wir die Implementierung eines Nachrichtenspeichers. Diese Funktion stellt sicher, dass Ihre Nachrichten sicher gespeichert werden, sodass Sie einfach auf Ihre Gesprächshistorie zugreifen können.

- **Und mehr:** Unser Entwicklungsplan umfasst verschiedene weitere Verbesserungen, darunter Verbesserungen der Benutzeroberfläche, Leistungsoptimierungen und Fehlerbehebungen. Wir setzen uns kontinuierlich dafür ein, Ihnen das bestmögliche Chat-Erlebnis zu bieten.





