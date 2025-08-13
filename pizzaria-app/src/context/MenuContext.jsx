// src/context/MenuContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import pizzasIniciais from '/public/api/pizzas.json'; // Carrega os dados iniciais

// eslint-disable-next-line react-refresh/only-export-components
export const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);

  // Carrega o cardápio inicial quando o provedor é montado
  useEffect(() => {
    setPizzas(pizzasIniciais);
  }, []);

  const adicionarPizza = (novaPizza) => {
    // Assume que novaPizza é um objeto com { nome, ingredientes, preco, imagem }
    const pizzaParaAdicionar = {
      ...novaPizza,
      id: uuidv4(), // Adiciona um ID único
      // Converte ingredientes de string para array
      ingredientes: novaPizza.ingredientes.split(',').map(ing => ing.trim()),
    };
    setPizzas(pizzasAtuais => [...pizzasAtuais, pizzaParaAdicionar]);
  };

  const excluirPizza = (pizzaId) => {
    setPizzas(pizzasAtuais => pizzasAtuais.filter(p => p.id !== pizzaId));
  };

  // A função de editar é mais complexa, por enquanto vamos focar em adicionar/excluir.
  // Implementaremos a edição depois se desejar.

  const valorDoContexto = {
    pizzas,
    adicionarPizza,
    excluirPizza,
  };

  return (
    <MenuContext.Provider value={valorDoContexto}>
      {children}
    </MenuContext.Provider>
  );
};