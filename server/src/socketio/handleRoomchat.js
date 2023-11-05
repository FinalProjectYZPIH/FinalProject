import { MessageModel } from "../models/chat.model.js";
import UserModel from "../models/user.model.js";

export function handleRoomchat  ( socket, io){


  socket.on("groupRoom", data => {
   MessageModel.create(data)
    socket.join(data.groupRoom.chatName)
    console.log("console.grouproom",data)
    console.log(`User with ID: ${data.groupRoom.participants[data.groupRoom.participants?.length-1]} joined room: ${data.groupRoom?.chatName}`);
    socket.on("sendMessage", (message, cb) => {
      cb(`${message} received`)
      data.groupRoom.chatMessages.push(message)
      console.log(message)
      socket.to(data.groupRoom.chatName).emit("messages_groupRoom", message)
    } )
  })
  
  
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
}
