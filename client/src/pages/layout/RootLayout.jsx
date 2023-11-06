import { Outlet } from "react-router-dom";
import ProtectionProvider from "../../context/auth/ProtectionProvider";
import { useProfileStore } from "../../context/data/dataStore";
import { Navigate } from "react-router-dom";
import ChatSidebar from "../../components/ChatSidebar";

export default function RootLayout() {
  const { isOnline } = useProfileStore((state) => state.defaultProfile);
  console.log(isOnline);

  return (
    <div>
      <ProtectionProvider isAllowed={isOnline}>
        <ChatSidebar />
        <Outlet />
      </ProtectionProvider>
    </div>
  );
}
