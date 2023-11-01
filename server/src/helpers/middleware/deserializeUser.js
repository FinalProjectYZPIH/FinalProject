//helper
import { verifyJwt } from "../utils/jwt.utils.js";
//services
import { reSignToken } from "../../services/auth.service.js";
import logger from "./logger.js";

//allgemeine id kontrolle und id aktualisierung
const deserializeUser = async (req, res, next) => {
  const { accessJwt } = req?.cookies;
  const { refreshJwt } = req?.cookies;
  // falls keine jwt in cookie zu finden ist
  if (!accessJwt) {
    res.locals.role = "";
    return next();
  }

  // jwt decoden 
  const { decoded, expired, valid } = verifyJwt(accessJwt, process.env.ACCESS_TOKEN);
   
// hier
    logger.info("Status:",decoded,"expired",expired, "valid", valid)
  try {
    //falls jwt nicht abläuft
    if (!expired) {
      res.locals.role = decoded?.UserInfo.role
      return next();
    }
    if(!decoded) ;// hier kann man dem user rauskicken aus dem login
      // falls refreshtoken vorhaden ist und accetoken abläuft und nicht valid ist udn decoded vorhanden ist
    if (expired && refreshJwt && !valid && decoded) {
      
      
      const newAccessToken = await reSignToken(refreshJwt, process.env.REFRESH_TOKEN || "", next);

          // console.log("new",newAccessToken)
      if (!newAccessToken) return next("newAccessToken failed")
      

        res.cookie("accessJwt", newAccessToken, {
          httpOnly: false,
          secure: false,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      

      const { decoded } = verifyJwt(newAccessToken, process.env.ACCESS_TOKEN || "");
      logger.info("new Token created")

      if(!decoded) next(("newAcesstoken decoded failed"))

      res.locals.role = decoded?.UserInfo.role;
      return next();
    }

    return next();
  } catch (error) {
    logger.error("deserilize fehler", error);
    next(error)
  }
};

export default deserializeUser;
