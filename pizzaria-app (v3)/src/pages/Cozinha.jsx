// src/pages/Cozinha.jsx (Versão com MUI)
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';

// Importando componentes e ícones do MUI
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const Cozinha = () => {
  const { pedidos, marcarComoPronto } = useContext(OrderContext);

  const pedidosEmPreparacao = pedidos.filter(p => p.status === 'preparando');

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Painel da Cozinha
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Pedidos aguardando preparação.
      </Typography>

      {/* Grid container para os cards de pedido */}
      <Grid container spacing={3}>
        {pedidosEmPreparacao.length > 0 ? (
          pedidosEmPreparacao.map(pedido => (
            // Cada pedido é um item do Grid, que se ajusta ao tamanho da tela
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
                    color="success" // Cor verde
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
          <Grid item xs={12}>
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