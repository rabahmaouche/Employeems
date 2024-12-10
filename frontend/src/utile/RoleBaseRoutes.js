import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RoleBaseRoutes({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    <div>loading ... ..</div>;
  }
  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return user ? children : <Navigate to={"/login"} />;
}
