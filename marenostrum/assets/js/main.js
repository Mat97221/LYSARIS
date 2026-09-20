/**
 * MARENOSTRUM — JS vanilla, sans dépendance : en-tête sticky au défilement, menu mobile,
 * horloge en direct (trois fuseaux réels), formulaire de contact (démonstration, sans backend).
 */

function mnInitHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function mnInitMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const panel = document.getElementById("nav-mobile");
  if (!toggle || !panel) return;
  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/** Heure réelle dans trois fuseaux (Paris, New York, Zurich) — calcul par fuseau horaire réel
    via Intl.DateTimeFormat, jamais un décalage codé en dur, mise à jour chaque seconde. */
function mnInitClockWidget() {
  const zones = [
    { id: "clock-paris", tz: "Europe/Paris" },
    { id: "clock-ny", tz: "America/New_York" },
    { id: "clock-zurich", tz: "Europe/Zurich" }
  ];
  const elements = zones
    .map((z) => ({ ...z, el: document.getElementById(z.id) }))
    .filter((z) => z.el);
  if (!elements.length) return;

  const formatters = new Map(
    elements.map((z) => [
      z.id,
      new Intl.DateTimeFormat("fr-FR", { timeZone: z.tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
    ])
  );

  const tick = () => {
    const now = new Date();
    elements.forEach((z) => {
      z.el.textContent = formatters.get(z.id).format(now);
    });
  };
  tick();
  setInterval(tick, 1000);
}

function mnInitContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("contact-feedback");
  if (!form || !feedback) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    feedback.textContent = "Merci, votre message a bien été transmis. Nous revenons vers vous sous 48h.";
    feedback.classList.remove("is-hidden");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mnInitHeaderScroll();
  mnInitMobileNav();
  mnInitClockWidget();
  mnInitContactForm();
});
