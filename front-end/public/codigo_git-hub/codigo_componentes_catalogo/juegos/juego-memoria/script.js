const tarjetas = document.querySelectorAll(".tarjeta");
const aciertos = document.querySelector(".aciertos");
const movimientos = document.querySelector(".movimientos");
const boton = document.querySelector("button");
const tiempoDisplay = document.querySelector(".tiempo");

let tarjetasAbiertas = [];
let bloqueado = false;
let segundos = 0;
let cronometro;
let juegoActivo = false;

// ---------------------------- COMPARAR DOS CARTAS ----------------------------------
function chequearPareja() {
  // obtenemos el valor numérico del lado de atras
  const [t1, t2] = tarjetasAbiertas;
  const valor1 = t1.querySelector(".lado_atras").textContent;
  const valor2 = t2.querySelector(".lado_atras").textContent;

  if (valor1 === valor2) {
    tarjetasAbiertas = [];
    bloqueado = false;

    let conAciertos = Number(aciertos.textContent) + 1;
    aciertos.textContent = conAciertos;

    // ------ GANÓ EL JUEG0 ------
    if (conAciertos === 8) {
      clearInterval(cronometro);
      juegoActivo = false;

      // Modal de victoria
      const modal_victoria = document.querySelector(".modal_victoria");
      const ok = document.querySelector(".button_modal_victoria");

      modal_victoria.classList.remove("ocultar_modal");
      document.body.classList.add("lamina");

      ok.addEventListener("click", () => {
        modal_victoria.classList.add("ocultar_modal");
        document.body.classList.remove("lamina");
      });
    }
  } else {
    // si no son iguales se voltean nuevamente
    setTimeout(() => {
      t1.classList.remove("volteada");
      t2.classList.remove("volteada");
      tarjetasAbiertas = [];
      bloqueado = false;
    }, 1000);
  }
}

// --------------------------- LÓGICA DEL CONTADOR ---------------------------
function iniciarContador() {
  segundos = 60;
  tiempoDisplay.textContent = segundos;

  clearInterval(cronometro);

  cronometro = setInterval(() => {
    segundos--; // Restamos 1
    tiempoDisplay.textContent = segundos;

    // -----PERDIÓ EL JUEGO-----
    if (segundos <= 0) {
      clearInterval(cronometro);
      bloqueado = true; // Bloqueamos clics

      // Modal de derrota
      const modal_derrota = document.querySelector(".modal_derrota");
      const ok = document.querySelector(".button_modal_derrota");

      modal_derrota.classList.remove("ocultar_modal");
      document.body.classList.add("lamina");

      ok.addEventListener("click", () => {
        modal_derrota.classList.add("ocultar_modal");
        document.body.classList.remove("lamina");
      });
    }
  }, 1000);
}

// --------------------------- INICIAR EL JUEGO ---------------------------
function iniciar() {
  // Solo arranca el contador si no está ya activo
  if (!juegoActivo) {
    iniciarContador();
    juegoActivo = true;
  }

  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener("click", () => {
      if (bloqueado || tarjeta.classList.contains("volteada")) return;

      tarjeta.classList.add("volteada");
      tarjetasAbiertas.push(tarjeta);

      if (tarjetasAbiertas.length === 2) {
        let conMovimientos = Number(movimientos.textContent) + 1;
        movimientos.textContent = conMovimientos;

        bloqueado = true;
        chequearPareja();
      }
    });
  });
}

// -------------------------------- MAIN ------------------------------
boton.addEventListener("click", () => {
  // Reiniciar todo antes de empezar
  bloqueado = false; // Desbloqueamos las cartas
  juegoActivo = false; // Permitimos que el contador arranque de nuevo
  tarjetasAbiertas = []; // Vaciamos el array por seguridad
  clearInterval(cronometro); // Aseguramos que no haya relojes corriendo

  // Reiniciar valores visuales antes de empezar
  aciertos.textContent = "0";
  movimientos.textContent = "0";
  tiempoDisplay.textContent = "0";

  // Quitamos la clase volteada a todas por si es un reinicio
  tarjetas.forEach((t) => t.classList.remove("volteada"));

  setTimeout(() => {
    iniciar();
  }, 500);
});
