// model fürs Datenbank >> MongdoDB

import mongoose from "mongoose";
import { validateEmail, validatePassword } from "./schema/user.schema.js";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      min: [2, "Mindestens 2 Buchstaben"],
      match: [/^[A-Za-z]+$/, "Nur Buchstaben erlaubt"],
    },
    lastname: {
      type: String,
      min: [2, "Mindestens 2 Buchstaben"],
      match: [/^[A-Za-z]+$/, "Nur Buchstaben erlaubt"],
    },
    username: {
      type: String,
      min: [2, "Mindestens 2 Buchstaben"],
      match: [/^[A-Za-z0-9]+$/, "Kein Sonderzeichen erlaubt"],
      unique:true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [validateEmail, "Ungültige Email-Adresse"],
    },
    role: {
      type: String,
      enum: {
        values: ["member", "admin"],
      },
    },
    password: {
      type: String,
      required: true,
      validate: [
        validatePassword,
        "Mindestens 8 Zeichen lang \n Mindestens ein Kleinbuchstabe \n Mindestens ein Großbuchstabe \n Mindestens eine Ziffer \n Mindestens ein Sonderzeichen (z. B. @$!%*?&)",
      ],
    },
    avatarImage: String,
    birthday: {
      type: Date,
    },
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema, "UserModel");




export default User;