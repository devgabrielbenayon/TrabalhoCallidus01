// src/pages/Cozinha.jsx
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';

// Importando componentes e ícones do MUI
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const Cozinha = () => {
  const { pedidos, marcarComoPronto } = useContext(OrderContext);

  const pedidosEmPreparacao = pedidos.filter(p => p.status === 'preparando');

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {/* --- TÍTULO RESPONSIVO --- */}
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem' } }}
      >
        Painel da Cozinha
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Pedidos aguardando preparação.
      </Typography>
      
      <Grid container spacing={3}>
        {pedidosEmPreparacao.length > 0 ? (
          pedidosEmPreparacao.map(pedido => (
            <Grid key={pedido.id} xs={12} sm={6} md={4}>
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
                          secondary={item.tamanho ? `Tamanho: ${item.tamanho.toUpperCase()}` : null} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', p: 2 }}>
                  <Button 
                    variant="contained" 
                    color="success"
                    startIcon={<RestaurantMenuIcon />}
                    onClick={() => marcarComoPronto(pedido.id)}
                    fullWidth
                  >
                    Pedido Pronto
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid xs={12}>
            <Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
              Nenhum pedido para preparar no momento.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Cozinha;