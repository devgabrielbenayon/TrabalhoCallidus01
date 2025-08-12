import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation
} from "react-router-dom";
import Cardapio from "./components/Cardapio";
import CadastrarLivros from "./components/CadastrarLivros";
import Cozinha from "./components/Cozinha";
import SplashScreen from "./screen/SplashScreen";
import Header from "./components/Header";
import Login from "./login/Login";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./route/PrivateRoute";
import "./App.css";
import Carrinho from "./components/Carrinho";

// --- Componente principal ---
const App = () => {
  const [pizzas, setPizzas] = useState([
    {
      id: 1,
      nome: "Margherita",
      ingredientes: "Molho de tomate, mussarela, manjericão fresco",
      preco: 32.90,
      tamanho: "Grande",
      categoria: "Tradicional"
    },
    {
      id: 2,
      nome: "Calabresa",
      ingredientes: "Molho de tomate, mussarela, calabresa, cebola",
      preco: 35.90,
      tamanho: "Grande",
      categoria: "Tradicional"
    },
    {
      id: 3,
      nome: "Portuguesa",
      ingredientes: "Molho de tomate, mussarela, presunto, ovos, cebola, azeitona",
      preco: 42.90,
      tamanho: "Grande",
      categoria: "Especial"
    },
    {
      id: 4,
      nome: "Quatro Queijos",
      ingredientes: "Molho branco, mussarela, gorgonzola, parmesão, provolone",
      preco: 45.90,
      tamanho: "Grande",
      categoria: "Especial"
    },
    {
      id: 5,
      nome: "Pepperoni",
      ingredientes: "Molho de tomate, mussarela, pepperoni, orégano",
      preco: 38.90,
      tamanho: "Grande",
      categoria: "Tradicional"
    },
    {
      id: 6,
      nome: "Frango Catupiry",
      ingredientes: "Molho de tomate, mussarela, frango desfiado, catupiry",
      preco: 39.90,
      tamanho: "Grande",
      categoria: "Especial"
    }
  ]);

  // Estado para gerenciar pedidos
  const [pedidos, setPedidos] = useState([]);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setCarregando(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const inserirPizza = (pizza) => {
    pizza.id = pizzas.length + 1;
    setPizzas((prev) => [...prev, pizza]);
  };

  const editarPizza = (pizza) => {
    const atualizados = pizzas.map((p) => (p.id === pizza.id ? pizza : p));
    setPizzas(atualizados);
  };

  const removerPizza = (pizza) => {
    if (window.confirm("Remover essa pizza do cardápio?")) {
      setPizzas((prev) => prev.filter((p) => p.id !== pizza.id));
    }
  };

  // Função para atualizar status dos pedidos
  const atualizarStatusPedido = (pedidoId, novoStatus) => {
    setPedidos(prevPedidos => 
      prevPedidos.map(pedido => 
        pedido.id === pedidoId 
          ? { ...pedido, status: novoStatus }
          : pedido
      )
    );
  };

  if (carregando) return <SplashScreen />;

  return (
    <Router>
      <AuthProvider>
        <AppLayout
          pizzas={pizzas}
          pedidos={pedidos}
          inserirPizza={inserirPizza}
          editarPizza={editarPizza}
          removerPizza={removerPizza}
          atualizarStatusPedido={atualizarStatusPedido}
        />
      </AuthProvider>
    </Router>
  );
};

// --- Layout com rotas protegidas e header ---
const AppLayout = ({ pizzas, pedidos, inserirPizza, editarPizza, removerPizza, atualizarStatusPedido }) => {
  const location = useLocation();
  const mostrarHeader = location.pathname !== "/login";

  return (
    <>
      {mostrarHeader && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Grupo de rotas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Cardapio />} />
          <Route 
            path="/Cozinha" 
            element={
              <Cozinha 
                pedidos={pedidos} 
                atualizarStatusPedido={atualizarStatusPedido} 
              />
            } 
          />
          <Route
            path="/carrinho"
            element={
              <Carrinho
                inserirLivro={inserirPizza}
                livro={{ id: 0, isbn: "", titulo: "", autor: "" }}
              />
            }
          />
          <Route
            path="/editar/:isbnLivro"
            element={
              <CadastrarLivrosWrapper pizzas={pizzas} editarPizza={editarPizza} />
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

// --- Wrapper para edição ---
const CadastrarLivrosWrapper = ({ pizzas, editarPizza }) => {
  const { isbnLivro } = useParams();
  const navigate = useNavigate();
  const pizza = pizzas.find((pizza) => pizza.id.toString() === isbnLivro);

  if (!pizza) {
    navigate("/");
    return null;
  }

  return <CadastrarLivros livro={pizza} editarLivro={editarPizza} />;
};

// --- Página de não encontrado ---
const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h2>404 - Página não encontrada</h2>
    <p>A página que você procura não existe.</p>
  </div>
);

export default App;