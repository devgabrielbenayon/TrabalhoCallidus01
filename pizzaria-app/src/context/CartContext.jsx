// src/context/CartContext.jsx
import React, { createContext, useState } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [itens, setItens] = useState([]);

  const adicionarAoCarrinho = (pizza) => {
    const itemExistente = itens.find(item => item.id === pizza.id);
    if (itemExistente) {
      // Se já existe, apenas incrementa a quantidade
      atualizarQuantidade(pizza.id, itemExistente.quantidade + 1);
    } else {
      // Se não existe, adiciona com quantidade 1
      setItens(itensAtuais => [...itensAtuais, { ...pizza, quantidade: 1 }]);
    }
  };

  // --- NOVA FUNÇÃO PARA ATUALIZAR A QUANTIDADE ---
  const atualizarQuantidade = (pizzaId, novaQuantidade) => {
    // Se a nova quantidade for 0 ou menos, remove o item do carrinho
    if (novaQuantidade <= 0) {
      removerDoCarrinho(pizzaId);
      return;
    }

    // Caso contrário, atualiza a quantidade do item específico
    setItens(itensAtuais =>
      itensAtuais.map(item =>
        item.id === pizzaId ? { ...item, quantidade: novaQuantidade } : item
      )
    );
  };

  const removerDoCarrinho = (pizzaId) => {
    setItens(itensAtuais => itensAtuais.filter(item => item.id !== pizzaId));
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const valorDoContexto = {
    itens,
    adicionarAoCarrinho,
    removerDoCarrinho,
    limparCarrinho,
    atualizarQuantidade, // Expondo a nova função para os componentes
  };

  return (
    <CartContext.Provider value={valorDoContexto}>
      {children}
    </CartContext.Provider>
  );
};