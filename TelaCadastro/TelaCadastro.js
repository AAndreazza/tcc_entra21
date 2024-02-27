document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.querySelector("#cadastroForm");

  formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    validarCadastro();
  });
});

function validarCadastro() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const cpf = document.getElementById("cpf").value;
  const tel = document.getElementById("celular").value;
  const senhaConfirmar = document.getElementById("confirmar-senha").value;
  const form = document.getElementById("cadastroForm");

  form.classList.remove("was-validated");
  document.getElementById("senha").classList.remove("is-invalid");
  document.getElementById("confirmar-senha").classList.remove("is-invalid");
  document.getElementById("cpf").classList.remove("is-invalid");

  let validacao = true;

  if (nome.trim() === "" || email.trim() === "" || tel.trim() === "" || cpf.trim() === "" || senha.trim() === "" || senhaConfirmar.trim() === "") {
    validacao = false;
  }

  if (email.indexOf("@") == -1 || email.indexOf("@") == 0 || email.indexOf(".") == -1) {
    validacao = false;
  }

  if (tel.length != 14){
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

  if (validacao) {
    cadastrar(nome, email, senha, cpf, tel);
  } else {
    informarErro();
    form.classList.add("was-validated");
  }
}

function cadastrar(nome, email, senha, cpf, tel) {
  fetch("http://localhost:8080/usuario", {
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
      telefone: tel
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

function informarErro(){
  Swal.fire({
    title: 'Cadastro inválido!',
    text: 'Informações informadas estão incorretas!',
    icon: 'error',
    confirmButtonText: 'Avançar'
})
}