import logger from "../helpers/middleware/logger.js";
import { ChatRoomModel, MessageModel } from "../models/chat.model.js";
import UserModel from "../models/user.model.js";

export function handleRoomchat(socket, io, userId = null) {
  socket.on("groupRoom", async (data) => {
    socket.join(data.chatName);
    console.log("console.grouproom", data);
    console.log(
      `User with ID: ${
        data.participants[data.participants?.length - 1]
      } joined room: ${data?.chatName}`
    );

    // try {
      // const currentUser = await UserModel.findById(userId);
      
      // console.log("current",currentUser)
      // // Erstelle einen neuen Chat-Raum
      // const newChatRoom = new ChatRoomModel({
      //   chatName: data.groupRoom.chatName,
      //   isGroupChat: true,
      //   chatAdmin: userId,
      //   participants: [...data.groupRoom.participants], // Der Ersteller ist der erste Teilnehmer
      //   // Speichere den neuen Chat-Raum in der Datenbank
      // },)

        
        socket.on("sendMessage", async (message, cb) => {
          cb(`${message} received`);
          const newRoom = data.chatMessages.push(message);
          console.log(message);
          // try {
            // const newMessage = new MessageModel(message);
            
            // Speichere die Nachricht im Chat-Raum
            // console.log(newMessage)
            // newChatRoom.chatMessages(newMessage._id);
            // await newChatRoom.save();
            // await newMessage.save();
          // } catch (error) {logger.error("sendMessage error")}
          socket.to(data.chatName).emit("messages_groupRoom", message,newRoom);
        
          // currentUser.chats[newChatRoom._id]
          // await currentUser.save()
          
        });
      // } catch (error) {logger.error("grouproom key fehler"); console.log(error)}
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
}
