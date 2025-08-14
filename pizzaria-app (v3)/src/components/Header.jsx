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
    return '/'; // Padrão para admin e cliente
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1f1f1f', color: '#f0f0f0' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <NavLink to={homePath()}>
            <img src={'/logo-dark.png'} alt="Logo" style={{ height: '100px', verticalAlign: 'middle' }}/>
          </NavLink>
        </Box>

        {/* --- LÓGICA DE EXIBIÇÃO BASEADA NA FUNÇÃO DO USUÁRIO --- */}
        
        {/* VISÃO DO ENTREGADOR (A MAIS SIMPLES) */}
        {isAuthenticated && user.role === 'entregador' && (
          <>
            <Button component={NavLink} to="/entregas" color="inherit" sx={{ fontSize: '1rem' }}>
              Entregas
            </Button>
            <IconButton onClick={toggleTheme} color="inherit" size="large">
              {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <Button color="primary" variant="contained" onClick={handleLogout} size="large" sx={{ ml: 2 }}>
              Sair
            </Button>
          </>
        )}

        {/* VISÃO DOS OUTROS USUÁRIOS LOGADOS (ADMIN, COZINHA) */}
        {isAuthenticated && user.role !== 'entregador' && (
           <>
            {/* Links de cliente (não aparecem para a cozinha) */}
            {(!user || user.role !== 'cozinha') && (
              <>
                <Button component={NavLink} to="/cardapio" color="inherit" sx={{ fontSize: '1rem' }}>Cardápio</Button>
                <IconButton component={NavLink} to="/carrinho" color="inherit" size="large">
                  <Badge badgeContent={totalItensNoCarrinho} color="primary"><ShoppingCartIcon /></Badge>
                </IconButton>
              </>
            )}
            {/* Links de funcionário */}
            {(user.role === 'cozinha' || user.role === 'admin') && <Button component={NavLink} to="/cozinha" color="inherit" sx={{ fontSize: '1rem' }}>Cozinha</Button>}
            {user.role === 'admin' && <Button component={NavLink} to="/entregas" color="inherit" sx={{ fontSize: '1rem' }}>Entregas</Button>}
            {user.role === 'admin' && <Button component={NavLink} to="/admin" color="inherit" sx={{ fontSize: '1rem' }}>Admin</Button>}
            
            <IconButton onClick={toggleTheme} color="inherit" size="large">{theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}</IconButton>
            <Button color="primary" variant="contained" onClick={handleLogout} sx={{ ml: 2 }} size="large">Sair</Button>
          </>
        )}

        {/* VISÃO DO USUÁRIO DESLOGADO */}
        {!isAuthenticated && (
          <>
            <Button component={NavLink} to="/cardapio" color="inherit" sx={{ fontSize: '1rem' }}>Cardápio</Button>
            <IconButton component={NavLink} to="/carrinho" color="inherit" size="large">
              <Badge badgeContent={totalItensNoCarrinho} color="primary"><ShoppingCartIcon /></Badge>
            </IconButton>
            <IconButton onClick={toggleTheme} color="inherit" size="large">{theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}</IconButton>
            <Button component={NavLink} to="/login" color="inherit" sx={{ fontSize: '1rem' }}>Login</Button>
          </>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Header;