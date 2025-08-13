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
    ingredientes: '',
    preco_p: '',
    preco_m: '',
    preco_g: '',
    imagem: '',
    categoria: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaPizza(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pizzaParaAdicionar = {
      nome: novaPizza.nome,
      ingredientes: novaPizza.ingredientes,
      imagem: novaPizza.imagem,
      categoria: novaPizza.categoria || 'Clássica', 
      preco: {
        p: parseFloat(novaPizza.preco_p.replace(',', '.')),
        m: parseFloat(novaPizza.preco_m.replace(',', '.')),
        g: parseFloat(novaPizza.preco_g.replace(',', '.'))
      }
    };
    adicionarPizza(pizzaParaAdicionar);
    // Limpa o formulário
    setNovaPizza({ nome: '', ingredientes: '', preco_p: '', preco_m: '', preco_g: '', imagem: '', categoria: '' });
  };

  return (
    <div className="admin-container">
      <h1>Painel de Administração</h1>

      {/* Seção de Gerenciamento do Cardápio */}
      <section className="admin-section">
        <h2>Gerenciar Cardápio</h2>
        
        {/* --- O FORMULÁRIO QUE ESTAVA FALTANDO --- */}
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
            <label>Preço P</label>
            <input type="text" name="preco_p" value={novaPizza.preco_p} onChange={handleChange} required placeholder="Ex: 35.50" />
          </div>
          <div className="form-group">
            <label>Preço M</label>
            <input type="text" name="preco_m" value={novaPizza.preco_m} onChange={handleChange} required placeholder="Ex: 45.50" />
          </div>
          <div className="form-group">
            <label>Preço G</label>
            <input type="text" name="preco_g" value={novaPizza.preco_g} onChange={handleChange} required placeholder="Ex: 55.50" />
          </div>
          <div className="form-group">
            <label>URL da Imagem</label>
            <input type="text" name="imagem" value={novaPizza.imagem} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Categoria</label>
            <input type="text" name="categoria" value={novaPizza.categoria} onChange={handleChange} required placeholder="Ex: Clássica" />
          </div>
          <button type="submit" className="form-button">Adicionar Pizza</button>
        </form>
        {/* --- FIM DO FORMULÁRIO --- */}

        <hr style={{ margin: '2rem 0' }} />

        <h3>Pizzas Atuais</h3>
        <ul className="lista-admin">
          {pizzas.map(pizza => (
            <li key={pizza.id}>
              <div className="item-info">
                <strong>{pizza.nome}</strong>
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
          {pedidos && pedidos.length > 0 ? (
            pedidos.map(pedido => (
              <li key={pedido.id}>
                <div className="item-info">
                  Pedido #{pedido.id.substring(0, 8)} - Total: {pedido.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  - <strong className={`status-${pedido.status}`}>{pedido.status.toUpperCase()}</strong>
                </div>
              </li>
            ))
          ) : (
            <p>Nenhum pedido foi feito ainda.</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Admin;