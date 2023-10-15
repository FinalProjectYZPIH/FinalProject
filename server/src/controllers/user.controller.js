//Controller für user festlegen import { User } from "../models/user.model";
import { registerFormSchema } from "../models/schema/user.schema.js";

//services
import * as UserService from "../services/user.service.js";
import { createSession, findSessions } from "../services/auth.service.js";

//helper
import { signJwt, verifyJwt } from "../helpers/utils/jwt.utils.js";
export const createUser = async (req, res, next) => {
  try {
    const registerResult = registerFormSchema.safeParse(req.body);

    if (!registerResult.success) {
      return next(registerResult.error.issues[0]);
    }

    const user = await UserService.dbCreateUser(req, res, next);

    if (!user) return next(new Error("User creation failed"));
    //bei erstellen einen neuen User, wird zugleich auch einen session im db erstellt
    
    const session = user ? await createSession(user?._id, req.get("user-agent" || "", next)) : null;
    if (!session) return next(new Error("Session creation failed"));
    if (user && user?.email) {
      console.log({ message: `${user} created` });
      res.status(201);
      return user;
    } else {
     throw new Error("User creation failed");
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};

export const findAllUsers = async (req, res, next) => {

  try {
    const users = await UserService.dbFindAllUsers(res,next);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

export const findOneUser = async (req, res, next) => {
  try {
    const { id } = req.params; //id is username

    if (id) {
      // const user = await UserService.dbFindOneUserById( id);
      const user = await UserService.dbFindUserByUsername(id,next);
      if (!user) return next(new Error("User not found"));
      res.status(200).json({ message: user });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateUserById = async (req, res, next) => {
  const { id } = req.params;

  //validation wurde an UserService übergeben

  try {
    const user = await UserService.dbUpdateUser(req, res, id, next);

    if (!user) return res.status(400).json({ message: "update User failed" });
    return res
      .status(200)
      .json({ message: `${user.username} updated!` });
  } catch (error) {
    console.log(error);
    next(error)
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

// export const deleteAllUsers = async (req, res) => {
//   try {
//     await User.deleteMany();
//     res.status(200).json({ message: "All User deleted" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };
