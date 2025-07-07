document.addEventListener("DOMContentLoaded", () => {
  const nombre = localStorage.getItem("cliente") || "Cliente";
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const fecha = new Date().toLocaleDateString();
  const tbody = document.querySelector("#tablaTicket tbody");
  const ticketCliente = document.getElementById("ticketCliente");
  const ticketFecha = document.getElementById("ticketFecha");
  const ticketTotal = document.getElementById("ticketTotal");
  const botonSalir = document.getElementById("botonSalir");

  ticketCliente.textContent = nombre;
  ticketFecha.textContent = fecha;

  let total = 0;

  carrito.forEach((item) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td>${item.cantidad}</td>
      <td>$${item.precio * item.cantidad}</td>
    `;
    tbody.appendChild(fila);
    total += item.precio * item.cantidad;
  });

  ticketTotal.textContent = total.toFixed(2);

  botonSalir.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/";
  });
});
