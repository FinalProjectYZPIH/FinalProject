import { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate,redirect } from "react-router-dom";

export default function ProtectionProvider({
  isAllowed,
  children,
  redirectTo = "/login",
}) {
  const navigate = useNavigate();

  return isAllowed ? <>{children}</> : <Navigate to={redirectTo}/>;
}
