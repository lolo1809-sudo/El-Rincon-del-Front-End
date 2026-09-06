/* ------------ MENU HAMBURGUESA ------------ */

const menu = document.querySelector(".fa-bars");
const lista = document.querySelector(".menu__hamburguesa");

menu.addEventListener("click", () => {
  lista.classList.toggle("aparecer_menu");
  menu.classList.toggle("fa-circle-xmark");
});

/* ----------------------- MODO OSCURO Y CLARO ---------------------- */

const boton = document.querySelector(".fa-sun");

// 1. CARGAR: Al entrar, revisamos qué dice localStorage
const modoClaroGuardado = JSON.parse(localStorage.getItem("CambioColor"));

if (modoClaroGuardado) {
  document.body.classList.add("modo_claro");
  boton.classList.add("fa-moon");
}

boton.addEventListener("click", () => {
  // toggle devuelve true si puso la clase, false si la quitó
  const esClaro = document.body.classList.toggle("modo_claro");
  boton.classList.toggle("fa-moon");

  // Guardamos solo el estado (true/false)
  localStorage.setItem("CambioColor", JSON.stringify(esClaro));
});

/* ----------------------- SCROLL REVEAL LOGIC ---------------------- */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Si el elemento entra en el campo de visión
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    // threshold 0.1 significa que se activa cuando el 10% del elemento es visible
    threshold: 0.1,
  }
);

// Seleccionamos todos los elementos con la clase 'reveal' y los observamos
const hiddenElements = document.querySelectorAll(".reveal");
hiddenElements.forEach((el) => observer.observe(el));
