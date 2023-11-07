import axios from "../../libs/axiosProtected";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useProfileStore } from "../data/dataStore";

// const queryClient = useQueryClient();

// queryClient.invalidateQueries({
//   queryKey: [],  //bestimme welchen der queries sollen nicht gespeichert werden 
// })

export function registerRequest() {
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
    mutationFn: async (loginData) =>
      await axios.post("/api/auth/", loginData),
    onSuccess: () => { toast.success("Erfolgreich... Failed!");}, // hier kann man success error und finally fälle einstellen
    onError: () => {},
    onSettled: () => {
      toast.success("Erfolgreich... Failed!");
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
      
      toast.success("Willkommen zurück!");}, // hier kann man success error und finally fälle einstellen
    onError: () => {toast.error("Fail to  sign in...")},
    onSettled: () => {
    },
  });

  return loginMutation;
}

export function refreshRequest(...key) {
   return useQuery(
    key,
    async () => {
      const response = await axios.get("/api/auth/tokenRefresh");
      return response
    },
    {
      onSuccess: () => {toast.success("Erfolgreich...");}, // hier kann man success error und finally fälle einstellen
      onError: () => {toast.success("Failed!");},
      onSettled: () => {
        toast.success("Erfolgreich... Failed!");
      },
    }
  );

}


export function googleRequest(...key) {
  return useQuery(
   key,
   async () => {
     const response = await axios.get("/auth/google/callback");
     return response
   },
   {
     onSuccess: () => {toast.success("Erfolgreich... Failed!");}, // hier kann man success error und finally fälle einstellen
     onError: () => {},
     onSettled: () => {
      toast.success("google fetching...");
     },
   }
 );

}

export function logoutRequest() {
  const logoutQuery = useMutation({
    mutationFn: async () => await axios.post("/api/auth/logout"),
    onSuccess: () => {toast.success("Erfolgreich... logout!")}, // hier kann man success error und finally fälle einstellen
    onError: () => {toast.success("Clear cookie failed!")},
    onSettled: () => {

    },
  });
  return logoutQuery;
}

export function profileRequest(...key) {
  const {isOnline} = useProfileStore(state => state.defaultProfile)

  // key ist gleich ["test",test1,"test2"] >> test/test1/test2    es kann auch object etc übergeben werden
  return useQuery({
    queryKey:key, 
    queryFn: async () => await axios.get("/api/user/getProfile"),
    enabled: !!isOnline, // kann nur gefetched werden, wenn isOnline sich auf true verändert
    onSuccess: () => {
      toast.success("Erfolgreich... fetched User");
    }, // hier kann man success error und finally fälle einstellen
    onError: () => {},
    onSettled: () => {
    },

    // refetchInterval: 60000*10, // 10minute,
    staleTime: 60000 * 60, //daten bleiben 60sek lang gültig,
    // retry: 3,
    // retryDelay: 30000
  });
  
}
