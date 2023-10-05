import { validateInput } from "../helpers/utils/validateInput.js";
import { User } from "../models/user.model.js";
import { loginFormSchema } from "../models/schema/user.schema.js";
import { compareDBPassword } from "../service/user.service";
import { findSessions, updateSession } from "../service/auth.service.js";
import { signJwt, verifyJwt } from "../helpers/utils/jwt.utils.js";
import SessionModel from "../models/session.model.js";
import { Session } from "../models/schema/session.schema.js";

const accessTokenP = process.env.ACCESS_TOKEN_SECRET || "";
const refreshTokenP = process.env.REFRESH_TOKEN_SECRET || "";
export const login = async (req, res) => {
  validateInput(loginFormSchema, req, res);

  const { email, password } = req.body;
  await compareDBPassword(email, password);
  const updatedUser = await User.findOneAndUpdate(
    { email: email },
    { $set: { role: "admin" , valid: true} }
  );

  res.locals.role = updatedUser?.role;

  //mit gefundenen User finde dem erstellten Session und speichern dem _id auf client
  const session = await SessionModel.findOne({
    user: updatedUser?._id,
  });

  const accessToken = signJwt(
    {
      UserInfo: {
        id: updatedUser?._id || "",
        email: updatedUser?.email,
        role: updatedUser?.role,
        session: session?._id || "",
      },
    },
    accessTokenP,
    { expiresIn: 5, algorithm: "HS256" }
  );

  const refreshToken = signJwt(
    {
      UserInfo: {
        id: updatedUser?._id || "",
        email: updatedUser?.email,
        role: updatedUser?.role,
        session: session?._id || "",
      },
    },
    refreshTokenP,
    { expiresIn: 60, algorithm: "HS256" }
  );

  res
    .cookie("accessJwt", accessToken, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .cookie("refreshJwt", refreshToken, {
      httpOnly: false, //accessible only by web server
      secure: false, //https
      sameSite: "lax", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    res.locals.role = "admin"

  res.status(200).json({ message: "success logging in" });
};

export const sessionRefreshHandler = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt)
    return res.status(401).json({ message: "Json Web Token not found" });

  const { decoded } = verifyJwt(cookies.refreshJwt, refreshTokenP);

  const session = await findSessions({
    _id: decoded?.UserInfo.session,
    valid: true,
  });

  if (!session) return res.status(500).json({ message: "Unauthorized" });

  res.status(200).json({ message: "session refreshed" });
};

export const logout = async (req, res) => {
  const session = req.cookies.accessToken;

  const { decoded } = verifyJwt(session, accessTokenP);

  await updateSession({ _id: decoded?.UserInfo.session }, { valid: false });

  res.locals.role = "";
  res.clearCookie("accessJwt", {
    httpOnly: false,
    sameSite: "lax",
    secure: false,
  });

  res
    .clearCookie("refreshJwt", {
      httpOnly: false,
      sameSite: "lax",
      secure: false,
    })
    .status(200)
    .json({ message: "user success logged out" });
};
