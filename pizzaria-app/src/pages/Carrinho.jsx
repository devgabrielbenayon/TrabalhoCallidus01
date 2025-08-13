// src/pages/Carrinho.jsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { OrderContext } from '../context/OrderContext';
import ItemCarrinho from '../components/ItemCarrinho';
import './Carrinho.css';

const formatarPreco = (preco) => {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const Carrinho = () => {
    const { itens, limparCarrinho } = useContext(CartContext);
    const { adicionarPedido } = useContext(OrderContext);
    const navigate = useNavigate();

    // Estados para o formulário
    const [tipoPedido, setTipoPedido] = useState('entrega');
    const [nomeCliente, setNomeCliente] = useState('');
    const [detalhePedido, setDetalhePedido] = useState('');

    const itensDoCarrinho = itens || [];
    const valorTotal = itensDoCarrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    
    // Esta função usa 'adicionarPedido', 'limparCarrinho' e 'navigate'
    const handleFinalizarPedido = () => {
        if (itensDoCarrinho.length === 0 || !nomeCliente || !detalhePedido) {
            alert('Por favor, preencha seu nome e os detalhes do pedido.');
            return;
        }
        
        const detalhesCliente = {
            nome: nomeCliente,
            tipo: tipoPedido,
            detalhe: detalhePedido
        };

        adicionarPedido(itensDoCarrinho, valorTotal, detalhesCliente);
        limparCarrinho();
        
        alert('Pedido enviado para a cozinha com sucesso!');
        navigate('/cardapio');
    };

    if (itensDoCarrinho.length === 0) {
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
                {itensDoCarrinho.map(item => (
                    <ItemCarrinho key={item.idUnicoCarrinho} item={item} />
                ))}
            </ul>
            
            {/* O FORMULÁRIO QUE USA AS FUNÇÕES 'set' */}
            <div className="detalhes-pedido-form">
                <h2>Detalhes do Pedido</h2>
                <div className="form-group">
                    <label htmlFor="nome">Seu Nome</label>
                    <input type="text" id="nome" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} placeholder="Digite seu nome" />
                </div>
                <div className="tipo-pedido-seletor">
                    <button className={tipoPedido === 'entrega' ? 'ativo' : ''} onClick={() => setTipoPedido('entrega')}>Para Entrega</button>
                    <button className={tipoPedido === 'mesa' ? 'ativo' : ''} onClick={() => setTipoPedido('mesa')}>Na Mesa</button>
                </div>
                {tipoPedido === 'entrega' ? (
                    <div className="form-group">
                        <label htmlFor="endereco">Endereço de Entrega</label>
                        <input type="text" id="endereco" value={detalhePedido} onChange={(e) => setDetalhePedido(e.target.value)} placeholder="Rua, Número, Bairro" />
                    </div>
                ) : (
                    <div className="form-group">
                        <label htmlFor="mesa">Número da Mesa</label>
                        <input type="text" id="mesa" value={detalhePedido} onChange={(e) => setDetalhePedido(e.target.value)} placeholder="Ex: 5" />
                    </div>
                )}
            </div>

            {/* O RODAPÉ QUE USA A FUNÇÃO 'handleFinalizarPedido' */}
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