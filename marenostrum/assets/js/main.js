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

document.addEventListener("DOMContentLoaded", () => {
  mnInitMenuOverlay();
  mnInitHeaderTheme();
});
