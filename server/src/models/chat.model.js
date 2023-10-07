import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

const ChatSchema = new mongoose.Schema(
  {
    chatId: { type: String, unique: true, default: () => `note_${nanoid()}` },
    chatbox: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

// chatSchema.virtual("images", {
//   ref: "ImageModel", //related model
//   localField: "_id", // local _id key
//   foreignField: "note", // related opposite key
// });

const ChatModel = mongoose.model("Chat", ChatSchema, "Chats");

export default ChatModel;

