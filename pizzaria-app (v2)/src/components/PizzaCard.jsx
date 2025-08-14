// src/components/PizzaCard.jsx
import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './PizzaCard.css';

const formatarPreco = (preco) => {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const PizzaCard = ({ pizza }) => {
  const { adicionarAoCarrinho } = useContext(CartContext);
  // Estado local para guardar o tamanho selecionado. Começa como 'M'
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('m');

  const handleAddToCart = () => {
    // Cria um item único para o carrinho que inclui o tamanho
    const itemParaAdicionar = {
      ...pizza,
      // Cria um ID único combinando o ID da pizza e o tamanho
      idUnicoCarrinho: `${pizza.id}-${tamanhoSelecionado}`,
      tamanho: tamanhoSelecionado,
      // Pega o preço correto do objeto de preços
      preco: pizza.preco[tamanhoSelecionado]
    };
    adicionarAoCarrinho(itemParaAdicionar);
  };

  return (
    <div className="card">
      <img src={pizza.imagem} alt={`Pizza de ${pizza.nome}`} className="image" />
      <div className="content">
        <h3 className="title">{pizza.nome}</h3>
        <p className="ingredients">{pizza.ingredientes.join(', ')}</p>

        {/* --- SELETOR DE TAMANHO --- */}
        <div className="tamanho-seletor">
          <button 
            onClick={() => setTamanhoSelecionado('p')}
            className={tamanhoSelecionado === 'p' ? 'ativo' : ''}
          >
            P
          </button>
          <button 
            onClick={() => setTamanhoSelecionado('m')}
            className={tamanhoSelecionado === 'm' ? 'ativo' : ''}
          >
            M
          </button>
          <button 
            onClick={() => setTamanhoSelecionado('g')}
            className={tamanhoSelecionado === 'g' ? 'ativo' : ''}
          >
            G
          </button>
        </div>
        {/* --- FIM DO SELETOR --- */}

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