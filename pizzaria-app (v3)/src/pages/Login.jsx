// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

// Importando os componentes do MUI
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
      
      // --- LÓGICA DE REDIRECIONAMENTO ATUALIZADA ---
      if (loggedInUser.role === 'entregador') {
        navigate('/entregas', { replace: true });
      } else if (loggedInUser.role === 'cozinha') {
        navigate('/cozinha', { replace: true });
      } else if (loggedInUser.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/cardapio', { replace: true }); // Padrão
      }
      // --- FIM DA LÓGICA ---

    } catch (err) {
      setError('E-mail ou senha inválidos. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          Acesso Restrito
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          
          {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          
          <Alert severity="info" sx={{ textAlign: 'center' }}>
            <Typography variant="caption" component="div">
              <strong>Admin:</strong> admin@pizzaria.com / admin123
            </Typography>
            <Typography variant="caption" component="div">
              <strong>Cozinha:</strong> cozinha@pizzaria.com / cozinha123
            </Typography>
            <Typography variant="caption" component="div">
              <strong>Entrega:</strong> entrega@pizzaria.com / entrega123
            </Typography>
          </Alert>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;