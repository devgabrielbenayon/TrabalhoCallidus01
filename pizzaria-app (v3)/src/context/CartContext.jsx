// src/context/CartContext.jsx
import React, { createContext, useState, useMemo } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [itens, setItens] = useState([]);
  // NOVO: Estado para controlar o tipo de pedido ('retirada' é o padrão)
  const [tipoPedido, setTipoPedido] = useState('retirada');

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

  // NOVO: Cálculo do subtotal dos itens
  const subtotal = useMemo(() => {
    return itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  }, [itens]);

  // NOVO: Cálculo da taxa com base no tipo de pedido
  const taxa = useMemo(() => {
    if (tipoPedido === 'entrega') {
      return 10; // Taxa de entrega fixa de R$10
    }
    if (tipoPedido === 'mesa') {
      return subtotal * 0.10; // Taxa de serviço de 10%
    }
    return 0; // Nenhuma taxa para retirada
  }, [subtotal, tipoPedido]);

  // NOVO: Cálculo do total final
  const total = useMemo(() => {
    return subtotal + taxa;
  }, [subtotal, taxa]);

  // ATUALIZADO: Fornecendo os novos valores e a função setTipoPedido
  const valorDoContexto = { 
    itens, 
    adicionarAoCarrinho, 
    removerDoCarrinho, 
    limparCarrinho, 
    atualizarQuantidade,
    // --- NOVOS VALORES E FUNÇÕES ---
    subtotal,
    taxa,
    total,
    tipoPedido,
    setTipoPedido // Função para permitir que a UI altere o tipo de pedido
  };

  return (
    <CartContext.Provider value={valorDoContexto}>
      {children}
    </CartContext.Provider>
  );
};