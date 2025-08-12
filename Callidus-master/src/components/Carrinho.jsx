import React, { useState } from 'react';
import './Carrinho.css';

const Carrinho = ({ pizzas = [], adicionarPedido }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [cliente, setCliente] = useState({
    nome: '',
    telefone: '',
    endereco: '',
    complemento: '',
    observacoes: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarSucesso, setMostrarSucesso] = useState(false);

  // Transformar pizzas do sistema em formato adequado para o carrinho
  const pizzasDisponiveis = pizzas.length > 0 ? pizzas.map(pizza => ({
    id: pizza.id,
    nome: pizza.nome,
    emoji: '🍕',
    precos: { 
      P: (pizza.preco * 0.7).toFixed(2), // 30% menor que o tamanho grande
      M: (pizza.preco * 0.85).toFixed(2), // 15% menor que o tamanho grande  
      G: pizza.preco.toFixed(2) // Preço original para tamanho grande
    },
    ingredientes: pizza.ingredientes
  })) : [
    { 
      id: 1, 
      nome: 'Margherita', 
      emoji: '🍕', 
      precos: { P: 25.90, M: 32.90, G: 39.90 },
      ingredientes: 'Molho, mussarela, tomate, manjericão'
    },
    { 
      id: 2, 
      nome: 'Pepperoni', 
      emoji: '🍕', 
      precos: { P: 29.90, M: 36.90, G: 43.90 },
      ingredientes: 'Molho, mussarela, pepperoni'
    },
    { 
      id: 3, 
      nome: 'Calabresa', 
      emoji: '🍕', 
      precos: { P: 27.90, M: 34.90, G: 41.90 },
      ingredientes: 'Molho, mussarela, calabresa, cebola'
    },
    { 
      id: 4, 
      nome: 'Portuguesa', 
      emoji: '🍕', 
      precos: { P: 31.90, M: 38.90, G: 45.90 },
      ingredientes: 'Molho, mussarela, presunto, ovos, cebola, azeitona'
    },
    { 
      id: 5, 
      nome: 'Frango c/ Catupiry', 
      emoji: '🍕', 
      precos: { P: 33.90, M: 40.90, G: 47.90 },
      ingredientes: 'Molho, mussarela, frango desfiado, catupiry'
    },
    { 
      id: 6, 
      nome: 'Quatro Queijos', 
      emoji: '🍕', 
      precos: { P: 35.90, M: 42.90, G: 49.90 },
      ingredientes: 'Molho, mussarela, parmesão, gorgonzola, catupiry'
    }
  ];

  const adicionarPizza = (pizza, tamanho) => {
    const novoItem = {
      id: Date.now(),
      pizzaId: pizza.id,
      nome: pizza.nome,
      emoji: pizza.emoji,
      tamanho,
      preco: pizza.precos[tamanho],
      quantidade: 1,
      ingredientes: pizza.ingredientes
    };

    const itemExistente = carrinho.find(
      item => item.pizzaId === pizza.id && item.tamanho === tamanho
    );

    if (itemExistente) {
      setCarrinho(carrinho.map(item =>
        item.id === itemExistente.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ));
    } else {
      setCarrinho([...carrinho, novoItem]);
    }
  };

  const removerPizza = (id) => {
    setCarrinho(carrinho.filter(item => item.id !== id));
  };

  const alterarQuantidade = (id, novaQuantidade) => {
    if (novaQuantidade <= 0) {
      removerPizza(id);
      return;
    }

    setCarrinho(carrinho.map(item =>
      item.id === id ? { ...item, quantidade: novaQuantidade } : item
    ));
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    setCliente({
      nome: '',
      telefone: '',
      endereco: '',
      complemento: '',
      observacoes: ''
    });
    setMostrarFormulario(false);
  };

  const finalizarPedido = () => {
    if (carrinho.length === 0) return;

    // Criar objeto do pedido
    const pedido = {
      cliente,
      itens: carrinho,
      total: calcularTotal(),
      status: 'pendente',
      timestamp: new Date().toISOString()
    };

    // Enviar pedido para o sistema principal
    if (adicionarPedido) {
      const pedidoId = adicionarPedido(pedido);
      console.log('Pedido criado com ID:', pedidoId);
    } else {
      console.log('Pedido simulado:', pedido);
    }
    
    // Mostrar mensagem de sucesso
    setMostrarSucesso(true);
    setTimeout(() => {
      setMostrarSucesso(false);
      limparCarrinho();
    }, 3000);
  };

  const handleClienteChange = (campo, valor) => {
    setCliente(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  return (
    <div className="carrinho-container">
      <div className="carrinho-header">
        <h1>
          <span className="chef-icon">👨‍🍳</span>
          EPA Pizzaria
          <span className="chef-icon">🍕</span>
        </h1>
        <p>Monte seu pedido e saboreie a melhor pizza da região!</p>
      </div>

      <div className="carrinho-content">
        {/* Menu de Pizzas */}
        <section className="menu-section">
          <h2 className="section-title">
            <span className="pizza-icon">🍕</span>
            Nosso Cardápio
          </h2>
          
          <div className="pizzas-menu">
            {pizzasDisponiveis.map(pizza => (
              <div key={pizza.id} className="pizza-card">
                <div className="pizza-info">
                  <div className="pizza-emoji">{pizza.emoji}</div>
                  <div className="pizza-details">
                    <h3 className="pizza-nome">{pizza.nome}</h3>
                    <p className="pizza-ingredientes">{pizza.ingredientes}</p>
                  </div>
                </div>
                
                <div className="pizza-precos">
                  {Object.entries(pizza.precos).map(([tamanho, preco]) => (
                    <button
                      key={tamanho}
                      className="preco-btn"
                      onClick={() => adicionarPizza(pizza, tamanho)}
                    >
                      <span className="tamanho">{tamanho}</span>
                      <span className="preco">R$ {preco.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Carrinho */}
        <section className="carrinho-section">
          <div className="carrinho-header-section">
            <h2 className="section-title">
              <span className="cart-icon">🛒</span>
              Seu Pedido ({carrinho.length} {carrinho.length === 1 ? 'item' : 'itens'})
            </h2>
            
            {carrinho.length > 0 && (
              <button className="limpar-btn" onClick={limparCarrinho}>
                🗑️ Limpar
              </button>
            )}
          </div>

          {carrinho.length === 0 ? (
            <div className="carrinho-vazio">
              <div className="empty-icon">🍕</div>
              <h3>Seu carrinho está vazio</h3>
              <p>Adicione algumas deliciosas pizzas para começar!</p>
            </div>
          ) : (
            <div className="carrinho-itens">
              {carrinho.map(item => (
                <div key={item.id} className="carrinho-item">
                  <div className="item-info">
                    <div className="item-emoji">{item.emoji}</div>
                    <div className="item-details">
                      <h4 className="item-nome">{item.nome}</h4>
                      <p className="item-tamanho">Tamanho: {item.tamanho}</p>
                      <p className="item-preco">R$ {item.preco.toFixed(2)} cada</p>
                    </div>
                  </div>
                  
                  <div className="item-controls">
                    <div className="quantidade-controls">
                      <button
                        className="qty-btn"
                        onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}
                      >
                        −
                      </button>
                      <span className="quantidade">{item.quantidade}</span>
                      <button
                        className="qty-btn"
                        onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="item-total">
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </div>
                    
                    <button
                      className="remover-btn"
                      onClick={() => removerPizza(item.id)}
                      title="Remover item"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="carrinho-total">
                <div className="total-linha">
                  <span className="total-label">Total do Pedido:</span>
                  <span className="total-valor">R$ {calcularTotal().toFixed(2)}</span>
                </div>
              </div>

              {!mostrarFormulario ? (
                <button
                  className="finalizar-btn"
                  onClick={() => setMostrarFormulario(true)}
                >
                  📞 Finalizar Pedido
                </button>
              ) : (
                <div className="formulario-cliente">
                  <h3 className="form-title">Dados para Entrega</h3>
                  
                  <div className="form-group">
                    <label htmlFor="nome">Nome Completo *</label>
                    <input
                      type="text"
                      id="nome"
                      value={cliente.nome}
                      onChange={(e) => handleClienteChange('nome', e.target.value)}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="telefone">Telefone *</label>
                    <input
                      type="tel"
                      id="telefone"
                      value={cliente.telefone}
                      onChange={(e) => handleClienteChange('telefone', e.target.value)}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="endereco">Endereço Completo *</label>
                    <input
                      type="text"
                      id="endereco"
                      value={cliente.endereco}
                      onChange={(e) => handleClienteChange('endereco', e.target.value)}
                      placeholder="Rua, número, bairro"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="complemento">Complemento</label>
                    <input
                      type="text"
                      id="complemento"
                      value={cliente.complemento}
                      onChange={(e) => handleClienteChange('complemento', e.target.value)}
                      placeholder="Apartamento, bloco, referência..."
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="observacoes">Observações</label>
                    <textarea
                      id="observacoes"
                      value={cliente.observacoes}
                      onChange={(e) => handleClienteChange('observacoes', e.target.value)}
                      placeholder="Alguma observação especial para seu pedido?"
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className="form-actions">
                    <button
                      className="cancelar-btn"
                      onClick={() => setMostrarFormulario(false)}
                    >
                      ↩️ Voltar
                    </button>
                    
                    <button
                      className="confirmar-btn"
                      onClick={finalizarPedido}
                      disabled={!cliente.nome || !cliente.telefone || !cliente.endereco}
                    >
                      ✅ Confirmar Pedido
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {/* Modal de Sucesso */}
      {mostrarSucesso && (
        <div className="modal-overlay">
          <div className="modal-sucesso">
            <div className="sucesso-icon">🎉</div>
            <h3>Pedido Confirmado!</h3>
            <p>Obrigado! Seu pedido foi enviado com sucesso.</p>
            <p>Em breve entraremos em contato para confirmar a entrega.</p>
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;