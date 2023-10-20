import axios from "../../libs/axiosProtected";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import { useState } from "react";


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

export function useLoginRequest() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });


    const loginMutation = useMutation({
      mutationFn: async () => {
        await axios.post("/api/auth/login",loginData)
      },
      // onError: () => {

      // },
      // onSuccess: () => {

      // },

  })

  return [loginData, setLoginData, loginMutation]
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
