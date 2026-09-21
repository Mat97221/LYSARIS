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

document.addEventListener("DOMContentLoaded", () => {
  mnInitMenuOverlay();
});
