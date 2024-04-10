import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import decodeToken from "../utils/decodeToken";

//REACT KOMPONENTA KOJA U APP.JSX STITI NASE RUTE
const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const { roles } = decodeToken(auth.accessToken);

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
