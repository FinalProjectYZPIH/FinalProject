import axios from "../../libs/axiosProtected.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function findAllUserRequest(...key) {
  return useQuery({
    queryKey: key,
    queryFn: async () => await axios.get("/api/user"),
    onSuccess: () => {}, // hier kann man success error und finally fälle einstellen
    onError: () => {},
    onSettled: () => {
      toast.success("Erfolgreich... Failed!");
    },
  });

}

export function updateUserRequest() {
  // {  logoinData schema
  //   username,
  //   oldPassword,
  //   newPassword,
  //   newPasswordConfirmation,
  // }
  const updateMutation = useMutation({
    mutationFn: async (loginData) =>await axios.patch("/api/user/updateUserById", loginData),
    onSuccess: () => {}, // hier kann man success error und finally fälle einstellen
    onError: () => {},
    onSettled: () => {
      toast.success("Erfolgreich... Failed!");
    },
  });

  return updateMutation;


}

export function findOneRequest(username,...key) {
  return useQuery({
    queryKey: key,
    queryFn: async () => await axios.get(`/api/user/${username}`),
    onSuccess: () => {}, // hier kann man success error und finally fälle einstellen
    onError: () => {},
    onSettled: () => {
      toast.success("Erfolgreich... Failed!");
    },
  });

}

export function deleteAccountRequest() {
  const findQuery = useMutation({
    mutationFn: async () => await axios.delete(`/api/user/deleteAccount`),
    onSuccess: () => {}, // hier kann man success error und finally fälle einstellen
    onError: () => {},
    onSettled: () => {
      toast.success("Erfolgreich... Failed!");
    },
  });

  return findQuery;
}
