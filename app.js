const express = require ('express');
const app = express()
app.use(express.json());


const produtos = [
    { id: 1, descricao: "Arroz parboilizado 5Kg", preco: 25.00, marca: "Tio João", categoria: "Alimentos", estoque: 50 },
    { id: 2, descricao: "Maionese 250gr", preco: 7.20, marca: "Helmans", categoria: "Alimentos", estoque: 30 },
    { id: 3, descricao: "Iogurte Natural 200ml", preco: 2.50, marca: "Itambé", categoria: "Laticínios", estoque: 40 },
    { id: 4, descricao: "Batata Maior Palha 300gr", preco: 15.20, marca: "Chipps", categoria: "Alimentos", estoque: 25 },
    { id: 5, descricao: "Nescau 400gr", preco: 8.00, marca: "Nestlé", categoria: "Alimentos", estoque: 60 }
]


app.get('/produtos', (req, res) => {
    
    res.json (produtos) 
});

app.get('/produtos/:id', (req, res) => {
    
    const id = parseInt (req.params.id);
    idEncontrado = produtos.findIndex(produtos => produtos.id === id ) ;
    if (idEncontrado >=0 ) {
        res.json (produtos.id.idEncontrado) ;
    } else {
        res.status(404).json({ erro: 'O id não foi encontrado'})
    }
});

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt (req.params.id); // recebe o id 
    console.log(`excluir ${id}`) 
    
    const index = produtos.findIndex (produto => produto.id === id) // acha o index do produto que tem o id  recebido
    if (index != -1) {
        produtos.splice (index, 1) // apaga a partir do indice
    } else {
        res.status(404).json({ erro: 'O id não foi encontrado'}) ////u7t7o78

    }

    res.json (produtos) 
});

app.post('/produtos', (req, res) => {
    

    const novoProduto = req.body; // recebe o corpo da requisicao
    novoProduto.id = produtos[produto.legth - 1].id + 1;
    produtos.push(novoProduto); // da o post
    res.status(201).json(produtos);

    
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id); // recebe o id
    console.log(`atualizar ${id}`);

    const index = produtos.findIndex(produto => produto.id === id); // acha o index do produto que tem o id recebido
    if (index !== -1) {
        produtos[index] = { ...produtos[index], ...req.body }; // ...produtos[index] isso copia tudo que ta dentro desse produto e depois o ...req.body cola todas essas informações no elemento novo
    } else {
        res.status(404).json({ erro: 'O id não foi encontrado' });
    }

    res.json(produtos);
});
})

app.listen(3000, (e) => {
    console.log('Servidor ouvindo em http://localhost:3000')
});