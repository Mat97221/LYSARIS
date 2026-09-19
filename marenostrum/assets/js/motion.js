/**
 * MARENOSTRUM — Animations, volontairement minimales, sans bibliothèque de scroll (ni GSAP, ni
 * Lenis, ni Locomotive Scroll — voir SETUP.md). Deux classes seulement :
 *
 * 1. `.anima--bottom-in` — opacité 0→1, translation Y +40px→0, 0.9s, easing doux, déclenchée par
 *    IntersectionObserver à 85% du viewport, jouée une seule fois. Réservée à une dizaine de
 *    blocs sur toute la page (voir home.js) — pas un système d'apparition généralisé.
 * 2. `.js-image-anime` — même mécanisme, révélation légère (opacité + échelle) pour les images.
 *
 * Le défilement lui-même reste 100% natif ; ce fichier ne fait jamais défiler la page, il se
 * contente de réagir à sa position. Le seul mouvement lié au défilement est la parallaxe légère
 * du hero (mnInitHeroParallax), volontairement limitée à cet unique bloc.
 */

function mnReducedMotion() {
  return Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

/** Défilement vers une ancre, en douceur (scroll natif ; `scroll-margin-top` dans src/input.css
    évite qu'elle n'arrive masquée sous l'en-tête). */
function mnScrollTo(target) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (el) el.scrollIntoView({ behavior: mnReducedMotion() ? "auto" : "smooth" });
}

/** Navigation fixe : chaque lien d'ancre défile en douceur ; les liens vers d'autres pages
    gardent leur comportement natif. */
function mnInitAnchorNav() {
  document.querySelectorAll("[data-scroll-link]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href") || "";
      if (!href.startsWith("#")) return;
      e.preventDefault();
      mnScrollTo(href);
      history.pushState(null, "", href);
    });
  });
}

/** Surbrillance de la section active dans le menu au fil du défilement natif. */
function mnInitActiveNav() {
  const sections = Array.from(document.querySelectorAll("main [data-scroll-section]"));
  const links = Array.from(document.querySelectorAll("[data-scroll-link]"));
  if (sections.length === 0 || links.length === 0 || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${entry.target.id}`));
      });
    },
    { rootMargin: "-50% 0px -50% 0px" }
  );
  sections.forEach((section) => observer.observe(section));
}

/** Animations 1 et 2 — `.anima--bottom-in` et `.js-image-anime`, révélées une seule fois par
    IntersectionObserver à 85% du viewport (threshold bas : l'élément est considéré visible dès
    qu'il entre dans les 15% inférieurs de l'écran, pas besoin d'y être entièrement). */
function mnInitReveal() {
  const targets = document.querySelectorAll(".anima--bottom-in, .js-image-anime");
  if (targets.length === 0) return;

  if (mnReducedMotion() || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0, rootMargin: "0px 0px -15% 0px" }
  );
  targets.forEach((el) => observer.observe(el));
}

/** Parallaxe légère, hero uniquement : l'image de fond glisse à une fraction de la vitesse du
    défilement (amplitude modeste, ~15% du déplacement) tant que le hero est à l'écran. Pas de
    bibliothèque : un seul listener scroll passif, désactivé sous prefers-reduced-motion. */
function mnInitHeroParallax() {
  const hero = document.querySelector("[data-hero-parallax]");
  if (!hero || mnReducedMotion()) return;
  const layer = hero.querySelector("[data-hero-parallax-layer]");
  if (!layer) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    layer.style.transform = `translateY(${rect.top * -0.15}px)`;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}

/** Point d'entrée, appelé une fois les sections de la page montées dans le DOM. */
function mnInitMotion() {
  mnInitAnchorNav();
  mnInitActiveNav();
  mnInitReveal();
  mnInitHeroParallax();
}
