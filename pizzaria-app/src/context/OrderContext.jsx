// src/context/OrderContext.jsx
import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);

  const adicionarPedido = (itensDoCarrinho, valorTotal) => {
    const novoPedido = {
      id: uuidv4(),
      itens: itensDoCarrinho,
      valorTotal: valorTotal,
      status: 'preparando', // Status inicial
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

  // --- NOVA FUNÇÃO PARA MARCAR COMO ENTREGUE ---
  const marcarComoEntregue = (pedidoId) => {
    setPedidos(pedidosAtuais =>
      pedidosAtuais.map(p =>
        p.id === pedidoId ? { ...p, status: 'entregue' } : p
      )
    );
  };
  // --- FIM DA NOVA FUNÇÃO ---


  const valorDoContexto = {
    pedidos,
    adicionarPedido,
    marcarComoPronto,
    marcarComoEntregue, // Expondo a nova função
  };

  return (
    <OrderContext.Provider value={valorDoContexto}>
      {children}
    </OrderContext.Provider>
  );
};