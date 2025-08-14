// src/context/MenuContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// 1. Importa os dados do novo arquivo renomeado
import itensIniciais from '/public/api/cardapio.json';

export const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
  // 2. O estado agora se chama 'itensCardapio' para ser mais genérico
  const [itensCardapio, setItensCardapio] = useState([]);

  useEffect(() => {
    setItensCardapio(itensIniciais);
  }, []);

  // Nota: Estas funções por enquanto só funcionam corretamente para adicionar/editar pizzas.
  // Precisaríamos ajustá-las para que o formulário de Admin também possa lidar com bebidas.
  const adicionarPizza = (novaPizza) => {
    const pizzaParaAdicionar = {
      tipo: 'pizza', // Garante que o tipo seja 'pizza'
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
    // 3. Fornece a nova variável de estado
    itensCardapio,
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