// Tema dinámico: claro/oscuro
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleBtn = document.getElementById("toggleTema");

  // Aplicar tema almacenado
  const temaGuardado = localStorage.getItem("tema");
  if (temaGuardado === "oscuro") {
    body.classList.add("tema-oscuro");
  }

  // Evento de cambio de tema
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("tema-oscuro");

      // Guardar preferencia
      const temaActual = body.classList.contains("tema-oscuro")
        ? "oscuro"
        : "claro";
      localStorage.setItem("tema", temaActual);
    });
  }
});
// Cambiar logo según tema
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const logo = document.getElementById("logoEmpresa");

  // Aplicar logo según tema almacenado
  const temaGuardado = localStorage.getItem("tema");
  if (temaGuardado === "oscuro") {
    logo.src = "/images/logo-oscuro.png";
  } else {
    logo.src = "/images/logo-claro.png";
  }

  // Cambiar logo al cambiar el tema
  body.addEventListener("classListChanged", () => {
    if (body.classList.contains("tema-oscuro")) {
      logo.src = "/images/logo-oscuro.png";
    } else {
      logo.src = "/images/logo-claro.png";
    }
  });
});