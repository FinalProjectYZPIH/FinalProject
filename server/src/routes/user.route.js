import express from "express";
import * as UserController from "../controllers/user.controller.js";
import { verifyMember } from "../helpers/middleware/verifyRole.js";

//Routen einstellungen für user
const router = express.Router();



router
  .post("/createUser", UserController.createUser)
  .use(verifyMember)
  .get("/getProfile", UserController.getProfile)
  .patch("/updateUserById", UserController.updateUserById)
  .delete("/deleteAccount", UserController.deleteAccount)
  .get("/", UserController.findAllUsers)
  .get("/:username", UserController.findOneUser)
  // .delete("/deleteAllUsers", UserController.deleteAllUsers);

export default router;
