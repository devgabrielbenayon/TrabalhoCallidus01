// src/pages/Carrinho.jsx (Versão com MUI)
import React, { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { OrderContext } from '../context/OrderContext';
import ItemCarrinho from '../components/ItemCarrinho';

// Importando componentes do MUI
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

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

    const valorTotal = itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);

    const handleFinalizarPedido = () => {
        if (itens.length === 0 || !nomeCliente || !detalhePedido) {
            alert('Por favor, preencha seu nome e os detalhes do pedido.');
            return;
        }

        const detalhesCliente = { nome: nomeCliente, tipo: tipoPedido, detalhe: detalhePedido };
        adicionarPedido(itens, valorTotal, detalhesCliente);
        limparCarrinho();
        alert('Pedido enviado para a cozinha com sucesso!');
        navigate('/cardapio');
    };

    const handleTipoPedidoChange = (event, newTipo) => {
        if (newTipo !== null) {
            setTipoPedido(newTipo);
            setDetalhePedido(''); // Limpa o detalhe ao trocar o tipo
        }
    };

    if (!itens || itens.length === 0) {
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
                    {itens.map(item => (
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5">Total: {formatarPreco(valorTotal)}</Typography>
                    <Box>
                        <Button onClick={limparCarrinho} sx={{ mr: 2 }}>Limpar Carrinho</Button>
                        <Button variant="contained" size="large" onClick={handleFinalizarPedido}>
                            Finalizar Pedido
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Carrinho;