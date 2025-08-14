import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você procura não existe.</p>
      <Link to="/cardapio">Voltar para o Cardápio</Link>
    </div>
  );
};

export default NotFound;