import { Outlet, Navigate } from "react-router-dom";


export default function AuthProvider({
  isAllowed,
  children,
  redirectTo = "/login",
}) {



  if (!isAllowed) return <Navigate to={redirectTo} />;
  return children ? (
    children
  ) : (
    <>
      <div>
        AuthProvider
        <Outlet />
      </div>
    </>
  );
}
