/**
 * MARENOSTRUM — Moteur d'animation de l'accueil one-page (index.html uniquement ; les autres
 * pages gardent un défilement natif ordinaire).
 *
 * Le défilement lui-même est 100% natif — molette, trackpad, clavier, ascenseur : rien ne
 * l'intercepte ni n'en modifie la vitesse (un essai avec Lenis, une bibliothèque de "smooth
 * scroll", a été retiré : quel que soit son réglage, elle impose sa propre physique de
 * défilement à la place de celle voulue par la personne qui scrolle). GSAP + ScrollTrigger
 * pilotent uniquement des animations déclenchées PAR la position de défilement native — elles
 * ne la pilotent jamais elles-mêmes : (1) apparition des images/blocs au défilement, (2)
 * parallaxe du bandeau de textures marines, (3) révélation du slogan mot par mot au chargement,
 * (4) parallaxe légère des images produit de La Table.
 *
 * Ce fichier ne s'auto-exécute pas au DOMContentLoaded : `mnInitMotion()` doit être appelé
 * explicitement une fois que les sections de la page (injectées par home.js) existent dans le
 * DOM, sans quoi les ScrollTrigger seraient créés sur des éléments absents.
 */

function mnReducedMotion() {
  return Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

/** Défilement vers une ancre, en douceur (scroll natif, `scroll-margin-top` sur
    `[data-scroll-section]` dans src/input.css évite qu'elle n'arrive masquée sous l'en-tête). */
function mnScrollTo(target) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (el) el.scrollIntoView({ behavior: mnReducedMotion() ? "auto" : "smooth" });
}

/** Navigation fixe : chaque lien d'ancre défile en douceur ; les liens vers d'autres pages
    (ex. index.html#contact depuis une page profonde) gardent leur comportement natif. */
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

/** Surbrillance de la section active dans le menu au fil du défilement. */
function mnInitActiveNav() {
  const sections = Array.from(document.querySelectorAll("main [data-scroll-section]"));
  const links = Array.from(document.querySelectorAll("[data-scroll-link]"));
  if (sections.length === 0 || links.length === 0) return;

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        if (!self.isActive) return;
        links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${section.id}`));
      }
    });
  });
}

/**
 * Animation 1 — apparition des images et des blocs au défilement.
 * Chaque `[data-reveal]` est un groupe ; ses enfants directs `[data-reveal-item]` entrent en
 * cascade (0.12s) — sans enfant marqué, le groupe entier s'anime comme un seul bloc. Se joue une
 * seule fois (toggleActions "play none none none").
 */
function mnInitRevealAnimations() {
  document.querySelectorAll("[data-reveal]").forEach((group) => {
    const items = group.querySelectorAll(":scope > [data-reveal-item]");
    const targets = items.length ? items : [group];
    gsap.from(targets, {
      opacity: 0,
      y: 40,
      scale: 1.02,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: group,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });
}

/** Animation 2 — parallaxe du bandeau de cinq textures marines, amplitudes distinctes. */
function mnInitTextureParallax() {
  const band = document.querySelector("[data-texture-band]");
  if (!band) return;
  const amplitudes = [-30, 20, -45, 15, -25];
  const strips = band.querySelectorAll("[data-texture-strip]");
  strips.forEach((strip, i) => {
    gsap.to(strip, {
      y: amplitudes[i % amplitudes.length],
      ease: "none",
      scrollTrigger: {
        trigger: band,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  });
}

/**
 * Parallaxe légère sur une image produit (La Table et ses pages produit) : amplitude maximale
 * de 30px, liée au scroll via scrub plutôt que jouée d'un coup. `data-product-parallax` doit
 * être posé sur un DIV enveloppant (jamais l'<img> elle-même) — exactement comme les bandes de
 * texture : GSAP écrit son propre `transform` inline sur l'élément qu'il anime, ce qui écraserait
 * silencieusement la classe `scale-110`/`scale-125` si elle était sur ce même élément. L'image à
 * l'intérieur du wrapper garde donc sa sur-échelle en pure CSS, et le wrapper (overflow-hidden)
 * assure qu'aucun bord vide n'apparaît pendant le glissement.
 */
function mnInitProductParallax() {
  document.querySelectorAll("[data-product-parallax]").forEach((wrap) => {
    gsap.to(wrap, {
      y: 30,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  });
}

/** Animation 3 — révélation du slogan mot par mot, au chargement (pas au scroll). */
function mnInitSloganReveal() {
  const container = document.querySelector("[data-slogan]");
  if (!container) return;
  const words = container.querySelectorAll("[data-slogan-word]");
  if (words.length === 0) return;

  if (mnReducedMotion()) {
    gsap.set(words, { opacity: 1, yPercent: 0 });
    return;
  }

  gsap.fromTo(
    words,
    { opacity: 0, yPercent: 100 },
    { opacity: 1, yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.08 }
  );
}

/** Point d'entrée, appelé par index.html une fois toutes les sections montées dans le DOM. */
function mnInitMotion() {
  if (typeof gsap === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  if (mnReducedMotion()) {
    // Tout apparaît directement dans son état final, sans animation.
    document.querySelectorAll("[data-reveal-item], [data-reveal]").forEach((el) => {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
    });
    document.querySelectorAll("[data-texture-strip], [data-product-parallax]").forEach((el) => gsap.set(el, { y: 0 }));
    mnInitSloganReveal();
    mnInitAnchorNav();
    mnInitActiveNav();
    return;
  }

  mnInitAnchorNav();
  mnInitActiveNav();
  mnInitRevealAnimations();
  mnInitTextureParallax();
  mnInitProductParallax();
  mnInitSloganReveal();

  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(refresh);
  }
  window.addEventListener("load", refresh);
}
