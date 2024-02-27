

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
      input.addEventListener('input', function () {
        if (this.value.trim() !== '') {
          this.classList.remove('input-invalido');
          this.classList.add('input-valido');
        } else {
          this.classList.remove('input-valido');
          this.classList.add('input-invalido');
        }
      });
  
      const urlParams = new URLSearchParams(window.location.search);
      const itemId = urlParams.get('id');
  
      // Se você tiver o ID do item, faça uma solicitação para obter os detalhes do item
      if (itemId) {
        // Substitua 'http://localhost:8080/item/' pela URL correta do seu backend
        fetch(`http://localhost:8080/item/item/${itemId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro ao obter detalhes do item');
            }
            return response.json();
          })
          .then(data => {
            // Preencha os campos de entrada com os valores do item
            document.getElementById('nome').value = data.produto;
            document.getElementById('data').value = formatarDataParaInputDate(data.dataCompra);
            document.getElementById('valor').value = data.valor;
            if (data.quantidade === 0) {
              document.getElementById('qtde').style.display = "none";
              document.getElementById('lb-qtde').style.display = "none";
            } else {
              document.getElementById('qtde').style.display = 'block';
              document.getElementById('lb-qtde').style.display = "block";
              document.getElementById('qtde').value = data.quantidade;
            }
            document.getElementById('descricao').value = data.descricao;
          })
          .catch(error => {
            console.error('Erro ao obter detalhes do item:', error);
          });
      } else {
        console.error('ID do item não fornecido na URL');
      }
  
    });
    // Este bloco de código será executado após o carregamento do DOM
  
    const nomeUsuario = sessionStorage.getItem('nomeUsuario');
    const elementoNomeUsuario = document.getElementById('link-usuario');
    const elementoNomeUsuario2 = document.getElementById('link-usuario2');
  
  
    elementoNomeUsuario.innerText = nomeUsuario;
    elementoNomeUsuario2.innerText = nomeUsuario;
  
  
  
  
    formulario.addEventListener('submit', function (event) {
      event.preventDefault();
      validarAlteracao();
    });
  });
  
  function formatarDataParaInputDate(dataArray) {
    const [ano, mes, dia] = dataArray;
    const mesFormatado = (mes < 10 ? '0' : '') + mes; // Adiciona um zero à esquerda se o mês for menor que 10
    const diaFormatado = (dia < 10 ? '0' : '') + dia; // Adiciona um zero à esquerda se o dia for menor que 10
    return `${ano}-${mesFormatado}-${diaFormatado}`;
  }
  
  function validarAlteracao() {
    const itemId = obterItemIdDaURL(); // Obtém o ID do item da URL
    const dataCompra = document.getElementById("data").value;
    const dataCompraDate = new Date(dataCompra);
    const ano = dataCompraDate.getFullYear();
    const mes = (dataCompraDate.getMonth() + 1).toString().padStart(2, '0'); // Adiciona um zero à esquerda se for necessário
    const dia = dataCompraDate.getDate().toString().padStart(2, '0'); // Adiciona um zero à esquerda se for necessário
    const formatoData = `${ano}-${mes}-${dia}`;
    const form = document.getElementById("cadastroForm");
    const novoItem = {
      produto: document.getElementById('nome').value,
      dataCompra: formatoData,
      valor: parseFloat(document.getElementById('valor').value),
      descricao: document.getElementById('descricao').value
    }
  
    const quantidadeInput = document.getElementById('qtde');
    const quantidade = parseInt(quantidadeInput.value);
    if (quantidadeInput.style.display !== 'none') {
      novoItem.quantidade = quantidade;
    } else {
      novoItem.quantidade = 0; // Defina a quantidade como zero se o campo estiver oculto
    }

    form.classList.remove("was-validated");
  
    let validacao = true;
  
    if (novoItem.produto.trim() === "" || novoItem.dataCompra.trim() === "" || isNaN(novoItem.valor)) {
      validacao = false;
    }
  
    if (!validarCampos()) {
      validacao = false;
    }
  
    if (validacao) {
      alterarItem(itemId, novoItem);
    } else {
      form.classList.add("was-validated");
    }
  }
  
  function obterItemIdDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }
  
  
  function alterarItem(id, novoItem) {
    fetch(`http://localhost:8080/item/alterar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoItem)
    })
      .then(response => {
        if (response.ok) {
          Swal.fire({
            title: 'Alteração bem sucedida!',
            text: 'Item alterado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Avançar',
            confirmButtonColor: '#5C7243'
          }).then(() => {
            limparCampos();
            window.location.href = "../ItensCadastrados/ItensCadastrados.html";
          });
        } else {
          throw new Error('Erro ao tentar alterar o item');
        }
      })
      .catch(function (error) {
        console.error("Erro na requisição fetch:", error);
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao tentar alterar o item. Por favor, tente novamente mais tarde.',
          icon: 'error',
          confirmButtonText: 'Voltar'
        });
      });
  }
  
  
  function redirecionarCancelar() {
    window.location.href = "../ItensCadastrados/ItensCadastrados.html";
    limparCampos();
  }
  
  function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("data").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("qtde").value = "";
    document.getElementById("descricao").value = "";
  }
  
  
  function validarCampos() {
  const produto = document.getElementById("nome");
  const dataCompra = document.getElementById("data");
  const valorUnitario = document.getElementById("valor");
  const quantidade = document.getElementById("qtde");

  const camposValidos = [produto, dataCompra, valorUnitario].every(campo => campo.value.trim() !== "");

  if (!camposValidos) {
    [produto, dataCompra, valorUnitario, quantidade].forEach(campo => campo.classList.add('input-invalido'));
  } else {
    [produto, dataCompra, valorUnitario, quantidade].forEach(campo => campo.classList.remove('input-invalido'));
  }

  return camposValidos;
}
