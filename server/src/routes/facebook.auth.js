import express from "express";
import passport from "passport"
import { cookieSessionSchema } from "../models/validierungsSchema/session.schema.js";
import { acceptCookie } from "../services/auth.service.js";
import SessionModel from "../models/session.model.js";
import logger from "../helpers/middleware/logger.js";

const router = express.Router();

router.get("/", passport.authenticate("facebook", {scope:["email"]}));

router.get("/login/failed", (req, res) => {
    const errorMessage = req.flash("error")[0] || "Something went wrong!";
    res.status(401).json({
      success: false,
      message: errorMessage,
    });
  });

  router.get("/callback", async (req, res, next) => {
    try {
      passport.authenticate("facebook", async (err, user, info) => {
        if (err) {
          // Error handling, if necessary
          return res.status(500).json({ message: "Authentication failed" });
        }
        if (!user) {
          // Authentication failed
          return res.status(401).json({ message: "Authentication failed" });
        }
  
        const duplicate = await SessionModel.findOne({ user: user._id });
  
        if (duplicate) {
          // Authentication successful
          const cookieInfo = cookieSessionSchema.safeParse({
            UserInfo: {
              id: `${user._id}` || "",
              email: user.email,
              role: "member",
              session: `${duplicate._id}` || "",
            },
          });
  
          user.isOnline = true;
          await user.save();
  
          const accessValid = cookieInfo.success
            ? acceptCookie(cookieInfo.data, res)
            : null;
  
          if (accessValid) {
            return res.status(200).redirect(`http://localhost:5173/chat`);
          }
  
          logger.info("User already exists");
          return res
            .status(200)
            .json({ message: "Success logging in without a cookie" });
        }
  
        let session;
        if (!duplicate) {
          session = await SessionModel.create({
            user: user._id,
            userAgent: "facebook",
          });
          if (!session) {
            logger.error("Session creation failed");
            return next("Session creation failed");
          }
        }
  
        // Authentication successful
        const cookieInfo = cookieSessionSchema.safeParse({
          UserInfo: {
            id: `${user._id}` || "",
            email: user.email,
            role: "member",
            session: `${session._id}` || "",
          },
        });
  
        user.isOnline = true;
        await user.save();
  
        const accessValid = cookieInfo.success
          ? acceptCookie(cookieInfo.data, res)
          : null;
  
        if (accessValid) {
          return res.status(200).redirect(`http://localhost:5173/chat`);
        }
  
        return res
          .status(200)
          .json({ message: "Success logging in without a cookie" });
      })(req, res, next);
    } catch (error) {
      logger.error("An error occurred during callback: " + error);
      res
        .status(500)
        .json({ message: "An error occurred during authentication" });
    }
  });
  
export default router;