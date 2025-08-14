// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect, useMemo } from 'react';

// 1. Importando as ferramentas de tema do MUI
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedTheme = localStorage.getItem('pizzaria_theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.className = `theme-${mode}`;
    localStorage.setItem('pizzaria_theme', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode(currentMode => (currentMode === 'light' ? 'dark' : 'light'));
  };

  // 2. Criando o tema do MUI dinamicamente
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode, // 'light' ou 'dark'
          primary: {
            main: '#e32d2d', // Nosso vermelho primário
          },
          secondary: {
            main: '#ffc107', // Nosso amarelo secundário
          },
          background: {
            default: mode === 'dark' ? '#1a1a1a' : '#f8f9fa',
            paper: mode === 'dark' ? '#2a2a2a' : '#ffffff',
          },
        },
      }),
    [mode]
  );

  const valorDoContexto = {
    theme: mode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={valorDoContexto}>
      {/* 3. Envolvendo a aplicação com o provedor de tema do MUI */}
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};