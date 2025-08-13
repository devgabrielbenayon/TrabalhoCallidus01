// src/App.jsx
import { AuthProvider } from './context/AuthProvider';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext'; // 1. Importe o OrderProvider

import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider> {/* 2. Envolva as rotas com ele */}
          <AppRoutes />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;