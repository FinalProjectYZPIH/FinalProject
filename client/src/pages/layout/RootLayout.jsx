import { Outlet } from "react-router-dom";
import ProtectionProvider from "../../context/auth/ProtectionProvider";
import { useProfileStore } from "../../context/data/dataStore";
<<<<<<< HEAD
=======
import { Navigate } from "react-router-dom";
>>>>>>> 7add30f5cc00ce47417c2c38952ae1ce982a2f4d

export default function RootLayout() {

  const {isOnline} = useProfileStore(state => state.defaultProfile)
<<<<<<< HEAD
=======
  console.log(isOnline)
>>>>>>> 7add30f5cc00ce47417c2c38952ae1ce982a2f4d
  return (
    <div>
      <ProtectionProvider isAllowed={isOnline}>
      RootLayout
<<<<<<< HEAD
      <ProtectionProvider isAllowed={isOnline}>
        <Outlet />
=======
      <Outlet />
>>>>>>> 7add30f5cc00ce47417c2c38952ae1ce982a2f4d
      </ProtectionProvider>
       
    </div>
  );
}
