import { initlizeTheme } from "../src/themeSwitch.js";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let totalTicket;

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
  configurarBotones();
  initlizeTheme();
});

function renderizarCarrito() {
  const lista = document.getElementById("carrito-lista");
  lista.innerHTML = "";
  let total = 0;

  if(!carrito.length) {

    document.querySelector(".carrito-scroll").innerHTML = `Su carrito está vacío`;

  } else {

      carrito.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "carrito-item";
      li.innerHTML = `
        <img src="${item.image}" alt="${item.desc_text}" class="carrito-img">
        <div class="carrito-detalles">
          <p><strong>${item.product_type}</strong> ${item.desc_text}</p>
          <p>Precio: $${item.price.toFixed(2)}</p>
          <p>Cantidad: ${item.quantity}</p>
          <div class="carrito-acciones">
            <button onclick="modificar(${index}, 'sumar')">+</button>
            <button onclick="modificar(${index}, 'restar')">-</button>
            <button onclick="eliminar(${index})">🗑️</button>
          </div>
        </div>
      `;
      lista.appendChild(li);
      total += item.price * item.quantity;
    });

    document.getElementById("total-carrito").textContent = `$${total.toFixed(2)}`;
    totalTicket = total;
    
  }
  
}

function modificar(index, accion) {
  if (accion === "sumar") carrito[index].quantity++;
  else if (accion === "restar" && carrito[index].quantity > 1) carrito[index].quantity--;
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
}

function eliminar(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
}

function configurarBotones() {
  document.getElementById("btn-products")?.addEventListener("click", () => {
    window.location.href = "products.html";
  });

  document.getElementById("btn-finalizar")?.addEventListener("click", async () => {

    if (!carrito.length) {

      alert("Su carrito está vacío");

    } else {

      let ticketResponse = await fetch(`http://localhost:3000/api/ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client: sessionStorage.getItem("user"),
          total: totalTicket
        })
      });
      
      if (ticketResponse.ok) {

        const ticket = await ticketResponse.json();
        let ventasOk = true;
        
        for (const prod of carrito) {

          let saleResponse = await fetch(`http://localhost:3000/api/ticket/sales`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ticketId: ticket.ticketId,
              id: prod.id,
              quantity: prod.quantity,
              price: prod.price
            })
          });

          if (!saleResponse.ok) {

            let error = await saleResponse.json();
            console.log("Error con el pago", error.message);
            ventasOk = false;

          }

        }

        if (ventasOk) {
          window.location.href = "ticket.html";

        } else {

          let error = await ticketResponse.json();
          console.log("Error al generar ticket", error.message);

        }
      }
    }
  });

  document.getElementById("btn-exit")?.addEventListener("click", () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "../home.html";
  });

  document.querySelectorAll(".nav-button").forEach(btn => {
    btn.style.visibility = "visible";
  });

}

window.modificar = modificar;
window.eliminar = eliminar;