import { useState, useEffect } from "react";
import io from "socket.io-client";

const useSocketIo = (
  userId,
  namespace = "",
  socketConfig = {
    withCredentials: true, // cookie

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
    // reconnection:true,
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

    // newSocket.on("disconnect", () => {
    //   newSocket.connect()
    // })

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const createRoom = (
    { attachMessages, attachParticipants, attachComments,type },
     // single or group  String
    roomName = ""
  ) =>
    //roomObject = { chatMessages: [], participants: [], comments: [] }
    {
      console.log([socket, roomName, userId].map((value) => Boolean(value)));
      let roomData;
      if (socket && type === "group" && userId) {
        roomData = {
          type,
          chatName: roomName,
          chatMessages: [...attachMessages],
          participants: [...attachParticipants],
          comments: [...attachComments],
          chatAdmin: userId,
        };

        socket.emit("groupRoom", roomData, roomName);
        return roomData;
      }

      if (socket && type === "single" && userId) {
        roomData = {
          type,
          chatName: roomName,
          chatMessages: [...attachMessages],
          participants: [userId, ...attachParticipants], // hier sollen nur 2 users sein
          comments: [...attachComments],
        };
        socket.emit("singleRoom", roomData);
        return roomData;
      }

      console.log(roomData, "useSocketio >createRoom >> something is wrong");
      return roomData;
    };

  const sendMessage = (
    { content, likes, emojis, images, voices, videos },
    roomName,
    option = undefined
  ) => {
    if (!socket) { return null, console.log("socket is not connected")}
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
        socket.emit("sendMessage", messageData, roomName ,option);

        return messageData;
      }
    
    
  };
  return { socket, createRoom, sendMessage };
};

export default useSocketIo;

// {
//   type: 'single',
//   chatName: 'SingleRoomName',
//   chatMessages: [{ content: 'Guten Nachmittag!', likes: 5, emojis: [] }],
//   participants: ['Yan', 'Zoe'],
//   comments: [{ content: 'sample coments', likes: 5, emojis: [] }],
// },
// {
//   type: 'group',
//   chatName: 'Room_League',
//   chatAdmin: 'Zoe',
//   chatMessages: [{ content: "Welcome to Zoe's Room", likes: 5, emojis: [] }],
//   participants: ['userid', 'user2', 'user3'],
//   comments: [{ content: 'sample coments', likes: 5, emojis: [] }],
// },
