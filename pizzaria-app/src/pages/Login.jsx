// src/pages/Login.jsx (Método Global)
import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css'; // Importação alterada

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    try {
      await login(email, senha);
      navigate(from, { replace: true });
    } catch (err) {
      setError('E-mail ou senha inválidos. Tente novamente.');
      console.error(err);
    }
  };

  return (
    // ClassNames alteradas para strings
    <div className="loginContainer">
      <h1 className="title">Acesso Restrito</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@pizzaria.com"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="admin123"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="submitButton">Entrar</button>
      </form>
    </div>
  );
};

export default Login;