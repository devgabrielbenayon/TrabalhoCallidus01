// src/components/Header.jsx (Método Global)
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css'; // Importação alterada

const Header = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    // ClassNames alteradas para strings
    <header className="header">
      <div className="logo">
        <NavLink to="/">Pizzaria<span>Dev</span></NavLink>
      </div>

      <nav className="nav">
        <NavLink to="/cardapio" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>
          Cardápio
        </NavLink>
        
        {isAuthenticated && (user.role === 'cozinha' || user.role === 'admin') && (
          <NavLink to="/cozinha" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>
            Cozinha
          </NavLink>
        )}
        
        {isAuthenticated && user.role === 'admin' && (
          <NavLink to="/admin" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>
            Admin
          </NavLink>
        )}

        <div className="userInfo">
          {isAuthenticated ? (
            <>
              <span>Olá, {user?.nome}</span>
              <button onClick={handleLogout} className="logoutButton">Sair</button>
            </>
          ) : (
            <NavLink to="/login" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;