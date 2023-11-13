//helper
import { verifyJwt } from "../helpers/utils/jwt.utils.js";

//models
import MessageModel from "../models/messages.model.js";
import ChatRoomModel from "../models/chatRoom.model.js"
import ImageModel from "../models/image.model.js";

//services
import * as Userservice from "./user.service.js";

export async function createMessage(res, oppositeUserId, message) {
  try {
    const newMessage = await MessageModel.create({
    //   likes: [],
      emojis: "emoji",
      sender: oppositeUserId,
      content: message,
    //   images: [],
      timestamp: new Date(),
    });
    if(!newMessage) return console.log("failed create newMessage")
    return newMessage
    
  } catch (error) {
    res.status(500).json({ message: error.message + " createMessage Error" });
  }
  // Verknüpfen Sie die Nachricht mit dem Chat
}
export async function createChat(res, userId, messageObj, [...participantsId] = "") {
  try {

    // suche bestehender user aus datenbank 
    const foundUser = await Userservice.dbFindOneUserById(res, userId)
    //erstelle erst einen chatmodel
    const newChat = await {ChatRoomModel}.create({
        chatbox: messageObj,
        participants: [userId, messageObj?.sender, ...participantsId]
    })

    if(!newChat || !foundUser) return res.status(400).json({message: "create newChat or foundUser failed"})

    //pushe newChat._id ins foundUser.chats rein
    foundUser?.chats.push(newChat?.id)

    await foundUser.save()

    return newChat
  } catch (error) {
    console.log("chat created failed",error);
    res.status(500)
    throw error
  }
}

// // Beispiel: Hinzufügen einer Nachricht zum Chat
// const newMessage = new MessageModel({ sender: senderId, content: "Hallo!", timestamp: new Date() });
// await newMessage.save();

// // Verknüpfen Sie die Nachricht mit dem Chat
// newChat.chatbox.push(newMessage);
// await newChat.save();
