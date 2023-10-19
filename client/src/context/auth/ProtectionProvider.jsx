import { Outlet, Navigate } from "react-router-dom";


export default function ProtectionProvider({
  isAllowed,
  children,
  redirectTo = "/login",
}) {

  return isAllowed ? (
  <>
    {children}
  </>
  ) : (
    <Navigate to={redirectTo} />
  );
}
