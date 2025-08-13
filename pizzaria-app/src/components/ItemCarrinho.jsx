// src/components/ItemCarrinho.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './ItemCarrinho.css';

// A função de formatação de preço pode viver aqui também
const formatarPreco = (preco) => {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const ItemCarrinho = ({ item }) => {
  const { atualizarQuantidade, removerDoCarrinho } = useContext(CartContext);

  return (
    <li className="item-carrinho">
      <img src={item.imagem} alt={item.nome} className="item-imagem" />
      <div className="item-detalhes">
        <h2>{item.nome}</h2>
        <p className="item-tamanho">Tamanho: {item.tamanho.toUpperCase()}</p>
        <div className="item-quantidade-controle">
          <button onClick={() => atualizarQuantidade(item.idUnicoCarrinho, item.quantidade - 1)} className="botao-quantidade">-</button>
          <span>{item.quantidade}</span>
          <button onClick={() => atualizarQuantidade(item.idUnicoCarrinho, item.quantidade + 1)} className="botao-quantidade">+</button>
        </div>
        <p>Preço Un.: {formatarPreco(item.preco)}</p>
      </div>
      <div className="item-acoes">
        <span>Subtotal: {formatarPreco(item.preco * item.quantidade)}</span>
        <button onClick={() => removerDoCarrinho(item.idUnicoCarrinho)} className="botao-remover-item">Remover</button>
      </div>
    </li>
  );
};

export default ItemCarrinho;