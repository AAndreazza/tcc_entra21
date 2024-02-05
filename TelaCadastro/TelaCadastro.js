function validarCadastro() {
  let nome = document.getElementById("nome").value;
  let x = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;
  let cpf = document.getElementById("cpf").value;
  let tel = document.getElementById("celular").value;
  let senhaConfirmar = document.getElementById("confirmar-senha").value;
  var dataNasc = document.getElementById("data").value;
  var dataNasci = new Date(dataNasc);
  var dataAgora = new Date();
  var form = document.getElementById("cadastroForm");

  form.classList.remove("was-validated");
  document.getElementById("senha").classList.remove("is-invalid");
  document.getElementById("confirmar-senha").classList.remove("is-invalid");
  document.getElementById("cpf").classList.remove("is-invalid");

  let validacao = true;

  if (nome.trim() === "" || x.trim() === "" || tel.trim() === "" || cpf.trim() === "" || dataNasc.trim() === "" || senha.trim() === "" || senhaConfirmar.trim() === "") {
    validacao = false;
  }

  if (x.indexOf("@") == -1 || x.indexOf("@") == 0 || x.indexOf(".") == -1) {

    validacao = false;
  }

  if (senha !== senhaConfirmar) {

    document.getElementById("senha").classList.add("is-invalid");
    document.getElementById("senha-feedback").innerText = "As senhas não coincidem.";
    document.getElementById("confirmar-senha").classList.add("is-invalid");
    document.getElementById("confirmar-senha-feedback").innerText = "As senhas não coincidem.";
    validacao = false;
  }

  if (!validarCPF(cpf)) {
    document.getElementById("cpf").classList.add("is-invalid");
    document.getElementById("cpf-feedback").innerText = "CPF informado invalido.";
    validacao = false;
  }

  if (dataNasci > dataAgora) {

    validacao = false;
  }

  if (validacao) {
    window.location.href = "../PaginaInicial/PaginaInicial.html";
  } else {
    form.classList.add("was-validated");
  }

}

function validarCPF(cpf) {
  const cpfNumeros = cpf.replace(/\D/g, '');

  if (cpfNumeros.length !== 11 || cpfNumeros === "00000000000") {
    return false;
  }

  let soma = 0;
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpfNumeros.charAt(i - 1)) * (11 - i);
  }

  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpfNumeros.charAt(9))) {
    return false;
  }

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpfNumeros.charAt(i - 1)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  return resto === parseInt(cpfNumeros.charAt(10));
}

function formatarTelefone(input) {
  let numero = input.value.replace(/\D/g, '');

  if (numero.length > 2) {
    numero = `(${numero.substring(0, 2)})${numero.substring(2)}`;
  }

  if (numero.length > 9) {
    numero = `${numero.substring(0, 9)}-${numero.substring(9)}`;
  }

  input.value = numero;
}

function formatarCpf(input) {
  let numero = input.value.replace(/\D/g, '');

  if (numero.length > 3) {
    numero = `${numero.substring(0, 3)}.${numero.substring(3)}`;
  }

  if (numero.length > 7) {
    numero = `${numero.substring(0, 7)}.${numero.substring(7)}`;
  }

  if (numero.length > 11) {
    numero = `${numero.substring(0, 11)}-${numero.substring(11)}`;
  }

  input.value = numero;
}


