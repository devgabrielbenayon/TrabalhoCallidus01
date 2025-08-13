// src/pages/Cardapio.jsx
import React, { useContext } from 'react'; // Importe useContext
import PizzaCard from '../components/PizzaCard';
import { MenuContext } from '../context/MenuContext'; // Importe o MenuContext
import './Cardapio.css';

const Cardapio = () => {
  // Pega as pizzas diretamente do contexto, não mais de um estado local!
  const { pizzas } = useContext(MenuContext);

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