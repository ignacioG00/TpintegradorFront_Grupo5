document.addEventListener('DOMContentLoaded', () => {
  const compra = JSON.parse(localStorage.getItem('ultimaCompra'));
  const nombre = localStorage.getItem('nombreCliente') || 'Cliente';

  if (!compra) {
    alert('No hay ticket disponible.');
    window.location.href = '/';
    return;
  }

  document.getElementById('nombreCliente').textContent = nombre;
  document.getElementById('fechaTicket').textContent = new Date().toLocaleDateString();

  const tbody = document.getElementById('tablaProductos');
  let total = 0;

  compra.productos.forEach(p => {
    const fila = document.createElement('tr');
    const subtotal = p.precio * p.cantidad;
    total += subtotal;

    fila.innerHTML = `
      <td>${p.nombre}</td>
      <td>${p.cantidad}</td>
      <td>$${p.precio.toFixed(2)}</td>
      <td>$${subtotal.toFixed(2)}</td>
    `;
    tbody.appendChild(fila);
  });

  document.getElementById('totalFinal').textContent = total.toFixed(2);
});


function reiniciar() {
  localStorage.removeItem('carrito');
  localStorage.removeItem('ultimaCompra');
  window.location.href = '/';
}
