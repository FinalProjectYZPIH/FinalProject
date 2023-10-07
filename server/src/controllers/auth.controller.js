// helper
import { signJwt, verifyJwt } from "../helpers/utils/jwt.utils.js";
import { getCurrentTime } from "../helpers/utils/currentTime.js";

// models schema
import {
  emailLoginSchema,
  nameLoginSchema,
} from "../models/schema/user.schema.js";
import SessionModel from "../models/session.model.js";
import { cookieSessionSchema } from "../models/schema/session.schema.js";

// services
import { compareDBPassword } from "../services/user.service.js";
import {
  acceptCookie,
  findSessions,
  updateSession,
} from "../services/auth.service.js";

// import { Session } from "../models/schema/session.schema.js";

const accessTokenP = process.env.ACCESS_TOKEN_SECRET || "";
const refreshTokenP = process.env.REFRESH_TOKEN_SECRET || "";
export const login = async (req, res) => {
  const { email, password } = req?.body;
  let loginSchema;

  if (req?.body.email) {
    loginSchema = emailLoginSchema;
  } else {
    loginSchema = nameLoginSchema;
  }

  try {
    const loginResult = loginSchema.safeParse(req.body);
    console.log(loginResult.error)

    if (!loginResult.success)
      return res.status(400).json({ message: "3"+loginResult.error.message });

    const { isValid, user } = await compareDBPassword(email, password);

    if (!isValid) {
      return res.status(400).json({ message: "password invalid" });
    }

    //mit gefundenen User finde dem bereits erstellten Session im db und update es falls nötig
    const session = await SessionModel.findOne({
      user: user?._id,
    });

    if (!session.emailVerified) {
      console.log("bestätige erst dem emailseingang");
    }

    //cookie Inhalt wird validiert und gespeichert
    const cookieInfo = cookieSessionSchema.safeParse({
      UserInfo: {
        id: `${user?._id}`|| "",
        email: user?.email,
        role: user?.role,
        session: `${session?._id}` || "",
        darkModeTime: getCurrentTime(),
      },
    });

    const accessValid = cookieInfo.success
      ? acceptCookie(cookieInfo.data, res)
      : console.log("cookie abgelehnt",cookieInfo.error);

    if (session.emailVerified) {
      res.locals.role = user?.role;
    }

    if (accessValid)
      return res
        .status(200)
        .json({
          message: "Thanx for using cookies, you are success logging in",
        });

    res.status(200).json({ message: "success logging in without cookie" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const sessionRefreshHandler = async (req, res,next) => {

  try {
    const cookies = req.cookies;
    if (!cookies.accessJwt)
      return res.status(401).json({ message: "Json Web Token not found" });
  
    const { decoded } = verifyJwt(cookies.refreshJwt, refreshTokenP);

    res.locals.role = decoded?.UserInfo.role
  
    const session = await findSessions({
      _id: decoded?.UserInfo.session,
      valid: true,
    });
  
    if (!session) return res.status(500).json({ message: "Unauthorized" });
  
    res.status(200).json({ message: "session refreshed" });
    
  } catch (error) {
    // next(error)
    res.status(500).json({message: error})
  }
};

export const logout = async (req, res) => {
  const aceessJWT = req.cookies.accessJwt;

  const { decoded } = verifyJwt(aceessJWT, accessTokenP);

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
