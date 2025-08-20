// src/components/PizzaCard.jsx
import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

// Importando o CSS customizado
import './PizzaCard.css';

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
    // A classe 'card' do nosso CSS customizado é a principal
    <div className="card">
      <img src={pizza.imagem} alt={pizza.nome} className="image" />
      <div className="content">
        <h3 className="title">{pizza.nome}</h3>
        <p className="ingredients">{pizza.ingredientes.join(', ')}</p>

        <div className="tamanho-seletor">
          <button 
            onClick={() => setTamanhoSelecionado('p')}
            className={tamanhoSelecionado === 'p' ? 'ativo' : ''}
          >P</button>
          <button 
            onClick={() => setTamanhoSelecionado('m')}
            className={tamanhoSelecionado === 'm' ? 'ativo' : ''}
          >M</button>
          <button 
            onClick={() => setTamanhoSelecionado('g')}
            className={tamanhoSelecionado === 'g' ? 'ativo' : ''}
          >G</button>
        </div>
        
        <div className="footer">
          <span className="price">{formatarPreco(pizza.preco[tamanhoSelecionado])}</span>
          <button onClick={handleAddToCart} className="addButton">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;