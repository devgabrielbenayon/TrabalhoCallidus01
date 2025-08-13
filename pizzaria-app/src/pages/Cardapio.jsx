// src/pages/Cardapio.jsx
import React, { useContext, useState, useMemo } from 'react';
import PizzaCard from '../components/PizzaCard';
import { MenuContext } from '../context/MenuContext';
import './Cardapio.css';

const Cardapio = () => {
  const { pizzas } = useContext(MenuContext);

  // Estados para controlar os filtros
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  // Pizzas filtradas com base nos estados de busca e categoria
  const pizzasFiltradas = useMemo(() => {
    return pizzas.filter(pizza => {
      // Filtro por categoria
      const filtroCategoria = categoriaSelecionada === 'Todas' || pizza.categoria === categoriaSelecionada;

      // Filtro por busca de texto (nome ou ingredientes)
      const filtroBusca = termoBusca === '' ||
        pizza.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
        pizza.ingredientes.some(ing => ing.toLowerCase().includes(termoBusca.toLowerCase()));

      return filtroCategoria && filtroBusca;
    });
  }, [pizzas, termoBusca, categoriaSelecionada]);

  // Obtém todas as categorias únicas do cardápio para criar os botões de filtro
  const categorias = ['Todas', ...new Set(pizzas.map(p => p.categoria))];

  return (
    <div>
      <h1 className="title">Nosso Cardápio</h1>

      {/* --- ÁREA DE FILTROS --- */}
      <div className="filtros-container">
        <input 
          type="text"
          placeholder="Buscar por nome ou ingrediente..."
          className="campo-busca"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />
        <div className="botoes-categoria">
          {categorias.map(categoria => (
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
      {/* --- FIM DA ÁREA DE FILTROS --- */}

      <div className="grid">
        {pizzasFiltradas.length > 0 ? (
          pizzasFiltradas.map(pizza => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))
        ) : (
          <p className="nenhuma-pizza-encontrada">Nenhuma pizza encontrada com esses filtros.</p>
        )}
      </div>
    </div>
  );
};

export default Cardapio;