// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // Começa o tema com o valor do localStorage ou 'dark' como padrão
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('pizzaria_theme');
    return savedTheme || 'dark';
  });

  // Efeito que aplica a classe ao body e salva no localStorage
  useEffect(() => {
    // Remove classes antigas para garantir que só uma esteja ativa
    document.body.classList.remove('theme-light', 'theme-dark');
    // Adiciona a classe do tema atual
    document.body.className = `theme-${theme}`;
    // Salva a preferência no localStorage
    localStorage.setItem('pizzaria_theme', theme);
  }, [theme]); // Roda sempre que o 'theme' mudar

  // Função para alternar o tema
  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const valorDoContexto = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={valorDoContexto}>
      {children}
    </ThemeContext.Provider>
  );
};