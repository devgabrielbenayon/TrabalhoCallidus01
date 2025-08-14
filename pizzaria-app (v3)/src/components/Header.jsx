// src/components/Header.jsx
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';

// Importando componentes e ícones do MUI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Header = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { itens } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const totalItensNoCarrinho = itens.reduce((total, item) => total + item.quantidade, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#1f1f1f',
        color: '#f0f0f0',
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box sx={{ flexGrow: 1 }}>
          <NavLink to={isAuthenticated && user?.role === 'cozinha' ? '/cozinha' : '/'}>
            <img
              src={'/logo.png'}
              alt="Logo"
              // --- ALTERAÇÃO AQUI: Aumentando o tamanho da logo ---
              style={{ height: '100px', verticalAlign: 'middle' }}
            />
          </NavLink>
        </Box>

        {/* Links de Navegação */}
        {(!user || user.role !== 'cozinha') && (
          // --- ALTERAÇÃO AQUI: Aumentando o tamanho da fonte do botão ---
          <Button component={NavLink} to="/cardapio" color="inherit" sx={{ fontSize: '1rem' }}>
            Cardápio
          </Button>
        )}
        
        {isAuthenticated && (user.role === 'cozinha' || user.role === 'admin') && (
          <Button component={NavLink} to="/cozinha" color="inherit" sx={{ fontSize: '1rem' }}>Cozinha</Button>
        )}
        {isAuthenticated && (user.role === 'cozinha' || user.role === 'admin') && (
          <Button component={NavLink} to="/entregas" color="inherit" sx={{ fontSize: '1rem' }}>Entregas</Button>
        )}
        {isAuthenticated && user.role === 'admin' && (
          <Button component={NavLink} to="/admin" color="inherit" sx={{ fontSize: '1rem' }}>Admin</Button>
        )}
        
        {/* Controles da Direita */}
        {(!user || user.role !== 'cozinha') && (
          // --- ALTERAÇÃO AQUI: Aumentando o tamanho do ícone ---
          <IconButton component={NavLink} to="/carrinho" color="inherit" aria-label="carrinho" size="large">
            <Badge badgeContent={totalItensNoCarrinho} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        )}

        <IconButton onClick={toggleTheme} color="inherit" aria-label="trocar tema" size="large">
          {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        {isAuthenticated ? (
          // --- ALTERAÇÃO AQUI: Aumentando o tamanho do botão "Sair" ---
          <Button color="primary" variant="contained" onClick={handleLogout} sx={{ ml: 2 }} size="large">
            Sair
          </Button>
        ) : (
          <Button component={NavLink} to="/login" color="inherit" sx={{ fontSize: '1rem' }}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;