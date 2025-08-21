// src/components/BebidaCard.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

const formatarPreco = (preco) => {
  if (typeof preco !== 'number') return '';
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const BebidaCard = ({ bebida }) => {
  const { adicionarAoCarrinho } = useContext(CartContext);

  const handleAddToCart = () => {
    const itemParaAdicionar = {
      ...bebida,
      idUnicoCarrinho: `${bebida.id}`,
      quantidade: 1
    };
    adicionarAoCarrinho(itemParaAdicionar);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={bebida.imagem}
        alt={bebida.nome}
        sx={{
          height: '200px',
          objectFit: 'cover'
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {bebida.nome}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bebida.descricao}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">
          {formatarPreco(bebida.preco)}
        </Typography>
        <Button variant="contained" onClick={handleAddToCart}>
          Adicionar
        </Button>
      </CardActions>
    </Card>
  );
};

export default BebidaCard;