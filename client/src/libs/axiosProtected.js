import axios from "axios";
import { useNavigate } from "react-router-dom";

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

authApi.interceptors.response.use(
  (response) => {
    // Erfolgreiche Antwort verarbeiten
    return response;
  },
  (error) => {
    const navigate = useNavigate()
    // Fehler verarbeiten
    if (error.response && error.response.status === 500) {
      // Hier weiterleiten, wenn der Status 500 ist
      navigate("/"); // Stellen Sie sicher, dass "/home" Ihre richtige Home-Seite ist
    }
    return Promise.reject(error);
  }
);
export default authApi;
