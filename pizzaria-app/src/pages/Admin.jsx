// src/pages/Admin.jsx
import React, { useContext, useState } from 'react';
import { MenuContext } from '../context/MenuContext';
import { OrderContext } from '../context/OrderContext';
import './Admin.css';

const Admin = () => {
  // Contextos para gerenciar pizzas e ver pedidos
  const { pizzas, adicionarPizza, excluirPizza } = useContext(MenuContext);
  const { pedidos } = useContext(OrderContext);

  // Estado local para o formulário de nova pizza
  const [novaPizza, setNovaPizza] = useState({
    nome: '',
    ingredientes: '', // Será uma string separada por vírgulas
    preco: '',
    imagem: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaPizza(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Converte o preço para número antes de adicionar
    adicionarPizza({ ...novaPizza, preco: parseFloat(novaPizza.preco) });
    // Limpa o formulário
    setNovaPizza({ nome: '', ingredientes: '', preco: '', imagem: '' });
  };

  return (
    <div className="admin-container">
      <h1>Painel de Administração</h1>

      {/* Seção de Gerenciamento do Cardápio */}
      <section className="admin-section">
        <h2>Gerenciar Cardápio</h2>

        {/* Formulário para Adicionar Nova Pizza */}
        <form onSubmit={handleSubmit} className="pizza-form">
          <h3>Adicionar Nova Pizza</h3>
          <div className="form-group">
            <label>Nome da Pizza</label>
            <input type="text" name="nome" value={novaPizza.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Ingredientes (separados por vírgula)</label>
            <input type="text" name="ingredientes" value={novaPizza.ingredientes} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Preço</label>
            <input type="number" step="0.01" name="preco" value={novaPizza.preco} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>URL da Imagem</label>
            <input type="text" name="imagem" value={novaPizza.imagem} onChange={handleChange} required />
          </div>
          <button type="submit" className="form-button">Adicionar Pizza</button>
        </form>

        <hr style={{ margin: '2rem 0' }} />

        {/* Lista de Pizzas Existentes */}
        <h3>Pizzas Atuais</h3>
        <ul className="lista-admin">
          {pizzas.map(pizza => (
            <li key={pizza.id}>
              <div className="item-info">
                <strong>{pizza.nome}</strong> - R$ {pizza.preco.toFixed(2)}
              </div>
              <div className="item-acoes">
                <button>Editar</button>
                <button onClick={() => excluirPizza(pizza.id)} className="botao-excluir">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Seção de Histórico de Pedidos */}
      <section className="admin-section">
        <h2>Histórico de Pedidos</h2>
        <ul className="lista-admin">
          {pedidos.length > 0 ? pedidos.map(pedido => (
            <li key={pedido.id}>
              <div className="item-info">
                Pedido #{pedido.id.substring(0, 8)} - Total: R$ {pedido.valorTotal.toFixed(2)}
                - <strong className={`status-${pedido.status}`}>{pedido.status.toUpperCase()}</strong>
              </div>
            </li>
          )) : <p>Nenhum pedido foi feito ainda.</p>}
        </ul>
      </section>
    </div>
  );
};

export default Admin;