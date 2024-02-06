function validarLogin() {
  let x = document.getElementById("email").value;
  let y = document.getElementById("senha").value;
  var form = document.getElementById("cadastroForm");

  form.classList.remove("was-validated");
  let validacao = true;

  if (x.trim() === "" || y.trim() === ""){
    validacao = false;
  }

  if (x.indexOf("@") == -1 || x.indexOf("@") == 0 || x.indexOf(".") == -1) {
    validacao = false;
  }

  if (validacao) {
    window.location.href = "../PaginaPrincipal/PaginaPrincipal.html"
  } else {
    form.classList.add("was-validated");
  }
}