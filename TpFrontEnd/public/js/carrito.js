// helpers para manejar el carrito
function getCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// renderiza tabla de productos en carrito
function renderizarCarrito() {
  const carrito = getCarrito();
  const tbody = document.querySelector('#tablaCarrito tbody');
  const totalElem = document.getElementById('totalCarrito');
  tbody.innerHTML = '';
  let total = 0;

  carrito.forEach(producto => {
    const fila = document.createElement('tr');
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toFixed(2)}</td>
      <td>
        <button onclick="cambiarCantidad(${producto.id}, -1)">➖</button>
        ${producto.cantidad}
        <button onclick="cambiarCantidad(${producto.id}, 1)">➕</button>
      </td>
      <td>$${subtotal.toFixed(2)}</td>
      <td><button onclick="eliminarProducto(${producto.id})">🗑️</button></td>
    `;
    tbody.appendChild(fila);
  });

  totalElem.textContent = total.toFixed(2);
}

function cambiarCantidad(id, delta) {
  const carrito = getCarrito();
  const producto = carrito.find(p => p.id === id);
  if (!producto) return;
  producto.cantidad += delta;
  if (producto.cantidad <= 0) {
    eliminarProducto(id);
  } else {
    guardarCarrito(carrito);
    renderizarCarrito();
  }
}

function eliminarProducto(id) {
  let carrito = getCarrito();
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito(carrito);
  renderizarCarrito();
}

function confirmarCompra() {
  const carrito = getCarrito();
  if (!carrito.length) return alert('El carrito está vacío.');

  const nombre = localStorage.getItem('nombreCliente') || 'Cliente';
  const payload = {
    nombre,
    productos: carrito,
    fecha: new Date().toISOString()
  };

  fetch('/api/ventas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('ultimaCompra', JSON.stringify(data));
      localStorage.removeItem('carrito');
      window.location.href = '/ticket';
    })
    .catch(err => {
      console.error('Error al confirmar compra:', err);
      alert('Hubo un error. Intenta nuevamente.');
    });
}

function agregarAlCarrito(id, nombre, precio, imagen) {
  // Obtener carrito del almacenamiento o crear uno nuevo
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Ver si el producto ya existe
  const index = carrito.findIndex(item => item.id === id);
  if (index !== -1) {
    carrito[index].cantidad += 1; // Incrementar cantidad
  } else {
    // Agregar nuevo producto
    carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
  }

  // Guardar carrito actualizado
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Feedback visual
  alert(`✔️ ${nombre} agregado al carrito`);
}


document.getElementById('confirmarCompra')?.addEventListener('click', confirmarCompra);
document.addEventListener('DOMContentLoaded', renderizarCarrito);
