import SessionModel from "../models/session.model.js";
import UserModel from "../models/user.model.js";
//helper
import { signJwt, verifyJwt } from "../helpers/utils/jwt.utils.js";

//external Modul
import jwt from "jsonwebtoken";
import { cookieSessionSchema } from "../models/schema/session.schema.js";

export async function createSession(userId, userAgent, next) {
  try {
    const duplicate = await SessionModel.findOne({ user: userId });

    if (duplicate) return false;

    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
  } catch (error) {
    next(error);
  }
}

export async function findSessions(query) {
  return SessionModel.find(query).lean();
}

export async function updateSession(query, update) {
  return SessionModel.updateOne(query, update);
}

export function acceptCookie(memberInfo, res, ipAdress = "") {
  // {  CookieUser BeispielsObject
  //   UserInfo: {
  //     id: updatedUser?._id || "",
  //     email: updatedUser?.email,
  //     role: updatedUser?.role,
  //     session: session?._id || "",
  //   },
  // },

  try {
    const accessToken = signJwt(memberInfo, process.env.ACCESS_TOKEN || "");

    const refreshToken = signJwt(memberInfo, process.env.REFRESH_TOKEN || "");

    if (accessToken && refreshToken) {
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
      return true;
    }
    return false;
  } catch (error) {
    console.log("cookie Überschreibungserror: ", error);
    return false;
  }
}

export async function reSignToken(refreshToken, refreshkey, next) {
  try {
    const { decoded } = verifyJwt(refreshToken, refreshkey);
    console.log("refresh", decoded);
    if (!decoded || !decoded?.UserInfo.session)
      return next("Refresh Token failed");

    const session = await SessionModel.findById(decoded?.UserInfo.session);

    if (!session || session.valid) return next("deserilize session not found");

    const user = await UserModel.findOne({ _id: session.user });

    if (!user) return next("deserilize user not found");
    const cookieInfo = cookieSessionSchema.safeParse({
      UserInfo: {
        id: `${user?._id}` || "",
        email: user?.email,
        role: user?.role,
        session: `${session?._id}` || "",
      },
    });

    const newAccessToken = jwt.sign(
      cookieInfo.data,
      process.env.ACCESS_TOKEN || "",
      { expiresIn: 60 }
    );
    if (!newAccessToken) return next("new Accesstoken generate failed");

    return newAccessToken;
  } catch (error) {
    next(error);
  }
}
