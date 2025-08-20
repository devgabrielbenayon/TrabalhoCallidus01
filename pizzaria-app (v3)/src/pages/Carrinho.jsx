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
    const [incluirTaxaServico, setIncluirTaxaServico] = useState(true);

    const itensDoCarrinho = itens || [];

    const subtotal = itensDoCarrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    const taxaServico = tipoPedido === 'mesa' && incluirTaxaServico ? subtotal * 0.10 : 0;
    const taxaEntrega = tipoPedido === 'entrega' ? 12.99 : 0;
    const valorTotal = subtotal + taxaServico + taxaEntrega;
    
    const handleFinalizarPedido = () => {
        if (itensDoCarrinho.length === 0 || !nomeCliente || !detalhePedido) {
            alert('Por favor, preencha seu nome e os detalhes do pedido.');
            return;
        }
        
        const detalhesCliente = { 
            nome: nomeCliente, 
            tipo: tipoPedido, 
            detalhe: detalhePedido,
            taxaInclusa: tipoPedido === 'mesa' ? incluirTaxaServico : false
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
                setIncluirTaxaServico(true);
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

                {/* --- SEÇÃO DE RESUMO DO PEDIDO COM LAYOUT FINAL --- */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box sx={{
                        width: '100%',
                        maxWidth: '350px',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '110px'
                    }}>
                        {/* PARTE DE CIMA (variável) */}
                        <Box>
                            {/* Subtotal */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '32px' }}>
                                <Typography variant="body1" color="text.secondary">Subtotal:</Typography>
                                <Typography variant="body1" color="text.secondary">{formatarPreco(subtotal)}</Typography>
                            </Box>
                            {/* Taxa de Entrega (condicional) */}
                            {tipoPedido === 'entrega' && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '32px' }}>
                                    <Typography variant="body1" color="text.secondary">Taxa de Entrega:</Typography>
                                    <Typography variant="body1" color="text.secondary">{formatarPreco(taxaEntrega)}</Typography>
                                </Box>
                            )}
                            {/* Taxa de Serviço (condicional) */}
                            {tipoPedido === 'mesa' && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '32px' }}>
                                    {incluirTaxaServico ? (
                                        <>
                                            <Typography variant="body1" color="text.secondary">Taxa de Serviço (10%):</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography variant="body1" color="text.secondary">{formatarPreco(taxaServico)}</Typography>
                                                <IconButton size="small" onClick={() => setIncluirTaxaServico(false)} title="Remover taxa"><DeleteIcon fontSize="inherit" /></IconButton>
                                            </Box>
                                        </>
                                    ) : (
                                        <Button size="small" onClick={() => setIncluirTaxaServico(true)} sx={{ width: '100%' }}>Incluir Taxa de Serviço (10%)</Button>
                                    )}
                                </Box>
                            )}
                        </Box>

                        {/* PARTE DE BAIXO (empurrada para o final) */}
                        <Box sx={{ marginTop: 'auto', paddingTop: '8px' }}>
                            <Divider sx={{ mb: 1 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{formatarPreco(valorTotal)}</Typography>
                            </Box>
                        </Box>
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