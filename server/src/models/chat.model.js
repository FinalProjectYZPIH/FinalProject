import mongoose from "mongoose";

<<<<<<< HEAD
const ChatSchema = new mongoose.Schema(
  {
    chatName: { type: String, required: true },
    isGroupChat: { type: Boolean, default: false },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    chatAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
=======
// const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

// const AttachMessageSchema = new mongoose.Schema(  nötig??
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     desc: {
//       type: String,
//       max: 500,
//     },
//     img: {
//       type: String,
//     },
//     likes: {
//       type: Array,
//       default: [],
//     },
//     emojis: [{ type: String }],
//   },
//   { timestamps: true }
// );

// const AttachModel = mongoose.model("Attach", AttachMessageSchema,"AttachMessages");

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, trim: true },
  likes:  {type: Number},//[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], um speicher zu sparen
  emojis: [{ type: String }],
  images: [{ type: String }], // URL oder Dateipfad zum Bild
  voices: [{ type: String }],
  videos: [{ type: String }],
  time: {type: String}
});

const MessageModel = mongoose.model("Message", MessageSchema, "Messages");

const ChatRoomSchema = new mongoose.Schema(
  {
    chatName: { type: String, default: false },
    isGroupChat: { type: Boolean, default: false }, //falls der key groupRoom da ist dann ist dies true
    chatMessages: [{type: mongoose.Schema.Types.ObjectId, ref :"Message"}],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // für gruppen nachricht
    chatAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
>>>>>>> origin/yan
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false, 
    },
  }
);

const ChatModel = mongoose.model("Chat", ChatSchema, "Chats");

<<<<<<< HEAD
export default ChatModel;
=======
const ChatRoomModel = mongoose.model("Chat", ChatRoomSchema, "ChatRooms");

export { ChatRoomModel, MessageModel };

// // Beispiel: Erstellen eines neuen Chats  (unfährer ablauf)
// const newChat = await ChatModel.create({ participants: [user1Id, user2Id] });

// // Beispiel: Hinzufügen einer Nachricht zum Chat
// const newMessage = new MessageModel({ sender: senderId, content: "Hallo!", timestamp: new Date() });
// await newMessage.save();
>>>>>>> origin/yan
