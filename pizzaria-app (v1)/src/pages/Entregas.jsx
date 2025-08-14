// src/pages/Entregas.jsx
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import './Entregas.css';

const Entregas = () => {
  const { pedidos, marcarComoEntregue } = useContext(OrderContext);

  // Filtra para pegar apenas os pedidos que estão prontos para entrega
  const pedidosProntos = pedidos.filter(p => p.status === 'pronto');

  return (
    <div className="entregas-container">
      <h1>Painel de Entrega</h1>
      <p>Pedidos prontos para serem entregues ou servidos.</p>
      
      <div className="pedidos-grid">
        {pedidosProntos.length > 0 ? (
          pedidosProntos.map(pedido => (
            <div key={pedido.id} className="pedido-card-entrega">
              <h3>Pedido #{pedido.id.substring(0, 8)}</h3>
              <p><strong>Cliente:</strong> {pedido.cliente.nome}</p>
              <p><strong>{pedido.cliente.tipo === 'entrega' ? 'Endereço:' : 'Mesa:'}</strong> {pedido.cliente.detalhe}</p>
              <hr/>
              <strong>Itens:</strong>
              <ul>
                {pedido.itens.map(item => (
                  <li key={item.idUnicoCarrinho}>
                    {item.quantidade}x {item.nome} ({item.tamanho.toUpperCase()})
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => marcarComoEntregue(pedido.id)}
                className="botao-entregue"
              >
                Marcar como Entregue
              </button>
            </div>
          ))
        ) : (
          <p className="nenhum-pedido">Nenhum pedido pronto no momento.</p>
        )}
      </div>
    </div>
  );
};

export default Entregas;