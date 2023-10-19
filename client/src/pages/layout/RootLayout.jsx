import { Outlet } from "react-router-dom";
import ProtectionProvider from "../../context/auth/ProtectionProvider";

export default function RootLayout() {
  return (
    <div>
      RootLayout
      <ProtectionProvider>
        <Outlet />
      </ProtectionProvider>
    </div>
  );
}
