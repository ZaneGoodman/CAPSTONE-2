import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useAuth } from "../provider/authProvider";
//Keep watch over each protected route, redirect to login page if not authenticated
export const ProtectedRoute = () => {
  const { token } = useAuth();
  console.log("protected route:", token);
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
