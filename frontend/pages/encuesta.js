import { initlizeTheme } from "../src/themeSwitch.js";

// Referencias a elementos
const form = document.getElementById('form-encuesta');
const modal = document.getElementById('modal-gracias');
const omitirBtn = document.getElementById('omitir-btn');
const slider = document.getElementById('satisfaccion');
const valorSlider = document.getElementById('valor-slider');

// Actualiza valor del slider en vivo
slider.addEventListener('input', () => {
  valorSlider.textContent = slider.value;
});

document.addEventListener("DOMContentLoaded", () => {
  initlizeTheme();
  configurarBotones();
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

// Envío de encuesta
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append('fecha', new Date().toISOString());

  try {
    const response = await fetch('http://localhost:3000/api/encuesta', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      modal.style.display = 'flex';
      form.reset();
      valorSlider.textContent = '5';
    } else {
      alert('No implementado aun');
    }
  } catch (error) {
    console.error(error);
    alert('No se pudo conectar con el servidor');
  }
});

// Omitir encuesta
omitirBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Cerrar modal
function cerrarModal() {
  modal.style.display = 'none';
}