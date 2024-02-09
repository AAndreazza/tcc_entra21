document.addEventListener('DOMContentLoaded', function () {
  // Este bloco de código será executado após o carregamento do DOM
  const nomeUsuario = sessionStorage.getItem('nomeUsuario');
  const elementoNomeUsuario = document.getElementById('link-usuario');

  if (elementoNomeUsuario) {
    elementoNomeUsuario.innerText = nomeUsuario;
  }

  const formulario = document.querySelector("#cadastroForm");

  formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    validarCadastro();
  });
});


function validarCadastro() {
  const produto = document.getElementById("nome").value;
  const dataCompra = document.getElementById("data").value;
  const dataCompraDate = new Date(dataCompra);
  const valorUnitario = document.getElementById("valor").value;
  const quantidade = document.getElementById("qtde").value;
  const descricao = document.getElementById("descricao").value;
  const form = document.getElementById("cadastroForm");

  form.classList.remove("was-validated");

  const usuarioId = sessionStorage.getItem('usuarioId');

  let validacao = true;

  if (produto.trim() === "" || dataCompraDate.trim() === "" || valorUnitario.trim() === "" || quantidade.trim() === "") {
    validacao = false;
  }

  if (validacao) {

    console.log(dataCompraDate)
    cadastrar(produto, dataCompraDate, valorUnitario, quantidade, descricao, usuarioId)
    
  } else {
    form.classList.add("was-validated");
  }
}

function cadastrar(produto, dataCompraDate, valorUnitario, quantidade, descricao, usuarioId) {
  fetch("http://localhost:8080/item", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      produto: produto,
      data_compra: dataCompraDate,
      valor: valorUnitario,
      descricao: descricao,
      usuario_id: usuarioId,
      sg_setor: '07'
    })
  })
    .then(function (res) {
      if (res.ok) {
        Swal.fire({
          title: 'Cadastro bem sucedido!',
          text: 'Usuario cadastrado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Avançar'
        }).then(() => {
          window.location.href = "../TelaLogin/TelaLogin.html";
        });

      } else if (res.status === 409) {
        return res.text().then(function (message) {
          Swal.fire({
            title: 'Cadastro inválido!',
            text: message,
            icon: 'error', // Ícone do alerta (success, error, warning, info, question)
            confirmButtonText: 'Voltar'
          });
        });
      } else {
        // Outro erro no servidor
        console.error("Erro na requisição fetch:", res.statusText);
        Swal.fire({
          title: 'Cadastro inválido!',
          text: 'Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.',
          icon: 'error', // Ícone do alerta (success, error, warning, info, question)
          confirmButtonText: 'Voltar'
        });
      }
    })
    .catch(function (error) {
      console.error("Erro na requisição fetch:", error);
      alert("Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.");
    });
}


