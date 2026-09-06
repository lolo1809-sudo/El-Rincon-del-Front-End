// Seleccionamos TODOS los elementos con esa clase
const botonesCambio = document.querySelectorAll(".cambio_tarjeta");
const card = document.querySelector(".card-inner");

// Recorremos cada botón y le agregamos el evento
botonesCambio.forEach((boton) => {
  boton.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
  });
});
