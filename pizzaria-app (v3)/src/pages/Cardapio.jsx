// src/pages/Cardapio.jsx
import React, { useContext, useState, useMemo } from 'react';
import PizzaCard from '../components/PizzaCard';
import BebidaCard from '../components/BebidaCard';
import ComboCard from '../components/ComboCard';
import { MenuContext } from '../context/MenuContext';
import './Cardapio.css';

// Importando apenas os componentes do MUI que ainda são necessários
import { Container, Typography, Button, Box, TextField } from '@mui/material';

const Cardapio = () => {
  const { itensCardapio } = useContext(MenuContext);
  
  const [filtroTipo, setFiltroTipo] = useState('pizzas');
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const itensFiltrados = useMemo(() => {
    let itens = itensCardapio.filter(item => {
      if (filtroTipo === 'pizzas') return item.tipo === 'pizza';
      if (filtroTipo === 'bebidas') return item.tipo === 'bebida';
      if (filtroTipo === 'combos') return item.tipo === 'combo';
      return true;
    });

    if (filtroTipo === 'pizzas') {
      itens = itens.filter(pizza => {
        const filtroCategoria = categoriaSelecionada === 'Todas' || pizza.categoria === categoriaSelecionada;
        const filtroBusca = termoBusca === '' ||
          pizza.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
          (pizza.ingredientes && pizza.ingredientes.some(ing => ing.toLowerCase().includes(termoBusca.toLowerCase())));
        return filtroCategoria && filtroBusca;
      });
    }
    return itens;
  }, [itensCardapio, filtroTipo, termoBusca, categoriaSelecionada]);
  
  const categoriasPizza = ['Todas', ...new Set(itensCardapio.filter(i => i.tipo === 'pizza').map(p => p.categoria))];

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography 
        variant="h2" 
        component="h1" 
        align="center" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold', 
          color: 'secondary.main', 
          textTransform: 'uppercase',
          fontSize: { xs: '2.5rem', md: '3.75rem' }
        }}
      >
        Nosso Cardápio
      </Typography>
      
      {/* Filtros com CSS Customizado */}
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
      
      {/* Usando nossa própria classe de grid para o layout */}
      <div className="cardapio-grid">
        {itensFiltrados.length > 0 ? (
          itensFiltrados.map(item => {
            if (item.tipo === 'pizza') {
              return <PizzaCard key={item.id} pizza={item} />;
            }
            if (item.tipo === 'bebida') {
              return <BebidaCard key={item.id} bebida={item} />;
            }
            if (item.tipo === 'combo') {
              return <ComboCard key={item.id} combo={item} />;
            }
            return null;
          })
        ) : (
          <p className="nenhuma-pizza-encontrada">Nenhum item encontrado.</p>
        )}
      </div>
    </Container>
  );
};

export default Cardapio;