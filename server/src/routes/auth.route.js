//external module
import express from "express";

import * as authController from "../controllers/auth.controller.js";
//config
import { loginLimiter } from "../config/loginLimiter.js";

//helper

const router = express.Router();

// router.use(verifyRole)

router //register is at user.controller with createUser function
  .post("/login", loginLimiter, authController.login) //or add with loginLimiter as middleware
  .get("/tokenRefresh", authController.sessionRefreshHandler)
  .post("/logout", authController.logout)
  .post("/sendMailVerify", authController.sendMailVerify) // on testing
  .get("/verify", authController.updateIsVerified);

export default router;
