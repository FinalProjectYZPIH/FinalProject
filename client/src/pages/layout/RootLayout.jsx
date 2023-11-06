import { Outlet } from "react-router-dom";
import ProtectionProvider from "../../context/auth/ProtectionProvider";
import { useProfileStore } from "../../context/data/dataStore";
import { Navigate } from "react-router-dom";

export default function RootLayout() {
  const { isOnline } = useProfileStore((state) => state.defaultProfile);
  console.log(isOnline);

<<<<<<< HEAD
=======
  const {isOnline} = useProfileStore(state => state.defaultProfile)
  // const {resetProfile} = useProfileStore()
  console.log(isOnline)

  // if(isOnline === false) {
  //   resetProfile()
  // }
>>>>>>> Development
  return (
    <div>
      <ProtectionProvider isAllowed={true}>
        RootLayout
        <Outlet />
      </ProtectionProvider>
    </div>
  );
}
