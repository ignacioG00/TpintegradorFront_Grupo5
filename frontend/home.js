import { initlizeTheme } from  "./src/themeSwitch.js";

document.addEventListener("DOMContentLoaded", () => { 
    initlizeTheme();
});

const formCliente = document.getElementById("client-login-form");
formCliente.addEventListener("submit", event => {
    event.preventDefault();
    window.location.href = "./pages/products.html"
    sessionStorage.setItem("user", document.getElementById("client-name").value.trim());
});

const formAdmin = document.getElementById("admin-login-form");
formAdmin.addEventListener("submit", async event => {
   
    event.preventDefault();

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    try {

        let response = await fetch("http://localhost:3000/admin/login", {

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
            window.location.href = "./pages/dashboard.html"

        }
    
    } catch(error) {

        console.log(error);

    }
});