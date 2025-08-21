// src/routes/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider'; 

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/cardapio" replace />;
  }

  return children;
};

export default ProtectedRoute;