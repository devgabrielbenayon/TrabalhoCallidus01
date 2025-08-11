import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
import 'react-tooltip/dist/react-tooltip.css';

const Cardapio = () => {
  // Estado para controlar o carrinho
  const [carrinho, setCarrinho] = useState([]);

  // Cardápio de pizzas
  const pizzas = [
    {
      id: 1,
      nome: "Margherita",
      ingredientes: "Molho de tomate, mussarela, manjericão fresco",
      preco: 32.90,
      tamanho: "Grande",
      categoria: "Tradicional",
      imagem: "🍕"
    },
    {
      id: 2,
      nome: "Calabresa",
      ingredientes: "Molho de tomate, mussarela, calabresa, cebola",
      preco: 35.90,
      tamanho: "Grande",
      categoria: "Tradicional",
      imagem: "🍕"
    },
    {
      id: 3,
      nome: "Portuguesa",
      ingredientes: "Molho de tomate, mussarela, presunto, ovos, cebola, azeitona",
      preco: 42.90,
      tamanho: "Grande",
      categoria: "Especial",
      imagem: "🍕"
    },
    {
      id: 4,
      nome: "Quatro Queijos",
      ingredientes: "Molho branco, mussarela, gorgonzola, parmesão, provolone",
      preco: 45.90,
      tamanho: "Grande",
      categoria: "Especial",
      imagem: "🍕"
    },
    {
      id: 5,
      nome: "Pepperoni",
      ingredientes: "Molho de tomate, mussarela, pepperoni, orégano",
      preco: 38.90,
      tamanho: "Grande",
      categoria: "Tradicional",
      imagem: "🍕"
    },
    {
      id: 6,
      nome: "Frango Catupiry",
      ingredientes: "Molho de tomate, mussarela, frango desfiado, catupiry",
      preco: 39.90,
      tamanho: "Grande",
      categoria: "Especial",
      imagem: "🍕"
    }
  ];

  const adicionarAoCarrinho = (pizza) => {
    setCarrinho([...carrinho, pizza]);
    toast.success(`Pizza "${pizza.nome}" adicionada ao carrinho!`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const verDetalhes = (pizza) => {
    toast.info(`${pizza.nome}: ${pizza.ingredientes}`, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const tooltipStyle = {
    backgroundColor: "#c6461f",
    color: "white",
    border: "1px solid #ddd",
    padding: "8px 12px",
    fontSize: "0.85rem",
    boxShadow: "0 2px 8px rgba(198, 70, 31, 0.3)",
  };

  return (
    <div
      className='cardapio'
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
        padding: "32px 24px",
        margin: "32px auto",
        maxWidth: "1200px"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ 
          color: "#c6461f", 
          fontSize: "2.5rem", 
          marginBottom: "10px",
          fontFamily: "Georgia, serif"
        }}>
          🍕 EPAA Pizzaria
        </h1>
        <p style={{ 
          color: "#666", 
          fontSize: "1.1rem",
          fontStyle: "italic"
        }}>
          As melhores pizzas da cidade!
        </p>
        {carrinho.length > 0 && (
          <div style={{
            background: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "8px",
            padding: "10px",
            marginTop: "15px",
            color: "#856404"
          }}>
            🛒 Carrinho: {carrinho.length} item(ns)
          </div>
        )}
      </div>

      <div className='cardapio'>
        <h2 style={{ 
          color: "#8b4513", 
          borderBottom: "2px solid #c6461f",
          paddingBottom: "10px",
          marginBottom: "30px"
        }}>
          Nosso Cardápio
        </h2>
        
        <table className='tabela-cardapio' style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th style={thStyle} width="5%"></th>
              <th style={thStyle} width="20%">Pizza</th>
              <th style={thStyle}>Ingredientes</th>
              <th style={thStyle} width="10%">Categoria</th>
              <th style={thStyle} width="10%">Preço</th>
              <th style={thStyle} width="8%">Detalhes</th>
              <th style={thStyle} width="10%">Pedido</th>
            </tr>
          </thead>
          <tbody>
            {pizzas.map((pizza) => (
              <tr key={pizza.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ ...tdStyle, textAlign: "center", fontSize: "2rem" }}>
                  {pizza.imagem}
                </td>
                <td style={{ ...tdStyle, fontWeight: "bold", color: "#c6461f" }}>
                  {pizza.nome}
                  <br />
                  <small style={{ color: "#666", fontWeight: "normal" }}>
                    {pizza.tamanho}
                  </small>
                </td>
                <td style={{ ...tdStyle, fontSize: "0.9rem", color: "#555" }}>
                  {pizza.ingredientes}
                </td>
                <td style={tdStyle}>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    backgroundColor: pizza.categoria === "Especial" ? "#fff3cd" : "#d1ecf1",
                    color: pizza.categoria === "Especial" ? "#856404" : "#0c5460",
                    border: `1px solid ${pizza.categoria === "Especial" ? "#ffc107" : "#bee5eb"}`
                  }}>
                    {pizza.categoria}
                  </span>
                </td>
                <td style={{ ...tdStyle, fontWeight: "bold", fontSize: "1.1rem", color: "#28a745" }}>
                  R$ {pizza.preco.toFixed(2).replace('.', ',')}
                </td>
                <td style={tdStyle}>
                  <button
                    style={{
                      color: "#fff",
                      backgroundColor: "#6c757d",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.85rem"
                    }}
                    data-tooltip-id={`tooltip-detalhes-${pizza.id}`}
                    data-tooltip-content="Ver ingredientes completos"
                    onClick={() => verDetalhes(pizza)}
                  >
                    Ver
                  </button>
                  <Tooltip
                    id={`tooltip-detalhes-${pizza.id}`}
                    place='top'
                    style={tooltipStyle}
                  />
                </td>
                <td style={tdStyle}>
                  <button
                    style={{
                      color: "#fff",
                      backgroundColor: "#c6461f",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      width: "90px",
                      height: "35px"
                    }}
                    data-tooltip-id={`tooltip-pedido-${pizza.id}`}
                    data-tooltip-content="Adicionar ao carrinho"
                    onClick={() => adicionarAoCarrinho(pizza)}
                  >
                    Pedir
                  </button>
                  <Tooltip
                    id={`tooltip-pedido-${pizza.id}`}
                    place='top'
                    style={tooltipStyle}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        textAlign: "center",
        marginTop: "40px",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px"
      }}>
        <h3 style={{ color: "#c6461f", marginBottom: "10px" }}>
          📞 Faça seu pedido: (11) 9999-9999
        </h3>
        <p style={{ color: "#666", margin: "0" }}>
          🕒 Funcionamento: Ter a Dom, 18h às 23h | 🚚 Entrega grátis acima de R$ 50,00
        </p>
      </div>
    </div>
  );
};

// Estilos para a tabela
const thStyle = {
  padding: "12px 8px",
  textAlign: "left",
  fontWeight: "bold",
  color: "#495057",
  borderBottom: "2px solid #dee2e6"
};

const tdStyle = {
  padding: "12px 8px",
  verticalAlign: "top"
};

export default Cardapio;