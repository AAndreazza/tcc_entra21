document.addEventListener('DOMContentLoaded', function () {
  // Este bloco de código será executado após o carregamento do DOM
  const nomeUsuario = sessionStorage.getItem('nomeUsuario');
  const cpfUsuario = sessionStorage.getItem('cpfUsuario');
  const emailUsuario = sessionStorage.getItem('emailUsuario');
  const telefoneUsuario = sessionStorage.getItem('telefoneUsuario');
  const elementoNomeUsuario = document.getElementById('nome-usuario');
  const elementoCpfUsuario = document.getElementById('cpf-usuario');
  const elementoEmailUsuario = document.getElementById('email-usuario');
  const elementoTelefoneUsuario = document.getElementById('telefone-usuario');

  if (elementoNomeUsuario && elementoCpfUsuario && elementoEmailUsuario && elementoTelefoneUsuario) {
    elementoNomeUsuario.innerText = nomeUsuario;
    elementoCpfUsuario.value = cpfUsuario;
    elementoEmailUsuario.value = emailUsuario;
    elementoTelefoneUsuario.value = telefoneUsuario;
  }
});

function Sair() {
  window.location.href = "../PaginaInicial/PaginaInicial.html";
}