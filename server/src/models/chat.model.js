import mongoose from "mongoose";

const ChatRoomSchema = new mongoose.Schema(
  {
    chatName: { type: String, default: false },
    isGroupChat: { type: Boolean, default: false },
    chatMessages: { type: mongoose.Schema.Types.ObjectId, ref: "Message"},
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // für gruppen nachricht
    chatAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: {
      createdAt: true,
    },
    // toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    // toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

// ChatSchema.virtual("messageCount", {
//   ref: "Message", //related model
//   localField: "_id", // local _id key
//   foreignField: "content", // related opposite key
// });

const ChatRoomModel = mongoose.model("Chat", ChatRoomSchema, "Chats");

export default ChatRoomModel;

// // Beispiel: Erstellen eines neuen Chats  (unfährer ablauf)
// const newChat = await ChatModel.create({ participants: [user1Id, user2Id] });

// // Beispiel: Hinzufügen einer Nachricht zum Chat
// const newMessage = new MessageModel({ sender: senderId, content: "Hallo!", timestamp: new Date() });
// await newMessage.save();
