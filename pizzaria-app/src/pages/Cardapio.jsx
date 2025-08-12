// src/pages/Cardapio.jsx (Método Global)
import React from 'react';
import PizzaCard from '../components/PizzaCard';
import './Cardapio.css'; // Importação alterada

const pizzasMock = [
  // ... seus dados de pizza aqui ...
  { id: 1, nome: 'Calabresa', ingredientes: ['Molho de tomate', 'queijo muçarela', 'calabresa', 'cebola', 'orégano'], preco: 45.50, imagem: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 2, nome: 'Margherita', ingredientes: ['Molho de tomate', 'queijo muçarela', 'tomate fresco', 'manjericão'], preco: 42.00, imagem: 'https://images.unsplash.com/photo-1598021680133-eb3a167a515b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 3, nome: 'Frango com Catupiry', ingredientes: ['Molho de tomate', 'queijo muçarela', 'frango desfiado', 'catupiry'], preco: 52.90, imagem: 'https://images.unsplash.com/photo-1620374645310-f9d97e733aa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
];

const Cardapio = () => {
  return (
    // ClassNames alteradas para strings
    <div>
      <h1 className="title">Nosso Cardápio</h1>
      <div className="grid">
        {pizzasMock.map(pizza => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default Cardapio;