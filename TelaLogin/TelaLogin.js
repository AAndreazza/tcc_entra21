function validateForm() {
  let x = document.getElementById("email").value;
  let y = document.getElementById("senha").value;


  if (x.indexOf("@") == -1 || x.indexOf("@") == 0 || x.indexOf(".") == -1) {

    alert("O texto digitado condiz com um email...");
    return;

  }

  /* ALTERAR WINDOW LOCATION */
  window.location = ""

  alert("Login efetuado com sucesso!");
}
