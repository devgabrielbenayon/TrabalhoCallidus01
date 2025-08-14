// src/pages/Entregas.jsx (Versão com MUI)
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';

// Importando componentes e ícones do MUI
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Entregas = () => {
  const { pedidos, marcarComoEntregue } = useContext(OrderContext);

  // A única diferença na lógica: filtra por status 'pronto'
  const pedidosProntos = pedidos.filter(p => p.status === 'pronto');

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Painel de Entrega
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Pedidos prontos para serem entregues ou servidos.
      </Typography>

      <Grid container spacing={3}>
        {pedidosProntos.length > 0 ? (
          pedidosProntos.map(pedido => (
            <Grid item xs={12} sm={6} md={4} key={pedido.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Pedido #{pedido.id.substring(0, 8)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Cliente:</strong> {pedido.cliente.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    <strong>{pedido.cliente.tipo === 'entrega' ? 'Endereço:' : 'Mesa:'}</strong> {pedido.cliente.detalhe}
                  </Typography>
                  <Divider />
                  <List dense>
                    {pedido.itens.map(item => (
                      <ListItem key={item.idUnicoCarrinho} disableGutters>
                        <ListItemText 
                          primary={`${item.quantidade}x ${item.nome}`}
                          secondary={`Tamanho: ${item.tamanho.toUpperCase()}`} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', p: 2 }}>
                  <Button 
                    variant="contained" 
                    color="info" // Cor azul
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={() => marcarComoEntregue(pedido.id)}
                    fullWidth
                  >
                    Marcar como Entregue
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
              Nenhum pedido pronto no momento.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Entregas;