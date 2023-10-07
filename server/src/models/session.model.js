import mongoose from "mongoose";


const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    emailVerified: { type: Boolean, default: false },
    valid: {type: Boolean, default: false},
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model("Session", sessionSchema,"Sessions");


export default SessionModel;
