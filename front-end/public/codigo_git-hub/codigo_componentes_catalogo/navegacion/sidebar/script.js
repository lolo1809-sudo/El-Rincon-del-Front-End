const sidebar = document.querySelector(".sidebar");
const closeBtn = document.querySelector("#btn");

// Al cargar, verifica si quieres que empiece cerrado o abierto
// sidebar.classList.add("close");

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  menuBtnChange();
});

function menuBtnChange() {
  if (sidebar.classList.contains("close")) {
    closeBtn.querySelector("i").classList.replace("fa-arrow-left", "fa-bars");
  } else {
    // Puedes cambiar el ícono si quieres
    // closeBtn.querySelector("i").classList.replace("fa-bars", "fa-arrow-left");
  }
}
