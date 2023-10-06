import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { loginLimiter } from "../config/loginLimiter.js";
import verifyRole from "../helpers/middleware/verifyRole.js";

const router = express.Router();

router  //register is at user.controller with createUser function
  .post("/login",/*loginLimiter,*/ authController.login) //or add with loginLimiter as middleware 
  .get("/tokenRefresh", authController.sessionRefreshHandler)
  .post("/logout", verifyRole, authController.logout);

export default router;
