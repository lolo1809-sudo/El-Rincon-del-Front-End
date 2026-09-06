// La idea es que se carguen dos arreglos, lo que se coloreo, y lo que tocó el usuario, y si son iguales, se sigue, sino se corta

const boton = document.querySelector("button");
const simonContainer = document.querySelector(".simon_container");
const cuadros = document.querySelectorAll(".simon_container > div");
let ronda = document.querySelector(".ronda");

//Modal de derrota
const modal = document.querySelector(".modalDerrota");
const lamina = document.querySelector(".lamina");
const modalTexto = document.querySelector(".modalDerrota--ronda");

let intentos = []; // Secuencia de la CPU
let tocoUsuario = []; // Secuencia del Jugador
let contadorRonda = 1; // contador de ronda

// 1. INICIAR JUEGO (Reseteamos todo)
boton.addEventListener("click", () => {
  intentos = [];
  tocoUsuario = [];
  contadorRonda = 1;
  siguienteNivel(); // Arrancamos el primer nivel
});

// 2. LÓGICA DE NIVELES (Agrega 1 color nuevo y muestra la secuencia)
function siguienteNivel() {
  tocoUsuario = []; // El usuario debe repetir desde cero en cada nivel

  // Agregamos un nuevo color a la secuencia (0, 1, 2 o 3)
  let numeroAleatorio = Math.floor(Math.random() * 4);
  intentos.push(numeroAleatorio);

  // Reproducimos la animación de TODA la secuencia acumulada
  intentos.forEach((numero, index) => {
    setTimeout(() => {
      iluminarCuadro(numero);
    }, 600 * (index + 1)); // 1 seg de pausa entre cada color
  });
}

// Función auxiliar para iluminar (para no repetir código)
function iluminarCuadro(numero) {
  let cuadroIluminado = cuadros[numero];
  cuadroIluminado.classList.add("activo");
  setTimeout(() => {
    cuadroIluminado.classList.remove("activo");
  }, 300);
}

// 3. LO QUE TOCÓ EL USUARIO (El evento siempre está escuchando)
simonContainer.addEventListener("click", (e) => {
  // Si el juego no ha empezado (array vacío), no hacemos nada
  if (intentos.length === 0) return;

  cuadros.forEach((cuadro, index) => {
    // Verificamos cuál cuadro se tocó
    if (e.target === cuadro) {
      tocoUsuario.push(index);
      iluminarCuadro(index); // Feedback visual (que se ilumine al tocar)

      validarJuego(); // Chequeamos si va bien
    }
  });
});

// 4. COMPARACIÓN (El cerebro del juego)
function validarJuego() {
  // Obtenemos la posición del último clic (0, 1, 2...)
  const indexActual = tocoUsuario.length - 1;

  // A. ¿El color que acabo de tocar es diferente al de la CPU en esa posición?
  if (intentos[indexActual] !== tocoUsuario[indexActual]) {
    intentos = []; // Reiniciamos el juego

    modal.classList.remove("ocultar");
    lamina.classList.remove("ocultar");
    modalTexto.textContent = contadorRonda;

    ronda.textContent = 1;
    contadorRonda = 1;

    return;
  }

  // B. ¿Ya completé toda la secuencia de este nivel?
  if (tocoUsuario.length === intentos.length) {
    // Si acertó todo, esperamos un poco y lanzamos el siguiente nivel
    setTimeout(() => {
      contadorRonda++;
      ronda.textContent = contadorRonda;
      siguienteNivel();
    }, 1000);
  }
}

// Separamos este bloque para eviar el: "Event Stacking" (Apilamiento de eventos)
lamina.addEventListener("click", () => {
  modal.classList.add("ocultar");
  lamina.classList.add("ocultar");
});
