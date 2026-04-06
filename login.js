const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const rememberCheckbox = document.getElementById("rememberMe");

const btnLogin = document.getElementById("btnLogin");
const btnCadastrar = document.getElementById("btnCadastrar");

if (localStorage.getItem("rememberUser")) {
    usernameInput.value = localStorage.getItem("rememberUser");
    rememberCheckbox.checked = true;
}

btnLogin.addEventListener("click", function () {

    const user = usernameInput.value.trim();
    const pass = passwordInput.value.trim();

    if (user === "" || pass === "") {
        alert("Preencha usuário e senha.");
        return;
    }

    if (rememberCheckbox.checked) {
        localStorage.setItem("rememberUser", user);
    } else {
        localStorage.removeItem("rememberUser");
    }

    sessionStorage.setItem("loggedUser", user);

    window.location.href = "index.html";

});

btnCadastrar.addEventListener("click", function () {
    alert("Cadastro em breve!");
});