import { initlizeTheme } from "../src/themeSwitch.js";

let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let page = 1;
let cargando = false;
let todoCargado = false;

document.addEventListener("DOMContentLoaded", () => {
  initlizeTheme();
  configurarBotones();
  configurarFiltros();
  configurarBuscador();
  obtenerProductos();
});

function configurarBotones() {
  document.getElementById("btn-products")?.addEventListener("click", () => location.href = "products.html");
  document.getElementById("btn-carrito")?.addEventListener("click", () => location.href = "carrito.html");
  document.getElementById("btn-encuesta")?.addEventListener("click", () => location.href = "encuesta.html");
  document.getElementById("btn-exit")?.addEventListener("click", () => {
    sessionStorage.clear();
    localStorage.clear();
    location.href = "../home.html";
  });

  document.querySelectorAll(".nav-button").forEach(btn => btn.style.visibility = "visible");
}

function configurarFiltros() {
  const selectCategoria = document.getElementById("categoria");
  selectCategoria?.addEventListener("change", () => {
    const categoria = selectCategoria.value;

    const titulo = document.getElementById("titulo-galeria");
    if (categoria === "botines") {
      titulo.textContent = "Botines";
    } else if (categoria === "camiseta") {
      titulo.textContent = "Camisetas";
    } else {
      titulo.textContent = "Galería de Productos";
    }

    renderizarProductos(aplicarFiltros(productos), true);
  });
}

function configurarBuscador() {
  const input = document.getElementById("search-input");
  input?.addEventListener("input", () => {
    renderizarProductos(aplicarFiltros(productos), true);
  });
}

function aplicarFiltros(lista) {
  const categoria = document.getElementById("categoria")?.value.toLowerCase() || "";
  const termino = document.getElementById("search-input")?.value.toLowerCase() || "";

  return lista.filter(p => {
    const tipo = p.product_type?.toLowerCase();
    const nombre = p.desc_text?.toLowerCase();
    const coincideTipo = categoria ? tipo === categoria || tipo.includes(categoria) : true;
    const coincideNombre = termino ? nombre.includes(termino) : true;
    return coincideTipo && coincideNombre;
  });
}

async function obtenerProductos() {
  if (cargando || todoCargado) return;
  cargando = true;

  try {
    const res = await fetch(`http://localhost:3000/api/products?page=${page}&limit=12`);
    const data = await res.json();
    const nuevos = data.payload || [];

    if (nuevos.length === 0) {
      todoCargado = true;
      return;
    }

    productos = [...productos, ...nuevos];
    renderizarProductos(aplicarFiltros(productos));
    page++;
  } catch (err) {
    console.error("Error al obtener productos", err);
  } finally {
    cargando = false;
  }
}

function renderizarProductos(lista, limpiar = false) {
  const ul = document.getElementById("products-list");
  if (limpiar) ul.innerHTML = "";

  lista.forEach(producto => {
    const li = document.createElement("li");
    li.className = "product-item";
    li.innerHTML = `
      <img src="${producto.image}" alt="${producto.desc_text}" class="product-img">
      <p><strong>${producto.product_type}</strong> — ${producto.desc_text} N°${producto.desc_number}</p>
      <p>Precio: $${producto.price}</p>
      <button class="form-button" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    ul.appendChild(li);
  });
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
