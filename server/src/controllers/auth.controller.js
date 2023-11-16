// helper
import { signJwt, verifyJwt } from "../helpers/utils/jwt.utils.js";
import logger from "../helpers/middleware/logger.js";
// import { getCurrentTime } from "../helpers/utils/currentTime.js";
import crypto from "crypto";

// models schema
import {
  emailLoginSchema,
  nameLoginSchema,
} from "../models/validierungsSchema/user.schema.js";
import SessionModel from "../models/session.model.js";
import { cookieSessionSchema } from "../models/validierungsSchema/session.schema.js";
import UserModel from "../models/user.model.js";
import nodemailer from "nodemailer";

// services
import { compareDBPassword } from "../services/user.service.js";
import {
  acceptCookie,
  findSessions,
  updateSession,
} from "../services/auth.service.js";

// import { Session } from "../models/schema/session.schema.js";
//variables

export const login = async (req, res, next) => {
  logger.info(req.body);
  const { password } = req?.body;

  let loginSchema;

  if (req?.body.email) {
    loginSchema = emailLoginSchema;
    const foundEmail = await UserModel.findOne({ email: req.body.email });

    if (!foundEmail) return next("User Notfound pls Sign up");
  } else {
    loginSchema = nameLoginSchema;
    const foundUser = await UserModel.findOne({ username: req.body.username });
    if (!foundUser) return next("User Notfound pls Sign up");
  }

  try {
    const loginResult = loginSchema.safeParse(req.body);

    if (!loginResult.success) {
      res.status(400);
      next(loginResult.error.issues[0]);
    }

    const loginData = req.body?.email || req.body?.username;

    const { isValid, user } = await compareDBPassword(
      password,
      loginData,
      next
    );

    if (!isValid) {
      return next("password invalid");
    }

    //mit gefundenen User finde dem bereits erstellten Session im db und update es falls nötig

    if (isValid) {
      const session = await SessionModel.findOne({
        user: user?._id,
      });

      // if (!session.emailVerified) {
      //   console.log("bestätige erst dem emailseingang");
      //   // return res.json({message: "bestaetige die bestaetigungsemail und logge nochmals ein"})
      // }

      //cookie Inhalt wird validiert und gespeichert
      const cookieInfo = cookieSessionSchema.safeParse({
        UserInfo: {
          id: `${user?._id}` || "",
          email: user?.email,
          role: user?.role,
          session: `${session?._id}` || "",
          // darkModeTime: getCurrentTime(),
        },
      });

      const accessValid = cookieInfo.success
        ? acceptCookie(cookieInfo.data, res)
        : null;

      if (session.emailVerified) {
        res.locals.role = user?.role;
      }

      if (accessValid)
        return res.status(200).json({
          message: "Thanx for using cookies, you are success logging in",
        });

      res.status(200).json({ message: "success logging in without cookie" });
    }
    return next("Login failed");
  } catch (error) {
    next(error);
  }
};

export const sessionRefreshHandler = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies.accessJwt) return next("Json Web Token not found");

    const { decoded, valid } = verifyJwt(
      cookies.refreshJwt,
      process.env.REFRESH_TOKEN_SECRET || ""
    );

    if (valid) {
      res.locals.role = decoded?.UserInfo.role;

      const session = await findSessions({
        _id: decoded?.UserInfo.session,
        valid: true,
      });

      if (!session) {
        return next("Session Refresh Request Failed");
      }

      res.status(200).json({ message: "session refreshed" });
    }
  } catch (error) {
    // next(error)
    res.status(500).json({ message: error });
  }
};

export const logout = async (req, res, next) => {
  try {
    const aceessJWT = req.cookies.accessJwt;

    const { decoded } = verifyJwt(
      aceessJWT,
      process.env.ACCESS_TOKEN_SECRET || ""
    );

    const session = await updateSession(
      { _id: decoded?.UserInfo.session },
      { valid: false }
    );

    if (!session) return next("session logout failed");
    res.locals.role = "";
    res.clearCookie("accessJwt", {
      httpOnly: false,
      sameSite: "lax",
      secure: false,
    });

    res
      .clearCookie("refreshJwt", {
        httpOnly: false,
        sameSite: "lax",
        secure: false,
      })
      .status(200)
      .json({ message: "user success logged out" });
  } catch (error) {
    next(error);
  }
};

export const sendMailVerify = async (req, res, next) => {
  try {
    const { recipient } = req.body;

    // Generate verification token
    const generateVerificationToken = () =>
      crypto.randomBytes(16).toString("hex");
    const verificationToken = generateVerificationToken();

    // Save the verification token to the user record
    const user = await UserModel.findOneAndUpdate(
      { email: recipient },
      { $set: { verificationToken, isVerified: false } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verification link
    const verificationLink = `<a href="http://localhost:${process.env.PORT}/api/auth/verify">here</a>`;

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: process.env.MAILSERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: recipient,
      subject: "Email Verification",
      html: `Thanks for using Comet. Click ${verificationLink} to verify your email. Your Comet Team`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.response);

    res
      .status(200)
      .json({ message: "Email sent successfully", info: info.response });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
};

export const updateIsVerified = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await UserModel.findOneAndUpdate(
      { verificationToken: token, isVerified: false },
      { $set: { isVerified: true }, $unset: { verificationToken: 1 } },
      { new: true }
    );

    if (user) {
      res.redirect("http://localhost:5173/login"); // Redirect to the chat page after successful verification
      // res.status(200).json({
      //   success: true
      // })
    } else {
      res.status(400).json({ error: "Invalid or expired token" });
    }

  } catch (error) {
    console.error("Error verifying email:", error);

    res
      .status(500)
      .json({ error: "Failed to verify email", details: error.message });
  }
};
