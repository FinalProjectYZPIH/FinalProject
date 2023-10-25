import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.DOMAIN
    : "http://localhost:3000";

const authApi = axios.create({
  baseURL,
  withCredentials: true,  //hier schickt automatisch die Cookieinfos ans backend
});

// authApi.interceptors.request.use((config) => {  //einstellung für header jwt
//   const token = useAuthStore.getState().token;
//   config.headers = {
//     Authorization: `Bearer ${token}`,
//   };
//   return config;
// });

export default authApi;
