import axios from "../../libs/axiosProtected";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useProfileStore } from "../data/dataStore";
import { redirect, useNavigate } from "react-router-dom";
import { Toast } from "../../components/ui/Toasts";

// const queryClient = useQueryClient();

// queryClient.invalidateQueries({
//   queryKey: [],  //bestimme welchen der queries sollen nicht gespeichert werden
// })

export function registerRequest() {
  const navigate = useNavigate();
  // const registerHandler = await axios.post("/api/auth/createUser", { alternative eingabe
  //   firstname,
  //   lastname,
  //   username,
  //   birthday,
  //   email,
  //   emailConfirmation,
  //   password,
  //   passwordConfirmation,
  // });
  const registerMutation = useMutation({

    mutationFn: async (loginData) => {
      // Erstelle zuerst den Benutzer
      const createUserResponse = await axios.post(
        "/api/user/createUser",
        loginData
      );

      // Dann sende die Verifizierungs-E-Mail
      const verificationEmailResponse = await axios.post(
        "/api/auth/sendMailVerify",
        {
          recipient: loginData.email,
        }
      );

      return {
        createUserResponse,
        verificationEmailResponse
        // verificationResponse,
      };
    },
    onSuccess: () => {
      navigate("/login", { replace: true });
      toast.custom(<Toast>successfully registered</Toast>)
    },
    onError: (error) => {
      toast.custom(<Toast> Failed to Sign In</Toast>)
    },
  });
  return registerMutation;
}

export function loginRequest() {
  const loginMutation = useMutation({
    mutationFn: async (loginData) =>{
      await axios.post("/api/auth/login", loginData)
    },
    onSuccess: () => {
      // toast.custom(<Toast>Welcome back!</Toast>)
    }, 
    onError: () => {
      toast.custom(<Toast> Failed to Login</Toast>)
    },
    onSettled: () => { },
  });

  return loginMutation;
}

export async function refreshRequest(...key) {
  const { setLogin } = useProfileStore()
  return useQuery(
    key,
    async () => {
      const response = await axios.get("/api/auth/tokenRefresh");
      return response;
    },
  );
}

export function googleRequest(...key) {
  return useQuery(
    key,
    async () => {
      const response = await axios.get("/auth/google/callback");
      return response;
    },
    {
      onSuccess: () => {
       
       
      }, 
      onError: () => { },
      onSettled: () => {
      //  toast.success("google fetching...");
      },
    }
  );
}

export function logoutRequest() {
  const logoutQuery = useMutation({
    mutationFn: async () => await axios.post("/api/auth/logout"),
    onSuccess: () => {
      toast.custom(<Toast>you have been logged out</Toast>)

      redirect("/");
    }, // hier kann man success error und finally fälle einstellen
    onError: () => {
      toast.custom(<Toast> Failed to clear Cookie</Toast>)

    },
    onSettled: () => { },
  });
  return logoutQuery;
}

export function profileRequest(...key) {
  const { isOnline } = useProfileStore((state) => state.defaultProfile);

  // key ist gleich ["test",test1,"test2"] >> test/test1/test2    es kann auch object etc übergeben werden
  return useQuery({
    queryKey: key,
    queryFn: async () => await axios.get("/api/user/getProfile"),
    // enabled: !!isOnline, // kann nur gefetched werden, wenn isOnline sich auf true verändert
    onSuccess: () => {
      toast.custom(<Toast>WELCOME!</Toast>)
    }, 
    onError: () => { },
    onSettled: () => { },

    // refetchInterval: 60000*10, // 10minute,
    staleTime: 60000 * 60, //daten bleiben 60sek lang gültig,
    refetchOnReconnect:false,
    refetchIntervalInBackground:false,
    // retry: 3,
    // retryDelay: 30000
  });
}
