import { useState, useEffect } from "react";
import io from "socket.io-client";

const useSocketIo = (
  userId,
  namespace = "",
  socketConfig = {
    // withCredentials: true, // cookie
    reconnection: true, // erlaubt erneute verbindung
    reconnectionAttempts: 3, // max. verbindungsversuch
    // query: {
    //   token: "token",
    //   userId: "kann zur sicherheitsRaum benutzt werden",
    // },
    /*io.use((socket, next) => {
      const token = socket.handshake.query.token;
      const userId = socket.handshake.query.userId;
      // Verarbeite die Informationen hier.
      next();     sokann man in backend query erreicht werden
    });*/
    // timeout: 15000, // verbindungsabruch nach 15sek
    timestampRequests: true, // zeitstempel bei jeden request hinzufügen
    timestampParam: "zeitstempl",
    // transports: ["websocket", "polling"], //verbindungsart nach partial
  },
  roomObject = { chatMessages: [], participants: [], comments: [], }
) => {
  const [socket, setSocket] = useState(null);

  //hier wird nachrichten verschickt
  useEffect(() => {
    const newSocket = io(`${process.env.SERVER}${namespace}`, socketConfig);

    newSocket.on("connect", () => {
      console.log("Socketio Verbunden");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socketio Verbindungsfehler:", error);
      // Füge hier die Fehlerbehandlung hinzu, z.B. Anzeigen einer Fehlermeldung im UI.
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const createRoom = (roomName = "", groupchat = false) => {

    if (socket && roomName && groupchat && userId) {
      const roomData = {
        ...roomObject,
        chatName: roomName,
        groupchat: groupchat , 
        chatAdmin: userId , 
      };

      return socket.emit("groupRoom", {
        roomChatData: roomData,
      });
    }
    if (socket && !roomName && !groupchat) {
      return socket.emit("singleRoom", {
        roomChatData: { ...roomObject },
      });
    } 
      console.log("useSocketio >createRoom >> something is wrong");
    }
  };

  const sendMessage = (
    // überspringe default parameter mit undefined
    content,
    likes = 0,
    emojis,
    images,
    voices,
    videos,

  ) => {
    if (socket) {
      if (typeof messageText !== 'undefined') {
        const messageData = {
          sender: userId,
          content: content,
          likes: typeof likes !== 'undefined' ? likes : 0,
          emojis: typeof emojis !== 'undefined' ? emojis : [],
          images: typeof images !== 'undefined' ? images : [],
          voices: typeof voices !== 'undefined' ? voices : [],
          videos: typeof videos !== 'undefined' ? videos : [],  
        };

        socket.emit("sendMessage", messageData);
    }
  };

  return { socket, createRoom, sendMessage };
};

export default useSocketIo;

//   likes: [], // Array von User-IDs, die den Beitrag mögen
//   emojis: [], // Hier können Emojis hinzugefügt werden
//   images: [], // Hier können Bild-URLs hinzugefügt werden
//   voices: [], // Hier können Audio-URLs hinzugefügt werden
//   videos: [], // Hier können Video-URLs hinzugefügt werden
