
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

document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.querySelector("#cadastroForm");

  formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    validarCampos();
  });

  // Adicionando a validação em tempo real
  formulario.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
      if (this.value.trim() !== '') {
        this.classList.remove('input-invalido');
        this.classList.add('input-valido');
      } else {
        this.classList.remove('input-valido');
        this.classList.add('input-invalido');
      }
    });
  });
  // Este bloco de código será executado após o carregamento do DOM

  const nomeUsuario = sessionStorage.getItem('nomeUsuario');
  const elementoNomeUsuario = document.getElementById('link-usuario');
  const elementoNomeUsuario2 = document.getElementById('link-usuario2');

  
    elementoNomeUsuario.innerText = nomeUsuario;
    elementoNomeUsuario2.innerText = nomeUsuario;
  

 

  formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    validarCadastro();
  });
});

function validarCadastro() {
  const produto = document.getElementById("nome").value;
  const dataCompra = document.getElementById("data").value;
  const dataCompraDate = new Date(dataCompra);
  const ano = dataCompraDate.getFullYear();
  const mes = (dataCompraDate.getMonth() + 1).toString().padStart(2, '0'); // Adiciona um zero à esquerda se for necessário
  const dia = dataCompraDate.getDate().toString().padStart(2, '0'); // Adiciona um zero à esquerda se for necessário
  const formatoData = `${ano}-${mes}-${dia}`;
  const valor = document.getElementById("valor").value;
  const descricao = document.getElementById("descricao").value;
  const form = document.getElementById("cadastroForm");
  const usuarioId = sessionStorage.getItem('usuarioId');

  form.classList.remove("was-validated");

  let validacao = true;

  if (produto.trim() === "" || formatoData.trim() === "" || valor === "") {
    validacao = false;
 
  }

  if(!validarCampos()){
    validacao = false;
  }

  if (validacao) {

    cadastrar(produto, formatoData, valor,descricao, usuarioId)
    
  } else {
    form.classList.add("was-validated");
  }
}

function cadastrar(produto, formatoData, valor, descricao, usuarioId) {
  fetch("http://localhost:8080/item", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      produto: produto,
      dataCompra: formatoData,
      valor: valor,
      descricao: descricao,
      usuarioId: usuarioId,
      sgSetor: 16
    })
  })
    .then(function (res) {
      if (res.ok) {
        Swal.fire({
          title: 'Cadastro bem sucedido!',
          text: 'Item cadastrado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Avançar',
          confirmButtonColor: '#5C7243'
        }).then(() => {
          limparCampos();
          window.location.href = "../ItensCadastrados/ItensCadastrados.html";
        });

      } else if (res.status === 500) {
        return res.text().then(function (message) {
          Swal.fire({
            title: 'Cadastro inválido!',
            text: 'Cadastro do item nao foi efetuado!',
            icon: 'error', // Ícone do alerta (success, error, warning, info, question)
            confirmButtonText: 'Voltar'
          });
        });
      } else {
        // Outro erro no servidor
        console.error("Erro na requisição fetch:", res.statusText);
        Swal.fire({
          title: 'Cadastro inválido!',
          text: 'Erro ao cadastrar esse item. Por favor, tente novamente mais tarde.',
          icon: 'error', // Ícone do alerta (success, error, warning, info, question)
          confirmButtonText: 'Voltar'
        });
      }
    })
    .catch(function (error) {
      console.error("Erro na requisição fetch:", error);
    });
}

function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("data").value = "";
  document.getElementById("valor").value = "";
    document.getElementById("descricao").value = "";
}


function validarCampos() {
  const produto = document.getElementById("nome");
  const dataCompra = document.getElementById("data");
  const valor = document.getElementById("valor");
 
       

  if (produto.value.trim() === "" || dataCompra.value.trim() === "" || valor.value === "") {
    produto.classList.add('input-invalido');
    dataCompra.classList.add('input-invalido');
    valor.classList.add('input-invalido');
    return false;
  } else {
    produto.classList.remove('input-invalido');
    dataCompra.classList.remove('input-invalido');
    valor.classList.remove('input-invalido');
    return true;
  }
}