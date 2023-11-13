import logger from "../helpers/middleware/logger.js";
import ChatRoomModel from "../models/chatRoom.model.js";
import UserModel from "../models/user.model.js";

export function handleRoomchat(socket, io, userId = null) {
  let room;
  socket.on("groupRoom", async (data) => {
    socket.join(data.chatName);
    room = data;
    // console.log("console.grouproom", data);
    // console.log(
    //   `User with ID: ${
    //     data.participants[data.participants?.length - 1]
    //   } joined room: ${data?.chatName}`
    // );

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
           room.chatMessages.push(message);
          console.log("newRoom",room)
          // try {
            // const newMessage = new MessageModel(message);
            
            // Speichere die Nachricht im Chat-Raum
            // console.log(newMessage)
            // newChatRoom.chatMessages(newMessage._id);
            // await newChatRoom.save();
            // await newMessage.save();
          // } catch (error) {logger.error("sendMessage error")}
          socket.to(data.chatName).emit("messages_groupRoom", message,room);
        
          // currentUser.chats[newChatRoom._id]
          // await currentUser.save()
          
        });
      // } catch (error) {logger.error("grouproom key fehler"); console.log(error)}
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
}
