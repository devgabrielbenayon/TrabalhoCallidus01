// src/context/OrderContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState(() => {
    try {
      const pedidosSalvos = localStorage.getItem('pizzaria_pedidos');
      return pedidosSalvos ? JSON.parse(pedidosSalvos) : [];
    } catch (error) {
      console.error("Erro ao carregar pedidos do localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pizzaria_pedidos', JSON.stringify(pedidos));
    } catch (error)      {
      console.error("Erro ao salvar pedidos no localStorage", error);
    }
  }, [pedidos]);

  const adicionarPedido = (itensDoCarrinho, valorTotal, detalhesCliente) => {
    const novoPedido = {
      id: uuidv4(),
      itens: itensDoCarrinho,
      valorTotal: valorTotal,
      status: 'preparando',
      hora: new Date(),
      cliente: detalhesCliente
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

  const aceitarEntrega = (pedidoId) => {
    setPedidos(pedidosAtuais =>
      pedidosAtuais.map(p =>
        p.id === pedidoId ? { ...p, status: 'em_entrega' } : p
      )
    );
  };

  // --- NOVA FUNÇÃO PARA ATRIBUIR UM GARÇOM A UM PEDIDO DE MESA ---
  const atribuirGarcom = (pedidoId, garcom) => {
    setPedidos(pedidosAtuais =>
      pedidosAtuais.map(p =>
        p.id === pedidoId ? { ...p, status: 'servindo', garcom: garcom } : p
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

  const removerPedido = (pedidoId) => {
    setPedidos(pedidosAtuais => pedidosAtuais.filter(p => p.id !== pedidoId));
  };

  const valorDoContexto = {
    pedidos,
    adicionarPedido,
    marcarComoPronto,
    aceitarEntrega,
    atribuirGarcom, // Disponibilizando a nova função
    marcarComoEntregue,
    removerPedido,
  };

  return (
    <OrderContext.Provider value={valorDoContexto}>
      {children}
    </OrderContext.Provider>
  );
};