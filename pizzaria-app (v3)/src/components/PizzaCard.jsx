// src/components/PizzaCard.jsx
import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

const formatarPreco = (preco) => {
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
    // 1. Garante que o card ocupe 100% da altura e use flexbox para alinhar o rodapé
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={pizza.imagem}
        alt={pizza.nome}
      />
      {/* 2. O conteúdo principal agora cresce para preencher o espaço, empurrando o rodapé para baixo */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {pizza.nome}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {pizza.ingredientes.join(', ')}
        </Typography>
        {/* 3. Seletor de tamanho movido para o conteúdo principal */}
        <ToggleButtonGroup
          value={tamanhoSelecionado}
          exclusive
          onChange={handleSizeChange}
          color="primary"
          size="small"
          fullWidth
        >
          <ToggleButton value="p">P</ToggleButton>
          <ToggleButton value="m">M</ToggleButton>
          <ToggleButton value="g">G</ToggleButton>
        </ToggleButtonGroup>
      </CardContent>
      {/* 4. Rodapé padronizado */}
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