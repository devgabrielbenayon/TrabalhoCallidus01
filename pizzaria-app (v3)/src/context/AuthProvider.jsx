// src/context/AuthProvider.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('pizzaria_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Falha ao carregar usuário do localStorage", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, senha) => {
    // Verifique se os valores aqui estão exatamente como você espera
    if (email === 'admin@pizzaria.com' && senha === 'admin123') {
        const userData = { nome: 'Admin Chefe', email, role: 'admin' };
        setUser(userData);
        localStorage.setItem('pizzaria_user', JSON.stringify(userData));
        return userData;
    }
    if (email === 'cozinha@pizzaria.com' && senha === 'cozinha123') {
        const userData = { nome: 'Chefe Mário', email, role: 'cozinha' };
        setUser(userData);
        localStorage.setItem('pizzaria_user', JSON.stringify(userData));
        return userData;
    }
    // Se nenhuma combinação acima for válida, a função lança um erro
    throw new Error('Credenciais inválidas.');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pizzaria_user');
  };
  
  const authContextValue = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
  };

  if (loading) {
    return <div>Carregando aplicação...</div>;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};