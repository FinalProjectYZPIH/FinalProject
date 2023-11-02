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

router.get(
  '/callback',
  passport.authenticate('facebook', { session: false }), // Use session: false to avoid using sessions
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      // Check if a session already exists for the user
      const duplicate = await SessionModel.findOne({ user: req.user._id });

      if (duplicate) {
        // Session already exists
        // You can choose to do something here if needed
        return res.status(200).redirect('http://localhost:5173/chat');
      }

      // Create a new session
      const session = await SessionModel.create({ user: req.user._id, userAgent: 'google' });

      if (!session) {
        console.error('Session creation failed');
        return next('Session creation failed');
      }

      // Prepare the user information for the cookie
      const cookieInfo = cookieSessionSchema.safeParse({
        UserInfo: {
          id: `${req.user._id}` || '',
          email: req.user.email,
          role: 'member',
          session: `${session._id}` || '',
        },
      });

      const accessValid = cookieInfo.success ? acceptCookie(cookieInfo.data, res) : null;

      if (accessValid) {
        return res.status(200).redirect('http://localhost:5173/chat');
      }

      res.status(200).json({ message: 'Success logging in without cookie' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Authentication failed' });
    }
  }
);

// This is where you configure the Passport Google strategy
passport.authenticate('facebook', {
  successRedirect: 'http://localhost:5173/chat',
  failureRedirect: '/login/failed',
  failureFlash: true,
});

export default router;