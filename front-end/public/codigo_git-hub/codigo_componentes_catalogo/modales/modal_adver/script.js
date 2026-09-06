const modal = document.getElementById("modal");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

openBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Cerrar al hacer click fuera
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});
