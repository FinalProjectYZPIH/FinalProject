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
  }
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
    { attachMessages, attachParticipants, attachComments, groupchat },
    roomName = ""
  ) =>
    //roomObject = { chatMessages: [], participants: [], comments: [] }
    {
      let roomData;
      if (socket && roomName && groupchat && userId) {
        roomData = {
          chatMessages: [...attachMessages],
          participants: [...attachParticipants],
          comments: [...attachComments],
          chatName: roomName,
          groupchat: groupchat,
          chatAdmin: userId,
        };

        socket.emit("groupRoom", { groupRoom: roomData });
        return { groupRoom: roomData };
      }

      if (socket && !roomName && !groupchat) {
        roomData = {
          chatMessages: [...attachMessages],
          participants: [userId, ...attachParticipants], // hier sollen nur 2 users sein
          comments: [...attachComments],
        };
        socket.emit("singleRoom", { singleRoom: roomData });
        return { singleRoom: roomData };
      }
      console.log(roomData, "useSocketio >createRoom >> something is wrong");
      return roomData;
    };

  const sendMessage = (
    { content, likes, emojis, images, voices, videos },
    option = undefined
  ) => {
    if (socket) {
      if (
        typeof content !== "undefined" ||
        typeof likes !== "undefined" ||
        typeof emojis !== "undefined" ||
        typeof images !== "undefined" ||
        typeof voices !== "undefined" ||
        typeof videos !== "undefined"
      ) {
        const messageData = {
          sender: userId,
          content, //string
          likes: 0, //number
          emojis: [], //[string]
          images: [], //[string]
          voices: [], //[string]?
          videos: [], //[string]?
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
        socket.emit("sendMessage", messageData, option);

        return messageData;
      }
    }
  };
  return { socket, createRoom, sendMessage };
};

export default useSocketIo;
