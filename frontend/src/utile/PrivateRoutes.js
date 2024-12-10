import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>loading ... ..</div>;
  }

  return user ? children : <Navigate to={"/login"} />;
}
