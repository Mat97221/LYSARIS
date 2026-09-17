/**
 * MARENOSTRUM — Moteur de défilement et d'animation de l'accueil one-page (index.html
 * uniquement ; les autres pages gardent un défilement natif ordinaire).
 *
 * Lenis pilote le défilement lissé ; GSAP + ScrollTrigger pilotent exactement trois animations,
 * aucune autre : (1) apparition des images/blocs au défilement, (2) parallaxe du bandeau de
 * textures marines, (3) révélation du slogan mot par mot au chargement. Lenis est branché sur le
 * ticker GSAP (gsap.ticker.add) plutôt que sur son propre requestAnimationFrame, afin que GSAP et
 * Lenis restent sur une seule et même horloge — ScrollTrigger.update() est appelé à chaque
 * événement de scroll Lenis pour que les triggers restent synchrones avec la position lissée
 * (et non la position native, que Lenis découple du defilement réel de la page).
 *
 * Ce fichier ne s'auto-exécute pas au DOMContentLoaded : `mnInitMotion()` doit être appelé
 * explicitement une fois que les sections de la page (injectées par home.js) existent dans le
 * DOM, sans quoi les ScrollTrigger seraient créés sur des éléments absents.
 */

let mnLenis = null;

function mnReducedMotion() {
  return Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

/** Lenis, amorti de façon exponentielle, piloté par le ticker GSAP. */
function mnInitSmoothScroll() {
  if (typeof Lenis === "undefined") return null;

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

/** Défilement vers une ancre : toujours via Lenis quand il tourne, jamais le scroll natif. */
function mnScrollTo(target) {
  if (mnLenis) {
    mnLenis.scrollTo(target);
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (el) el.scrollIntoView({ behavior: mnReducedMotion() ? "auto" : "smooth" });
}

/** Navigation fixe : chaque lien d'ancre défile via Lenis ; les liens vers d'autres pages
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
    // Lenis désactivé, défilement natif ; tout apparaît directement dans son état final.
    document.querySelectorAll("[data-reveal-item], [data-reveal]").forEach((el) => {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
    });
    document.querySelectorAll("[data-texture-strip]").forEach((el) => gsap.set(el, { y: 0 }));
    mnInitSloganReveal();
    mnInitAnchorNav();
    mnInitActiveNav();
    return;
  }

  mnLenis = mnInitSmoothScroll();
  mnInitAnchorNav();
  mnInitActiveNav();
  mnInitRevealAnimations();
  mnInitTextureParallax();
  mnInitSloganReveal();

  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(refresh);
  }
  window.addEventListener("load", refresh);
}
