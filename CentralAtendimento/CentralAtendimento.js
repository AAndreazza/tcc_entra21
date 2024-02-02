function Cancelar() {
  window.location = "../PaginaPrincipal/PaginaPrincipal.htm";
}

function validarEnvio() {
  let x = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;
  let senhaConfirmar = document.getElementById("confirmar-senha").value;
  var dataNasc = document.getElementById("data").value;
  var dataNasci = new Date(dataNasc);
  var dataAgora = new Date();

  if (x.indexOf("@") == -1 || x.indexOf("@") == 0 || x.indexOf(".") == -1) {
    alert("O texto digitado não condiz com um email...");
    return;
  }

  if (senha !== senhaConfirmar) {
    alert("As senhas não coincidem...")
    return;
  }

  if (dataNasci > dataAgora) {
    alert("Data informada inválida.");
    return;
  }

  alert("Cadastro efetuado com sucesso!");
}