// src/context/CartContext.jsx
import React, { createContext, useState } from 'react';

// Cria o Contexto (o "canal" de comunicação)
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

// Cria o Provedor (a "memória" com a lógica)
export const CartProvider = ({ children }) => {
  const [itens, setItens] = useState([]);

  const adicionarAoCarrinho = (pizza) => {
    const itemExistente = itens.find(item => item.id === pizza.id);
    if (itemExistente) {
      setItens(
        itens.map(item =>
          item.id === pizza.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setItens([...itens, { ...pizza, quantidade: 1 }]);
    }
  };

  const removerDoCarrinho = (pizzaId) => {
    setItens(itens.filter(item => item.id !== pizzaId));
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const valorDoContexto = {
    itens,
    adicionarAoCarrinho,
    removerDoCarrinho,
    limparCarrinho,
  };

  return (
    <CartContext.Provider value={valorDoContexto}>
      {children}
    </CartContext.Provider>
  );
};