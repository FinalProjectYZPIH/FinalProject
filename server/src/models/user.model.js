// model fürs Datenbank >> MongdoDB
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      // hier soll der Socketid für den User für privat nachrichten nach erst Verbindung zugewiesen werden
      type: String,
      unique: true,
    },
    isOnline: {
      // zur Verfolgung der UserStatus.  falls nötig?
      type: Boolean,
      default: false,
    },
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
      unique: true,
    },
    googleId: {
      type: String,
      unique: true,
    },
    facebookId: {
      type: String,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
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
      default: "member",
    },
    password: {
      type: String,
    },

    avatarImage: {type : String},

    birthday: {
      type: Date,
    },
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom" }], // notifications = [...ChatRoom.....].length
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// userSchema.pre('save', function (next) {
//   if (!this.userId) {
//     this.userId = nanoid();
//   }
//   next();
// });

const UserModel = mongoose.model("User", userSchema, "Users");

export default UserModel;
