import { updatePasswordSchema } from "../models/schema/user.schema.js";
import UserModel from "../models/user.model.js";

// external module
import bcrypt from "bcrypt";

export async function compareDBPassword( password,loginData, next,) {
  try {
    const user = await UserModel.findOne({ email: loginData});
    const userOpt = await UserModel.findOne({ username: loginData});


    if (!user && !userOpt) {
      return false;
    }
    const userResult = user || userOpt;
    const isValid = await bcrypt.compare(password, userResult.password);
    console.log(isValid)

    return { isValid: isValid, user: userResult };
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

export const dbCreateUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password) return next( "Email and Password are Required!")

    const duplicateEmail = await UserModel.findOne({ email }).collation({
      locale: "en",
      strength: 2,
    });
    if (duplicateEmail) return next( "Account already exist!" )

    const duplicateUsername = await UserModel.findOne({ username }).collation({
      // nicht auf groß und kleinschreibungen achten
      locale: "en",
      strength: 2,
    });

    if (duplicateUsername) return next(  "Account already exist!")

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });

    if (!user) return false;
    return user
  } catch (error) {
    next(error)
  }
};

export const dbFindAllUsers = async (res,next) => {
  try {
    const users = await UserModel.find().select("-password");

    return users;
  } catch (error) {
    next(error);
  }
};

// export const dbFindOneUserById = async ( params, populateKey = "") => {
//   try {
//     const user = await UserModel.findById(params)
//       .select("-password")
//       .populate(populateKey);
//       if(!user) return false;
//     return user;
//   } catch (error) {
//     throw error
//   }
// };

export const dbFindUserByUsername = async ( value, next, populateKey = "") => {
  try {
    
    const foundUser = await UserModel.findOne({ username: value })
    .select("-password")
    .populate(populateKey);
    if (!foundUser) return false;
    return foundUser
  } catch (error) {
   next( error)
  }
};

export const dbUpdateUser = async (req, res, userIDParams, next) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    const user = await UserModel.findById(userIDParams);
    if (!user) return res.json({ message: "id not found" });


    const compareResult = await bcrypt.compare(oldPassword, user.password);
    if (!compareResult) return res.json({ message: "wrong password input" });


    const usernameExist = await UserModel.findOne({ username: username });
    const validateResult = updatePasswordSchema.safeParse(req.body);

    if (usernameExist && !validateResult.success) {
      res.status(400).json({ message: "Invalid username or request body" });
    }
    if (compareResult) {
      user.password = await bcrypt.hash(newPassword, 10); //nur wenn username nicht im datenbank existiert und nach validierung der request body, wirds geändert
    }

    user.username = username;
    // user.email = email;  email kann nicht geändert werden nur password

    const updatedUser = await user.save();

    if(!updatedUser) return false


    return updatedUser;
  } catch (error) {
    console.log("dbUpdateUser error");
    next(error)
  }
};
