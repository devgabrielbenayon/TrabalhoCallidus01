// src/context/AuthProvider.jsx
import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

// Função que simula uma chamada de API para autenticação
const simularLoginAPI = async (email, senha) => {
  console.log(`Tentando login com: ${email}`);
  // Em um projeto real, aqui você faria:
  // const response = await axios.post('https://sua-api.com/login', { email, senha });
  // return response.data;

  if (email === 'admin@pizzaria.com' && senha === 'admin123') {
    return { token: 'token-secreto-admin', user: { nome: 'Admin Chefe', email, role: 'admin' } };
  }
  if (email === 'cozinha@pizzaria.com' && senha === 'cozinha123') {
    return { token: 'token-secreto-cozinha', user: { nome: 'Chefe Mário', email, role: 'cozinha' } };
  }
  throw new Error('Credenciais inválidas.');
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ao carregar a aplicação, verifica se há um usuário no localStorage
  useEffect(() => {
    try {
      const usuarioArmazenado = localStorage.getItem('pizzaria_user');
      if (usuarioArmazenado) {
        setUser(JSON.parse(usuarioArmazenado));
      }
    } catch (error) {
      console.error("Falha ao carregar usuário do localStorage", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, senha) => {
    const data = await simularLoginAPI(email, senha);
    setUser(data.user);
    localStorage.setItem('pizzaria_user', JSON.stringify(data.user));
    localStorage.setItem('pizzaria_token', data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pizzaria_user');
    localStorage.removeItem('pizzaria_token');
  };

  const authContextValue = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
  };
  
  // Exibe um loader enquanto a autenticação inicial está sendo verificada
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '5rem' }}>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};