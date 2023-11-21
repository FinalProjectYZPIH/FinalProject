import { redirect } from "react-router-dom";
import { FacebookIcons, GoogleIcons } from "../assets/Icons.jsx";
import { MediaButtons } from "../components/ui/Buttons.jsx";
import { LoginComponent } from "../components/LoginComponent.jsx";
import { useProfileStore } from "../context/data/dataStore.jsx";
import { profileRequest } from "../context/api/auth.jsx";

const Login = () => {
  const { setLogin, setLogout, resetProfile, setProfile } = useProfileStore(); //benutze die globale variable um login und userobjekte einzusetzen und um zuverteilen
  const { isOnline } = useProfileStore((state) => state.defaultProfile);

  const {isSuccess:gIsSuccess, data: gUserData} = profileRequest("google-login")
  const {isSuccess: fbIsSuccess, data: fbUserData} = profileRequest("facebook-login")
  
  if(gIsSuccess && gUserData.data.isOnline) {
    setLogin();
    redirect("/chat")
  }

  if(fbIsSuccess && fbUserData.data.isOnline) {
    setLogin();
    redirect("/chat")
  }
  
  return (
    <>
      <LoginComponent />
    </>
  );
};

export default Login;

