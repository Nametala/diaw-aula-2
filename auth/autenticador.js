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

  // cookie simples, ainda legivel pelo JavaScript do navegador (document.cookie)
  res.cookie('usuario', String(encontrado.id), { httpOnly: false });
  res.json({ ok: true });
}

//logout
function logout(req, res) {
  res.clearCookie('usuario');
  res.json({ ok: true });
}

// middleware — roda ANTES das rotas protegidas
function autorizar(req, res, next) {
  const usuarioId = req.cookies.usuario;
  const encontrado = usuarios.find((u) => u.id === Number(usuarioId));

  if (encontrado) {
    req.usuario = encontrado;
    return next(); // se o cookie apontar pra um usuario valido, deixa seguir
  }

  if (req.accepts('html')) {
    return res.redirect('/'); // se o usuario tentar cair direto na home usando /hom , redireciona pro login
  }
  res.status(401).json({ erro: 'Não autorizado' }); // se nao estiver autorizado, retorna nao autorizado
}

module.exports = { login, logout, autorizar };