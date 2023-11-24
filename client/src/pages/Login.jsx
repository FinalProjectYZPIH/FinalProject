import { redirect } from "react-router-dom";
import { LoginComponent } from "../components/LoginComponent.jsx";
import { useProfileStore } from "../context/data/dataStore.jsx";
import { profileRequest } from "../context/api/auth.jsx";
import toast from "react-hot-toast";
import { ColorToast } from "../components/ui/Toasts.jsx";
import { useEffect } from "react";

const Login = () => {
  // const { setLogin } = useProfileStore(); //benutze die globale variable um login und userobjekte einzusetzen und um zuverteilen
  // const { isOnline } = useProfileStore((state) => state.defaultProfile);

  // const {
  //   isError: gError,
  //   isSuccess: gIsSuccess,
  //   data: gUserData,
  // } = profileRequest("google-login");
  // const {
  //   isError: fbError,
  //   isSuccess: fbIsSuccess,
  //   data: fbUserData,
  // } = profileRequest("facebook-login");

  // useEffect(() => {
  //   const handleLogin = async () => {
  //     if (gError || fbError) {
  //       toast.custom(<ColorToast>Identify Cookie Failed</ColorToast>);
  //     }

  //     if (gIsSuccess && gUserData.data.isOnline) {
  //       await setLogin(); 
  //       if (isOnline === true) {
  //         redirect("/chat");
  //       }
  //     }

  //     if (fbIsSuccess && fbUserData.data.isOnline) {
  //       await setLogin(); 
  //       if (isOnline === true) {
  //         redirect("/chat");
  //       }
  //     }
  //   };

  //   handleLogin(); 
  // }, [gError, gIsSuccess, gUserData, fbError, fbIsSuccess, fbUserData, isOnline, setLogin]);


  return (
    <>
      <LoginComponent />
    </>
  );
};

export default Login;

