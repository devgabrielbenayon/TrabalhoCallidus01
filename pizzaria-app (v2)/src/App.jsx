// src/App.jsx
import { ThemeProvider } from './context/ThemeContext'; // 1. Importe
import { AuthProvider } from './context/AuthProvider';
import { MenuProvider } from './context/MenuContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ThemeProvider> {/* 2. Envolva todos os outros provedores */}
      <AuthProvider>
        <MenuProvider>
          <CartProvider>
            <OrderProvider>
              <AppRoutes />
            </OrderProvider>
          </CartProvider>
        </MenuProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;