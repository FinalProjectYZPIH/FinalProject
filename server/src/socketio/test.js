
let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

export const localTest = ( socket, io) => {
    socket.on("newUser", (username) => {
        addNewUser(username, socket.id);
      });
    
      socket.on("sendNotification", ({ senderName, receiverName, type }) => {
        const receiver = getUser(receiverName);
        io.to(receiver.socketId).emit("getNotification", {
          senderName,
          type,
        });
      });
    
      socket.on("sendText", ({ senderName, receiverName, text }) => {
        const receiver = getUser(receiverName);
        io.to(receiver.socketId).emit("getText", {
          senderName,
          text,
        });
      });
}


// const usersConnections = {}; // Hier wird die Zuordnung zwischen _id und Socket.IO-Verbindungen gespeichert

// // Wenn ein Benutzer sich anmeldet und in der Datenbank gespeichert wird
// const user = {
//   _id: ObjectId("5a934e000102030405000000"),
//   username: "user123",
//   // Andere Benutzerinformationen
// };

// // Wenn der Benutzer eine Socket.IO-Verbindung herstellt
// io.on("connection", (socket) => {
//   // Verknüpfe die Socket.IO-Verbindung mit dem _id des Benutzers
//   usersConnections[user._id] = socket;

//   // Wenn du private Nachrichten an den Benutzer senden möchtest
//   const recipientId = user._id; // _id des Empfängers
//   const message = "Hallo, dies ist eine private Nachricht!";
//   // Finde die Socket.IO-Verbindung des Empfängers und sende die Nachricht
//   if (usersConnections[recipientId]) {
//     usersConnections[recipientId].emit("privateMessage", message);
//   }
// });
