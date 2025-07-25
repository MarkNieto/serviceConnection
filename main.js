document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  // Alternar menú móvil
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // Lógica para abrir/cerrar dropdowns
  const dropdownLinks = document.querySelectorAll(".dropdown > .nav__link");

  dropdownLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Previene que el enlace recargue o navegue
      e.preventDefault();

      const dropdownMenu = link.nextElementSibling;

      // Cierra otros menús abiertos
      document.querySelectorAll(".dropdown__menu").forEach((menu) => {
        if (menu !== dropdownMenu) {
          menu.classList.remove("show");
        }
      });

      // Alternar visibilidad del menú actual
      dropdownMenu.classList.toggle("show");
    });
  });

  // Cierra los menús si se hace clic fuera de ellos
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown__menu").forEach((menu) => {
        menu.classList.remove("show");
      });
    }
  });
});
