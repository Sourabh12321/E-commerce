import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin }) => {
  return isAdmin ? <Outlet /> : <Navigate to="/signupLogin" />;
};

export default ProtectedRoute;
