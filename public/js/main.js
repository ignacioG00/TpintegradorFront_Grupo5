// Mensaje de prueba para confirmar que carga
console.log("✅ main.js conectado y funcionando");

// Animación al hacer scroll: agregar sombra al header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 20) {
    header.classList.add("con-sombra");
  } else {
    header.classList.remove("con-sombra");
  }
});
// Función para agregar un producto al carrito
// Esta función se encarga de agregar un producto al carrito almacenado en localStorage.
function agregarAlCarrito(id, nombre, precio, imagen) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex(item => item.id === id);
  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`✔️ ${nombre} agregado al carrito`);
}

