// src/routes/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redireciona para a página de login, salvando a rota que o usuário tentou acessar
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verifica se a rota exige uma permissão (role) e se o usuário a possui
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Se não tiver permissão, redireciona para uma página de acesso negado ou para a home
    return <Navigate to="/cardapio" replace />;
  }

  return children;
};

export default ProtectedRoute;