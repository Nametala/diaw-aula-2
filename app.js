const express = require ('express');
const app = express()

const produtos =  [
        { id: 1, descricao: "Arroz parboilizado 5Kg", preco: 25.00, marca: "Tio João" },
        { id: 2, descricao: "Maionese 250gr", preco: 7.20, marca: "Helmans" },
        { id: 3, descricao: "Iogurte Natural 200ml", preco: 2.50, marca: "Itambé" },
        { id: 4, descricao: "Batata Maior Palha 300gr", preco: 15.20, marca: "Chipps" },
        { id: 5, descricao: "Nescau 400gr", preco: 8.00, marca: "Nestlé" }
    ]


app.get('/produtos', (req, res) => {
    
    res.json (produtos) 
});

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt (req.params.id); // recebe o id 
    console.log(`excluir ${id}`) 
    
    const index = produtos.findIndex (produto => produto.id === id) // acha o index do produto que tem o id  recebido
    if (index != -1) {
        produtos.splice (index, 1) // apaga a partir do indice
    } else {
        res.status(404).json({ erro: 'O id não foi encontrado'})

    }

    res.json (produtos) 
});

app.listen(3000, (e) => {
    console.log('Servidor ouvindo em http://localhost:3000')
});