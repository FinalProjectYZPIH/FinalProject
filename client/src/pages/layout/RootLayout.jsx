import { Outlet } from "react-router-dom";
import ProtectionProvider from "../../context/auth/ProtectionProvider";
import { useProfileStore } from "../../context/data/dataStore";

export default function RootLayout() {

  const {isOnline} = useProfileStore(state => state.defaultProfile)
  return (
    <div>
      RootLayout
      <ProtectionProvider isAllowed={isOnline}>
        <Outlet />
      </ProtectionProvider>
    </div>
  );
}
