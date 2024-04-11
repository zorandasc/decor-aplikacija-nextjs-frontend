import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  let roles = [];
  if (decoded) {
    roles = JSON.parse(decoded?.sub)?.UserInfo?.roles;
  }

  return auth?.accessToken ? (
    roles.find((role) => allowedRoles?.includes(role)) ? (
      <Outlet></Outlet> //AUTENTIFIKOVAN i AUTORIZOVAN
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace /> //NEAUTORIZOVAN
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace></Navigate> //NEAUTENTIFIKOVAN
  );
};

export default RequireAuth;
