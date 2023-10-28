import { Navigate } from "react-router-dom";
import { profileRequest } from "../api/auth";


export default function ProtectionProvider({
  isAllowed,
  children,
  redirectTo = "/login",
}) {
  const { data: userData, isSuccess } = profileRequest("google-user");



    if(isSuccess) return children;
  
    

  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return children;
}
