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

/**
 * Transition de page « stores vénitiens » — des lattes verticales qui se
 * ferment (le cadre grandit depuis le lien cliqué jusqu'à couvrir l'écran,
 * puis les lattes tombent du haut vers le bas en cascade) puis se rouvrent
 * (les lattes remontent, du bas vers le haut) pour révéler la nouvelle page.
 * Le site étant multi-pages (pas de SPA), l'animation est coupée en deux
 * moitiés qui se relaient d'une page à l'autre via sessionStorage :
 *   - phase « fermeture » : jouée sur la page de départ, juste avant la
 *     navigation réelle (voir mnInitBlindTransitions, écouteur de clic) ;
 *   - phase « ouverture » : jouée sur la page d'arrivée. Pour éviter tout
 *     flash du contenu réel avant que le script ne s'exécute, chaque page
 *     pose en tout premier, avant même l'en-tête, un petit script en ligne
 *     (voir index.html etc.) qui recouvre instantanément l'écran de lattes
 *     déjà fermées si une transition est en attente ; mnRevealBlindTransition
 *     anime ensuite ces lattes déjà en place pour révéler la page.
 */
const MN_BLIND_COUNT = 10;
const MN_BLIND_GROW_MS = 295;
const MN_BLIND_STAGGER_MS = 26;
const MN_BLIND_STRIP_MS = 353;
const MN_BLIND_CLOSE_DELAY_MS = MN_BLIND_GROW_MS + 11;
const MN_BLIND_CASCADE_MS = MN_BLIND_STRIP_MS + (MN_BLIND_COUNT - 1) * MN_BLIND_STAGGER_MS;
const MN_BLIND_ENTER_MS = MN_BLIND_CLOSE_DELAY_MS + MN_BLIND_CASCADE_MS;
// Camaïeu marine → bleu ciel : chaque latte, de la première à la dernière,
// interpole entre ces deux triplets (les trois arrêts du dégradé diagonal
// que porte chaque latte individuellement, pour garder la même profondeur).
const MN_BLIND_FROM = [
  [13, 40, 70], // #0d2846
  [7, 26, 48], // #071a30
  [2, 10, 22], // #020a16
];
const MN_BLIND_TO = [
  [191, 224, 240], // #bfe0f0
  [134, 185, 214], // #86b9d6
  [79, 143, 179], // #4f8fb3
];
const MN_BLIND_STORAGE_KEY = "mn-blind-transition";

function mnPrefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Dégradé diagonal de la latte i (sur n), interpolé entre le marine et le bleu ciel. */
function mnBlindStripBackground(i, n) {
  const t = n > 1 ? i / (n - 1) : 0;
  const stops = MN_BLIND_FROM.map((from, k) =>
    from.map((v, ch) => Math.round(v + (MN_BLIND_TO[k][ch] - v) * t))
  );
  return `linear-gradient(160deg, rgb(${stops[0].join(",")}), rgb(${stops[1].join(",")}) 55%, rgb(${stops[2].join(",")}))`;
}

function mnBlindRectStyle(el, r) {
  el.style.top = r.top + "px";
  el.style.left = r.left + "px";
  el.style.width = r.width + "px";
  el.style.height = r.height + "px";
}

function mnBlindFullRect() {
  return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
}

/** Crée le cadre et ses N lattes, toutes fermées (scaleY(0) depuis le haut). */
function mnCreateBlindContainer() {
  const container = document.createElement("div");
  container.className = "blind-panel";
  container.style.position = "fixed";
  container.style.zIndex = "9999";
  container.style.overflow = "hidden";
  container.style.display = "flex";
  container.style.pointerEvents = "none";
  document.body.appendChild(container);

  const strips = [];
  for (let i = 0; i < MN_BLIND_COUNT; i++) {
    const s = document.createElement("div");
    s.style.flex = "1 0 auto";
    s.style.height = "100%";
    s.style.background = mnBlindStripBackground(i, MN_BLIND_COUNT);
    s.style.transform = "scaleY(0)";
    s.style.transformOrigin = "top";
    s.style.transition = `transform ${MN_BLIND_STRIP_MS}ms ease ${i * MN_BLIND_STAGGER_MS}ms`;
    container.appendChild(s);
    strips.push(s);
  }
  return { container, strips };
}

/** Joue la phase « ouverture » sur un cadre déjà présent (plein écran, lattes fermées) pour révéler la page. */
function mnRevealBlindTransition(container, strips) {
  // Les lattes ont déjà leur transition posée (voir mnCreateBlindContainer, ou
  // l'équivalent dans le script en ligne) depuis au moins une frame : on peut
  // changer leur transform directement, il sera bien animé.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      strips.forEach((s) => {
        s.style.transformOrigin = "bottom";
        s.style.transform = "scaleY(0)";
      });
    })
  );

  setTimeout(() => container.remove(), MN_BLIND_CASCADE_MS + 10);
}

/** Révèle la page courante si elle vient d'être atteinte via une transition en attente. */
function mnConsumePendingBlindTransition() {
  const existing = document.getElementById("blind-panel-init");
  let pending = null;
  try {
    pending = JSON.parse(sessionStorage.getItem(MN_BLIND_STORAGE_KEY) || "null");
  } catch (e) {
    pending = null;
  }
  sessionStorage.removeItem(MN_BLIND_STORAGE_KEY);

  if (!pending || !pending.active) {
    if (existing) existing.remove();
    return;
  }

  let container;
  let strips;
  if (existing) {
    existing.id = "";
    container = existing;
    strips = Array.from(container.children);
    // Les lattes posées par le script en ligne n'ont pas encore de transition
    // (elles arrivent déjà fermées, sans animation) : on la pose maintenant,
    // une frame avant de les faire remonter dans mnRevealBlindTransition.
    strips.forEach((s, i) => {
      s.style.transition = `transform ${MN_BLIND_STRIP_MS}ms ease ${i * MN_BLIND_STAGGER_MS}ms`;
    });
  } else {
    ({ container, strips } = mnCreateBlindContainer());
    mnBlindRectStyle(container, mnBlindFullRect());
    strips.forEach((s) => {
      s.style.transform = "scaleY(1)";
    });
  }

  mnRevealBlindTransition(container, strips);
}

/** Intercepte les liens internes pour jouer la phase « fermeture » avant de naviguer réellement. */
function mnInitBlindTransitions() {
  if (mnPrefersReducedMotion()) return;

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href]");
    if (!link) return;
    if (link.target && link.target !== "" && link.target !== "_self") return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch (err) {
      return;
    }
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname) return; // ancre ou lien vers soi-même

    e.preventDefault();

    const { container, strips } = mnCreateBlindContainer();
    mnBlindRectStyle(container, link.getBoundingClientRect());

    container.style.transition =
      `top ${MN_BLIND_GROW_MS}ms ease, left ${MN_BLIND_GROW_MS}ms ease, width ${MN_BLIND_GROW_MS}ms ease, height ${MN_BLIND_GROW_MS}ms ease`;

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        mnBlindRectStyle(container, mnBlindFullRect());
      })
    );

    setTimeout(() => {
      strips.forEach((s) => {
        s.style.transform = "scaleY(1)";
      });
    }, MN_BLIND_CLOSE_DELAY_MS);

    try {
      sessionStorage.setItem(MN_BLIND_STORAGE_KEY, JSON.stringify({ active: true }));
    } catch (err) {
      /* stockage indisponible : la page suivante ne jouera simplement pas la révélation */
    }

    setTimeout(() => {
      window.location.href = url.href;
    }, MN_BLIND_ENTER_MS);
  });
}

/**
 * Filet de sécurité pour le bouton précédent/suivant du navigateur : quand la
 * page est restaurée depuis le bfcache (event.persisted), aucun script ne se
 * ré-exécute — la page réapparaît telle qu'elle était figée au moment où on
 * l'a quittée. Si on l'a quittée pendant que les lattes couvraient tout
 * l'écran (phase « fermeture » juste avant la navigation), elles restaient
 * donc affichées pour toujours, bloquant la page. On les retire simplement
 * dès que ce cas est détecté.
 */
window.addEventListener("pageshow", (event) => {
  if (!event.persisted) return;
  document.querySelectorAll(".blind-panel").forEach((el) => el.remove());
  try {
    sessionStorage.removeItem(MN_BLIND_STORAGE_KEY);
  } catch (e) {
    /* stockage indisponible : rien à nettoyer */
  }
});

document.addEventListener("DOMContentLoaded", () => {
  mnInitMenuOverlay();
  mnInitHeaderTheme();
  mnInitClosingReveal();
  mnConsumePendingBlindTransition();
  mnInitBlindTransitions();
});
