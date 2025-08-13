// src/context/OrderContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  // 1. O estado agora é inicializado com um valor vindo do localStorage (ou um array vazio)
  const [pedidos, setPedidos] = useState(() => {
    try {
      const pedidosSalvos = localStorage.getItem('pizzaria_pedidos');
      return pedidosSalvos ? JSON.parse(pedidosSalvos) : [];
    } catch (error) {
      console.error("Erro ao carregar pedidos do localStorage", error);
      return [];
    }
  });

  // 2. Este useEffect salva os pedidos no localStorage SEMPRE que a lista de pedidos mudar
  useEffect(() => {
    try {
      localStorage.setItem('pizzaria_pedidos', JSON.stringify(pedidos));
    } catch (error) {
      console.error("Erro ao salvar pedidos no localStorage", error);
    }
  }, [pedidos]); // A mágica acontece aqui: ele roda toda vez que 'pedidos' é alterado

  const adicionarPedido = (itensDoCarrinho, valorTotal) => {
    const novoPedido = {
      id: uuidv4(),
      itens: itensDoCarrinho,
      valorTotal: valorTotal,
      status: 'preparando',
      hora: new Date(),
      cliente: { nome: 'Cliente Teste', endereco: 'Rua das Pizzas, 123' }
    };
    setPedidos(pedidosAtuais => [...pedidosAtuais, novoPedido]);
  };

  const marcarComoPronto = (pedidoId) => {
    setPedidos(pedidosAtuais =>
      pedidosAtuais.map(p =>
        p.id === pedidoId ? { ...p, status: 'pronto' } : p
      )
    );
  };

  const marcarComoEntregue = (pedidoId) => {
    setPedidos(pedidosAtuais =>
      pedidosAtuais.map(p =>
        p.id === pedidoId ? { ...p, status: 'entregue' } : p
      )
    );
  };

  const valorDoContexto = {
    pedidos,
    adicionarPedido,
    marcarComoPronto,
    marcarComoEntregue,
  };

  return (
    <OrderContext.Provider value={valorDoContexto}>
      {children}
    </OrderContext.Provider>
  );
};