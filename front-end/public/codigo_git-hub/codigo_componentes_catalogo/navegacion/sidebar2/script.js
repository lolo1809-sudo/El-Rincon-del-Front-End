document.addEventListener("DOMContentLoaded", () => {
  // Seleccionar todos los items que tienen submenú
  const dropdowns = document.querySelectorAll(".has-submenu");

  dropdowns.forEach((item) => {
    const link = item.querySelector("a");

    link.addEventListener("click", (e) => {
      e.preventDefault(); // Evita que recargue la página

      // Toggle (alternar) la clase 'active' en el elemento clicado
      item.classList.toggle("active");

      // Opcional: Cerrar otros menús abiertos al abrir uno nuevo (Acordeón)
      dropdowns.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });
    });
  });
});
