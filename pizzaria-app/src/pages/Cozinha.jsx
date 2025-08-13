// src/pages/Cozinha.jsx
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import './Cozinha.css';

const Cozinha = () => {
  const { pedidos, marcarComoPronto } = useContext(OrderContext);

  // Filtra para pegar apenas os pedidos que estão em preparação
  const pedidosEmPreparacao = pedidos.filter(p => p.status === 'preparando');

  return (
    <div className="cozinha-container">
      <h1>Painel da Cozinha</h1>
      <p>Pedidos aguardando preparação.</p>

      <div className="pedidos-grid">
        {pedidosEmPreparacao.length > 0 ? (
          pedidosEmPreparacao.map(pedido => (
            <div key={pedido.id} className="pedido-card">
              <h3>Pedido #{pedido.id.substring(0, 8)}</h3>
              <p><strong>Cliente:</strong> {pedido.cliente.nome}</p>
              <p><strong>Endereço:</strong> {pedido.cliente.endereco}</p>
              <hr/>
              <strong>Itens:</strong>
              <ul>
                {pedido.itens.map(item => (
                  <li key={item.id}>{item.quantidade}x {item.nome}</li>
                ))}
              </ul>
              <button 
                onClick={() => marcarComoPronto(pedido.id)}
                className="botao-pronto"
              >
                Pedido Pronto
              </button>
            </div>
          ))
        ) : (
          <p className="nenhum-pedido">Nenhum pedido para preparar no momento.</p>
        )}
      </div>
    </div>
  );
};

export default Cozinha;