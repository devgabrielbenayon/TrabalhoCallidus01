// src/routes/AppRoutes.jsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importação das Páginas
import Login from '../pages/Login';
import Cardapio from '../pages/Cardapio';
import CarrinhoPage from '../pages/Carrinho'; // 1. Importe a nova página
import Cozinha from '../pages/Cozinha';
import Entregas from '../pages/Entregas';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';

// Importação de Componentes
import Header from '../components/Header';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Navigate to="/cardapio" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/carrinho" element={<CarrinhoPage />} /> {/* 2. Rota para o carrinho adicionada aqui */}

          {/* Rotas Protegidas */}
          <Route
            path="/cozinha"
            element={
              <ProtectedRoute allowedRoles={['cozinha', 'admin']}>
                <Cozinha />
              </ProtectedRoute>
            }
          />
          <Route
            path="/entregas"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Entregas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Admin />
              </ProtectedRoute>
            }
          />
          
          {/* Rota para páginas não encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default AppRoutes;