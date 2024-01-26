import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = window.localStorage.getItem("tokenAdmin");
  if (!token) {
    return <Navigate to="/adminLogin" />;
  } else {
    return children;
  }
};

export default PrivateRoute;
