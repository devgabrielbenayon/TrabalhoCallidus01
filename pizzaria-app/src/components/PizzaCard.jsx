// src/components/PizzaCard.jsx (Método Global)
import React from 'react';
import './PizzaCard.css'; // Importação alterada

const formatarPreco = (preco) => {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const PizzaCard = ({ pizza }) => {
  const { imagem, nome, ingredientes, preco } = pizza;

  return (
    // ClassNames alteradas para strings
    <div className="card">
      <img src={imagem} alt={`Pizza de ${nome}`} className="image" />
      <div className="content">
        <h3 className="title">{nome}</h3>
        <p className="ingredients">{ingredientes.join(', ')}</p>
        <div className="footer">
          <span className="price">{formatarPreco(preco)}</span>
          <button className="addButton">Adicionar</button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;