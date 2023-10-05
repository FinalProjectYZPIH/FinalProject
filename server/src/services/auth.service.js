import { signJwt, verifyJwt } from "../helpers/utils/jwt.utils.js";
import SessionModel from "../models/session.model.js";
import User  from "../models/user.model.js";
import jwt from "jsonwebtoken"
export async function createSession(userId, userAgent) {
    const session = await SessionModel.create({ user: userId, userAgent });
  
    return session.toJSON();
  }



export async function findSessions(query) {
    return SessionModel.find(query).lean();
  }


  export async function updateSession(
    query,
    update
  ) {
    return SessionModel.updateOne(query, update);
  }
  

  export async function reSignToken(refreshToken , keyName) {
    const  {decoded}   = verifyJwt(refreshToken, keyName);
    if (!decoded || !decoded.UserInfo.session) return false;
  
    const session = await SessionModel.findById(decoded.UserInfo.session);
  
    if (!session || !session.valid) return false;
  
    const user = await User.findOne({ _id: session.user });
  
    if (!user) return false;
  

  const newAccessToken = jwt.sign(
    {
      UserInfo: {
        id: user?._id,
        email: user?.email,
        role: user?.role,
        session: session._id
      },
    },
    process.env.ACCESS_TOKEN_SECRET || "",
    { expiresIn: 60 }
  );
  if(!newAccessToken) return false
  
    return newAccessToken;
  }
  