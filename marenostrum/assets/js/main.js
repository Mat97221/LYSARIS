/**
 * MARENOSTRUM — JS vanilla, sans dépendance : ouverture/fermeture de l'overlay menu plein écran.
 */

function mnInitMenuOverlay() {
  const toggle = document.getElementById("menu-toggle");
  const close = document.getElementById("menu-close");
  const overlay = document.getElementById("menu-overlay");
  if (!toggle || !overlay) return;

  const open = () => {
    overlay.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };
  const closeOverlay = () => {
    overlay.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", open);
  if (close) close.addEventListener("click", closeOverlay);
  overlay.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeOverlay));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOverlay();
  });
}

/**
 * Fait suivre l'en-tête (logo + icône menu) au défilement, et adapte sa couleur
 * (blanc / marine) selon la zone de la page qui se trouve derrière lui — chaque
 * zone porte l'attribut data-header-zone="dark|light" dans le HTML.
 */
function mnInitHeaderTheme() {
  const header = document.querySelector(".site-header");
  const zones = Array.from(document.querySelectorAll("[data-header-zone]"));
  if (!header || !zones.length) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const probeY = header.offsetHeight / 2;
    let theme = "light";
    for (const zone of zones) {
      const rect = zone.getBoundingClientRect();
      if (rect.top <= probeY && rect.bottom >= probeY) {
        theme = zone.getAttribute("data-header-zone");
        break;
      }
    }
    header.setAttribute("data-active-theme", theme);
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

/**
 * Photo de clôture : le logo-emblème blanc « se lève » sur l'horizon, comme
 * le soleil sur la photo (révélation définitive, une seule fois). Tant que
 * cette section est à l'écran, le logo de l'en-tête s'efface à son profit —
 * et réapparaît dès qu'on la quitte.
 */
function mnInitClosingReveal() {
  const closing = document.querySelector(".closing");
  const wrap = document.getElementById("closing-logo-wrap");
  const header = document.querySelector(".site-header");
  if (!closing || !wrap) return;

  if (!("IntersectionObserver" in window)) {
    wrap.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          wrap.classList.add("is-visible");
          if (header) header.classList.add("site-header--hide-logo");
        } else if (header) {
          header.classList.remove("site-header--hide-logo");
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(closing);
}

document.addEventListener("DOMContentLoaded", () => {
  mnInitMenuOverlay();
  mnInitHeaderTheme();
  mnInitClosingReveal();
});
