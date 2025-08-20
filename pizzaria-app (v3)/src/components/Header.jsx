// src/components/Header.jsx
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';

// Importando componentes e ícones do MUI
import { AppBar, Toolbar, Box, Button, IconButton, Badge } from '@mui/material';
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

  // Define a página inicial correta para o link do logo
  const homePath = () => {
    if (!isAuthenticated) return '/';
    if (user.role === 'cozinha') return '/cozinha';
    if (user.role === 'entregador') return '/entregas';
    return '/';
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1f1f1f', color: '#f0f0f0' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <NavLink to={homePath()}>
            <img src={'/logo.png'} alt="Logo" style={{ height: '100px', verticalAlign: 'middle' }}/>
          </NavLink>
        </Box>

        {/* --- LÓGICA DE EXIBIÇÃO RESPONSIVA --- */}

        {/* Links de Texto que somem em telas pequenas (xs) e aparecem em telas maiores (md) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {(!user || user.role !== 'cozinha') && (
            <Button component={NavLink} to="/cardapio" color="inherit">Cardápio</Button>
          )}
          {isAuthenticated && (user.role === 'cozinha' || user.role === 'admin') && (
            <Button component={NavLink} to="/cozinha" color="inherit">Cozinha</Button>
          )}
          {isAuthenticated && (user.role === 'admin' || user.role === 'entregador') && (
            <Button component={NavLink} to="/entregas" color="inherit">Entregas</Button>
          )}
          {isAuthenticated && user.role === 'admin' && (
            <Button component={NavLink} to="/admin" color="inherit">Admin</Button>
          )}
        </Box>
        
        {/* Ícones e botões principais que SEMPRE aparecem */}
        {(!user || user.role !== 'cozinha') && (
          <IconButton component={NavLink} to="/carrinho" color="inherit" aria-label="carrinho">
            <Badge badgeContent={totalItensNoCarrinho} color="primary"><ShoppingCartIcon /></Badge>
          </IconButton>
        )}

        <IconButton onClick={toggleTheme} color="inherit" aria-label="trocar tema">
          {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        {isAuthenticated ? (
          <Button color="primary" variant="contained" onClick={handleLogout} sx={{ ml: 2 }}>Sair</Button>
        ) : (
          <Button component={NavLink} to="/login" color="inherit">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;