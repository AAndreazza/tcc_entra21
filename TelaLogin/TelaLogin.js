function validateForm() {
    let x = document.getElementById("email").value;
    let y = document.getElementById("senha").value;

    
    if (x.indexOf("@") == -1 || x.indexOf("@") == 0 || x.indexOf(".") == -1) {

      alert("Não condiz com um email");
      return;

    }

    if((x !== "admin@gmail.com") || (y !== "Senha123")){
        alert("Email ou Senha inválidos.");
        return;
    }
    window.location = "MenuPrincipal.html"

    alert("Login efetuado com sucesso");
   
    
  } 
 