


// export const test = ( socket, io) => {
//     socket.on("join_room", (data) => {
//         socket.join(data);
//         console.log(`User with ID: ${socket.id} joined room: ${data}`);
//       });
    
//       socket.on("send_message", (data) => {
//         socket.to(data.room).emit("receive_message", data);
//       });
    
//       socket.on("disconnect", () => {
//         console.log("User Disconnected", socket.id);
//       });
// }


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
