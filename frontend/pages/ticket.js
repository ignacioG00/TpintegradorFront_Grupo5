document.addEventListener("DOMContentLoaded", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const cliente = sessionStorage.getItem("cliente") || "Cliente Anónimo";

  document.getElementById("nombre-cliente").textContent = cliente;
  document.getElementById("fecha-compra").textContent = new Date().toLocaleDateString();

  let total = 0;
  const lista = document.getElementById("ticket-productos");

  carrito.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.product_type} ${p.desc_text} x${p.quantity} - $${p.price * p.quantity}`;
    total += p.price * p.quantity;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = `$${total.toFixed(2)}`;

  document.getElementById("btn-finalizar").addEventListener("click", () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "../home.html";
  });
});
