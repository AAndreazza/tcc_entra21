function validarLogin() {
  const x = document.getElementById("email").value;
  const y = document.getElementById("senha").value;
  var form = document.getElementById("cadastroForm");

  form.classList.remove("was-validated");
  let validacao = true;

  if (x.trim() === "" || y.trim() === "") {
    validacao = false;
  }

  if (x.indexOf("@") == -1 || x.indexOf("@") == 0 || x.indexOf(".") == -1) {
    validacao = false;
  }

  if (validacao) {
    fazerLogin(x, y);

  } else {
    form.classList.add("was-validated");
  }
}

function fazerLogin(email, senha) {
  // Faz uma solicitação HTTP GET para obter os dados dos usuários
  fetch('http://localhost:8080/usuario')
    .then(response => {
      if (!response.ok) {
        throw new Error('Não foi possível obter os dados dos usuários.');
      }
      return response.json(); // Converte a resposta para JSON
    })
    .then(usuarios => {
      // Verifica se algum usuário possui o email e a senha fornecidos
      const usuarioAutenticado = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);

      if (usuarioAutenticado) {
        console.log(usuarioAutenticado)
        sessionStorage.setItem('nomeUsuario', usuarioAutenticado.nome);
        sessionStorage.setItem('cpfUsuario', usuarioAutenticado.cpf);
        sessionStorage.setItem('emailUsuario', usuarioAutenticado.email);
        sessionStorage.setItem('telefoneUsuario', usuarioAutenticado.telefone);
        sessionStorage.setItem('usuarioId', String(usuarioAutenticado.usuarioId));

        Swal.fire({
          title: 'Login bem sucedido!',
          text: 'Login efetuado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Avançar'
        }).then(() => {
          window.location.href = "../PaginaPrincipal/PaginaPrincipal.html";
        });
      } else {
        Swal.fire({
          title: 'Login inválido!',
          text: 'Email ou senha incorretos...',
          icon: 'error',
          confirmButtonText: 'Voltar'
        });
      }
    })
    .catch(error => {
      console.error('Ocorreu um erro ao tentar fazer login:', error.message);
    });
}
