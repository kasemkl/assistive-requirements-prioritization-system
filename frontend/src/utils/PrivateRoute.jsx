import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
const PrivateRoute = ({ element }) => {
  // Add your authentication logic here
  let { user } = useContext(AuthContext);
  // Replace with your actual authentication check
  return !user ? <Navigate to="/login" /> : element;
};

export default PrivateRoute;
