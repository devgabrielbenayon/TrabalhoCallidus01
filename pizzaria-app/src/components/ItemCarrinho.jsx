// src/components/ItemCarrinho.jsx (Versão com MUI)
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

// Importando componentes e ícones do MUI
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const formatarPreco = (preco) => {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const ItemCarrinho = ({ item }) => {
  const { atualizarQuantidade, removerDoCarrinho } = useContext(CartContext);

  return (
    // <ListItem> é o container principal para um item de lista
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => removerDoCarrinho(item.idUnicoCarrinho)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar variant="square" src={item.imagem} sx={{ width: 80, height: 80, mr: 2 }} />
      </ListItemAvatar>
      <ListItemText
        primary={item.nome}
        secondary={`Tamanho: ${item.tamanho.toUpperCase()}`}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', mx: 4 }}>
        <IconButton onClick={() => atualizarQuantidade(item.idUnicoCarrinho, item.quantidade - 1)} size="small">
          <RemoveCircleOutlineIcon />
        </IconButton>
        <Typography variant="h6" sx={{ mx: 1 }}>{item.quantidade}</Typography>
        <IconButton onClick={() => atualizarQuantidade(item.idUnicoCarrinho, item.quantidade + 1)} size="small">
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
      <Typography variant="body1" sx={{ minWidth: 100, textAlign: 'right', fontWeight: 'bold' }}>
        {formatarPreco(item.preco * item.quantidade)}
      </Typography>
    </ListItem>
  );
};

export default ItemCarrinho;