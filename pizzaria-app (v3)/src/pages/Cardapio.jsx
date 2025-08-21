// src/pages/Cardapio.jsx
import React, { useContext, useState, useMemo } from 'react';
import PizzaCard from '../components/PizzaCard';
import BebidaCard from '../components/BebidaCard';
import ComboCard from '../components/ComboCard';
import PromocoesCarrossel from '../components/PromocoesCarrossel';
import { MenuContext } from '../context/MenuContext';

import { Container, Typography, Grid, ButtonGroup, Button, Box, TextField, CircularProgress } from '@mui/material';

const Cardapio = () => {
  const { itensCardapio, loading } = useContext(MenuContext);
  
  const [filtroTipo, setFiltroTipo] = useState('pizzas');
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const handleFiltroTipoChange = (novoTipo) => {
    if (novoTipo) {
      setFiltroTipo(novoTipo);
      setTermoBusca('');
      setCategoriaSelecionada('Todas');
    }
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

  // --- LÓGICA DE FILTRAGEM CORRIGIDA ---
  const itensFiltrados = useMemo(() => {
    if (!itensCardapio) return [];
    
    return itensCardapio.filter(item => {
      // Filtro 1: O item DEVE ser do tipo selecionado (pizza, bebida, etc.)
      if (item.tipo !== filtroTipo) {
        return false;
      }

      // Filtro 2: O item DEVE pertencer à categoria selecionada
      if (categoriaSelecionada !== 'Todas' && item.categoria !== categoriaSelecionada) {
        return false;
      }

      // Filtro 3: O item DEVE conter o termo de busca (se houver)
      if (termoBusca) {
        const termo = termoBusca.toLowerCase();
        const noNome = item.nome.toLowerCase().includes(termo);
        let nosDetalhes = false;
        if (item.ingredientes) {
          nosDetalhes = item.ingredientes.some(ing => ing.toLowerCase().includes(termo));
        } else if (item.descricao) {
          nosDetalhes = item.descricao.toLowerCase().includes(termo);
        } else if (item.itens) {
          nosDetalhes = item.itens.some(i => i.toLowerCase().includes(termo));
        }
        if (!noNome && !nosDetalhes) {
          return false;
        }
      }

      // Se passou por todos os filtros, o item é exibido
      return true;
    });
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
        <Typography 
          variant="h2" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'secondary.main', textTransform: 'uppercase', fontSize: { xs: '2.5rem', md: '3.75rem' } }}
        >
          Nosso Cardápio
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <ButtonGroup variant="outlined">
            <Button onClick={() => handleFiltroTipoChange('pizza')} variant={filtroTipo === 'pizza' ? 'contained' : 'outlined'}>Pizzas</Button>
            <Button onClick={() => handleFiltroTipoChange('bebida')} variant={filtroTipo === 'bebida' ? 'contained' : 'outlined'}>Bebidas</Button>
            <Button onClick={() => handleFiltroTipoChange('combo')} variant={filtroTipo === 'combo' ? 'contained' : 'outlined'}>Combos</Button>
          </ButtonGroup>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 4, minHeight: '90px' }}>
          <TextField 
            label={`Buscar em ${filtroTipo}...`}
            variant="outlined"
            sx={{ width: '100%', maxWidth: '500px' }}
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          {categoriasAtuais.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
              {categoriasAtuais.map(categoria => (
                <Button
                  key={categoria}
                  variant={categoriaSelecionada === categoria ? 'contained' : 'outlined'}
                  onClick={() => setCategoriaSelecionada(categoria)}
                  size="small"
                >
                  {categoria}
                </Button>
              ))}
            </Box>
          )}
        </Box>
        
        <Grid container spacing={4}>
          {itensFiltrados.length > 0 ? (
            itensFiltrados.map(item => (
              <Grid key={item.id} xs={12} sm={6} md={4}>
                {item.tipo === 'pizza' && <PizzaCard pizza={item} />}
                {item.tipo === 'bebida' && <BebidaCard bebida={item} />}
                {item.tipo === 'combo' && <ComboCard combo={item} />}
              </Grid>
            ))
          ) : (
            <Grid xs={12}>
              <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>Nenhum item encontrado.</Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Cardapio;