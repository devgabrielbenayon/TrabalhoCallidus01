// src/pages/Carrinho.jsx
import React, { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { OrderContext } from '../context/OrderContext';
import ItemCarrinho from '../components/ItemCarrinho';

import { Container, Typography, Box, List, Divider, TextField, ToggleButton, ToggleButtonGroup, Button, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const formatarPreco = (preco) => {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const Carrinho = () => {
    const { itens, limparCarrinho } = useContext(CartContext);
    const { adicionarPedido } = useContext(OrderContext);
    const navigate = useNavigate();

    const [tipoPedido, setTipoPedido] = useState('entrega');
    const [nomeCliente, setNomeCliente] = useState('');
    const [detalhePedido, setDetalhePedido] = useState('');
    const [incluirTaxa, setIncluirTaxa] = useState(true);

    const itensDoCarrinho = itens || [];

    const subtotal = itensDoCarrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    const taxaServico = tipoPedido === 'mesa' && incluirTaxa ? subtotal * 0.10 : 0;
    const valorTotal = subtotal + taxaServico;
    
    const handleFinalizarPedido = () => {
        if (itensDoCarrinho.length === 0 || !nomeCliente || !detalhePedido) {
            alert('Por favor, preencha seu nome e os detalhes do pedido.');
            return;
        }
        
        const detalhesCliente = { 
            nome: nomeCliente, 
            tipo: tipoPedido, 
            detalhe: detalhePedido,
            taxaInclusa: incluirTaxa 
        };
        adicionarPedido(itensDoCarrinho, valorTotal, detalhesCliente);
        limparCarrinho();
        alert('Pedido enviado para a cozinha com sucesso!');
        navigate('/cardapio');
    };

    const handleTipoPedidoChange = (event, newTipo) => {
        if (newTipo !== null) {
            setTipoPedido(newTipo);
            setDetalhePedido('');
            if (newTipo === 'mesa') {
                setIncluirTaxa(true);
            }
        }
    };

    if (itensDoCarrinho.length === 0) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="h4" gutterBottom>Seu carrinho está vazio</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Que tal adicionar algumas pizzas deliciosas?
                </Typography>
                <Button component={RouterLink} to="/cardapio" variant="contained" size="large">
                    Ver Cardápio
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>Meu Carrinho</Typography>
                <List>
                    {itensDoCarrinho.map(item => (
                        <ItemCarrinho key={item.idUnicoCarrinho} item={item} />
                    ))}
                </List>
                <Divider sx={{ my: 3 }} />

                <Box component="form" noValidate autoComplete="off">
                    <Typography variant="h5" gutterBottom>Detalhes do Pedido</Typography>
                    <TextField 
                        label="Seu Nome" 
                        fullWidth 
                        margin="normal" 
                        value={nomeCliente} 
                        onChange={(e) => setNomeCliente(e.target.value)} 
                    />
                    <ToggleButtonGroup 
                        value={tipoPedido} 
                        exclusive 
                        onChange={handleTipoPedidoChange} 
                        fullWidth 
                        sx={{ mb: 2 }}
                    >
                        <ToggleButton value="entrega">Para Entrega</ToggleButton>
                        <ToggleButton value="mesa">Na Mesa</ToggleButton>
                    </ToggleButtonGroup>
                    <TextField 
                        label={tipoPedido === 'entrega' ? 'Endereço de Entrega' : 'Número da Mesa'} 
                        fullWidth 
                        margin="normal" 
                        value={detalhePedido} 
                        onChange={(e) => setDetalhePedido(e.target.value)} 
                    />
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* --- SEÇÃO DE RESUMO DO PEDIDO COM LAYOUT CORRIGIDO USANDO GRID --- */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box sx={{
                        display: 'grid',
                        // Define 3 colunas: 1. Label (flexível), 2. Preço (auto), 3. Ícone (auto)
                        gridTemplateColumns: '1fr auto auto',
                        alignItems: 'center',
                        gap: '8px 16px', // 8px de espaço vertical, 16px horizontal
                        width: '100%',
                        maxWidth: '350px',
                    }}>
                        {/* Linha do Subtotal */}
                        <Typography variant="body1" color="text.secondary" sx={{ gridColumn: '1 / 2' }}>Subtotal:</Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ gridColumn: '2 / 3', textAlign: 'right' }}>{formatarPreco(subtotal)}</Typography>
                        {/* Célula vazia na 3ª coluna para manter o alinhamento */}
                        <Box sx={{ gridColumn: '3 / 4' }} />

                        {/* Linha da Taxa de Serviço (condicional) */}
                        {tipoPedido === 'mesa' && (
                            incluirTaxa ? (
                                <>
                                    <Typography variant="body1" color="text.secondary" sx={{ gridColumn: '1 / 2' }}>Taxa de Serviço (10%):</Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ gridColumn: '2 / 3', textAlign: 'right' }}>{formatarPreco(taxaServico)}</Typography>
                                    <IconButton size="small" onClick={() => setIncluirTaxa(false)} title="Remover taxa" sx={{ gridColumn: '3 / 4' }}>
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </>
                            ) : (
                                // Ocupa todas as 3 colunas quando a taxa é removida
                                <Button size="small" onClick={() => setIncluirTaxa(true)} sx={{ gridColumn: '1 / -1' }}>Incluir Taxa de Serviço (10%)</Button>
                            )
                        )}

                        {/* Linha do Total */}
                        <Divider sx={{ gridColumn: '1 / -1', my: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', gridColumn: '1 / 2' }}>Total:</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', gridColumn: '2 / 3', textAlign: 'right' }}>{formatarPreco(valorTotal)}</Typography>
                         {/* Célula vazia na 3ª coluna para manter o alinhamento */}
                        <Box sx={{ gridColumn: '3 / 4' }} />
                    </Box>
                </Box>
                {/* --- FIM DA SEÇÃO DE RESUMO --- */}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                    <Button onClick={limparCarrinho}>Limpar Carrinho</Button>
                    <Button variant="contained" size="large" onClick={handleFinalizarPedido}>
                        Finalizar Pedido
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Carrinho;