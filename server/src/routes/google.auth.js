import express from "express";
import passport from "passport"
import { cookieSessionSchema } from "../models/validierungsSchema/session.schema.js";
import { acceptCookie } from "../services/auth.service.js";
import SessionModel from "../models/session.model.js";
import logger from "../helpers/middleware/logger.js";

const router = express.Router();

router.get("/", passport.authenticate("google", {scope:["profile","email"]}));

router.get("/login/failed", (req, res) => {
    const errorMessage = req.flash("error")[0] || "Something went wrong!";
    res.status(401).json({
      success: false,
      message: errorMessage,
    });
  });

router.get("/callback",  function (req, res, next) {
  passport.authenticate("google", async function (err, user, info) {
    if (err) {
      // Fehlerbehandlung, falls erforderlich
      return res.status(500).json({ message: "Authentifizierung fehlgeschlagen" });
    }
    if (!user) {
      // Authentifizierung fehlgeschlagen
      return res.status(401).json({ message: "Authentifizierung fehlgeschlagen" });
    }

    const duplicate = await SessionModel.findOne({ user: user?._id });

    if (duplicate){
      logger.info("google already exist")
      return next("duplicated Session");
    } 

    let session;
    if(!duplicate) {

      session = await SessionModel.create({ user: user?._id, userAgent: "google" })
    }

    if(!session){
      logger.error("session creation failed")
      return next("session creation failed")
    } 

    // Authentifizierung erfolgreich
    const cookieInfo = cookieSessionSchema.safeParse({
      UserInfo: {
        id: `${user?._id}` || "",
        email: user?.email,
        role: "member",
        session: `${session?._id}` || "",
      },
    });



    const accessValid = cookieInfo.success
      ? acceptCookie(cookieInfo.data, res)
      : null;

    // if (session.emailVerified) {
    //   res.locals.role = user?.role;
    // }

    if (accessValid){

      return res.status(200).redirect(`http://localhost:5173/`)
    }

    res.status(200).json({ message: "success logging in without cookie" });
  }
  )(req, res, next);
});




// passport.authenticate("google",{
//     successRedirect:`http://localhost:5173/`,
//     failureRedirect:"/login/failed",
//     failureFlash:true
// }))

export default router;