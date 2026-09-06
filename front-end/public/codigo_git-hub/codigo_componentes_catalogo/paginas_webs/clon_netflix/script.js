// -------------------- CONEXIÓN A LA API ----------------------------
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${MIS_CLAVES.API_KEY}&language=es-ES`;

async function request() {
  try {
    const response = await axios.get(url);
    console.log(response);
    console.log("Película top 1:", response.data.results[0].title);
  } catch (error) {
    console.log(error.message);
  }
}
request();

// -------------------- 2° SECCIÓN PELÍCULAS TENDENCIAS ----------------------------

// variable global de las películas en tendencias
let peliculasTendencias = [];

const urlTendencias = `https://api.themoviedb.org/3/trending/movie/week?api_key=${MIS_CLAVES.API_KEY}`;
const trackTendencias = document.getElementById("tendencias-container");

async function cargarTendencias() {
  try {
    const respuesta = await axios.get(urlTendencias);
    const peliculas = respuesta.data.results;
    peliculasTendencias = peliculas.slice(0, 10);

    peliculasTendencias.forEach((pelicula, index) => {
      const nuevaPelicula = document.createElement("div");
      nuevaPelicula.classList.add("swiper-slide", "card-tendencia");

      // guardamos el id
      nuevaPelicula.dataset.id = pelicula.id;

      nuevaPelicula.innerHTML = `
            <span class="numero-ranking">${index + 1}</span>
            <img src="https://image.tmdb.org/t/p/w500/${
              pelicula.poster_path
            }" alt="${pelicula.title}">
        `;

      trackTendencias.appendChild(nuevaPelicula);
    });

    // Inicializamos Swiper AQUÍ dentro, después de crear los divs
    new Swiper(".mySwiper", {
      // --- VISTA MÓVIL (Base) ---
      slidesPerView: 2,
      slidesPerGroup: 2, // Mueve de 2 en 2 en celular
      spaceBetween: 10,
      loop: false,

      // Opcional: Ajusta la velocidad para que se sienta más "pesado" como Netflix
      speed: 800,

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        // --- TABLET ---
        768: {
          slidesPerView: 4,
          slidesPerGroup: 4, // Mueve de 4 en 4
          spaceBetween: 20,
        },
        // --- ESCRITORIO (Estilo Netflix) ---
        1024: {
          slidesPerView: 5,
          slidesPerGroup: 5, // Mueve el bloque entero de 5
          spaceBetween: 45,
        },
      },
    });
  } catch (error) {
    console.log("Error cargando tendencias:", error);
  }
}

cargarTendencias();

// -------------------- 2° SECCIÓN PELÍCULAS TENDENCIAS (TARJETAS DE CADA PELÍCULA) ----------------------------

// 2. Seleccionamos el fondo del modal (para que se vea borroso)
const fondoModal = document.querySelector(".fondo-modal");

function cargaModal(idRecibido) {
  try {
    const contenedor = document.querySelector(".modal_pelicula");

    // 2. BUSCAR la película que coincida con el ID recibido
    // Usamos '==' para que no importe si uno es texto y el otro número
    const peliculaEncontrada = peliculasTendencias.find(
      (peli) => peli.id == idRecibido
    );

    if (peliculaEncontrada) {
      // 3. Rellenamos el HTML (Sobrescribimos lo anterior con innerHTML)
      contenedor.innerHTML = `
          <div class="cerrar-modal">X</div>
          <img class="img-modal" src="https://image.tmdb.org/t/p/w1280/${peliculaEncontrada.backdrop_path}">

          <div class="modal-content-text">
            <h2 class="tittle-modal">${peliculaEncontrada.title}</h2>
            <p class="text-modal">${peliculaEncontrada.overview}</p>
            <div class="comienza-modal hover_buttons">Comienza ya
            <i class="fa-solid fa-angle-right"></i>
            </div>
          </div>
       `;

      // 4. Mostramos el modal
      contenedor.classList.remove("ocultar_modal");

      // --- 5. Cerrar (Dentro de cargaModal, con la X) ---
      contenedor
        .querySelector(".cerrar-modal")
        .addEventListener("click", () => {
          contenedor.classList.add("ocultar_modal");
          // Ocultamos el fondo también
          fondoModal.classList.add("ocultar_modal");
        });

      // --- 5.2 Cerrar si hace click fuera del modal (en la lámina) ---
      fondoModal.addEventListener("click", () => {
        fondoModal.classList.add("ocultar_modal");
        contenedor.classList.add("ocultar_modal");
      });
    }
  } catch (error) {
    console.log("Error cargando modal:", error.message);
  }
}

document.addEventListener("click", (e) => {
  // 1. Detectamos el click
  const tarjetaClickeada = e.target.closest(".card-tendencia");

  // 2. VERIFICAMOS SI EXISTE ANTES DE PEDIR DATOS
  if (tarjetaClickeada) {
    const idPelicula = tarjetaClickeada.dataset.id;

    // Mostramos la lamina del fondo
    fondoModal.classList.remove("ocultar_modal");
    cargaModal(idPelicula);
  }
});

/*-------------------------- 4° SECCIÓN PREGUNTAS FRECUENTES -----------------------*/

const preguntas = document.querySelectorAll(".pregunta");
const respuestas = document.querySelectorAll(".respuesta");

preguntas.forEach((pregunta, index_pregunta) => {
  pregunta.addEventListener("click", () => {
    // 1. OCULTAR LAS DEMÁS (Loop para limpiar)
    respuestas.forEach((respuesta, index_respuesta) => {
      // Si la respuesta no es la que clickeamos
      if (index_respuesta !== index_pregunta) {
        respuesta.classList.add("ocultar_respuesta");

        // .querySelector("i") busca la etiqueta <i> solo dentro de ese elemento
        const iconoOtro = preguntas[index_respuesta].querySelector("i");
        iconoOtro.classList.remove("rotar");
      }
    });

    // 2. MOSTRAR/OCULTAR LA ACTUAL
    respuestas[index_pregunta].classList.toggle("ocultar_respuesta");

    // BUSCAMOS EL ÍCONO DENTRO DE LA PREGUNTA QUE CLICKEAMOS
    const iconoActual = pregunta.querySelector("i");
    iconoActual.classList.toggle("rotar");
  });
});
