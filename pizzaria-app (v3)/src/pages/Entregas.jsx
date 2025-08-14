// src/pages/Entregas.jsx
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

const Entregas = () => {
  const { pedidos, aceitarEntrega, marcarComoEntregue } = useContext(OrderContext);
  const pedidosDisponiveis = pedidos.filter(p => p.status === 'pronto');
  const minhasEntregas = pedidos.filter(p => p.status === 'em_entrega');

  const renderPedidoCard = (pedido, acao) => (
    <Grid item xs={12} sm={6} md={4} key={pedido.id}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="h2">Pedido #{pedido.id.substring(0, 8)}</Typography>
          <Typography variant="body2" color="text.secondary"><strong>Cliente:</strong> {pedido.cliente.nome}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            <strong>{pedido.cliente.tipo === 'entrega' ? 'Endereço:' : 'Mesa:'}</strong> {pedido.cliente.detalhe}
          </Typography>
          <Divider />
          <List dense>
            {pedido.itens.map(item => (
              <ListItem key={item.idUnicoCarrinho} disableGutters>
                <ListItemText 
                  primary={`${item.quantidade}x ${item.nome}`}
                  // --- CORREÇÃO DE SEGURANça AQUI TAMBÉM ---
                  secondary={item.tamanho ? `Tamanho: ${item.tamanho.toUpperCase()}` : null} 
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', p: 2 }}>
          {acao === 'aceitar' && (
            <Button variant="contained" color="secondary" startIcon={<DeliveryDiningIcon />} onClick={() => aceitarEntrega(pedido.id)} fullWidth>
              Aceitar Pedido
            </Button>
          )}
          {acao === 'entregar' && (
            <Button variant="contained" color="info" startIcon={<CheckCircleOutlineIcon />} onClick={() => marcarComoEntregue(pedido.id)} fullWidth>
              Marcar como Entregue
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>Painel de Entrega</Typography>
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>Pedidos Disponíveis para Retirada</Typography>
        <Grid container spacing={3}>
          {pedidosDisponiveis.length > 0 ? 
            pedidosDisponiveis.map(pedido => renderPedidoCard(pedido, 'aceitar')) : 
            <Grid item xs={12}><Typography color="text.secondary">Nenhum pedido aguardando entregador.</Typography></Grid>
          }
        </Grid>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>Minhas Entregas em Andamento</Typography>
        <Grid container spacing={3}>
          {minhasEntregas.length > 0 ? 
            minhasEntregas.map(pedido => renderPedidoCard(pedido, 'entregar')) :
            <Grid item xs={12}><Typography color="text.secondary">Você não possui entregas em andamento.</Typography></Grid>
          }
        </Grid>
      </Box>
    </Container>
  );
};

export default Entregas;