// src/components/PizzaCard.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Aponta para o novo arquivo
import './PizzaCard.css';

const formatarPreco = (preco) => {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const PizzaCard = ({ pizza }) => {
  const { adicionarAoCarrinho } = useContext(CartContext);
  const { imagem, nome, ingredientes, preco } = pizza;

  return (
    <div className="card">
      <img src={imagem} alt={`Pizza de ${nome}`} className="image" />
      <div className="content">
        <h3 className="title">{nome}</h3>
        <p className="ingredients">{ingredientes.join(', ')}</p>
        <div className="footer">
          <span className="price">{formatarPreco(preco)}</span>
          <button onClick={() => adicionarAoCarrinho(pizza)} className="addButton">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;