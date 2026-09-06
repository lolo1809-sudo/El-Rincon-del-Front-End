// Usamos nombres únicos para evitar conflictos con otros archivos
const botonToggle = document.querySelector(".codigo_inicio-sesion");
const containerContrasena = document.querySelector(".input-wrapper-contraseña");
const textoLegal = document.querySelector(".text_oculto");
const selectIdiomaLogin = document.querySelector(".select-idioma");

function actualizarTextoBoton() {
  // 1. Leemos el idioma directamente del HTML
  const idioma = selectIdiomaLogin.value;

  // 2. Revisamos si el input de contraseña está oculto o visible
  // Nota: Asumimos que si tiene la clase, está oculto.
  const passwordEstaOculto = containerContrasena.classList.contains(
    "ocultar_contraseña_texto"
  );

  if (passwordEstaOculto) {
    // CASO A: Estamos viendo el "Texto legal" -> El botón debe ofrecer volver a "Usar Contraseña"
    if (idioma === "es") {
      botonToggle.textContent = "Usar contraseña";
    } else {
      botonToggle.textContent = "Use password";
    }
  } else {
    // CASO B: Estamos viendo el "Input Password" -> El botón debe ofrecer "Usar código"
    if (idioma === "es") {
      botonToggle.textContent = "Usar un código de inicio de sesión";
    } else {
      botonToggle.textContent = "Use a sign-in code";
    }
  }
}

/* --- EVENTO 1: CLICK EN EL BOTÓN --- */
botonToggle.addEventListener("click", () => {
  // 1. Alternamos la visibilidad (CSS)
  containerContrasena.classList.toggle("ocultar_contraseña_texto");
  textoLegal.classList.toggle("ocultar_contraseña_texto");

  // 2. Actualizamos el texto inmediatamente
  actualizarTextoBoton();
});

/* --- EVENTO 2: CAMBIO DE IDIOMA --- */
// Si el usuario cambia el idioma en el selector, actualizamos el botón al instante
selectIdiomaLogin.addEventListener("change", () => {
  actualizarTextoBoton();
});
