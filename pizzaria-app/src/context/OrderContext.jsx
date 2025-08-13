// src/context/OrderContext.jsx
import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Precisaremos de uma biblioteca para gerar IDs únicos

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);

  // Função chamada quando o cliente finaliza a compra
  const adicionarPedido = (itensDoCarrinho, valorTotal) => {
    const novoPedido = {
      id: uuidv4(), // Gera um ID único para o pedido
      itens: itensDoCarrinho,
      valorTotal: valorTotal,
      status: 'preparando', // Status inicial
      hora: new Date(),
      // Em um app real, aqui teríamos dados do cliente (nome, endereço, etc.)
      cliente: { nome: 'Cliente Teste', endereco: 'Rua das Pizzas, 123' }
    };
    setPedidos(pedidosAtuais => [...pedidosAtuais, novoPedido]);
  };

  // Função chamada pela Cozinha quando o pedido está pronto
  const marcarComoPronto = (pedidoId) => {
    setPedidos(pedidosAtuais =>
      pedidosAtuais.map(p =>
        p.id === pedidoId ? { ...p, status: 'pronto' } : p
      )
    );
  };

  const valorDoContexto = {
    pedidos,
    adicionarPedido,
    marcarComoPronto,
  };

  return (
    <OrderContext.Provider value={valorDoContexto}>
      {children}
    </OrderContext.Provider>
  );
};