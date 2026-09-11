const usuarios = require('./usuarios'); // importa a o array

// envia as informacoes do login
function login(req, res) {
  const { usuario, senha } = req.body;

  const encontrado = usuarios.find(
  (u) => u.usuario === usuario && u.senha === Number(senha)
); // verifica se esta correto


  if (!encontrado) {
    // mesma mensagem se o usuário não existe OU se a senha está errada
    return res.status(401).json({ erro: 'Usuário ou senha inválidos' });
  }

  // retorna verdadeiro se tiver sido encontrado
  req.session.usuario = encontrado.usuario;
  res.json({ ok: true });
}

//logout
function logout(req, res) {                    
  req.session.destroy(() => {                  
    res.json({ ok: true });                    
  });                                          
}  

// middleware — roda ANTES das rotas protegidas
function autorizar(req, res, next) {
  if (req.session && req.session.usuario) {
    return next(); // se houver sessao, o middleware deixa seguir
  }

  if (req.accepts('html')) {
    return res.redirect('/'); // se o usuario tentar cair direto na home usando /hom , redireciona pro login
  }
  res.status(401).json({ erro: 'Não autorizado' }); // se nao estiver autorizado, retorna nao autorizado
}

module.exports = { login, logout, autorizar };