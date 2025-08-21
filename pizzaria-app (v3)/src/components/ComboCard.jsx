// src/components/ComboCard.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const formatarPreco = (preco) => {
  if (typeof preco !== 'number') return '';
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const ComboCard = ({ combo }) => {
  const { adicionarAoCarrinho } = useContext(CartContext);

  const handleAddToCart = () => {
    const itemParaAdicionar = {
      ...combo,
      idUnicoCarrinho: `${combo.id}`,
      quantidade: 1
    };
    adicionarAoCarrinho(itemParaAdicionar);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={combo.imagem}
        alt={combo.nome}
        sx={{
          height: '200px',
          objectFit: 'cover'
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {combo.nome}
        </Typography>
        <List dense>
          {combo.itens.map((item, index) => (
            <ListItem key={index} disableGutters>
              <ListItemIcon sx={{ minWidth: '32px' }}>
                <CheckIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions sx={{ p: 2, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">
          {formatarPreco(combo.preco)}
        </Typography>
        <Button variant="contained" onClick={handleAddToCart}>
          Adicionar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ComboCard;