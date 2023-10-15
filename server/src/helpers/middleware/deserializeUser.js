//helper
import { verifyJwt } from "../utils/jwt.utils.js";
//services
import { reSignToken } from "../../services/auth.service.js";

// variables
const accessTokenP = process.env.ACCESS_TOKEN || "";
const refreshTokenP = process.env.REFRESH_TOKEN || "";
const deserializeUser = async (req, res, next) => {
  const { accessJwt } = req?.cookies;
  const { refreshJwt } = req?.cookies;
  
  if (!accessJwt) {
    res.locals.role = "";
    return next();
  }
  const { decoded, expired, valid } = verifyJwt(accessJwt, accessTokenP);
  
  console.log(decoded)
  try {
    console.log(decoded, expired, valid);
    if (!expired) {
      res.locals.role = decoded?.UserInfo.role;
      return next();
    }
    if (expired && refreshJwt && !valid) {
      const newAccessToken = await reSignToken(refreshJwt, refreshTokenP, next);
          
      if (newAccessToken) {
        res.cookie("accessJwt", newAccessToken, {
          httpOnly: false,
          secure: false,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }

      const { decoded } = verifyJwt(newAccessToken, accessTokenP);
      console.log("5",decoded)
      if(!decoded) return next(new Error("sitzung abgelaufen"))
      res.locals.role = decoded?.UserInfo.role;
      return next();
    }

    if (!accessJwt) {
      return next();
    }

    return next();
  } catch (error) {
    console.log("deserilize fehler", error);
    next(error)
  }
};

export default deserializeUser;
