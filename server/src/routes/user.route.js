import express from "express";
import * as UserController from "../controllers/user.controller.js";

//Routen einstellungen für user
const router = express.Router();



router
  .post("/createUser", UserController.createUser)
  .get("/getProfile", UserController.getProfile)
  .patch("/updateUserById/:id", UserController.updateUserById)
  .delete("/deleteOneUser/:id", UserController.deleteOneUser)
  .get("/", UserController.findAllUsers)
  .get("/:username", UserController.findOneUser)
  // .delete("/deleteAllUsers", UserController.deleteAllUsers);

export default router;
