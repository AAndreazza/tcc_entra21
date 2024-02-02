function validarCadastro() {
  let x = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;
  let senhaConfirmar = document.getElementById("confirmar-senha").value;
  var dataNasc = document.getElementById("data").value;
  var dataNasci = new Date(dataNasc);
  var dataAgora = new Date();

  if (x.indexOf("@") == -1 || x.indexOf("@") == 0 || x.indexOf(".") == -1) {
    
    return;
  }

  if (senha !== senhaConfirmar) {
    
    return;
  }

  if (dataNasci > dataAgora) {
    
    return;
  }

  window.location="../PaginaInicial/PaginaInicial.html";
}

function validarTelefone(input) {
  let numero = input.value.replace(/\D/g, '');

  if (numero.length > 2) {
    numero = `(${numero.substring(0, 2)})${numero.substring(2)}`;
  }

  if (numero.length > 9) {
    numero = `${numero.substring(0, 9)}-${numero.substring(9)}`;
  }

  input.value = numero;
}

function validarCpf(input) {
  let numero = input.value.replace(/\D/g, '');

  if (numero.length > 3) {
    numero = `${numero.substring(0,3)}.${numero.substring(3)}`;
  }

  if (numero.length > 7) {
    numero = `${numero.substring(0,7)}.${numero.substring(7)}`;
  }

  if (numero.length > 11) {
    numero = `${numero.substring(0,11)}-${numero.substring(11)}`;
  }

  input.value = numero;
}
