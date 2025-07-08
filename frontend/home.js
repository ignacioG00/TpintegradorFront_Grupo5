import { initlizeTheme } from  "./src/themeSwitch.js";

const baseUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => { 
    initlizeTheme();
});

const formCliente = document.getElementById("client-login-form");
formCliente.addEventListener("submit", event => {
    event.preventDefault();
    window.location.href = "./pages/products.html"
    sessionStorage.setItem("user", document.getElementById("client-name").value.trim());
});

const quickLoginBtn = document.getElementById("btn-quick-login");
quickLoginBtn.addEventListener("click", () => {

    document.getElementById("admin-email").value = "gonzalo@utn.com";
    document.getElementById("admin-password").value = "0h8vNufy";

});

const formAdmin = document.getElementById("admin-login-form");
formAdmin.addEventListener("submit", async event => {
   
    event.preventDefault();

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    try {

        let response = await fetch(`${baseUrl}/api/admin/login`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)

        })

        if(response.status === 404) {
            alert("Credenciales incorrectas")
        }

        if(response.status === 200) {

            let resultado = await response.json();
            sessionStorage.setItem("user", resultado.admin);
            window.location.href = `${baseUrl}/dashboard`;

        }
    
    } catch(error) {

        console.log(error);

    }
});