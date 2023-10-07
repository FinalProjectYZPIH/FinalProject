import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);



const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //für einzeln Nachricht
    content: String,
    timestamp: Date,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    emojis: [{ type: String }], 
    images: [{type: mongoose.Schema.Types.ObjectId, ref: "Image"}], // URL oder Dateipfad zum Bild
  });
  


const ChatSchema = new mongoose.Schema(
  {
    chatId: { type: String, unique: true, default: () => `note_${nanoid()}` },
    chatbox: [MessageSchema],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] || null, // für gruppen nachricht
    
  },
  {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
      },
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

ChatSchema.virtual("messageCount", {
  ref: "Message", //related model
  localField: "_id", // local _id key
  foreignField: "content", // related opposite key
});

const ChatModel = mongoose.model("Chat", ChatSchema, "Chats");

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
