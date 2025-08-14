// src/pages/Cardapio.jsx
import React, { useContext, useState, useMemo } from 'react';
import PizzaCard from '../components/PizzaCard';
import BebidaCard from '../components/BebidaCard';
import ComboCard from '../components/ComboCard';
import { MenuContext } from '../context/MenuContext';
import './Cardapio.css';

const Cardapio = () => {
  const { itensCardapio } = useContext(MenuContext);
  
  // Estados para controlar os filtros
  const [filtroTipo, setFiltroTipo] = useState('pizzas'); // 'pizzas', 'bebidas' ou 'combos'
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const itensFiltrados = useMemo(() => {
    // Primeiro, filtra por tipo principal
    let itens = itensCardapio.filter(item => {
      if (filtroTipo === 'pizzas') return item.tipo === 'pizza';
      if (filtroTipo === 'bebidas') return item.tipo === 'bebida';
      if (filtroTipo === 'combos') return item.tipo === 'combo';
      return true; // Caso improvável, mas seguro
    });

    // Se a aba de pizzas estiver ativa, aplica os filtros secundários
    if (filtroTipo === 'pizzas') {
      itens = itens.filter(pizza => {
        const filtroCategoria = categoriaSelecionada === 'Todas' || pizza.categoria === categoriaSelecionada;
        const filtroBusca = termoBusca === '' ||
          pizza.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
          pizza.ingredientes.some(ing => ing.toLowerCase().includes(termoBusca.toLowerCase()));
        return filtroCategoria && filtroBusca;
      });
    }

    return itens;
  }, [itensCardapio, filtroTipo, termoBusca, categoriaSelecionada]);
  
  // Gera a lista de categorias dinamicamente apenas para as pizzas
  const categoriasPizza = ['Todas', ...new Set(itensCardapio.filter(i => i.tipo === 'pizza').map(p => p.categoria))];

  return (
    <div>
      <h1 className="title">Nosso Cardápio</h1>
      
      {/* Filtro principal para Pizzas, Bebidas e Combos */}
      <div className="tipo-filtro">
        <button 
          className={filtroTipo === 'pizzas' ? 'ativo' : ''}
          onClick={() => setFiltroTipo('pizzas')}
        >
          Pizzas
        </button>
        <button 
          className={filtroTipo === 'bebidas' ? 'ativo' : ''}
          onClick={() => setFiltroTipo('bebidas')}
        >
          Bebidas
        </button>
        <button 
          className={filtroTipo === 'combos' ? 'ativo' : ''}
          onClick={() => setFiltroTipo('combos')}
        >
          Combos
        </button>
      </div>

      {/* Filtros secundários (busca e categorias) - só aparecem quando 'pizzas' está selecionado */}
      {filtroTipo === 'pizzas' && (
        <div className="filtros-container">
          <input 
            type="text"
            placeholder="Buscar por nome ou ingrediente..."
            className="campo-busca"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          <div className="botoes-categoria">
            {categoriasPizza.map(categoria => (
              <button
                key={categoria}
                className={categoriaSelecionada === categoria ? 'ativo' : ''}
                onClick={() => setCategoriaSelecionada(categoria)}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid">
        {itensFiltrados.length > 0 ? (
          itensFiltrados.map(item => {
            // Renderiza o card correto baseado no 'tipo' do item
            if (item.tipo === 'pizza') {
              return <PizzaCard key={item.id} pizza={item} />;
            }
            if (item.tipo === 'bebida') {
              return <BebidaCard key={item.id} bebida={item} />;
            }
            if (item.tipo === 'combo') {
              return <ComboCard key={item.id} combo={item} />;
            }
            return null; // Retorno seguro caso o tipo seja desconhecido
          })
        ) : (
          <p className="nenhuma-pizza-encontrada">Nenhum item encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Cardapio;