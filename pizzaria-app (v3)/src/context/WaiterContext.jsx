// src/context/WaiterContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const WaiterContext = createContext(null);

export const WaiterProvider = ({ children }) => {
  const [garcons, setGarcons] = useState(() => {
    try {
      const garconsSalvos = localStorage.getItem('pizzaria_garcons');
      return garconsSalvos ? JSON.parse(garconsSalvos) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('pizzaria_garcons', JSON.stringify(garcons));
  }, [garcons]);

  const adicionarGarcom = (nome) => {
    if (!nome) return;
    const novoGarcom = { id: uuidv4(), nome };
    setGarcons(garconsAtuais => [...garconsAtuais, novoGarcom]);
  };

  const removerGarcom = (garcomId) => {
    setGarcons(garconsAtuais => garconsAtuais.filter(g => g.id !== garcomId));
  };

  // --- FUNÇÃO DE EDIÇÃO ---
  const editarGarcom = (garcomId, novoNome) => {
    if (!novoNome) return; // Garante que o novo nome não seja vazio
    setGarcons(garconsAtuais =>
      garconsAtuais.map(g => (g.id === garcomId ? { ...g, nome: novoNome } : g))
    );
  };

  const valorDoContexto = {
    garcons,
    adicionarGarcom,
    removerGarcom,
    editarGarcom, // Garante que a função está sendo exportada
  };

  return (
    <WaiterContext.Provider value={valorDoContexto}>
      {children}
    </WaiterContext.Provider>
  );
};