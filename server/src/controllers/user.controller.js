//Controller für user festlegen import { User } from "../models/user.model";
import { validateInput } from "../helpers/utils/validateInput.js";
import {
  registerFormSchema,
  mixLoginSchema,
} from "../models/schema/user.schema.js";
import * as UserService from "../services/user.service.js";
import { createSession } from "../services/auth.service.js";
import { signJwt, verifyJwt } from "../helpers/utils/jwt.utils.js";
export const createUser = async (
  req,
  res,
  next
) => {
  try {
    validateInput(registerFormSchema, req, res);
    const user = await UserService.dbCreateUser(req, res);

    //  await createSession(user?._id, req.get("user-agent" || ""));

;
res.json({message: "user created"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
    next(error);
  }
};

export const findAllUsers = async (
  req,
  res,
  next
) => {
  try {
    await UserService.dbFindAllUsers(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error" });
  }
};

export const findOneUser = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt)
    return res.status(401).json({ message: "Json Web Token not found" });

  const { decoded } = verifyJwt(cookies.accessToken, process.env.ACCESS_TOKEN_SECRET || "");


  const { id } = req.params;
  try {
    await UserService.dbFindOneUser(res, decoded?.UserInfo.id, "notes");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;

  validateInput(updateFormSchema, req.body, res);

  try {
    await UserService.dbUpdateUser(req, res, id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndRemove(id);

    res.status(200).json({ message: "success deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllUsers = async (req, res )=> {
  try {
    await User.deleteMany();
    res.status(200).json({ message: "All User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
