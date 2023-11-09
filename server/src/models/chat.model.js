import mongoose from "mongoose";

// const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);



const ChatRoomSchema = new mongoose.Schema(
  {
    chatName: { type: String, default: false },
    type: { type: String, enum: ["group", "single"] }, //falls der key groupRoom da ist dann ist dies true
    chatMessages: [{type: mongoose.Schema.Types.ObjectId, ref :"Message"}],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // für gruppen nachricht
    chatAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false, 
    },
  }
);



const ChatRoomModel = mongoose.model("Chat", ChatRoomSchema, "ChatRooms");

export default ChatRoomModel;

// // Beispiel: Erstellen eines neuen Chats  (unfährer ablauf)
// const newChat = await ChatModel.create({ participants: [user1Id, user2Id] });

// // Beispiel: Hinzufügen einer Nachricht zum Chat
// const newMessage = new MessageModel({ sender: senderId, content: "Hallo!", timestamp: new Date() });
// await newMessage.save();
