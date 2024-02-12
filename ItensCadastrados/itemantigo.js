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
    if (window.innerWidth < 715) {
      menuToggle.style.display = "block";
      menuLateral.style.display = menuLateral.classList.contains("active") ? "block" : "none";
    } else {
      menuToggle.style.display = "none";
      menuLateral.style.display = "flex";
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Este bloco de código será executado após o carregamento do DOM
  const nomeUsuario = sessionStorage.getItem('nomeUsuario');
  const elementoNomeUsuario = document.getElementById('link-usuario');

  if (elementoNomeUsuario) {
    elementoNomeUsuario.innerText = nomeUsuario;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var botoesMaisDescricao = document.querySelectorAll('.botao-mais-descricao');
  var caixasInput = document.querySelectorAll('.caixa-input');

  botoesMaisDescricao.forEach(function (botao, index) {
    botao.addEventListener('click', function () {
      if (getComputedStyle(caixasInput[index]).display === 'none') {
        caixasInput[index].style.display = 'block';
      } else {
        caixasInput[index].style.display = 'none';
      }
    });
  });
});


 // Adiciona um evento de escuta para os campos de entrada
 document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os campos de entrada
  const inputFields = document.querySelectorAll(".form-control");

  // Adiciona um evento de escuta para cada campo de entrada
  inputFields.forEach(function (input) {
      input.addEventListener("input", function () {
          // Verifica se todos os campos estão preenchidos
          const allFilled = Array.from(inputFields).every(function (field) {
              return field.value.trim() !== ""; // Verifica se o campo não está vazio
          });

          // Se todos os campos estiverem preenchidos
          if (allFilled) {
              // Faz a solicitação AJAX para obter os novos dados do servidor
              fetchNextPageData();
          }
      });
  });
});

// Função para fazer a solicitação AJAX para obter os dados da próxima página
function fetchNextPageData() {
  // Você precisa implementar esta função para fazer a solicitação AJAX ao servidor
  // e manipular os dados retornados para atualizar a página
  // Aqui está um exemplo simplificado de como você pode fazer isso:

  // Faz a solicitação para o servidor
  fetch('URL_DO_SERVIDOR')
      .then(response => response.json())
      .then(data => {
          // Atualiza a página com os novos dados
          updatePageWithData(data);
      })
      .catch(error => {
          console.error('Erro ao obter os dados:', error);
      });
}

// Função para atualizar a página com os novos dados
function updatePageWithData(data) {
  // Aqui você pode atualizar a tabela com os novos dados retornados do servidor
  // por exemplo, preencher os campos da tabela com os novos valores

  // Você também pode adicionar lógica adicional para atualizar outros elementos da página conforme necessário
}

  // Variável para armazenar o número da página atual
  let currentPage = 1;

  

  // Função para fazer a solicitação AJAX para obter os dados da página especificada
  function fetchPageData(pageNumber) {
      // Faz a solicitação para o servidor
      fetch('URL_DO_SERVIDOR?page=' + pageNumber)
          .then(response => response.json())
          .then(data => {
              // Atualiza a página com os novos dados
              updatePageWithData(data);
          })
          .catch(error => {
              console.error('Erro ao obter os dados:', error);
          });
  }

  // Função para atualizar a página com os novos dados
  function updatePageWithData(data) {
      // Aqui você pode atualizar a tabela com os novos dados retornados do servidor
      // por exemplo, preencher os campos da tabela com os novos valores

      // Você também pode adicionar lógica adicional para atualizar outros elementos da página conforme necessário
  }
    // Variável para armazenar o número da página atual
    

    // Adiciona um evento de escuta para os botões de navegação
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("prev-page").addEventListener("click", function () {
            // Verifica se é possível retroceder uma página
            if (currentPage > 1) {
                currentPage--;
                fetchPageData(currentPage);
                updatePageNumber(currentPage);
            }
        });

        document.getElementById("next-page").addEventListener("click", function () {
            // Avança para a próxima página
            currentPage++;
            fetchPageData(currentPage);
            updatePageNumber(currentPage);
        });
    });

    // Função para fazer a solicitação AJAX para obter os dados da página especificada
    function fetchPageData(pageNumber) {
        // Faz a solicitação para o servidor
        fetch('URL_DO_SERVIDOR?page=' + pageNumber)
            .then(response => response.json())
            .then(data => {
                // Atualiza a página com os novos dados
                updatePageWithData(data);
            })
            .catch(error => {
                console.error('Erro ao obter os dados:', error);
            });
    }

    // Função para atualizar a página com os novos dados
    function updatePageWithData(data) {
        // Aqui você pode atualizar a tabela com os novos dados retornados do servidor
        // por exemplo, preencher os campos da tabela com os novos valores

        // Você também pode adicionar lógica adicional para atualizar outros elementos da página conforme necessário
    }

    // Função para atualizar o número da página no HTML
    function updatePageNumber(pageNumber) {
        // Seleciona o elemento que mostra o número da página
        const pageNumberElement = document.getElementById("page-number");

        // Atualiza o número da página exibido
        pageNumberElement.textContent = pageNumber;
    }




