// Função para verificar e ocultar o menu lateral em telas menores
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

// Chama a função quando a página é carregada e quando a janela é redimensionada
window.onload = hideMenuOnSmallScreens;
window.onresize = hideMenuOnSmallScreens;

function stopPropagation(event) {
    event.stopPropagation();
}