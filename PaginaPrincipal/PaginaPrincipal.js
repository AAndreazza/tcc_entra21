document.addEventListener('DOMContentLoaded', function () {
  // Este bloco de código será executado após o carregamento do DOM
  const nomeUsuario = sessionStorage.getItem('nomeUsuario');
  const elementoNomeUsuario = document.getElementById('link-usuario');
    const elementoNomeUsuario2 = document.getElementById('link-usuario2');

  if (elementoNomeUsuario) {
    elementoNomeUsuario.innerText = nomeUsuario;
    elementoNomeUsuario2.innerText = nomeUsuario;
  }
});

function hideMenuOnSmallScreens() {
  var screenWidth = window.innerWidth;
  var menuLateral = document.getElementById('menuLateral');
  var menuSUPERIOR = document.getElementById('menuSUPERIOR');

  if (screenWidth <= 460) { // Se a largura da tela for 460 pixels ou menos
    menuLateral.style.display = 'none'; // Oculta o menu lateral
    menuSUPERIOR.style.display = 'block';

  } else {
    menuLateral.style.display = 'block'; // Exibe o menu lateral
    menuSUPERIOR.style.display = 'none';
  }
}

window.onload = hideMenuOnSmallScreens;
window.onresize = hideMenuOnSmallScreens;

function stopPropagation(event) {
  event.stopPropagation();
}