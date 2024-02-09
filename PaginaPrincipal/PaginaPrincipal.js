document.addEventListener('DOMContentLoaded', function () {
    // Este bloco de código será executado após o carregamento do DOM
    const nomeUsuario = sessionStorage.getItem('nomeUsuario');
    const elementoNomeUsuario = document.getElementById('link-usuario');
  
    if (elementoNomeUsuario) {
      elementoNomeUsuario.innerText = nomeUsuario;
    }
  });