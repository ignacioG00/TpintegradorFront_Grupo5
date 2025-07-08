let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
  configurarBotones();
});

function renderizarCarrito() {
  const lista = document.getElementById("carrito-lista");
  lista.innerHTML = "";
  let total = 0;

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

  document.getElementById("btn-finalizar")?.addEventListener("click", () => {
    window.location.href = "ticket.html";
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