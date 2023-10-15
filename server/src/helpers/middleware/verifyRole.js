
const accessTokenP = process.env.ACCESS_TOKEN || "";

const verifyRole = (req, res, next) => {
  // const { role } = res.locals; // bevorzugt für Header jwt request
  const { decoded, valid } = verifyJwt(accessJwt, accessTokenP);


  if(valid){
    next();
  }
  if (!decoded?.UserInfo.role) {
    role = "";
    console.log("guest");
    return next();
  }

  if (decoded?.UserInfo.role === "member") {
    res.locals.role = "Member";
    console.log("member");
    return next();
  }

  if (decoded?.UserInfo.role === "admin") {
    res.locals.role = "admin";
    console.log("admin");
    return next();
  }

  
};

export default verifyRole;
