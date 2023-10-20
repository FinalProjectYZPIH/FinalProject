import express from "express";
import passport from "passport"

const router = express.Router();

router.get("/google", passport.authenticate("google", {scope:["profile","email"]}));

router.get("/login/failed", (req, res) => {
    const errorMessage = req.flash("error")[0] || "Something went wrong!";
    res.status(401).json({
      success: false,
      message: errorMessage,
    });
  });

router.get("/google/callback",passport.authenticate("google",{
    successRedirect:`http://localhost:5173/`,
    failureRedirect:"/login/failed",
    failureFlash:true
}))

export default router;