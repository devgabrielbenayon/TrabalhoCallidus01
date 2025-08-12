import React, { useState, useEffect } from 'react';
import PizzaCard from '../components/PizzaCard';
import './Cardapio.css';

// Importe os dados do arquivo JSON.
// O React (com Create React App ou Vite) automaticamente converterá o JSON em um objeto JavaScript.
import pizzasData from '/public/api/pizzas.json';

const Cardapio = () => {
  const [pizzas, setPizzas] = useState([]);

  // useEffect para simular uma chamada de API ao montar o componente.
  useEffect(() => {
    // Em um cenário real, aqui você faria a chamada para sua API, ex: fetch('/api/pizzas')
    // Para simular, vamos apenas definir os dados importados no estado do componente.
    setPizzas(pizzasData);
  }, []); // O array de dependências vazio [] garante que o efeito seja executado apenas uma vez.

  return (
    <div>
      <h1 className="title">Nosso Cardápio</h1>
      <div className="grid">
        {pizzas.map(pizza => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default Cardapio;