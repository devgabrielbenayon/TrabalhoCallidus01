import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState("")

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@pizzaria.com" && senha === "123456") {
      login({ nome: "Administrador", email }, "fake-jwt-token");
      navigate("/");
    } else {
      setErro("E-mail ou senha inválidos");
    }
  }

  return (
    <div className='cadastro-container fade-in'>
      <form onSubmit={handleSubmit} className='cadastro-form'>
        <div className="titulo-principal">
          <h1>Bella Vista</h1>
          <p className="subtitulo">Entre na sua conta e peça suas pizzas favoritas!</p>
        </div>

        {erro && <p className='erro'>{erro}</p>}

        <div className='form-grupo'>
          <label htmlFor='email'>Email:</label>
          <div className='input-wrapper'>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoFocus
            />
          </div>
        </div>

        <div className='form-grupo'>
          <label htmlFor='senha'>Senha:</label>
          <div className='senha-wrapper'>
            <input
              type={mostrarSenha ? "text" : "password"}
              id='senha'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Sua senha"
              required
            />
            <button
              type='button'
              className='toggle-senha'
              onClick={() => setMostrarSenha((prev) => !prev)}
              aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            >
              {mostrarSenha ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button type='submit' className='btn-cadastrar'>
          Entrar
        </button>

        <div className="link-login">
          <p>Não tem conta? <a href="/cadastro">Cadastre-se aqui</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;