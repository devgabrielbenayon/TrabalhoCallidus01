// src/App.jsx
import { AuthProvider } from './context/AuthProvider';
import { CartProvider } from './context/CartContext'; // Caminho atualizado
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;