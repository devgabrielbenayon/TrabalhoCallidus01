// src/context/MenuContext.jsx
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
  const [itensCardapio, setItensCardapio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cardapio.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro de rede ao buscar o cardápio');
        }
        return response.json();
      })
      .then(data => {
        setItensCardapio(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Falha crítica ao carregar o cardápio:", error);
        setLoading(false);
      });
  }, []);

  const pizzas = useMemo(() => 
    itensCardapio.filter(item => item.tipo === 'pizza'), 
    [itensCardapio]
  );

  const adicionarPizza = (novaPizza) => {
    const pizzaParaAdicionar = {
      tipo: 'pizza',
      ...novaPizza,
      id: uuidv4(),
      ingredientes: Array.isArray(novaPizza.ingredientes) 
        ? novaPizza.ingredientes 
        : novaPizza.ingredientes.split(',').map(ing => ing.trim()),
    };
    setItensCardapio(itensAtuais => [...itensAtuais, pizzaParaAdicionar]);
  };

  const editarPizza = (pizzaEditada) => {
    setItensCardapio(itensAtuais => 
      itensAtuais.map(p => 
        p.id === pizzaEditada.id ? { ...p, ...pizzaEditada } : p
      )
    );
  };

  const excluirPizza = (pizzaId) => {
    setItensCardapio(itensAtuais => itensAtuais.filter(p => p.id !== pizzaId));
  };

  const valorDoContexto = {
    itensCardapio,
    pizzas,
    loading,
    adicionarPizza,
    editarPizza,
    excluirPizza,
  };

  return (
    <MenuContext.Provider value={valorDoContexto}>
      {children}
    </MenuContext.Provider>
  );
};