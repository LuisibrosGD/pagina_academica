// Cargar nav
fetch("../partials/nav.html")
  .then((res) => res.text())
  .then((data) => (document.querySelector(".contenedor-nav").innerHTML = data));

// Cargar footer
fetch("../partials/footer.html")
  .then((res) => res.text())
  .then(
    (data) => (document.querySelector(".contenedor-footer").innerHTML = data)
  );
