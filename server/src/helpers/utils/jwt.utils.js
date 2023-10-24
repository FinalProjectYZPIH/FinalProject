import jwt from "jsonwebtoken";
export function signJwt(
  object,
  keyName,
  options ={
    expiresIn: 60*2,  
    algorithm: "HS256",
    allowInsecureKeySizes: true,
  }
) {
  return jwt.sign(object, keyName, options);
}

export function verifyJwt(token , keyName) {
  
  try {
    const decoded = jwt.verify(token, keyName, {algorithms: 'HS256'});
    if (decoded)
      return {
        valid: true,
        expired: false,
        decoded,
      };
    return {
      valid: false,
      expired: true,
      decoded: null,
    };
  } catch (e) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}