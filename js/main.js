let index = 0; // Índice de la imagen actual
const slides = document.querySelectorAll(".carousel-images img"); // Obtener todas las imágenes
const indicators = document.querySelectorAll(".indicator"); // Obtener todos los indicadores
const carousel = document.getElementById("carousel"); // Contenedor del carrusel

// Función para mover el carrusel
function moveSlide(direction) {
  const totalSlides = slides.length;

  // Salir si no hay slides (evita error en otras páginas)
  if (totalSlides === 0) return;

  // Calcular el nuevo índice según la dirección
  index += direction;

  // Si el índice es mayor que el número de imágenes, reiniciar al primer slide
  if (index >= totalSlides) {
    index = 0;
  }
  // Si el índice es menor que 0, ir al último slide
  if (index < 0) {
    index = totalSlides - 1;
  }

  // Asegurarse de que el elemento exista antes de cambiar su estilo
  const carouselImages = document.querySelector(".carousel-images");
  if (carouselImages) {
    carouselImages.style.transform = `translateX(-${index * 100}%)`;
  }

  // Actualizar los indicadores
  updateIndicators();
}

// Función para actualizar los indicadores
function updateIndicators() {
  indicators.forEach((indicator, i) => {
    if (i === index) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

// Función para cambiar a la diapositiva actual al hacer clic en el indicador
function currentSlide(n) {
  index = n;
  // Asegurarse de que el elemento exista antes de cambiar su estilo
  const carouselImages = document.querySelector(".carousel-images");
  if (carouselImages) {
    carouselImages.style.transform = `translateX(-${index * 100}%)`;
  }
  updateIndicators();
}

// Función para habilitar el arrastre de la imagen
// --- Event Listeners y Timers (Solo si el carrusel existe en la página) ---
if (carousel) {
  let startX;
  let isDragging = false;

  carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    carousel.style.cursor = "grabbing"; // Cambio de cursor al arrastrar
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const moveX = e.pageX - startX;
    carousel.style.transform = `translateX(${moveX}px)`;
  });

  carousel.addEventListener("mouseup", () => {
    isDragging = false;
    carousel.style.cursor = "grab"; // Vuelve a poner el cursor de "grabar" al soltar

    // Mover el carrusel en función de la distancia arrastrada
    const moveDistance = parseInt(
      carousel.style.transform.replace("translateX(", "").replace("px)", "")
    );
    if (moveDistance < -50) {
      moveSlide(1); // Mover a la siguiente diapositiva si arrastra hacia la izquierda
    } else if (moveDistance > 50) {
      moveSlide(-1); // Mover a la diapositiva anterior si arrastra hacia la derecha
    } else {
      carousel.style.transform = `translateX(0px)`; // Restaurar a la posición inicial si no se arrastra lo suficiente
    }
  });

  // Inicializa el primer indicador como activo
  updateIndicators();

  // Cambiar de diapositiva automáticamente cada 10 segundos
  setInterval(() => {
    moveSlide(1); // Mueve al siguiente slide
  }, 10000); // 10 segundos en milisegundos
} else {
  // Si el carrusel no existe, pero los indicadores sí, actualizarlos.
  if (indicators.length > 0) {
    updateIndicators();
  }
}
