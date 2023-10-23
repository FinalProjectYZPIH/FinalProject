//Controller für user festlegen import { User } from "../models/user.model";
import { registerFormSchema } from "../models/schema/user.schema.js";
import UserModel from "../models/user.model.js";

//services
import * as UserService from "../services/user.service.js";
import { createSession } from "../services/auth.service.js";

//helper

import { verifyJwt } from "../helpers/utils/jwt.utils.js";
import SessionModel from "../models/session.model.js";

export const createUser = async (req, res, next) => {
  try {
    const registerResult = registerFormSchema.safeParse(req.body);

    if (!registerResult.success) {
      return next(registerResult.error.issues[0]);
    }

    const user = await UserService.dbCreateUser(req, res, next);

    if (!user) return next("User creation failed");
    //bei erstellen einen neuen User, wird zugleich auch einen session im db erstellt


    const session = user
      ? await createSession(user?._id, req.get("user-agent" || "", next))
      : null;
    if (!session) return next("Session creation failed");

    if (!user) {
      next("User creation failed");
    }
    console.log({ message: `${user} created` });
    res.status(201).json({ message: `${user} created` });
    return user;

  } catch (error) {
    res.status(500);
    next(error);
  }
};

export const findAllUsers = async (req, res, next) => {
  const { accessJwt } = req?.cookies;
  const { valid } = verifyJwt(accessJwt, process.env.ACCESS_TOKEN);

  console.log(accessJwt);
  try {
    if (valid) {
      const users = await UserService.dbFindAllUsers(res, next);
      if (!users || users.length === 0) {
        return next("No users found");
      }

      return res.status(200).json(users);
    }
    return next("findAllUsers Invalid Token ID");

  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const findOneUser = async (req, res, next) => {

  //die Daten aus cookie entziehen
  const { accessJwt } = req?.cookies;
  const { valid } = verifyJwt(accessJwt, process.env.ACCESS_TOKEN);
  // hier kann frontend bestimmten user finden mit username request
  try {
    const { username } = req.params; //id is username

    if (valid) {
      // const user = await UserService.dbFindOneUserById( id);
      const user = await UserService.dbFindUserByUsername(username, next);
      if (!user) return next("User not found");
      res.status(200).json(user);
    }
    res.status(400);
    return next("findOneUser Invalid Token ID");

  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  const { accessJwt } = req?.cookies;
  console.log("acess token", req.cookies.accessJwt);
  if (!accessJwt) {
    // Wenn kein Token im Cookie vorhanden ist, wird ein Fehler zurückgegeben.
    res.status(400)
    return next("Access token not found in cookies");
  }

  const { decoded, valid } = verifyJwt(accessJwt, process.env.ACCESS_TOKEN);

  if (!valid) {
    // Wenn das Token ungültig ist, wird ein Fehler zurückgegeben.
    res.status(400)
    return next("Invalid access token");
  }

  try {
    // const { id } = req.params; //id is username
    const userId = decoded?.UserInfo.id;
    console.log("userid", userId);
    const user = await UserService.dbFindOneUserById(userId, next);
    if (!user) return res.status(400).next("User not found");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next("geProfile" + error);
  }
};

export const updateUserById = async (req, res, next) => {
  const { accessJwt } = req?.cookies;

  if (!accessJwt) {
    // Wenn kein Token im Cookie vorhanden ist, wird ein Fehler zurückgegeben.
    res.status(400)
    return next("Access token not found in cookies");
  }
  const { decoded, valid } = verifyJwt(accessJwt, process.env.ACCESS_TOKEN);

  if (!valid) {
    // Wenn das Token ungültig ist, wird ein Fehler zurückgegeben.
    res.status(400)
    return next("Invalid access token");
  }

  // const { id } = req.params;

  //validation wurde an UserService übergeben

  try {

    if (valid) {
      const user = await UserService.dbUpdateUser(
        req,
        res,
        decoded?.UserInfo.id,
        next
      );

      if (!user) return res.status(400).next("update User failed");
      return res.status(200).json({ message: `${user.username} updated!` });
    }
    return res.status(400).next("updateuser Invalid Token ID");

  } catch (error) {
    console.log(error);
    next(error);
  }
};


export const deleteAccount = async (req, res, next) => {
  const { accessJwt } = req?.cookies;
  if (!accessJwt) {
    res.status(400)
    return next("Access token not found in cookies");
  }
  const {decoded, valid } = verifyJwt(accessJwt, process.env.ACCESS_TOKEN);


  if (!valid) {
    // Wenn das Token ungültig ist, wird ein Fehler zurückgegeben.
    res.status(400)
    return next("Invalid access token");
  }
  // const { id } = req.params;
  try {

    if (valid) {
      const user = await UserModel.findByIdAndRemove(decoded?.UserInfo.id);
      
      if(!user) return next("user delete failed")
      const session = await SessionModel.findByIdAndRemove(decoded?.UserInfo.session)

      if(!session) return next("session delete failed")
      res.status(200).json({ message: "success deleted!" });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



// export const deleteAllUsers = async (req, res) => {
//   try {
//     await User.deleteMany();
//     res.status(200).json({ message: "All User deleted" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };
