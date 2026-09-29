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
 * Transition de page « vague liquide » — un blob qui grandit depuis le lien
 * cliqué jusqu'à couvrir l'écran, puis se retire pour révéler la nouvelle
 * page. Le site étant multi-pages (pas de SPA), l'animation est coupée en
 * deux moitiés qui se relaient d'une page à l'autre via sessionStorage :
 *   - phase « entrée » : jouée sur la page de départ, juste avant la
 *     navigation réelle (voir mnInitWaveTransitions, écouteur de clic) ;
 *   - phase « sortie » : jouée sur la page d'arrivée. Pour éviter tout flash
 *     du contenu réel avant que le script ne s'exécute, chaque page pose en
 *     tout premier, avant même l'en-tête, un petit script en ligne
 *     (voir index.html etc.) qui recouvre instantanément l'écran si une
 *     transition est en attente ; mnRevealWaveTransition anime ensuite ce
 *     panneau déjà en place pour révéler la page.
 */
const MN_WAVE_BLOB_IN = "38% 62% 55% 45% / 45% 40% 60% 55%";
const MN_WAVE_BLOB_FULL = "0% 0% 0% 0% / 0% 0% 0% 0%";
const MN_WAVE_BLOB_OUT = "55% 45% 40% 60% / 42% 58% 38% 62%";
const MN_WAVE_EASE_IN = "cubic-bezier(.6,0,.15,1)";
const MN_WAVE_EASE_OUT = "cubic-bezier(.16,1,.3,1)";
const MN_WAVE_STORAGE_KEY = "mn-wave-transition";

function mnPrefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function mnWaveRectStyle(el, r) {
  el.style.top = r.top + "px";
  el.style.left = r.left + "px";
  el.style.width = r.width + "px";
  el.style.height = r.height + "px";
}

function mnCreateWavePanel() {
  const panel = document.createElement("div");
  panel.className = "wave-panel";
  panel.style.position = "fixed";
  panel.style.zIndex = "9999";
  panel.style.overflow = "hidden";
  panel.style.background =
    "radial-gradient(circle at 28% 22%, rgba(255,255,255,.16), rgba(255,255,255,0) 55%)," +
    "linear-gradient(160deg, #123252, #0a1f33 55%, #071627)";
  panel.style.boxShadow = "0 0 60px 10px rgba(5,15,28,.25)";
  document.body.appendChild(panel);
  return panel;
}

/** Joue la phase « sortie » sur un panneau déjà présent (plein écran) pour révéler la page. */
function mnRevealWaveTransition(panel, forward) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const dir = forward ? 1 : -1;
  const exit = { top: -vh * 0.06, left: dir * vw, width: vw, height: vh * 1.12 };

  // La propriété transition doit déjà être en place au moins une frame avant
  // que les valeurs ne changent, sinon le navigateur applique le changement
  // instantanément sans l'animer (c'est ce qui se passait ici auparavant).
  panel.style.transition =
    `top .55s ${MN_WAVE_EASE_OUT}, left .55s ${MN_WAVE_EASE_OUT}, width .55s ${MN_WAVE_EASE_OUT}, height .55s ${MN_WAVE_EASE_OUT}, border-radius .55s ${MN_WAVE_EASE_OUT}`;
  panel.style.animation = "wave-pulse .5s ease-out";

  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      mnWaveRectStyle(panel, exit);
      panel.style.borderRadius = MN_WAVE_BLOB_OUT;
    })
  );

  setTimeout(() => panel.remove(), 580);
}

/** Révèle la page courante si elle vient d'être atteinte via une transition en attente. */
function mnConsumePendingWaveTransition() {
  const existing = document.getElementById("wave-panel-init");
  let pending = null;
  try {
    pending = JSON.parse(sessionStorage.getItem(MN_WAVE_STORAGE_KEY) || "null");
  } catch (e) {
    pending = null;
  }
  sessionStorage.removeItem(MN_WAVE_STORAGE_KEY);

  if (!pending || !pending.active) {
    if (existing) existing.remove();
    return;
  }

  const panel = existing || mnCreateWavePanel();
  panel.id = "";
  panel.style.borderRadius = MN_WAVE_BLOB_FULL;
  mnWaveRectStyle(panel, { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight });
  mnRevealWaveTransition(panel, pending.forward);
}

/** Intercepte les liens internes pour jouer la phase « entrée » avant de naviguer réellement. */
function mnInitWaveTransitions() {
  if (mnPrefersReducedMotion()) return;

  const depthOf = (path) => (path === "" || path === "index.html" ? 0 : 1);

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

    const currentPath = window.location.pathname.split("/").pop();
    const nextPath = url.pathname.split("/").pop();
    const forward = depthOf(nextPath) >= depthOf(currentPath);

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const full = { top: 0, left: 0, width: vw, height: vh };
    const panel = mnCreateWavePanel();
    panel.style.borderRadius = MN_WAVE_BLOB_IN;
    mnWaveRectStyle(panel, link.getBoundingClientRect());

    panel.style.transition =
      `top .5s ${MN_WAVE_EASE_IN}, left .5s ${MN_WAVE_EASE_IN}, width .5s ${MN_WAVE_EASE_IN}, height .5s ${MN_WAVE_EASE_IN}, border-radius .5s ${MN_WAVE_EASE_IN}`;

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        mnWaveRectStyle(panel, full);
        panel.style.borderRadius = MN_WAVE_BLOB_FULL;
      })
    );

    try {
      sessionStorage.setItem(MN_WAVE_STORAGE_KEY, JSON.stringify({ active: true, forward }));
    } catch (err) {
      /* stockage indisponible : la page suivante ne jouera simplement pas la révélation */
    }

    setTimeout(() => {
      window.location.href = url.href;
    }, 500);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mnInitMenuOverlay();
  mnInitHeaderTheme();
  mnInitClosingReveal();
  mnConsumePendingWaveTransition();
  mnInitWaveTransitions();
});
