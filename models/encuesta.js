document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formEncuesta");
  const confirmacion = document.getElementById("mensajeConfirmacion");

  if (!form) {
    console.warn("⚠️ No se encontró el formulario con id 'formEncuesta'");
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const opinion = document.getElementById("opinion").value.trim();

    if (!nombre || !edad || !opinion) {
      alert("📝 Por favor, completá todos los campos.");
      return;
    }

    const respuesta = {
      nombre,
      edad,
      opinion,
      fecha: new Date().toLocaleString()
    };

    console.log("🗳️ Respuesta enviada:", respuesta);

    // Guardar en localStorage
    let historial = JSON.parse(localStorage.getItem("encuestas")) || [];
    historial.push(respuesta);
    localStorage.setItem("encuestas", JSON.stringify(historial));

    form.reset();

    if (confirmacion) {
      confirmacion.textContent = "¡Gracias por tu opinión! 💬";
      confirmacion.style.display = "block";
    }
  });
});

// Este modelo representa la encuesta que los usuarios completan después de realizar una compra.
// Incluye campos para nombre, email, comentario, imagen (opcional) y calificación (de 1 a 5).
// La tabla se llamará "encuestas" y tendrá timestamps para registrar cuándo se creó y actualizó cada registro.