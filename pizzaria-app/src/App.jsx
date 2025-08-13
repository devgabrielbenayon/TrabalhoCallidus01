// src/App.jsx
import { AuthProvider } from './context/AuthProvider';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { MenuProvider } from './context/MenuContext'; // 1. Importe

import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <MenuProvider> {/* 2. Adicione o MenuProvider */}
        <CartProvider>
          <OrderProvider>
            <AppRoutes />
          </OrderProvider>
        </CartProvider>
      </MenuProvider>
    </AuthProvider>
  );
}

export default App;