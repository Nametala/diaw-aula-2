const jwt = require('jsonwebtoken');
const usuarios = require('./usuarios'); // importa a o array

// numa aplicacao real essa chave nao deveria ficar direto no codigo
const JWT_SECRET = 'ninguemVaiSaber';

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

  const token = jwt.sign(
    { id: encontrado.id, usuario: encontrado.usuario },
    JWT_SECRET,
    { expiresIn: '30m' }
  );

  // httpOnly: JS do navegador nao le o cookie
  // sameSite strict: protege contra CSRF, o cookie so vai em requisicoes do proprio site
  // secure: false pq o teste local e via http; em producao com https deve ser true
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    maxAge: 30 * 60 * 1000,
  });
  res.json({ ok: true });
}

//logout
function logout(req, res) {
  res.clearCookie('token');
  res.json({ ok: true });
}

// valida o JWT do cookie e devolve o payload, ou undefined se invalido/expirado/ausente
function usuarioDoToken(req) {
  const token = req.cookies.token;
  if (!token) return undefined;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (erro) {
    return undefined;
  }
}

// middleware — roda ANTES das rotas protegidas
function autorizar(req, res, next) {
  const dados = usuarioDoToken(req);

  if (dados) {
    req.usuario = dados;
    return next(); // token valido, deixa seguir
  }

  if (req.accepts('html')) {
    return res.redirect('/'); // se o usuario tentar cair direto na home usando /hom , redireciona pro login
  }
  res.status(401).json({ erro: 'Não autorizado' }); // se nao estiver autorizado, retorna nao autorizado
}

// GET /usuario — front pergunta ao servidor quem esta logado
function usuario(req, res) {
  const dados = usuarioDoToken(req);

  if (!dados) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
  res.json({ id: dados.id, usuario: dados.usuario });
}

module.exports = { login, logout, autorizar, usuario };
