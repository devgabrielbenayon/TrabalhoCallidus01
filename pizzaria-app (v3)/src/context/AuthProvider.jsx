// src/context/AuthProvider.jsx
import React, { createContext, useState, useEffect, useMemo } from 'react';

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
    // --- NOVO USUÁRIO ENTREGADOR ADICIONADO AQUI ---
    if (email === 'entrega@pizzaria.com' && senha === 'entrega123') {
        const userData = { nome: 'Entregador 1', email, role: 'entregador' };
        setUser(userData);
        localStorage.setItem('pizzaria_user', JSON.stringify(userData));
        return userData;
    }
    throw new Error('Credenciais inválidas.');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pizzaria_user');
  };
  
  const authContextValue = useMemo(() => ({
    isAuthenticated: !!user,
    user,
    login,
    logout,
  }), [user]);

  if (loading) {
    return <div>Carregando aplicação...</div>;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};