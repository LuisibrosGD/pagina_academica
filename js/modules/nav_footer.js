// Cargar nav
fetch("../partials/nav.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector(".contenedor-nav").innerHTML = data;
    // ¡LLAMAMOS A LA FUNCIÓN DEL MENÚ AQUÍ!
    // Esto asegura que el HTML existe antes de buscar los botones.
    inicializarMenuMovil();
  });

// Cargar footer
fetch("../partials/footer.html")
  .then((res) => res.text())
  .then(
    (data) => (document.querySelector(".contenedor-footer").innerHTML = data)
  );

// --- CÓDIGO DEL MENÚ DE NAVEGACIÓN ---
// (Esta es la función que movimos de main.js y quitamos el 'DOMContentLoaded')
function inicializarMenuMovil() {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const iconOpen = document.getElementById("nav-toggle-open");
  const iconClose = document.getElementById("nav-toggle-close");

  // Asegurarnos de que los elementos existen
  if (navToggle && navMenu && iconOpen && iconClose) {
    navToggle.addEventListener("click", () => {
      // Alternar la clase 'active' en el menú
      navMenu.classList.toggle("active");

      // Alternar los íconos
      if (navMenu.classList.contains("active")) {
        // Si el menú está activo, mostrar 'X' y ocultar 'lista'
        iconOpen.style.display = "none";
        iconClose.style.display = "block";
      } else {
        // Si el menú está inactivo, mostrar 'lista' y ocultar 'X'
        iconOpen.style.display = "block";
        iconClose.style.display = "none";
      }
    });
  }
}
