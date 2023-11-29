import { Navigate, Outlet } from "react-router-dom";
import React from "react";

import { useAuth } from "../provider/authProvider";

export const ProtectedRoute = () => {
  const { token } = useAuth();
  console.log("protected route:", token);
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
