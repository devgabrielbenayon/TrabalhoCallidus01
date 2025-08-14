// src/context/CartContext.jsx
import React, { createContext, useState } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [itens, setItens] = useState([]); // Garante que 'itens' sempre comece como um array

  const adicionarAoCarrinho = (itemParaAdicionar) => {
    const itemExistente = itens.find(item => item.idUnicoCarrinho === itemParaAdicionar.idUnicoCarrinho);
    if (itemExistente) {
      atualizarQuantidade(itemParaAdicionar.idUnicoCarrinho, itemExistente.quantidade + 1);
    } else {
      setItens(itensAtuais => [...itensAtuais, { ...itemParaAdicionar, quantidade: 1 }]);
    }
  };
  
  const atualizarQuantidade = (idUnicoCarrinho, novaQuantidade) => {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(idUnicoCarrinho);
      return;
    }
    setItens(itensAtuais =>
      itensAtuais.map(item =>
        item.idUnicoCarrinho === idUnicoCarrinho ? { ...item, quantidade: novaQuantidade } : item
      )
    );
  };

  const removerDoCarrinho = (idUnicoCarrinho) => {
    setItens(itensAtuais => itensAtuais.filter(item => item.idUnicoCarrinho !== idUnicoCarrinho));
  };
  
  const limparCarrinho = () => { setItens([]); };

  // AQUI GARANTIMOS QUE 'itens' está sendo fornecido para os outros componentes
  const valorDoContexto = { 
    itens, 
    adicionarAoCarrinho, 
    removerDoCarrinho, 
    limparCarrinho, 
    atualizarQuantidade 
  };

  return (
    <CartContext.Provider value={valorDoContexto}>
      {children}
    </CartContext.Provider>
  );
};