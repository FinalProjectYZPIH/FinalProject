import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
    content: { type: String },
    likes: { type: Number }, //[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], um speicher zu sparen
    emojis: [{ type: String }],
    time: [{ type: String }],
    images: [{ type: String }], // URL oder Dateipfad zum Bild
    voices: [{ type: String }],
    videos: [{ type: String }],
    time: {type: String}
  });
  
  const MessageModel = mongoose.model("Message", MessageSchema, "Messages");

export default MessageModel;


