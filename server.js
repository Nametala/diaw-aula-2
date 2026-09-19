const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { login, logout, autorizar, usuario } = require('./auth/autenticador');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// login
app.post('/login', login);
app.post('/logout', logout);
app.get('/usuario', usuario);

// buscando o home que agora esta protegido
app.get('/home', autorizar, (req, res) => {
    res.sendFile(path.join(__dirname, 'privado', 'home.html'));
});


// forca a autorizacao se tentar entrar direto na api
app.use('/produtos', autorizar);


const produtos = [
    { id: 1, descricao: "Arroz parboilizado 5Kg", preco: 25.00, marca: "Tio João", categoria: "Alimentos", estoque: 50 },
    { id: 2, descricao: "Maionese 250gr", preco: 7.20, marca: "Helmans", categoria: "Alimentos", estoque: 30 },
    { id: 3, descricao: "Iogurte Natural 200ml", preco: 2.50, marca: "Itambé", categoria: "Laticínios", estoque: 40 },
    { id: 4, descricao: "Batata Maior Palha 300gr", preco: 15.20, marca: "Chipps", categoria: "Alimentos", estoque: 25 },
    { id: 5, descricao: "Nescau 400gr", preco: 8.00, marca: "Nestlé", categoria: "Alimentos", estoque: 60 }
];

// LER TODOS
app.get('/produtos', (req, res) => {
    res.json(produtos); 
});

// LER UM   
app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idEncontrado = produtos.findIndex(p => p.id === id);
    if (idEncontrado !== -1) {
        res.json(produtos[idEncontrado]);
    } else {
        res.status(404).json({ erro: 'O id não foi encontrado' });
    }
});

// DELETE
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(produto => produto.id === id);
    
    if (index !== -1) {
        produtos.splice(index, 1);
        res.json(produtos);
    } else {
        res.status(404).json({ erro: 'O id não foi encontrado' });
    }
});

// CREATE
app.post('/produtos', (req, res) => {
    const novoProduto = req.body;
    const ultimoId = produtos.length > 0 ? produtos[produtos.length - 1].id : 0;
    novoProduto.id = ultimoId + 1;
    
    produtos.push(novoProduto);
    res.status(201).json(produtos);
});

// UPDATE
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(produto => produto.id === id);

    if (index !== -1) {
        produtos[index] = { ...produtos[index], ...req.body };
        res.json(produtos);
    } else {
        res.status(404).json({ erro: 'O id não foi encontrado' });
    }
});

app.listen(3000, () => {
    console.log('Servidor ouvindo em http://localhost:3000');
});