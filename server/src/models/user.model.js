// model fürs Datenbank >> MongdoDB

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      min: [2, "Mindestens 2 Buchstaben"],
      // match: [/^[A-Za-z]+$/, "Nur Buchstaben erlaubt"],
    },
    lastname: {
      type: String,
      min: [2, "Mindestens 2 Buchstaben"],
      // match: [/^[A-Za-z]+$/, "Nur Buchstaben erlaubt"],
    },
    username: {
      type: String,
      min: [2, "Mindestens 2 Buchstaben"],
      // match: [/^[A-Za-z0-9]+$/, "Kein Sonderzeichen erlaubt"],
      unique:true,
      // required: true
    },
    googleId: {
      type:String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      // required: true,
      // match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, "Ungültige Email-Adresse"]
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
      // required: true,
      // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/m, "Password >> Mindestens 8 Zeichen lang. Mindestens ein Kleinbuchstabe. Mindestens ein Großbuchstabe. Mindestens eine Ziffer"]
    },
    avatarImage: String,
    birthday: {
      type: Date,
      // match: [/^\d{2}-\d{2}-\d{4}$/, "TT-MM-JJJJ Format"]
    },

    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
  },
  { timestamps: true }
);


const UserModel = mongoose.model("User", userSchema, "Users");




export default UserModel;