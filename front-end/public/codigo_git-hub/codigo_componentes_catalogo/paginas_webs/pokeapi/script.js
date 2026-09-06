//"Client-Side Filtering" (Filtrado del lado del cliente).

// La lógica es obtener las imagenes y nombre de todos los pokemones, para la sección de "ver todos", y luego mostrar en el DOM los del tipo específico de la categoría, para evitar llamadas a la Api

// -------------- 1. OBTENER TODOS LOS POKEMONES DE LA PRIMERA GENERACIÓN ---------------------
// Obtenemos todos los pokemones de la 1° generción, creamos un array con todas las promesas de los pokemones (151), creamos cajas vacías para amortiguar el tiempo de espera, obtenemos todo junto, creamos dinámicamente los divs con sus respectivos datos y lo guardamos en el main
const container = document.querySelector("main");
const header = document.querySelector("header");

let tarjetasPokemones; //lista de todos los pokemones

const obtenerGeneracion1 = async () => {
  try {
    const resGen = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
    );
    const listaPokemones = resGen.data.results;

    // 1. Creamos un array de PROMESAS (sin el await adentro)
    const promesas = listaPokemones.map((p) => axios.get(p.url));

    // 2. Creamos cajas vacías grises para amortiguar el tiempo de espera (técnica de YouTube)
    for (let i = 0; i < 21; i++) {
      const cajaVacia = document.createElement("div");
      cajaVacia.classList.add("caja_vacia");

      container.appendChild(cajaVacia);
    }

    // 3. Ejecutamos todas en PARALELO y esperamos el resultado global
    const respuestas = await Promise.all(promesas);

    // 4. Seleccionamos las cajas que están en el HTML para poder borrarlas
    const cajasVacias = document.querySelectorAll(".caja_vacia");

    cajasVacias.forEach((caja) => {
      caja.remove();
    });

    // 5. Ahora procesamos los datos ya obtenidos
    respuestas.forEach((res) => {
      const pokemon = res.data;

      let cadaPokemon = document.createElement("div");
      cadaPokemon.innerHTML = `
      <!--Imagen-->

       <img src="${
         pokemon.sprites.other["official-artwork"].front_default
       }" alt="${pokemon.name}">

       <!--Título y id-->

       <div class="tittle_id">
          <p>#${pokemon.id}</p>
          <h4>${pokemon.name.toUpperCase()}</h4>
       </div>

       <!--Tipo-->

        <div class="tipos-container">
          ${pokemon.types
            .map(
              (t) =>
                `<span class="${
                  t.type.name
                }">${t.type.name.toUpperCase()}</span>`
            )
            .join(" ")}
        </div>

         <!--Altura(metros) y Peso(kg)-->

        <p>${pokemon.height / 10}M | ${pokemon.weight / 10}KG</p>
      `;
      container.appendChild(cadaPokemon);

      // 6. Aprovechamos este forEach para crear el modal y hacerle una escucha de evento, y asi no hacer otro for innecesario
      crearModal(pokemon, cadaPokemon);
    });

    tarjetasPokemones = document.querySelectorAll("main > div");
  } catch (e) {
    console.error("Error:", e.message);
  }
};

obtenerGeneracion1();

// -------------- 2. FILTRADO DE TIPOS ---------------------
// Usamos la propagación del header para saber que categoría fue seleccionada, luego seleccionamos todas las tarjetas, y las mostramos si la categoría es de "ver todo", o si es la misma categoría

header.addEventListener("click", (e) => {
  // SEGURIDAD: Evita que el click en el fondo del header oculte todo
  if (!e.target.matches(".categoria")) return;

  // Normalizamos a minúsculas para comparar (ej: "FUEGO" vs "fuego")
  const tipoSeleccionado = e.target.textContent.toLowerCase();

  tarjetasPokemones.forEach((tarjetaPokemon) => {
    // Leemos el texto de TODO el contenedor de tipos
    const listaTipos = tarjetaPokemon
      .querySelector(".tipos-container")
      .textContent.toLowerCase();

    // Las tarjetas se muestran:
    // 1. Si el tipo seleccionado está incluido en el texto de la tarjeta...
    // 2. O si el botón presionado es "ver todos"...
    if (
      listaTipos.includes(tipoSeleccionado) ||
      tipoSeleccionado === "ver todos"
    ) {
      tarjetaPokemon.classList.remove("ocultar");
    } else {
      tarjetaPokemon.classList.add("ocultar");
    }
  });
});

// -------------- 3. BÚSQUEDA EN TIEMPO REAL ---------------------
// Implementamos buscador de pokemones en timpo real
const input = document.querySelector(".busqueda");

input.addEventListener("input", (e) => {
  let nombreIngresado = e.target.value.toLowerCase();

  tarjetasPokemones.forEach((tarjetaPokemon) => {
    let nombreABuscar = tarjetaPokemon
      .querySelector(".tittle_id > h4")
      .textContent.toLowerCase();

    //Usamos 'includes' para buscar coincidencias parciales (ej: "pika" en "pikachu")
    if (nombreABuscar.includes(nombreIngresado)) {
      tarjetaPokemon.classList.remove("ocultar");
    } else {
      tarjetaPokemon.classList.add("ocultar");
    }
  });
});

// -------------- 4. MODAL DE CADA POKEMON ---------------------
// Hacemos una escucha de evento por cada pokemon para abir un modal con info del mismo

function crearModal(pokemon, tarjetaDOM) {
  tarjetaDOM.addEventListener("click", () => {
    // Eliminar modales previos si existen
    const modalExistente = document.querySelector(".modal-overlay");
    if (modalExistente) modalExistente.remove();

    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    modalOverlay.innerHTML = `
      <div class="modal-content">
        <button class="cerrar-modal">X</button>
        
        <div class="modal-izquierdo">
          <h2>${pokemon.name.toUpperCase()} #${pokemon.id}</h2>
        
          <div class="imagenes-modal">
              <img class="img-normal" src="${
                pokemon.sprites.other["official-artwork"].front_default
              }" alt="Normal">
              <img class="img-shiny" src="${
                pokemon.sprites.front_shiny
              }" alt="Shiny">
          </div>

          <audio controls src="${pokemon.cries.latest}"></audio>
        </div>


        <div class="modal-derecho">
          <div class="stats-container">
            <p>❤️ Vida: ${pokemon.stats[0].base_stat}</p>
            <p>⚔️ Ataque: ${pokemon.stats[1].base_stat}</p>
            <p>🛡️ Defensa: ${pokemon.stats[2].base_stat}</p>
            <p>⚡ Velocidad: ${pokemon.stats[5].base_stat}</p>
          </div>

          <p><strong>Habilidades:</strong> ${pokemon.abilities
            .map((a) => a.ability.name)
            .join(", ")}</p>
        </div>
      </div>
    `;

    document.body.appendChild(modalOverlay);

    // Lógica para cerrar
    modalOverlay
      .querySelector(".cerrar-modal")
      .addEventListener("click", () => {
        modalOverlay.remove();
      });
  });
}
