// src/pages/Cardapio.jsx
import React, { useContext, useState, useMemo } from 'react';
import PizzaCard from '../components/PizzaCard';
import BebidaCard from '../components/BebidaCard';
import ComboCard from '../components/ComboCard';
import PromocoesCarrossel from '../components/PromocoesCarrossel';
import { MenuContext } from '../context/MenuContext';
import './Cardapio.css';

import { Container, Typography, CircularProgress } from '@mui/material';

const Cardapio = () => {
  const { itensCardapio, loading } = useContext(MenuContext);
  
  const [filtroTipo, setFiltroTipo] = useState('pizzas');
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const handleFiltroTipoChange = (novoTipo) => {
    setFiltroTipo(novoTipo);
    setTermoBusca('');
    setCategoriaSelecionada('Todas');
  };

  const categoriasAtuais = useMemo(() => {
    if (!itensCardapio) return [];
    const itensDoTipo = itensCardapio.filter(i => i.tipo === filtroTipo);
    const categoriasUnicas = [...new Set(itensDoTipo.map(i => i.categoria))];
    if (categoriasUnicas.length > 1) {
      return ['Todas', ...categoriasUnicas];
    }
    return [];
  }, [itensCardapio, filtroTipo]);

  const itensFiltrados = useMemo(() => {
    if (!itensCardapio) return [];
    
    let itens = itensCardapio.filter(item => item.tipo === filtroTipo);

    if (categoriaSelecionada !== 'Todas') {
      itens = itens.filter(item => item.categoria === categoriaSelecionada);
    }
    
    if (termoBusca) {
      const termo = termoBusca.toLowerCase();
      itens = itens.filter(item => {
        const noNome = item.nome.toLowerCase().includes(termo);
        let nosDetalhes = false;
        if (item.ingredientes) {
          nosDetalhes = item.ingredientes.some(ing => ing.toLowerCase().includes(termo));
        } else if (item.descricao) {
          nosDetalhes = item.descricao.toLowerCase().includes(termo);
        } else if (item.itens) {
          nosDetalhes = item.itens.some(i => i.toLowerCase().includes(termo));
        }
        return noNome || nosDetalhes;
      });
    }
    return itens;
  }, [itensCardapio, filtroTipo, termoBusca, categoriaSelecionada]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
        <CircularProgress color="secondary" />
      </Container>
    );
  }

  return (
    <>
      <PromocoesCarrossel />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <h1 className="title">Nosso Cardápio</h1>
        
        <div className="tipo-filtro">
          <button className={filtroTipo === 'pizzas' ? 'ativo' : ''} onClick={() => handleFiltroTipoChange('pizzas')}>Pizzas</button>
          <button className={filtroTipo === 'bebidas' ? 'ativo' : ''} onClick={() => handleFiltroTipoChange('bebidas')}>Bebidas</button>
          <button className={filtroTipo === 'combos' ? 'ativo' : ''} onClick={() => handleFiltroTipoChange('combos')}>Combos</button>
        </div>

        <div className="filtros-container">
          <input type="text" placeholder={`Buscar em ${filtroTipo}...`} className="campo-busca" value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} />
          {categoriasAtuais.length > 0 && (
            <div className="botoes-categoria">
              {categoriasAtuais.map(categoria => (
                <button key={categoria} className={categoriaSelecionada === categoria ? 'ativo' : ''} onClick={() => setCategoriaSelecionada(categoria)}>
                  {categoria}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="cardapio-grid">
          {itensFiltrados.length > 0 ? (
            itensFiltrados.map(item => {
              if (item.tipo === 'pizza') return <PizzaCard key={item.id} pizza={item} />;
              if (item.tipo === 'bebida') return <BebidaCard key={item.id} bebida={item} />;
              if (item.tipo === 'combo') return <ComboCard key={item.id} combo={item} />;
              return null;
            })
          ) : (
            <p className="nenhum-item-encontrado">Nenhum item encontrado.</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default Cardapio;