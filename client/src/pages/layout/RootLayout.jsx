import { Outlet } from "react-router-dom";
import ProtectionProvider from "../../context/auth/ProtectionProvider";
import { useProfileStore } from "../../context/data/dataStore";
import { Navigate } from "react-router-dom";

export default function RootLayout() {

  const {isOnline} = useProfileStore(state => state.defaultProfile)
  console.log(isOnline)
  return (
    <div>
      {/* <ProtectionProvider isAllowed={isOnline}>
      </ProtectionProvider> */}
      RootLayout

      {isOnline ?  <Outlet /> : <Navigate to={"/login"}/>}
       
    </div>
  );
}
