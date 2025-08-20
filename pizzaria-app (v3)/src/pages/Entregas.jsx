// src/pages/Entregas.jsx
import React, { useContext, useState } from 'react';
import { OrderContext } from '../context/OrderContext';
import { WaiterContext } from '../context/WaiterContext';

import { Container, Typography, Grid, Card, CardContent, CardActions, Button, List, ListItem, ListItemText, Divider, Box, Menu, MenuItem } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const Entregas = () => {
  const { pedidos, aceitarEntrega, marcarComoEntregue, atribuirGarcom } = useContext(OrderContext);
  const { garcons } = useContext(WaiterContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const open = Boolean(anchorEl);

  const pedidosDisponiveis = pedidos.filter(p => p.status === 'pronto');
  const pedidosEmAndamento = pedidos.filter(p => p.status === 'em_entrega' || p.status === 'servindo');

  const handleClickMenu = (event, pedido) => {
    setAnchorEl(event.currentTarget);
    setPedidoSelecionado(pedido);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setPedidoSelecionado(null);
  };

  const handleSelecionarGarcom = (garcom) => {
    if (pedidoSelecionado) {
      atribuirGarcom(pedidoSelecionado.id, garcom);
    }
    handleCloseMenu();
  };

  const renderPedidoCard = (pedido) => (
    <Grid key={pedido.id} xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="h2">Pedido #{pedido.id.substring(0, 8)}</Typography>
          <Typography variant="body2" color="text.secondary"><strong>Cliente:</strong> {pedido.cliente.nome}</Typography>
          
          {pedido.garcom && (
             <Typography variant="body2" color="text.secondary">
                <strong>Garçom:</strong> {pedido.garcom.nome}
             </Typography>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            <strong>{pedido.cliente.tipo === 'entrega' ? 'Endereço:' : 'Mesa:'}</strong> {pedido.cliente.detalhe}
          </Typography>
          <Divider />
          <List dense>
            {pedido.itens.map(item => (
              <ListItem key={item.idUnicoCarrinho} disableGutters>
                <ListItemText primary={`${item.quantidade}x ${item.nome}`} secondary={item.tamanho ? `Tamanho: ${item.tamanho.toUpperCase()}` : null} />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', p: 2 }}>
          {pedido.status === 'pronto' && pedido.cliente.tipo === 'entrega' && (
            <Button variant="contained" color="secondary" startIcon={<DeliveryDiningIcon />} onClick={() => aceitarEntrega(pedido.id)} fullWidth>
              Aceitar Entrega
            </Button>
          )}
          {pedido.status === 'pronto' && pedido.cliente.tipo === 'mesa' && (
            <Button variant="contained" color="secondary" startIcon={<PersonPinIcon />} onClick={(e) => handleClickMenu(e, pedido)} fullWidth>
              Atribuir Garçom
            </Button>
          )}
          {(pedido.status === 'em_entrega' || pedido.status === 'servindo') && (
            <Button variant="contained" color="info" startIcon={<CheckCircleOutlineIcon />} onClick={() => marcarComoEntregue(pedido.id)} fullWidth>
              Marcar como {pedido.status === 'servindo' ? 'Servido' : 'Entregue'}
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {/* --- TÍTULO RESPONSIVO --- */}
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem' } }}
      >
        Painel de Entregas e Mesas
      </Typography>
      
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>Pedidos Disponíveis</Typography>
        <Grid container spacing={3}>
          {pedidosDisponiveis.length > 0 ? 
            pedidosDisponiveis.map(pedido => renderPedidoCard(pedido)) : 
            <Grid xs={12}><Typography color="text.secondary">Nenhum pedido aguardando atendimento.</Typography></Grid>
          }
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>Pedidos em Andamento</Typography>
        <Grid container spacing={3}>
          {pedidosEmAndamento.length > 0 ? 
            pedidosEmAndamento.map(pedido => renderPedidoCard(pedido)) :
            <Grid xs={12}><Typography color="text.secondary">Nenhum pedido em andamento.</Typography></Grid>
          }
        </Grid>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
      >
        {garcons.length > 0 ? garcons.map(garcom => (
          <MenuItem key={garcom.id} onClick={() => handleSelecionarGarcom(garcom)}>
            {garcom.nome}
          </MenuItem>
        )) : <MenuItem disabled>Nenhum garçom cadastrado</MenuItem>}
      </Menu>
    </Container>
  );
};

export default Entregas;