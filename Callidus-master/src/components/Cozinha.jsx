import React, { useState } from 'react'
import "./Cozinha.css"

const Cozinha = ({ 
  pedidos = [],
  atualizarStatusPedido
}) => {
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const [carregando, setCarregando] = useState(false)

  // Dados mock para demonstração
  const pedidosMock = [
    {
      id: 1,
      numero: '#001',
      cliente: {
        nome: 'João Silva',
        telefone: '(11) 99999-9999',
        endereco: 'Rua das Flores, 123 - Centro'
      },
      tipo: 'entrega',
      status: 'pendente',
      horaPedido: '19:30',
      tempoDecorrido: 5,
      tempoEstimado: 25,
      total: 89.90,
      itens: [
        { 
          id: 1, 
          nome: 'Margherita', 
          tamanho: 'Grande', 
          quantidade: 2,
          emoji: '🍅',
          observacoes: 'Sem cebola'
        },
        { 
          id: 2, 
          nome: 'Calabresa', 
          tamanho: 'Média', 
          quantidade: 1,
          emoji: '🌭'
        }
      ],
      observacoes: 'Entregar no portão azul, casa com jardim na frente'
    },
    {
      id: 2,
      numero: '#002',
      cliente: {
        nome: 'Maria Santos',
        telefone: '(11) 88888-8888',
        endereco: 'Mesa 5'
      },
      tipo: 'balcao',
      status: 'preparando',
      horaPedido: '19:15',
      tempoDecorrido: 20,
      tempoEstimado: 10,
      total: 45.90,
      itens: [
        { 
          id: 3, 
          nome: 'Quatro Queijos', 
          tamanho: 'Grande', 
          quantidade: 1,
          emoji: '🧀'
        }
      ]
    },
    {
      id: 3,
      numero: '#003',
      cliente: {
        nome: 'Carlos Oliveira',
        telefone: '(11) 77777-7777',
        endereco: 'Av. Principal, 456 - Jardim'
      },
      tipo: 'entrega',
      status: 'preparando',
      horaPedido: '19:45',
      tempoDecorrido: 12,
      tempoEstimado: 18,
      total: 67.80,
      itens: [
        { 
          id: 4, 
          nome: 'Pepperoni', 
          tamanho: 'Grande', 
          quantidade: 1,
          emoji: '🌶️'
        },
        { 
          id: 5, 
          nome: 'Portuguesa', 
          tamanho: 'Média', 
          quantidade: 1,
          emoji: '🥚'
        }
      ],
      observacoes: 'Cliente alérgico a azeitona - remover da portuguesa'
    }
  ]

  // Usar pedidos mock se não houver pedidos reais
  const pedidosAtivos = pedidos.length > 0 ? pedidos : pedidosMock

  // Filtrar pedidos por status
  const pedidosFiltrados = filtroStatus === 'todos' 
    ? pedidosAtivos
    : pedidosAtivos.filter(pedido => pedido.status === filtroStatus)

  // Calcular estatísticas
  const estatisticas = {
    pendentes: pedidosAtivos.filter(p => p.status === 'pendente').length,
    preparando: pedidosAtivos.filter(p => p.status === 'preparando').length,
    prontos: pedidosAtivos.filter(p => p.status === 'pronto').length,
    total: pedidosAtivos.length
  }

  // Funções de ação
  const iniciarPreparo = (pedidoId) => {
    setCarregando(true)
    setTimeout(() => {
      if (atualizarStatusPedido) {
        atualizarStatusPedido(pedidoId, 'preparando')
      }
      setCarregando(false)
    }, 500)
  }

  const marcarComoPronto = (pedidoId) => {
    setCarregando(true)
    setTimeout(() => {
      if (atualizarStatusPedido) {
        atualizarStatusPedido(pedidoId, 'pronto')
      }
      setCarregando(false)
    }, 500)
  }

  const obterClasseUrgencia = (pedido) => {
    if (pedido.tempoDecorrido >= pedido.tempoEstimado) return 'urgente'
    if (pedido.tempoDecorrido >= pedido.tempoEstimado * 0.8) return 'quase-pronto'
    if (pedido.status === 'preparando') return 'preparando'
    return ''
  }

  const formatarTempo = (minutos) => {
    if (minutos < 60) return `${minutos}min`
    const horas = Math.floor(minutos / 60)
    const mins = minutos % 60
    return `${horas}h ${mins}min`
  }

  return (
    <div className="cozinha-container">
      {/* Header */}
      <div className="cozinha-header">
        <h1>
          <span className="chef-icon">👨‍🍳</span>
          Cozinha
          <span className="chef-icon">🍕</span>
        </h1>
        <p>Gerencie os pedidos em preparação</p>
      </div>

      <div className="cozinha-content">
        {/* Barra de Status */}
        <div className="status-bar">
          <div className="status-item">
            <span className="status-number">{estatisticas.pendentes}</span>
            <div className="status-label">Pendentes</div>
          </div>
          
          <div className="status-divider"></div>
          
          <div className="status-item">
            <span className="status-number">{estatisticas.preparando}</span>
            <div className="status-label">Preparando</div>
          </div>
          
          <div className="status-divider"></div>
          
          <div className="status-item">
            <span className="status-number">{estatisticas.prontos}</span>
            <div className="status-label">Prontos</div>
          </div>
          
          <div className="status-divider"></div>
          
          <div className="status-item">
            <span className="status-number">{estatisticas.total}</span>
            <div className="status-label">Total</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="status-filters">
          <button 
            className={`filter-btn ${filtroStatus === 'todos' ? 'active' : ''}`}
            onClick={() => setFiltroStatus('todos')}
          >
            🍕 Todos
          </button>
          <button 
            className={`filter-btn ${filtroStatus === 'pendente' ? 'active' : ''}`}
            onClick={() => setFiltroStatus('pendente')}
          >
            ⏳ Pendentes
          </button>
          <button 
            className={`filter-btn ${filtroStatus === 'preparando' ? 'active' : ''}`}
            onClick={() => setFiltroStatus('preparando')}
          >
            🔥 Preparando
          </button>
          <button 
            className={`filter-btn ${filtroStatus === 'pronto' ? 'active' : ''}`}
            onClick={() => setFiltroStatus('pronto')}
          >
            ✅ Prontos
          </button>
        </div>

        {/* Grid de Pedidos */}
        {carregando ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : pedidosFiltrados.length > 0 ? (
          <div className="pedidos-grid">
            {pedidosFiltrados.map(pedido => (
              <div key={pedido.id} className={`pedido-card ${obterClasseUrgencia(pedido)}`}>
                {/* Header do Pedido */}
                <div className="pedido-header">
                  <div className="pedido-info">
                    <div>
                      <div className="pedido-numero">{pedido.numero}</div>
                      <div className="pedido-tempo">
                        <span className="tempo-icon">⏱️</span>
                        <span>{formatarTempo(pedido.tempoDecorrido)} / {formatarTempo(pedido.tempoEstimado)}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '20px', marginBottom: '5px' }}>
                        {pedido.tipo === 'entrega' ? '🛵' : '🏪'}
                      </div>
                      <div style={{ fontSize: '14px', opacity: '0.9' }}>
                        {pedido.horaPedido}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pedido-cliente">
                    <p className="cliente-nome">👤 {pedido.cliente.nome}</p>
                    <p className="cliente-endereco">
                      📍 {pedido.cliente.endereco}
                    </p>
                  </div>
                </div>

                {/* Body do Pedido */}
                <div className="pedido-body">
                  {/* Lista de Pizzas */}
                  <div className="pizzas-lista">
                    {pedido.itens.map(item => (
                      <div key={item.id} className="pizza-item">
                        <div className="pizza-emoji">{item.emoji}</div>
                        <div className="pizza-details">
                          <p className="pizza-nome">{item.nome}</p>
                          <p className="pizza-tamanho">Tamanho: {item.tamanho}</p>
                          {item.observacoes && (
                            <p style={{ color: '#ff4500', fontSize: '12px', fontStyle: 'italic' }}>
                              Obs: {item.observacoes}
                            </p>
                          )}
                        </div>
                        <div className="pizza-quantidade">{item.quantidade}</div>
                      </div>
                    ))}
                  </div>

                  {/* Observações */}
                  {pedido.observacoes && (
                    <div className="observacoes">
                      <h4>📝 Observações do Pedido:</h4>
                      <p>{pedido.observacoes}</p>
                    </div>
                  )}

                  {/* Ações */}
                  <div className="pedido-actions">
                    {pedido.status === 'pendente' && (
                      <button 
                        className="action-btn btn-preparar"
                        onClick={() => iniciarPreparo(pedido.id)}
                      >
                        🔥 Iniciar Preparo
                      </button>
                    )}
                    
                    {pedido.status === 'preparando' && (
                      <button 
                        className="action-btn btn-pronto"
                        onClick={() => marcarComoPronto(pedido.id)}
                      >
                        ✅ Pedido Pronto
                      </button>
                    )}
                    
                    {pedido.status === 'pronto' && (
                      <button className="action-btn btn-detalhes" disabled>
                        🎉 Aguardando Entrega
                      </button>
                    )}
                    
                    <button className="action-btn btn-detalhes">
                      📋 Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>🍕 Nenhum pedido encontrado</h3>
            <p>Não há pedidos {filtroStatus === 'todos' ? 'ativos' : `com status "${filtroStatus}"`} no momento</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cozinha