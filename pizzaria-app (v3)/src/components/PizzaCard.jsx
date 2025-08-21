// src/components/PizzaCard.jsx
import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

const formatarPreco = (preco) => {
  if (typeof preco !== 'number') return '';
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const PizzaCard = ({ pizza }) => {
  const { adicionarAoCarrinho } = useContext(CartContext);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('m');

  const handleSizeChange = (event, newSize) => {
    if (newSize !== null) {
      setTamanhoSelecionado(newSize);
    }
  };

  const handleAddToCart = () => {
    const itemParaAdicionar = {
      ...pizza,
      idUnicoCarrinho: `${pizza.id}-${tamanhoSelecionado}`,
      tamanho: tamanhoSelecionado,
      preco: pizza.preco[tamanhoSelecionado]
    };
    adicionarAoCarrinho(itemParaAdicionar);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={pizza.imagem}
        alt={pizza.nome}
        sx={{
          height: '200px',      // Força a altura da área da imagem para 200px
          objectFit: 'cover'  // Garante que a imagem preencha a área sem distorcer
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h5" component="div">
          {pizza.nome}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {pizza.ingredientes.join(', ')}
        </Typography>
        <ToggleButtonGroup
          value={tamanhoSelecionado}
          exclusive
          onChange={handleSizeChange}
          color="primary"
          size="small"
          fullWidth
        >
          <ToggleButton value="p" sx={{ color: 'text.secondary' }}>P</ToggleButton>
          <ToggleButton value="m" sx={{ color: 'text.secondary' }}>M</ToggleButton>
          <ToggleButton value="g" sx={{ color: 'text.secondary' }}>G</ToggleButton>
        </ToggleButtonGroup>
      </CardContent>
      <CardActions sx={{ p: 2, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">
          {formatarPreco(pizza.preco[tamanhoSelecionado])}
        </Typography>
        <Button variant="contained" onClick={handleAddToCart}>
          Adicionar
        </Button>
      </CardActions>
    </Card>
  );
};

export default PizzaCard;