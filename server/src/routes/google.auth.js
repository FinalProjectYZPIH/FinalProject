import express from "express";
import passport from "passport"

const router = express.Router();

router.get("/google", passport.authenticate("google", {scope:["profile"]}));

router.get("/login/failed", (req,res)=>{
    res.status(401).json({
        success: false,
        message:"something went wrong!",
    })
})

router.get("/login/success", (req,res)=>{
    if(req.user){
        res.status(200).json({
            success: true,
            message:"successful authenticated!",
            user: req.user,
            // cookies: req.cookies
        })
    }
})

router.get("logout",(req,res)=>{
    req.logout();
    res.redirect("http:/localhost:5173/")
    res.status(200).json({
        success:true,
        message:"you are logged out"
    })
})

router.get("/google/callback",passport.authenticate("google",{
    successRedirect:`http://localhost:5173/`,
    failureRedirect:"/login/failed"
}))

export default router;