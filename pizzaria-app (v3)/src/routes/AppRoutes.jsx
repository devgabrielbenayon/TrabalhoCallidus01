// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Cardapio from '../pages/Cardapio';
import Carrinho from '../pages/Carrinho';
import Cozinha from '../pages/Cozinha';
import Entregas from '../pages/Entregas';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';
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
          <Route path="/carrinho" element={<Carrinho />} />

          {/* Rotas Protegidas */}
          <Route 
            path="/cozinha" 
            element={ <ProtectedRoute allowedRoles={['cozinha', 'admin']}> <Cozinha /> </ProtectedRoute> } 
          />
          
          {/* --- ALTERAÇÃO AQUI: Rota de Entregas agora é para admin e entregador --- */}
          <Route 
            path="/entregas" 
            element={ <ProtectedRoute allowedRoles={['admin', 'entregador']}> <Entregas /> </ProtectedRoute> } 
          />

          <Route 
            path="/admin" 
            element={ <ProtectedRoute allowedRoles={['admin']}> <Admin /> </ProtectedRoute> } 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default AppRoutes;