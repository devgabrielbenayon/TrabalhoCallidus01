// src/pages/Admin.jsx (Versão com MUI)
import React, { useContext, useState } from 'react';
import { MenuContext } from '../context/MenuContext';
import { OrderContext } from '../context/OrderContext';

// Importando os componentes do MUI
import {
  Container, Box, Typography, Paper, TextField, Button,
  List, ListItem, ListItemText, IconButton, Divider, Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const formInicial = {
  id: null, nome: '', ingredientes: '', preco_p: '', preco_m: '',
  preco_g: '', imagem: '', categoria: ''
};

const Admin = () => {
  const { pizzas, adicionarPizza, editarPizza, excluirPizza } = useContext(MenuContext);
  const { pedidos } = useContext(OrderContext);
  const [formData, setFormData] = useState(formInicial);
  const [modoEdicao, setModoEdicao] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditar = (pizza) => {
    setModoEdicao(true);
    setFormData({
      id: pizza.id,
      nome: pizza.nome,
      ingredientes: pizza.ingredientes.join(', '),
      preco_p: pizza.preco.p,
      preco_m: pizza.preco.m,
      preco_g: pizza.preco.g,
      imagem: pizza.imagem,
      categoria: pizza.categoria
    });
    window.scrollTo(0, 0);
  };

  const handleCancelarEdicao = () => {
    setModoEdicao(false);
    setFormData(formInicial);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pizzaFormatada = {
      id: formData.id,
      nome: formData.nome,
      ingredientes: formData.ingredientes.split(',').map(ing => ing.trim()),
      imagem: formData.imagem,
      categoria: formData.categoria || 'Clássica', 
      preco: {
        p: parseFloat(String(formData.preco_p).replace(',', '.')),
        m: parseFloat(String(formData.preco_m).replace(',', '.')),
        g: parseFloat(String(formData.preco_g).replace(',', '.'))
      }
    };

    if (modoEdicao) {
      editarPizza(pizzaFormatada);
    } else {
      adicionarPizza(pizzaFormatada);
    }
    handleCancelarEdicao();
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>Painel de Administração</Typography>

      <Grid container spacing={4}>
        {/* Coluna da Esquerda: Gerenciar Cardápio */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Gerenciar Cardápio</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Typography variant="h6">{modoEdicao ? 'Editar Pizza' : 'Adicionar Nova Pizza'}</Typography>
              <TextField name="nome" label="Nome da Pizza" value={formData.nome} onChange={handleChange} fullWidth margin="normal" required />
              <TextField name="ingredientes" label="Ingredientes (separados por vírgula)" value={formData.ingredientes} onChange={handleChange} fullWidth margin="normal" required />
              <Grid container spacing={2}>
                <Grid item xs={4}><TextField name="preco_p" label="Preço P" value={formData.preco_p} onChange={handleChange} fullWidth required /></Grid>
                <Grid item xs={4}><TextField name="preco_m" label="Preço M" value={formData.preco_m} onChange={handleChange} fullWidth required /></Grid>
                <Grid item xs={4}><TextField name="preco_g" label="Preço G" value={formData.preco_g} onChange={handleChange} fullWidth required /></Grid>
              </Grid>
              <TextField name="imagem" label="URL da Imagem" value={formData.imagem} onChange={handleChange} fullWidth margin="normal" required />
              <TextField name="categoria" label="Categoria" value={formData.categoria} onChange={handleChange} fullWidth margin="normal" required />
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button type="submit" variant="contained" size="large" sx={{ flexGrow: 1 }}>
                  {modoEdicao ? 'Salvar Alterações' : 'Adicionar Pizza'}
                </Button>
                {modoEdicao && (
                  <Button onClick={handleCancelarEdicao} variant="outlined" size="large">
                    Cancelar
                  </Button>
                )}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6">Pizzas Atuais</Typography>
            <List>
              {pizzas.map(pizza => (
                <ListItem key={pizza.id} secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditar(pizza)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => excluirPizza(pizza.id)} sx={{ ml: 1 }}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }>
                  <ListItemText primary={pizza.nome} secondary={pizza.categoria} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Coluna da Direita: Histórico de Pedidos */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>Histórico de Pedidos</Typography>
            <List>
              {pedidos && pedidos.length > 0 ? (
                pedidos.map(pedido => (
                  <ListItem key={pedido.id}>
                    <ListItemText 
                      primary={`Pedido #${pedido.id.substring(0, 8)}`}
                      secondary={`Total: ${pedido.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
                    />
                    <Typography variant="body2" sx={{ 
                        fontWeight: 'bold',
                        color: pedido.status === 'preparando' ? 'secondary.main' : 
                               pedido.status === 'pronto' ? 'info.main' : 'success.main'
                    }}>
                      {pedido.status.toUpperCase()}
                    </Typography>
                  </ListItem>
                ))
              ) : (
                <Typography color="text.secondary">Nenhum pedido foi feito ainda.</Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin;