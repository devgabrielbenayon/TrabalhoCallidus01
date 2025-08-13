// src/pages/Carrinho.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { OrderContext } from '../context/OrderContext';
import './Carrinho.css';

const formatarPreco = (preco) => {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const Carrinho = () => {
    // AQUI É UM PONTO CRÍTICO: Garanta que todas as funções necessárias estão sendo extraídas.
    const { itens, limparCarrinho, atualizarQuantidade } = useContext(CartContext);
    const { adicionarPedido } = useContext(OrderContext);
    const navigate = useNavigate();

    const valorTotal = itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    
    const handleFinalizarPedido = () => {
        if (itens.length === 0) return;
        
        adicionarPedido(itens, valorTotal);
        limparCarrinho();
        
        alert('Pedido enviado para a cozinha com sucesso!');
        navigate('/cardapio');
    };

    if (itens.length === 0) {
        return (
            <div className="carrinho-vazio">
                <h1>Seu carrinho está vazio</h1>
                <p>Que tal adicionar algumas pizzas deliciosas?</p>
                <Link to="/cardapio" className="botao-cardapio">Ver Cardápio</Link>
            </div>
        );
    }

    return (
        <div className="carrinho-container">
            <h1>Meu Carrinho</h1>
            <ul className="lista-itens">
                {itens.map(item => (
                    <li key={item.id} className="item-carrinho">
                        <img src={item.imagem} alt={item.nome} className="item-imagem" />
                        <div className="item-detalhes">
                            <h2>{item.nome}</h2>
                            <div className="item-quantidade-controle">
                                <button 
                                  onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)} 
                                  className="botao-quantidade"
                                >
                                  -
                                </button>
                                <span>{item.quantidade}</span>
                                <button 
                                  onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)} 
                                  className="botao-quantidade"
                                >
                                  +
                                </button>
                            </div>
                            <p>Preço Un.: {formatarPreco(item.preco)}</p>
                        </div>
                        <div className="item-acoes">
                            <span>Subtotal: {formatarPreco(item.preco * item.quantidade)}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="carrinho-rodape">
                <h2>Total: {formatarPreco(valorTotal)}</h2>
                <div className="rodape-botoes">
                    <button onClick={limparCarrinho} className="botao-limpar">Limpar Carrinho</button>
                    <button onClick={handleFinalizarPedido} className="botao-finalizar">Finalizar Pedido</button>
                </div>
            </div>
        </div>
    );
};

export default Carrinho;