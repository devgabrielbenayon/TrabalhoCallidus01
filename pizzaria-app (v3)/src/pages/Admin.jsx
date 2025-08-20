// src/pages/Admin.jsx
import React, { useContext, useState } from 'react';
import { MenuContext } from '../context/MenuContext';
import { OrderContext } from '../context/OrderContext';
import { WaiterContext } from '../context/WaiterContext';

import {
  Container, Box, Typography, Paper, TextField, Button,
  List, ListItem, ListItemText, IconButton, Divider, Grid,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const formInicial = {
  id: null, nome: '', ingredientes: '', preco_p: '', preco_m: '',
  preco_g: '', imagem: '', categoria: ''
};

const Admin = () => {
  const { pizzas, adicionarPizza, editarPizza, excluirPizza } = useContext(MenuContext);
  const { pedidos, removerPedido } = useContext(OrderContext);
  const { garcons, adicionarGarcom, removerGarcom, editarGarcom } = useContext(WaiterContext);
  
  const [formData, setFormData] = useState(formInicial);
  const [modoEdicao, setModoEdicao] = useState(false);
  
  const [nomeGarcom, setNomeGarcom] = useState('');

  const [dialogAberto, setDialogAberto] = useState(false);
  const [garcomParaEditar, setGarcomParaEditar] = useState(null);
  const [novoNomeGarcom, setNovoNomeGarcom] = useState('');

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

  const handleAdicionarGarcom = (e) => {
    e.preventDefault();
    if (nomeGarcom.trim()) {
      adicionarGarcom(nomeGarcom);
      setNomeGarcom('');
    }
  };

  const handleAbrirDialog = (garcom) => {
    setGarcomParaEditar(garcom);
    setNovoNomeGarcom(garcom.nome);
    setDialogAberto(true);
  };

  const handleFecharDialog = () => {
    setDialogAberto(false);
    setGarcomParaEditar(null);
    setNovoNomeGarcom('');
  };

  const handleSalvarEdicaoGarcom = () => {
    if (garcomParaEditar && novoNomeGarcom.trim()) {
      editarGarcom(garcomParaEditar.id, novoNomeGarcom);
    }
    handleFecharDialog();
  };

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      {/* --- AJUSTE RESPONSIVO NO TÍTULO --- */}
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem' } }}>
        Painel de Administração
      </Typography>
      
      <Grid container spacing={3}>
        
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h5" gutterBottom>Gerenciar Cardápio</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Typography variant="h6">{modoEdicao ? 'Editar Pizza' : 'Adicionar Nova Pizza'}</Typography>
              <TextField name="nome" label="Nome da Pizza" value={formData.nome} onChange={handleChange} fullWidth margin="normal" required size="small" />
              <TextField name="ingredientes" label="Ingredientes (separados por vírgula)" value={formData.ingredientes} onChange={handleChange} fullWidth margin="normal" required size="small" />
              <Grid container spacing={2}>
                <Grid item xs={4}><TextField name="preco_p" label="Preço P" value={formData.preco_p} onChange={handleChange} fullWidth required size="small" /></Grid>
                <Grid item xs={4}><TextField name="preco_m" label="Preço M" value={formData.preco_m} onChange={handleChange} fullWidth required size="small" /></Grid>
                <Grid item xs={4}><TextField name="preco_g" label="Preço G" value={formData.preco_g} onChange={handleChange} fullWidth required size="small" /></Grid>
              </Grid>
              <TextField name="imagem" label="URL da Imagem" value={formData.imagem} onChange={handleChange} fullWidth margin="normal" required size="small" />
              <TextField name="categoria" label="Categoria" value={formData.categoria} onChange={handleChange} fullWidth margin="normal" required size="small" />
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
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditar(pizza)}><EditIcon /></IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => excluirPizza(pizza.id)} sx={{ ml: 1 }}><DeleteIcon /></IconButton>
                  </>
                }>
                  <ListItemText primary={pizza.nome} secondary={pizza.categoria} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Grid container spacing={3} direction="column">
            
            <Grid item>
              <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, height: '100%' }}>
                <Typography variant="h5" gutterBottom>Gerenciar Garçons</Typography>
                <Box component="form" onSubmit={handleAdicionarGarcom} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TextField 
                    label="Nome do Garçom" 
                    value={nomeGarcom}
                    onChange={(e) => setNomeGarcom(e.target.value)}
                    fullWidth 
                    variant="outlined"
                    size="small"
                  />
                  <IconButton type="submit" color="inherit" aria-label="adicionar garçom">
                    <PersonAddIcon />
                  </IconButton>
                </Box>
                <Divider />
                <List>
                  {garcons.map(garcom => (
                    <ListItem key={garcom.id} secondaryAction={
                      <>
                        <IconButton edge="end" aria-label="edit" onClick={() => handleAbrirDialog(garcom)}><EditIcon /></IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => removerGarcom(garcom.id)} sx={{ ml: 1 }}><DeleteIcon /></IconButton>
                      </>
                    }>
                      <ListItemText primary={garcom.nome} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item>
              <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, height: '100%' }}>
                <Typography variant="h5" gutterBottom>Histórico de Pedidos</Typography>
                <List>
                  {pedidos && pedidos.length > 0 ? (
                    pedidos.map(pedido => {
                      let statusText = pedido.status.toUpperCase();
                      let statusColor = 'text.secondary';

                      if (pedido.status === 'preparando') {
                        statusColor = 'warning.main';
                      } else if (pedido.status === 'pronto' || pedido.status === 'em_entrega' || pedido.status === 'servindo') {
                        statusColor = 'info.main';
                      } else if (pedido.status === 'entregue') {
                        statusColor = 'success.main';
                        statusText = pedido.cliente.tipo === 'mesa' ? 'SERVIDO' : 'ENTREGUE';
                      }

                      return (
                        <ListItem 
                          key={pedido.id}
                          secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => removerPedido(pedido.id)}>
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemText 
                            primary={`Pedido #${pedido.id.substring(0, 8)}`}
                            secondary={`Total: ${pedido.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: statusColor }}>
                            {statusText}
                          </Typography>
                        </ListItem>
                      );
                    })
                  ) : (
                    <Typography color="text.secondary">Nenhum pedido foi feito ainda.</Typography>
                  )}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <Dialog open={dialogAberto} onClose={handleFecharDialog}>
        <DialogTitle>Editar Nome do Garçom</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Por favor, insira o novo nome para "{garcomParaEditar?.nome}".
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Novo Nome"
            type="text"
            fullWidth
            variant="standard"
            value={novoNomeGarcom}
            onChange={(e) => setNovoNomeGarcom(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSalvarEdicaoGarcom()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFecharDialog}>Cancelar</Button>
          <Button onClick={handleSalvarEdicaoGarcom} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Admin;