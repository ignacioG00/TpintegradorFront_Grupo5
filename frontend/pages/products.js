import { initlizeTheme } from "../src/themeSwitch.js";

let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let paginaActual = 1;
let totalPaginas = 1;
let categoriaActual = "";

document.addEventListener("DOMContentLoaded", () => {
  initlizeTheme();
  configurarBotones();
  configurarFiltros();
  obtenerProductos();
});

function configurarBotones() {
  document.getElementById("btn-products")?.addEventListener("click", () => window.location.href = "products.html");
  document.getElementById("btn-carrito")?.addEventListener("click", () => window.location.href = "carrito.html");
  document.getElementById("btn-encuesta")?.addEventListener("click", () => window.location.href = "encuesta.html");
  document.getElementById("btn-exit")?.addEventListener("click", () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "../home.html";
  });

  document.getElementById("prev-page")?.addEventListener("click", () => {
    if (paginaActual > 1) {
      paginaActual--;
      obtenerProductos();
    }
  });

  document.getElementById("next-page")?.addEventListener("click", () => {
    if (paginaActual < totalPaginas) {
      paginaActual++;
      obtenerProductos();
    }
  });

  document.querySelectorAll(".nav-button").forEach(btn => btn.style.visibility = "visible");
}

function configurarFiltros() {
  const selectCategoria = document.getElementById("categoria");
  selectCategoria?.addEventListener("change", () => {
    categoriaActual = selectCategoria.value;
    paginaActual = 1;
    obtenerProductos();
  });
}

async function obtenerProductos() {
  try {
    const res = await fetch(`http://localhost:3000/api/products?page=${paginaActual}&limit=6&category=${categoriaActual}`);
    const data = await res.json();
    productos = data.payload;
    totalPaginas = data.totalPages || 1;

    renderizarProductos(productos);
    actualizarPaginador();
  } catch (error) {
    console.error("Error al obtener productos:", error);
    document.getElementById("products-list").innerHTML = "<li>Error al cargar productos.</li>";
  }
}

function renderizarProductos(lista) {
  const ul = document.getElementById("products-list");
  ul.innerHTML = "";

  lista.forEach((producto) => {
    const li = document.createElement("li");
    li.className = "product-item";
    li.innerHTML = `
      <img src="${producto.image}" alt="${producto.nombre}" class="product-img">
      <p>Id: ${producto.id} / ${producto.product_type} ${producto.desc_text} N°${producto.desc_number} / 
      <strong>Precio: $${producto.price}</strong></p>
      <button class="form-button" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    ul.appendChild(li);
  });
}

function actualizarPaginador() {
  document.getElementById("page-indicador").textContent = `Página ${paginaActual}`;
}

window.agregarAlCarrito = function (id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const item = carrito.find(p => p.id === id);
  if (item) {
    item.quantity++;
  } else {
    carrito.push({ ...producto, quantity: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`"${producto.desc_text}" agregado al carrito 🛒`);
};
