const containerProdutos = document.querySelector('#container-produtos');

function carregarProdutos() {
    fetch('/produtos')
        .then(res => res.json())
        .then(data => {
            containerProdutos.innerHTML = '';
            data.forEach(element => {
                containerProdutos.innerHTML += `<p>${element.descricao}</p>`;
            });
        });
}

// GET - receber produtos
const botaoCarregar = document.querySelector('#btn-carregar');

botaoCarregar.addEventListener('click', carregarProdutos);


// DELETE - deletar produtos
const botaoDeletar = document.querySelector('#btn-deletar');
const inputIdDeletar = document.querySelector('#input-idNovo');
const botaoConfirmar = document.querySelector('#confirmar');

botaoDeletar.addEventListener('click', () => {
    inputIdDeletar.style.display = 'inline-block';
    botaoConfirmar.style.display = 'inline-block';
    botaoDeletar.style.display = 'none';
});

botaoConfirmar.addEventListener('click', () => {
    const id = inputIdDeletar.value;

    fetch(`/produtos/${id}`, {
        method: 'DELETE'
    })
    .then(res => {
        if (res.ok) {
            carregarProdutos();
        }
    });
});


// POST - adicionar novo produto
const botaoAdicionar = document.querySelector('#btn-adicionar');
const inputId = document.querySelector('#input-id'); 
const inputDescricao = document.querySelector('#input-desc');
const inputPreco = document.querySelector('#input-preco');
const inputCategoria = document.querySelector('#input-cat');
const inputEstoque = document.querySelector('#input-estoque');

botaoAdicionar.addEventListener('click', () => {
    const novoProduto = {
        id: inputId.value,
        descricao: inputDescricao.value,
        preco: Number(inputPreco.value),
        categoria: inputCategoria.value,
        estoque: Number(inputEstoque.value)
    };

    fetch('/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoProduto)
    })
    .then(res => res.json())
    .then(() => carregarProdutos());
});


// PUT - alterar produto
const botaoAlterar = document.querySelector('#btn-alterar');
const inputAltId = document.querySelector('#input-alt-id'); 
const inputAltDescricao = document.querySelector('#input-alt-desc');
const inputAltPreco = document.querySelector('#input-alt-preco');
const inputAltCategoria = document.querySelector('#input-alt-cat');
const inputAltEstoque = document.querySelector('#input-alt-estoque');

botaoAlterar.addEventListener('click', () => {
    const idAlterar = inputAltId.value;

    const produtoAtualizado = {
        descricao: inputAltDescricao.value,
        preco: Number(inputAltPreco.value),
        categoria: inputAltCategoria.value,
        estoque: Number(inputAltEstoque.value)
    };

    fetch(`/produtos/${idAlterar}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoAtualizado)
    })
    .then(res => res.json())
    .then(() => carregarProdutos());
});