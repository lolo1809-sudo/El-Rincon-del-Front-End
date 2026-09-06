let tablero = ["", "", "", "", "", "", "", "", ""];
let jugadorActual = "X";
let juegoActivo = true;

const condicionesVictoria = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Filas

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columnas

  [0, 4, 8],
  [2, 4, 6], // Diagonales
];

const tableroDOM = document.querySelector(".tablero");
const cuadros = document.querySelectorAll(".cuadro");
const turno = document.querySelector(".turno");
const boton = document.querySelector("button");
const modal = document.querySelector(".modal__ganador");
const mensajeModal = document.querySelector(".texto");
const button__modal = document.querySelector(".button__modal");

// ---------------------------- 1. JUGAR ----------------------------------

function iniciar() {
  turno.textContent = jugadorActual; // cambiamos en el DOM el turno
  tableroDOM.addEventListener("click", (e) => {
    // e.target es el div específico al que se le hizo clic
    const indice = parseInt(e.target.dataset.index);

    // validamos que la celda esté vacía
    if (tablero[indice] == "X" || tablero[indice] == "O") {
      return;
    } else {
      // una vez la celda vacía:
      cuadros[indice].textContent = jugadorActual;

      // guardamos la posición en la tabla
      tablero[indice] = jugadorActual;

      // validamos para cambiar de turno, y luego lo mostramos en pantalla de Turno
      if (jugadorActual == "X") {
        jugadorActual = "O";
      } else {
        jugadorActual = "X";
      }
      turno.textContent = jugadorActual;
    }
    verificarGanador();
  });
}

// ------------------------- 2. VERIFICAR GANADOR -------------------------------

function verificarGanador() {
  // Recorremos cada una de las 8 combinaciones posibles
  for (let i = 0; i < condicionesVictoria.length; i++) {
    const combinacion = condicionesVictoria[i]; // Ej: [0, 1, 2]

    // Obtenemos los valores que hay en el tablero para esos índices
    const posicion1 = tablero[combinacion[0]];
    const posicion2 = tablero[combinacion[1]];
    const posicion3 = tablero[combinacion[2]];
    // el valor de posicion es "X" o " O"

    // 1. Si alguna de las tres está vacía, no hay victoria en esta línea
    if (posicion1 === "" || posicion2 === "" || posicion3 === "") {
      continue;
    }

    // 2. Si las tres son iguales (X-X-X o O-O-O), ¡alguien ganó!
    if (posicion1 === posicion2 && posicion2 === posicion3) {
      juegoActivo = false; // Detenemos el juego

      // Modal Ganador y Lámina ganador
      let ganador;
      if (posicion1 == "X") {
        ganador = "P1";
      } else {
        ganador = "P2";
      }

      mensajeModal.textContent = `¡Felicdades!. Ganó el jugador: ${ganador}`;
      modal.classList.add("visible");
      document.body.classList.add("lamina");

      button__modal.addEventListener("click", () => {
        modal.classList.remove("visible");
        document.body.classList.remove("lamina");
      });
      reiniciar();
      return;
    }
  }
}

// ---------------------------- 3. REINICIAR ----------------------------------
function reiniciar() {
  tablero.forEach((recuadro, index) => {
    tablero[index] = "";
    cuadros[index].textContent = "";
  });
  // Reiniciamos el turno al X y la variable de JuegoActivo
  jugadorActual = "X";
  turno.textContent = jugadorActual;
  juegoActivo = true;
}

// ---------------------------- MAIN ----------------------------------
if (juegoActivo) {
  iniciar();
}

boton.addEventListener("click", () => {
  reiniciar();
});
