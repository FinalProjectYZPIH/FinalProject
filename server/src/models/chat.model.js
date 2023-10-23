import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);



const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    content: {type: String, trim: true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    emojis: [{ type: String }], 
    time: [{ type: String }], 
    images: [{type:String}], // URL oder Dateipfad zum Bild
    voices: [{type:String}],
    videos: [{type:String}],
  }
  );
  


const GroupChatSchema = new mongoose.Schema(
  {
    chatName: {type: String, default: false},
    isGroupChat: {type: Boolean, default: false},
    chatMessages: [MessageSchema], 
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // für gruppen nachricht
    chatAdmin: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    
  },
  {
    timestamps:{
      createdAt: true
    }
    // toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    // toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

// ChatSchema.virtual("messageCount", {
//   ref: "Message", //related model
//   localField: "_id", // local _id key
//   foreignField: "content", // related opposite key
// });

const ChatModel = mongoose.model("ChatRoom", GroupChatSchema, "ChatRooms");

const MessageModel = mongoose.model("Message", MessageSchema, "Messages")

export {ChatModel, MessageModel};

// // Beispiel: Erstellen eines neuen Chats  (unfährer ablauf)
// const newChat = await ChatModel.create({ participants: [user1Id, user2Id] });

// // Beispiel: Hinzufügen einer Nachricht zum Chat
// const newMessage = new MessageModel({ sender: senderId, content: "Hallo!", timestamp: new Date() });
// await newMessage.save();

// // Verknüpfen Sie die Nachricht mit dem Chat
// newChat.chatbox.push(newMessage);
// await newChat.save();
