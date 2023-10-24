import mongoose from "mongoose";
// import { customAlphabet } from "nanoid";

// const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

const AttachMessageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    emojis: [{ type: String }], 

  },
  { timestamps: true }
);

const AttachModel = mongoose.model("Attach", AttachSchema);

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //für einzeln Nachricht
    chat: {type: mongoose.Schema.Types.ObjectId, ref: "Chat"},
    content: {type: String, trim: true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    emojis: [{ type: String }], 
    images: [{type: mongoose.Schema.Types.ObjectId, ref: "Image"}], // URL oder Dateipfad zum Bild
  },{
    timestamps:{
      createdAt: true
    }
  });
  


const ChatRoomSchema = new mongoose.Schema(
  {
    // chatId: { type: String, unique: true, default: () => `note_${nanoid()}` },
    chatName: {type: String, default: false},
    isGroupChat: {type: Boolean, default: false},
    chatMessages: {type: mongoose.Schema.Types.ObjectId, ref: "Message"}, //speichert nur die letzte Nachricht, sonst vorerst im localstorage
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // für gruppen nachricht
    chatAdmin: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    
  },
  {
    timestamps: true,
    // toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    // toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

// ChatSchema.virtual("messageCount", {
//   ref: "Message", //related model
//   localField: "_id", // local _id key
//   foreignField: "content", // related opposite key
// });

const ChatModel = mongoose.model("Chat", ChatRoomSchema, "Chats");

const MessageModel = mongoose.model("Message", MessageSchema, "Messages")

export {ChatModel, MessageModel};

// // Beispiel: Erstellen eines neuen Chats  (unfährer ablauf)
// const newChat = await ChatModel.create({ participants: [user1Id, user2Id] });

// // Beispiel: Hinzufügen einer Nachricht zum Chat
// const newMessage = new MessageModel({ sender: senderId, content: "Hallo!", timestamp: new Date() });
// await newMessage.save();

