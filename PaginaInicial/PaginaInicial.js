function Cadastro() {
    window.location = "../TelaCadastro/TelaCadastro.html";
}

function Entrar() {
    window.location = "../TelaLogin/TelaLogin.html";
}

function validarCadastro() {
    let x = document.getElementById("input-email").value;

    if (x.indexOf("@") == -1 || x.indexOf("@") == 0 || x.indexOf(".") == -1) {
        alert("O texto digitado não condiz com um email...");
        return;
    }

    alert("Inscrição realizada com sucesso!");
}