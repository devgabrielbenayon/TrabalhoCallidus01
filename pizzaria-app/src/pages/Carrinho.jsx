// src/pages/Carrinho.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// A LINHA ABAIXO É A CORREÇÃO MAIS IMPORTANTE:
// Ela busca o contexto do arquivo correto na pasta 'context'.
import { CartContext } from '../context/CartContext'; 
import './Carrinho.css';

const formatarPreco = (preco) => {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// O nome do componente da página é Carrinho
const Carrinho = () => {
    const { itens, removerDoCarrinho, limparCarrinho } = useContext(CartContext);

    const valorTotal = itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);

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
                            <p>Quantidade: {item.quantidade}</p>
                            <p>Preço Un.: {formatarPreco(item.preco)}</p>
                        </div>
                        <div className="item-acoes">
                            <span>Subtotal: {formatarPreco(item.preco * item.quantidade)}</span>
                            <button onClick={() => removerDoCarrinho(item.id)} className="botao-remover">Remover</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="carrinho-rodape">
                <h2>Total: {formatarPreco(valorTotal)}</h2>
                <div className="rodape-botoes">
                    <button onClick={() => limparCarrinho()} className="botao-limpar">Limpar Carrinho</button>
                    <button onClick={() => alert('Pedido finalizado com sucesso!')} className="botao-finalizar">Finalizar Pedido</button>
                </div>
            </div>
        </div>
    );
};

export default Carrinho;