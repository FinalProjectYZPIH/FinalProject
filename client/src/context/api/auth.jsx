import axios from "../../libs/axiosProtected";

export async function registerRequest(data) {
  const {
    firstname,
    lastname,
    username,
    birthday,
    email,
    emailConfirmation,
    password,
    passwordConfirmation,
  } = data;
  const registerHandler = await axios.post("/api/auth/createUser", {
    firstname,
    lastname,
    username,
    birthday,
    email,
    emailConfirmation,
    password,
    passwordConfirmation,
  });

  return registerHandler.data;
}

export async function loginRequest({ user, password }) {
    let requestData = {};

    if (user.email) {
      requestData = { email: user.email, password };
    } else if (user.username) {
      requestData = { username: user.username, password };
    }
  const loginHandler = await axios.post("/api/auth/login",requestData)
  return loginHandler.data;
}

export async function refreshRequest() {
  await axios.get("/api/auth/tokenRefresh");
}

export async function logoutRequest() {
  await axios.post("/api/auth/logout");
}

export async function profileRequest() {
  const profileHandler = await axios.get("/api/user/getProfile");
  return profileHandler.data;
}
