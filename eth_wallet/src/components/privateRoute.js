import React from "react";
import { Route, Redirect, RouteProps, Navigate } from "react-router-dom";
import Login from "./MetamaskAuth";

const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Route render={<Login />} />;
};

export default PrivateRoute;
