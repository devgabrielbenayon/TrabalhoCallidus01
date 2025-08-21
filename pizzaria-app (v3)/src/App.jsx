// src/App.jsx
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthProvider';
import { MenuProvider } from './context/MenuContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { WaiterProvider } from './context/WaiterContext';

import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MenuProvider>
          <CartProvider>
            <OrderProvider>
              <WaiterProvider>
                <AppRoutes />
              </WaiterProvider>
            </OrderProvider>
          </CartProvider>
        </MenuProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;