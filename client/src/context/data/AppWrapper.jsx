import AuthProvider from "../auth/AuthProvider";
import { Outlet } from "react-router-dom";
import ToastProvider from "./ToastProvider";

//Hier finden Sie alle Wrapper für die gesamte App.
export function AppWrapper() {
  return (
    <ToastProvider>
      <AuthProvider isAllowed={true}>
        <Outlet />
      </AuthProvider>
    </ToastProvider>
  );
}
