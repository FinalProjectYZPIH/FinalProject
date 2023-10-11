import express from "express";
import * as UserController from "../controllers/user.controller.js";

//Routen einstellungen für user
const router = express.Router();

router
  .post("/createUser", UserController.createUser)
  .get("/", UserController.findAllUsers)
  .get("/:id", UserController.findOneUser)
  .patch("/updateUserById/:id", UserController.updateUserById)
  .delete("/deleteOneUser/:id", UserController.deleteOneUser)
  // .delete("/deleteAllUsers", UserController.deleteAllUsers);

export default router;
