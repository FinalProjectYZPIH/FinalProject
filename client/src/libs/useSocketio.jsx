import { useState, useEffect } from "react";
import io from "socket.io-client";

const useSocketIo = (
  userId,
  namespace = "",
  socketConfig = {
    // withCredentials: true, // cookie
    // reconnection: true, // erlaubt erneute verbindung
    // reconnectionAttempts: 3, // max. verbindungsversuch
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
    timestampParam: "zeitstempel",
    // transports: ["websocket", "polling"], //verbindungsart nach partial
  },

) => {
  const [socket, setSocket] = useState(null);

  //hier wird nachrichten verschickt
  useEffect(() => {
    const newSocket = io(
      `${import.meta.env.VITE_SERVER}${namespace}`,
      socketConfig
    );

    newSocket.on("connect", () => {
      console.log("Socketio Verbunden");
      setSocket(newSocket);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socketio Verbindungsfehler:", error);
      // Füge hier die Fehlerbehandlung hinzu, z.B. Anzeigen einer Fehlermeldung im UI.
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const createRoom = (
    attachMessage,
    attachParticipantas,
    attachComments,
    roomName = "",
    groupchat = false,
    //roomObject = { chatMessages: [], participants: [], comments: [] }
  ) => {
    if (socket && roomName && groupchat && userId) {
      const roomData = {
        chatMessages: attachMessage,
        participants: attachParticipantas,
        comments: attachComments,
        chatName: roomName,
        groupchat: groupchat,
        chatAdmin: userId,
      };

      return socket.emit("groupRoom", {
        roomChatData: roomData,
      });
    }

    if (socket && !roomName && !groupchat) {
      return socket.emit("singleRoom", {
        roomChatData: {
          chatMessages: [attachMessage] ,
          participants: [userId, attachParticipantas],
          comments: [attachComments],
        },
      });
    }
    console.log("useSocketio >createRoom >> something is wrong");
  };

  const sendMessage = (
    // überspringe default parameter mit undefined
    { content, likes = 0, emojis = [], images = [], voices = [], videos = [] },
    option = undefined
  ) => {
    if (socket) {
      if (typeof content !== "undefined") {
        const messageData = {
          sender: userId,
          content: content,
          likes,
          emojis,
          images,
          voices,
          videos,
        };

        return socket.emit("sendMessage", messageData, option);
      }
    }
  };
  return { socket, createRoom, sendMessage };
};

export default useSocketIo;
