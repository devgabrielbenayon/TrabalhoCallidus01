// src/pages/Login.jsx (Versão com MUI)
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

// 1. Importando os componentes do MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

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
    // 2. <Container> centraliza nosso conteúdo na página
    <Container component="main" maxWidth="xs">
      {/* <Box> é como uma div superpoderosa para layout */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          borderRadius: 2,
          bgcolor: 'background.paper', // Usa a cor de fundo do tema
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          Acesso Restrito
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* <TextField> substitui <label> e <input> */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          
          {/* Mostra o erro de forma mais elegante com o componente <Alert> */}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          
          {/* A caixa de informações agora usa o componente <Alert> */}
          <Alert severity="info" sx={{ textAlign: 'center' }}>
            <Typography variant="caption">
              <strong>Admin:</strong> admin@pizzaria.com / admin123
              <br />
              <strong>Cozinha:</strong> cozinha@pizzaria.com / cozinha123
            </Typography>
          </Alert>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;