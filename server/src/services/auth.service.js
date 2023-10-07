import SessionModel from "../models/session.model.js";
import UserModel from "../models/user.model.js";
//helper
import { signJwt, verifyJwt } from "../helpers/utils/jwt.utils.js";

//external Modul
import jwt from "jsonwebtoken";
import { cookieSessionSchema } from "../models/schema/session.schema.js";
import { getCurrentTime } from "../helpers/utils/currentTime.js";

export async function createSession(userId, userAgent) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function findSessions(query) {
  return SessionModel.find(query).lean();
}

export async function updateSession(query, update) {
  return SessionModel.updateOne(query, update);
}

export async function acceptCookie(memberInfo, res, ipAdress = "") {
  // {  CookieUser BeispielsObject
  //   UserInfo: {
  //     id: updatedUser?._id || "",
  //     email: updatedUser?.email,
  //     role: updatedUser?.role,
  //     session: session?._id || "",
  //   },
  // },

  try {
    const accessToken = signJwt(memberInfo, process.env.ACCESS_TOKEN || "", {
      expiresIn: 5,
      algorithm: "HS256",
    });
    
    const refreshToken = signJwt(memberInfo, process.env.REFRESH_TOKEN || "", {
      expiresIn: 60,
      algorithm: "HS256",
    });
    
    if(accessToken && refreshToken){
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
    return false
  } catch (error) {
    console.log("cookie Überschreibungserror: ", error);
    return false;
  }
}

export async function reSignToken(refreshToken, keyName) {
  const { decoded } = verifyJwt(refreshToken, keyName);
  if (!decoded || !decoded?.UserInfo.session) return console.log("1");

  console.log(decoded)
  const session = await SessionModel.findById(decoded?.UserInfo.session);

  if (!session || session.valid) return console.log("2");

  const user = await UserModel.findOne({ _id: session.user });



  if (!user) return console.log("3");
  const cookieInfo = cookieSessionSchema.safeParse({
    UserInfo: {
      id: `${user?._id}`|| "",
      email: user?.email,
      role: user?.role,
      session: `${session?._id}` || "",
      darkModeTime: getCurrentTime(),
    },
  });

  const newAccessToken = jwt.sign(
    cookieInfo.data,
    process.env.ACCESS_TOKEN || "",
    { expiresIn: 60 }
  );
  if (!newAccessToken) return console.log("4");

  return newAccessToken;
}
