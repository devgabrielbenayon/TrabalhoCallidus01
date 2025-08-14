// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const loggedInUser = await login(email, senha);

      if (loggedInUser.role === 'cozinha') {
        navigate('/cozinha', { replace: true });
      } else if (loggedInUser.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/cardapio', { replace: true });
      }

    } catch (err) {
      setError('E-mail ou senha inválidos. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className="loginContainer">
      <h1 className="title">Acesso Restrito</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          {/* A alteração está aqui: placeholder foi esvaziado */}
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=""/>
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Senha</label>
          {/* E aqui também: placeholder foi esvaziado */}
          <input type="password" id="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder=""/>
        </div>
        
        <div className="credentialsInfo">
          <p><strong>Admin:</strong> admin@pizzaria.com / admin123</p>
          <p><strong>Cozinha:</strong> cozinha@pizzaria.com / cozinha123</p>
        </div>
        
        {error && <p className="error">{error}</p>}
        <button type="submit" className="submitButton">Entrar</button>
      </form>
    </div>
  );
};

export default Login;