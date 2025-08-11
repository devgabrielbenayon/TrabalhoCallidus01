import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext' 
import "./Login.css"

const Login = () => {
  const[email, setEmail] = useState("")
  const[senha, setSenha] = useState("")
  const[mostrarSenha, setMostrarSenha] = useState(false)
  const[erro, setErro] = useState("")

  const navigate = useNavigate();
  const {login} = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email === "admin@pizzaria.com" && senha === "123456"){
        login({nome:"Administrador", email},"fake-jwt-token");
        navigate("/");
    } else {
        setErro("E-mail ou senha inválidos");
    }
  }

  return (
    <div className='login-container fade-in'>
        <div className='pizza-decoration'></div>
        <form onSubmit={handleSubmit} className='login-form'>
            <div className='logo-section'>
                <div className='pizza-icon'>🍕</div>
                <h2>EA Pizzaria</h2>
                <p className='subtitle'>Faça login para continuar</p>
            </div>
            
            {erro && <p className='erro'>⚠️ {erro}</p>}
            
            <div className='input-group'>
                <label htmlFor='email'>📧 Email:</label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    placeholder="admin@pizzaria.com"
                />
            </div>
            
            <div className='input-group'>
                <label htmlFor='senha'>🔒 Senha:</label>
                <div className='senha-wrapper'>
                    <input
                        type={mostrarSenha ? "text" : "password"}
                        id='senha'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        placeholder="Digite sua senha"
                    />
                    <button
                        type='button'
                        className='toggle-senha'
                        onClick={() => setMostrarSenha((prev) => !prev)}
                        aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                    >
                        {mostrarSenha ? "👁️" : "👁️‍🗨️"}
                    </button>
                </div>
            </div>
            
            <button type='submit' className='botao-entrar'>
                🍕 Entrar na Pizzaria
            </button>
            
            <div className='login-info'>
                <strong>Login de teste:</strong><br/>
                Email: admin@pizzaria.com<br/>
                Senha: 123456
            </div>
        </form>      
    </div>
  );
};

export default Login;
