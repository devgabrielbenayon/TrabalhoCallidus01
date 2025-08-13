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
        <NavLink to={isAuthenticated && user.role === 'cozinha' ? '/cozinha' : '/'}>
          <img src='/logo.png' alt='Logo' className='header-logo'/>
        </NavLink>
      </div>

      <nav className="nav">
        {/* --- LÓGICA DE EXIBIÇÃO ALTERADA --- */}
        {/* Só mostra Cardápio e Carrinho se NÃO for usuário da cozinha */}
        {(!user || user.role !== 'cozinha') && (
          <>
            <NavLink to="/cardapio" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>
              Cardápio
            </NavLink>
            <NavLink to="/carrinho" className="cart-nav-link">
              🛒
              {totalItensNoCarrinho > 0 && (
                <span className="cart-count">{totalItensNoCarrinho}</span>
              )}
            </NavLink>
          </>
        )}
        {/* --- FIM DA LÓGICA DE EXIBIÇÃO --- */}

        {isAuthenticated ? (
          <>
            { (user.role === 'cozinha' || user.role === 'admin') && 
              <NavLink to="/cozinha" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>Cozinha</NavLink> 
            }
            { (user.role === 'cozinha' || user.role === 'admin') && 
              <NavLink to="/entregas" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>Entregas</NavLink>
            }
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