// model fürs Datenbank >> MongdoDB
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);



import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId:{  // für die zuweisung der frontend user  da mongodb._id schreibgeschützt ist und damit nicht arbeiten soll
      type: String,
      unique: true,
      default: nanoid()
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


// userSchema.pre('save', function (next) {
//   if (!this.userId) {
//     this.userId = nanoid();
//   }
//   next();
// });

const UserModel = mongoose.model("User", userSchema, "Users");




export default UserModel;