import { verifyJwt } from "../utils/jwt.utils.js";
import { reSignToken } from "../../services/auth.service.js";

const accessTokenP = process.env.ACCESS_TOKEN_SECRET || "";
const refreshTokenP = process.env.REFRESH_TOKEN_SECRET || "";
const deserializeUser = async (
  req,
  res,
  next
) => {
  const { accessJwt } = req?.cookies;
  const { refreshJwt } = req?.cookies;


  // const {decoded :decode} = verifyJwt(accessJwt,accessTokenP)
  // console.log("refreshcode", decode)
  //   const session:any = await SessionModel.findById("650764f3a98d4221fbcebe77")
  // console.log(session.user)

  const { decoded, expired,valid } = verifyJwt(accessJwt, accessTokenP);
  console.log(decoded,expired,valid)
  if (!expired) {
    res.locals.role = decoded?.UserInfo.role;
    // await sessionRefreshHandler(req, res, next)
    return next();
  }
  if (expired && refreshJwt) {
    const newAccessToken = await reSignToken(refreshJwt, refreshTokenP);


    if (newAccessToken) {
      res.cookie("accessJwt", newAccessToken, {
        httpOnly: false,
        secure: false,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    const { decoded } = verifyJwt(newAccessToken, accessJwt);

    res.locals.role = decoded?.UserInfo.role;
    // await sessionRefreshHandler(req,res, next)
    return next();
  }

  if (!accessJwt) {
    return next();
  }

  return next();
};

export default deserializeUser;
