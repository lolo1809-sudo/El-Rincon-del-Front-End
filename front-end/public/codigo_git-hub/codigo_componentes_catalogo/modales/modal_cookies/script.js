const cookieSheet = document.getElementById("cookieSheet");
const acceptBtn = document.getElementById("acceptBtn");
const denyBtn = document.getElementById("denyBtn");
const resetBtn = document.getElementById("resetCookie");

// Simular aparición automática al cargar (después de 1 segundo)
setTimeout(() => {
  cookieSheet.classList.add("show");
}, 1000);

// Cerrar al aceptar o rechazar
acceptBtn.addEventListener("click", () => {
  cookieSheet.classList.remove("show");
});

denyBtn.addEventListener("click", () => {
  cookieSheet.classList.remove("show");
});

// Botón solo para demo
resetBtn.addEventListener("click", () => {
  cookieSheet.classList.add("show");
});
