// model fürs Datenbank >> MongdoDB

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      min: [2, "Mindestens 2 Buchstaben"],
    },
    lastname: {
      type: String,
      min: [2, "Mindestens 2 Buchstaben"],
    },
    username: {
      type: String,
      min: [2, "Mindestens 2 Buchstaben"],
      unique:true,
    },
    googleId: {
      type:String,
      unique: true,
    },
    facebookId: {
      type:String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["member", "admin"],
      },
      default: "member"
    },
    password: {
      type: String,
    },
    avatarImage: String,
    birthday: {
      type: Date,
    },
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' }], // notifications = [...ChatRoom.....].length
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
  },
  { timestamps: true }
);


const UserModel = mongoose.model("User", userSchema, "Users");




export default UserModel;