const botaoLogar = document.querySelector('#btn-logar');

botaoLogar.addEventListener('click', async () => {
  const usuario = document.querySelector('#usuario').value;
  const senha = document.querySelector('#senha').value;

  // faz o fetch do login e ve se foi autorizado
  const resposta = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha }),
  });

  if (resposta.ok) {
    window.location.href = '/home'; // deixa passar se estiver autorizado
  } else {
    alert('Usuário ou senha inválidos'); // se nao estiver autorizado, volta pro login
  }
});