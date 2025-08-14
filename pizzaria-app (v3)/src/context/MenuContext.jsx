// src/context/MenuContext.jsx
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import itensIniciais from '/public/api/cardapio.json';

export const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
  const [itensCardapio, setItensCardapio] = useState([]);

  useEffect(() => {
    setItensCardapio(itensIniciais);
  }, []);

  // Cria uma lista memorizada contendo apenas os itens do tipo 'pizza'
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
    // A exclusão agora acontece na lista principal de itens
    setItensCardapio(itensAtuais => itensAtuais.filter(p => p.id !== pizzaId));
  };

  const valorDoContexto = {
    itensCardapio,  // A lista completa com pizzas, bebidas, combos
    pizzas,         // A lista contendo apenas as pizzas
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