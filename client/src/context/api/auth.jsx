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
      return await axios.post("/api/user/createUser", loginData);
    },
    onSuccess: () => {
      navigate("/login", { replace: true });
      toast.custom(<div className="font-orbitron ring-2 flex justify-center items-center  border border-cyan-400 rounded-lg m-6 h-10 w-30 text-2xl text-cyan-300 p-8 text-center lg:flex   ">successfully registered</div>);
    },
    onError: (error) => {
       toast.custom(<div className="font-orbitron ring-2 flex justify-center items-center  border border-cyan-400 rounded-lg m-6 h-10 w-30 text-2xl text-cyan-300 p-8 text-center">Failed to Sign In</div>);
    },

  });

  return registerMutation;
}

export function loginRequest() {
  //tested
  const loginMutation = useMutation({
    mutationFn: async (loginData) =>
      await axios.post("/api/auth/login", loginData),
    onSuccess: () => {
      // toast.custom(<Toast>Welcome back!</Toast>)
    }, // hier kann man success error und finally fälle einstellen
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
        toast.success("Erfolgreich... Failed!");
      }, // hier kann man success error und finally fälle einstellen
      onError: () => { },
      onSettled: () => {
        toast.success("google fetching...");
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
      toast.custom(<div className="font-orbitron ring-2 flex justify-center items-center  border border-cyan-400 rounded-lg m-6 h-10 w-30 text-2xl text-cyan-300 p-8 text-center lg:flex   ">clear cookie failed</div>);
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
    enabled: !!isOnline, // kann nur gefetched werden, wenn isOnline sich auf true verändert
    onSuccess: () => {
      toast.custom(<div className="font-orbitron ring-2 flex justify-center items-center  border border-cyan-400 rounded-lg m-6 mt-20 h-10 w-30 text-2xl text-cyan-300 p-8 text-center">welcome!</div>);
    }, // hier kann man success error und finally fälle einstellen
    onError: () => { },
    onSettled: () => { },

    // refetchInterval: 60000*10, // 10minute,
    staleTime: 60000 * 60, //daten bleiben 60sek lang gültig,
    // retry: 3,
    // retryDelay: 30000
  });
}
