import AuthProvider from "../auth/ProtectionProvider";
import { Outlet } from "react-router-dom";
import ToastProvider from "./ToastProvider";
import { useAuthStore } from "./dataStore";
import AuthLayout from "../../pages/layout/AuthLayout";
//Hier finden Sie alle Wrapper für die gesamte App.
export function AppWrapper() {
  const {isOnline} = useAuthStore()
  return (
    <ToastProvider>
        <Outlet />
    </ToastProvider>
  );
}
