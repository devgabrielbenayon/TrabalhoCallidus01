// src/context/MenuContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import pizzasIniciais from '/public/api/pizzas.json';

export const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    setPizzas(pizzasIniciais);
  }, []);

  const adicionarPizza = (novaPizza) => {
    const pizzaParaAdicionar = {
      ...novaPizza,
      id: uuidv4(),
      ingredientes: Array.isArray(novaPizza.ingredientes) 
        ? novaPizza.ingredientes 
        : novaPizza.ingredientes.split(',').map(ing => ing.trim()),
    };
    setPizzas(pizzasAtuais => [...pizzasAtuais, pizzaParaAdicionar]);
  };

  const editarPizza = (pizzaEditada) => {
    setPizzas(pizzasAtuais => 
      pizzasAtuais.map(p => 
        p.id === pizzaEditada.id ? { ...p, ...pizzaEditada } : p
      )
    );
  };

  const excluirPizza = (pizzaId) => {
    setPizzas(pizzasAtuais => pizzasAtuais.filter(p => p.id !== pizzaId));
  };

  const valorDoContexto = {
    pizzas,
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