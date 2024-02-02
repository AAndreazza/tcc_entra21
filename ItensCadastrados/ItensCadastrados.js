function Cancelar() {
    window.location = "../PaginaPrincipal/PaginaPrincipal.htm";
}

function Cadastrar() {
  window.location = "../CadastroItens/CadastroItens.htm";
}

document.addEventListener("DOMContentLoaded", function () {
    var menuToggle = document.querySelector(".menu-toggle");
    var menuLateral = document.getElementById("menuLateral");
  
    menuToggle.addEventListener("click", function () {
      menuLateral.classList.toggle("active");
    });
  
    // Verifica o tamanho da tela ao carregar a página e define a visibilidade inicial
    checkWindowSize();
    
    // Atualiza a visibilidade do menu lateral quando a tela é redimensionada
    window.addEventListener("resize", function () {
      checkWindowSize();
    });
  
    function checkWindowSize() {
      if (window.innerWidth <= 690) {
        menuToggle.style.display = "block";
        menuLateral.style.display = menuLateral.classList.contains("active") ? "block" : "none";
      } else {
        menuToggle.style.display = "none";
        menuLateral.style.display = "flex";
      }
    }
  });