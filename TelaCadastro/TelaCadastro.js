document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.querySelector("#cadastroForm");
  const Inome = document.getElementById("nome");
  const Iemail = document.getElementById("email");
  const Isenha = document.getElementById("senha");
  const Icpf = document.getElementById("cpf");
  const Itel = document.getElementById("celular");
  const IdataNasc = document.getElementById("data");

  formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    validarCadastro();
  });

  const seuBotao = document.getElementById("botao");
  seuBotao.addEventListener('click', function () {
    formulario.dispatchEvent(new Event('submit'));
  });
});


function validarCadastro() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const cpf = document.getElementById("cpf").value;
  const tel = document.getElementById("celular").value;
  const senhaConfirmar = document.getElementById("confirmar-senha").value;
  const dataNasc = document.getElementById("data").value;
  const dataNasci = new Date(dataNasc);
  const dataAgora = new Date();
  const form = document.getElementById("cadastroForm");

  form.classList.remove("was-validated");
  document.getElementById("senha").classList.remove("is-invalid");
  document.getElementById("confirmar-senha").classList.remove("is-invalid");
  document.getElementById("cpf").classList.remove("is-invalid");

  let validacao = true;

  if (nome.trim() === "" || email.trim() === "" || tel.trim() === "" || cpf.trim() === "" || dataNasc.trim() === "" || senha.trim() === "" || senhaConfirmar.trim() === "") {
    validacao = false;
  }

  if (email.indexOf("@") == -1 || email.indexOf("@") == 0 || email.indexOf(".") == -1) {

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
    cadastrar(nome, email, senha, cpf, tel, dataNasc);
  } else {
    form.classList.add("was-validated");
  }
}

function cadastrar(nome, email, senha, cpf, tel, dataNasc) {

  fetch("http://localhost:8080/usuarios",
    {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        tel: tel,
        dataNasc: dataNasc

      })
    })
    .then(function (res) { console.log(res) })
    .catch(function (res) { console.log(res) })

  window.location = "../PaginaPrincipal/PaginaPrincipal.html";
};

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

