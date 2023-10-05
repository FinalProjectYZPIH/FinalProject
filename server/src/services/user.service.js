import { validateInput } from "../helpers/utils/validateInput.js";
import { updatePasswordSchema } from "../models/schema/user.schema.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export async function compareDBPassword(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }
  const isValid = await bcrypt.compare(password, user.password);

  return isValid;
}

export const dbCreateUser = async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password)
    return res.json({ message: "email and password are required!" });

  const duplicateEmail = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  if (duplicateEmail)
    return res.status(409).json({ message: "account already exist!" });

  const duplicateUsername = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });

  if (duplicateUsername)
    return res.status(409).json({ message: "account already exist!" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ ...req.body, password: hashedPassword });

  if (user) {
    console.log({ message: `${user} created` });
    res.status(201);
    return user;
  } else {
    throw new Error("failed created new User");
  }
};

export const dbFindAllUsers = async (res) => {
  const users = await User.find().select("-password");

  if (!users.length) return res.json({ message: "no users found" });

  res.status(200).json(users);
};

export const dbFindOneUser = async (res, params, populateKey = "") => {
  const user = await User.findById(params)
    .select("-password")
    .populate(populateKey);
  if (user) return res.status(200).json(user);
  res.json({ message: "not found" });
};

export const dbUpdateUser = async (req, res, userIDParams) => {
  const { username, oldPassword, newPassword } = req.body;



  const user = await User.findById(userIDParams);

  if (!user) return res.json({ message: "id not found" });


  const compareResult = await bcrypt.compare(oldPassword, user.password);


  if (!compareResult) return res.json({ message: "wrong password input" });

  const usernameExist = await User.findOne({ username: username || "" });


  const validateResult = validateInput(updatePasswordSchema,req,res)
console.log("validateInput", validateResult)
  if (!usernameExist &&  validateResult === true) {
    if (compareResult) {
      user.password = await bcrypt.hash(newPassword, 10); //nur wenn username nicht im datenbank existiert und nach validierung der request body, wirds geändert
    }
  }

  // user.email = email;  email kann nicht geändert werden nur password

  const updatedUser = await user.save();
  if (updatedUser) {
    return res.status(200).json({ message: `${updatedUser.username} updated!` });
  }

  return res.status(400).json({ message: "update User failed" });
};
