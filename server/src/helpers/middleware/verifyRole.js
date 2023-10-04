

// Hier wird bei der Response Object die locals >> role >> kontrolliert
const verifyRole = (req, res, next) => {

  const {role} = res.locals;
  // jwt test
  // const {accessJwt}= req.cookies;
  // console.log(accessJwt)
  //     const {decoded } = verifyJwt(accessJwt,process.env.ACCESS_TOKEN_SECRET || "")
  //     console.log("refreshcode", decoded)

  if (role === "admin") {

    res.locals.role = "admin";
    return next();
  }

  if (role === "member") {

    res.locals.role = "Member";
    return next();
  }

  return next();
};

export default verifyAdmin;
