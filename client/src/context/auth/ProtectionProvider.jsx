import { Navigate } from "react-router-dom";

export default function ProtectionProvider({
  isAllowed,
  children,
  redirectTo = "/login",
}) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return children
}
