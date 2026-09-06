window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  // Si el scroll baja más de 0px, añade la clase "sticky"
  header.classList.toggle("sticky", window.scrollY > 0);
});
