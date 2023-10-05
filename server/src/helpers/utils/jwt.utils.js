import jwt from "jsonwebtoken";
export function signJwt(
  object,
  keyName,
  options
) {
  return jwt.sign(object, keyName, options);
}

export function verifyJwt(token , keyName) {
  
  try {
    const decoded = jwt.verify(token, keyName);

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
