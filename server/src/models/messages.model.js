import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
    hashedContent: { type: String },
    likes: { type: Number }, //[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], um speicher zu sparen
    emojis: [{ type: String }],
    time: [{ type: String }],
    images: [{ type: String }], // URL oder Dateipfad zum Bild
    voices: [{ type: String }],
    videos: [{ type: String }],
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });
  
  const MessageModel = mongoose.model("Message", MessageSchema, "Messages");

export default MessageModel;