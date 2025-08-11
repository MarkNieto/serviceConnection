document.addEventListener("DOMContentLoaded", () => {
  // ===== NAV MOBILE =====
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => nav.classList.toggle("active"));
  }

  // ===== DROPDOWNS =====
  document.querySelectorAll(".dropdown > .nav__link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const menu = link.nextElementSibling;
      document.querySelectorAll(".dropdown__menu").forEach((m) => {
        if (m !== menu) m.classList.remove("show");
      });
      menu?.classList.toggle("show");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown__menu").forEach((menu) => menu.classList.remove("show"));
    }
  });

  // ===== Logo fade-in (opcional)
  const logo = document.querySelector(".logo__nav");
  if (logo) setTimeout(() => logo.classList.add("fade-in-logo"), 200);

  // ===== TESTIMONIALS DECK =====
  const deck = document.querySelector(".deck");
  const cards = deck ? Array.from(deck.querySelectorAll(".deck-card")) : [];
  const prev = deck?.querySelector(".deck-prev");
  const next = deck?.querySelector(".deck-next");
  const dots = deck ? Array.from(deck.querySelectorAll(".deck-dot")) : [];
  let idx = 0;
  let timer;

  const applyClasses = () => {
    cards.forEach((c) => c.classList.remove("is-current", "is-next", "is-behind"));
    if (!cards.length) return;
    const current = cards[idx];
    const nextIndex = (idx + 1) % cards.length;
    const behindIndex = (idx + 2) % cards.length;

    current.classList.add("is-current");
    cards[nextIndex].classList.add("is-next");
    cards[behindIndex].classList.add("is-behind");

    dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
  };

  const go = (n) => {
    if (!cards.length) return;
    idx = (n + cards.length) % cards.length;
    applyClasses();
    restart();
  };

  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => go(idx + 1), 5000);
  };

  if (deck && cards.length) {
    // Inicial
    applyClasses();
    restart();

    // Controles
    prev?.addEventListener("click", () => go(idx - 1));
    next?.addEventListener("click", () => go(idx + 1));
    dots.forEach((d, i) => d.addEventListener("click", () => go(i)));

    // Pausa al hover
    deck.addEventListener("mouseenter", () => clearInterval(timer));
    deck.addEventListener("mouseleave", restart);

    // Teclado
    deck.setAttribute("tabindex", "0");
    deck.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") go(idx - 1);
      if (e.key === "ArrowRight") go(idx + 1);
    });

    // Swipe en móvil
    let startX = 0;
    deck.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
    deck.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const delta = endX - startX;
      if (Math.abs(delta) > 40) {
        if (delta > 0) go(idx - 1);
        else go(idx + 1);
      }
    }, { passive: true });
  }
});
