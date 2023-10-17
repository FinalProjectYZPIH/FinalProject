



export const verifyMember = (req, res, next) => {
  const { role } = res.locals; 



  if (role === "member") {

    res.locals.role = "member";

    console.log("member");
    return next();
  }


return next("not member") ;

  
};

export const verifyAdmin = (req,res,next) => {
  const { role } = res.locals; 


  if (role === "admin") {
    res.locals.role = "admin";
    console.log("admin");
    return next();
  }

  return next("not admin");

}


