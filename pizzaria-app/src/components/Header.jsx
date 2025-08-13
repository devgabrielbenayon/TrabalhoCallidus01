// src/components/Header.jsx
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { CartContext } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { itens } = useContext(CartContext);
  const navigate = useNavigate();

  const totalItensNoCarrinho = itens.reduce((total, item) => total + item.quantidade, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/">
        <img src='/logo.png' alt='Logo' className='header-logo'/>
        </NavLink>
      </div>

      <nav className="nav">
        <NavLink to="/cardapio" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>
          Cardápio
        </NavLink>
        <NavLink to="/carrinho" className="cart-nav-link">
          🛒
          {totalItensNoCarrinho > 0 && (
            <span className="cart-count">{totalItensNoCarrinho}</span>
          )}
        </NavLink>
        {isAuthenticated ? (
          <>
            { (user.role === 'cozinha' || user.role === 'admin') && 
              <NavLink to="/cozinha" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>Cozinha</NavLink> 
            }
            {/* --- NOVO LINK DE ENTREGAS --- */}
            { (user.role === 'admin') && 
              <NavLink to="/entregas" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>Entregas</NavLink>
            }
            {/* --- FIM DO NOVO LINK --- */}
            { user.role === 'admin' && 
              <NavLink to="/admin" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>Admin</NavLink> 
            }
            <div className="userInfo">
              <button onClick={handleLogout} className="logoutButton">Sair</button>
            </div>
          </>
        ) : (
          <NavLink to="/login" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;