// elementos da página
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const btnLogin = document.getElementById("btnLogin");

// evento de clique no botão de login
btnLogin.addEventListener("click", function () {

    const user = usernameInput.value.trim();
    const pass = passwordInput.value.trim();

    // validação simples
    if (user === "" || pass === "") {
        alert("Preencha usuário e senha.");
        return;
    }

    // salva usuário na sessão
    sessionStorage.setItem("loggedUser", user);

    // redireciona para o sistema
    window.location.href = "index.html";

});