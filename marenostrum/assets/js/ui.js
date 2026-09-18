/**
 * MARENOSTRUM — Composants d'interface partagés (header, footer, icônes SVG). Injection DOM
 * directe (pas de fetch) afin de fonctionner aussi bien via file:// que via un serveur. Ce
 * fichier ne gère pas le scroll-reveal : cette responsabilité appartient entièrement à
 * GSAP/ScrollTrigger (voir motion.js), sur l'accueil comme sur La Table.
 *
 * Site vitrine B2B (maison de produits de la mer d'exception, exclusivement professionnels) :
 * aucun panier, aucun prix — chaque pièce de La Table porte une pastille de statut (Disponible /
 * Sur allocation / Ouverture prochaine) dont le seul CTA est "Demander une allocation", qui
 * renvoie vers le formulaire de référencement unique (accueil, section #contact).
 */

const MN_ICONS = {
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>`,
  box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5 12 4l8.5 4.5V16L12 20.5 3.5 16z"/><path d="M3.5 8.5 12 13l8.5-4.5M12 13v7.5"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="7" width="12" height="9"/><path d="M13.5 10h4l3 3v3h-7z"/><circle cx="5.5" cy="18" r="1.6"/><circle cx="16.5" cy="18" r="1.6"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20c8 0 14-6 16-16-10 0-16 6-16 16z"/><path d="M4 20c2-6 5-9 11-12"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L19 7"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3 6.5 12 13l9-6.5"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3l1.5 4.5L7.5 10a12 12 0 0 0 6.5 6.5l1.5-2 4.5 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.3"/></svg>`,
  spoon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6.5" rx="4.5" ry="5.5"/><path d="M12 12v10"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`
};

/**
 * En-tête. Sur l'accueil (data-page="accueil"), le site est une page unique défilante : les
 * liens d'ancre (#maison, #savoir-faire, #contact) portent `data-scroll-link` pour que motion.js
 * les fasse défiler via Lenis plutôt que par un saut natif. Sur toute autre page (fiche
 * technique, conditions professionnelles, mentions légales, la-table.html...), les mêmes ancres
 * redirigent vers `index.html#...` — une navigation normale, ces pages ne chargent pas Lenis.
 * "La Table" n'est pas une ancre : c'est son propre mini-site (la-table.html + une page par
 * produit), avec Lenis/GSAP chargés indépendamment pour ses propres animations.
 */
function mnHeader(active) {
  const isOnePager = active === "accueil";
  const prefix = isOnePager ? "" : "index.html";

  // Chaque entrée est soit une ancre de l'accueil one-page (préfixée par index.html et pilotée
  // par Lenis via data-scroll-link quand on est déjà sur l'accueil), soit une vraie page (La
  // Table, depuis ce brief, est redevenue un mini-site à part avec ses propres pages produit) —
  // dans ce cas son href ne change jamais et n'a pas besoin de data-scroll-link.
  const link = (href, label) => {
    const isAnchor = href.startsWith("#");
    const finalHref = isAnchor ? `${prefix}${href}` : href;
    const scrollAttr = isAnchor && isOnePager ? " data-scroll-link" : "";
    return `<a href="${finalHref}" class="mn-nav-link text-sm uppercase tracking-wide transition-colors duration-200 hover:text-marine text-ink-100"${scrollAttr}>${label}</a>`;
  };

  // Sur l'accueil, l'en-tête recouvre le hero plein écran (transparent + clair), et repasse à la
  // barre claire pleine une fois le hero dépassé (voir .mn-hero-nav dans le CSS).
  const heroNav = isOnePager ? " mn-hero-nav" : "";

  const navLinks = [
    ["#maison", "La Maison"],
    ["la-table.html", "La Table"],
    ["#savoir-faire", "Notre savoir-faire"],
    ["#contact", "Contact"]
  ];

  return `
  <header class="nav-glass sticky top-0 z-40${heroNav}">
    <div class="container-page flex h-20 items-center justify-between">
      <a href="${prefix || "index.html"}" class="flex items-center">
        <img src="assets/img/logo-marenostrum-horizontal-noir.png" alt="MARENOSTRUM" class="w-auto" style="width:231px;height:44px" />
      </a>
      <nav class="hidden lg:flex items-center gap-7">
        ${navLinks.map(([anchor, label]) => link(anchor, label)).join("")}
      </nav>
      <div class="flex items-center gap-4">
        <a href="${prefix}#contact" class="btn-navy hidden lg:inline-flex !px-5 !py-2.5 !min-h-0 !text-xs"${isOnePager ? " data-scroll-link" : ""}>Demander un référencement</a>
        <button id="mn-menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false" class="lg:hidden h-6 w-6 text-ink-50">
          ${MN_ICONS.menu}
        </button>
      </div>
    </div>
    <nav id="mn-mobile-menu" class="mn-menu-panel lg:hidden border-t border-ink-600/50 bg-ink-900/95">
      <div class="container-page flex flex-col gap-4 py-5">
        ${navLinks.map(([anchor, label]) => link(anchor, label)).join("")}
        <a href="${prefix}#contact" class="btn-navy w-full text-center"${isOnePager ? " data-scroll-link" : ""}>Demander un référencement</a>
      </div>
    </nav>
  </header>`;
}

function mnFooter() {
  const year = new Date().getFullYear();
  const isOnePager = document.body.dataset.page === "accueil";
  const prefix = isOnePager ? "" : "index.html";
  return `
  <footer class="bg-noir text-ivoire mt-24">
    <div class="container-page grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p class="font-titre font-semibold tracking-[0.18em] text-2xl text-ivoire mb-3">MAREN<span class="text-ivoire">O</span>STRUM</p>
        <p class="text-sm text-ivoire/70 leading-relaxed">Maison de produits de la mer d'exception pour les professionnels — caviar et pièces rares, choisis, calibrés et garantis.</p>
      </div>
      <div>
        <p class="eyebrow text-ivoire mb-4">Découvrir</p>
        <ul class="space-y-2.5 text-sm text-ivoire/70">
          <li><a class="hover:text-ivoire transition-colors" href="${prefix}#maison">La Maison</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="la-table.html">La Table</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="${prefix}#savoir-faire">Notre savoir-faire</a></li>
        </ul>
      </div>
      <div>
        <p class="eyebrow text-ivoire mb-4">Informations</p>
        <ul class="space-y-2.5 text-sm text-ivoire/70">
          <li><a class="hover:text-ivoire transition-colors" href="${prefix}#contact">Demander un référencement</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="fiche-technique-produit.html">Fiche technique produit</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="conditions-professionnelles.html">Conditions professionnelles</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="confidentialite.html">Confidentialité</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="mentions-legales.html">Mentions légales</a></li>
        </ul>
      </div>
      <div>
        <p class="eyebrow text-ivoire mb-4">Restez informé</p>
        <p class="text-sm text-ivoire/70 mb-4">Disponibilités, arrivages et informations d'approvisionnement.</p>
        <form id="mn-newsletter-form" class="flex gap-2" novalidate>
          <label for="mn-newsletter-email" class="sr-only">Adresse e-mail</label>
          <input id="mn-newsletter-email" type="email" required placeholder="Votre e-mail" class="input-field !py-2.5 text-sm !bg-noir !border-ivoire/25 !text-ivoire placeholder:!text-ivoire/40 focus:!border-ivoire" />
          <button type="submit" class="btn-navy !px-4 !py-2.5 shrink-0" aria-label="S'inscrire à la newsletter">${MN_ICONS.mail}</button>
        </form>
        <p id="mn-newsletter-feedback" class="mt-3 text-xs text-ivoire hidden" role="status"></p>
      </div>
    </div>
    <div class="border-t border-ivoire/15">
      <div class="container-page flex flex-col-reverse items-center gap-3 py-6 sm:flex-row sm:justify-between">
        <p class="text-xs text-ivoire/50">&copy; ${year} MARENOSTRUM. Tous droits réservés. Vente de caviar interdite aux mineurs.</p>
        <p class="text-xs text-ivoire/50">Site de démonstration — contenu fictif.</p>
      </div>
    </div>
  </footer>`;
}

function mnPrefersReducedMotion() {
  return Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

function mnClamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/** Nudges a `.magnetic` element toward the cursor within its own bounds. Pairs with .btn-navy-magnetic. */
function mnInitMagnetic(root) {
  if (mnPrefersReducedMotion()) return;
  const scope = root || document;
  const elements = Array.from(scope.querySelectorAll(".magnetic:not([data-magnetic-bound])"));
  const strength = 0.3;
  const maxPx = 10;

  elements.forEach((el) => {
    el.dataset.magneticBound = "true";

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const mx = mnClamp((e.clientX - rect.left - rect.width / 2) * strength, -maxPx, maxPx);
      const my = mnClamp((e.clientY - rect.top - rect.height / 2) * strength, -maxPx, maxPx);
      el.style.setProperty("--mag-x", `${mx.toFixed(1)}px`);
      el.style.setProperty("--mag-y", `${my.toFixed(1)}px`);
    });

    el.addEventListener("mouseleave", () => {
      el.style.setProperty("--mag-x", "0px");
      el.style.setProperty("--mag-y", "0px");
    });
  });
}


/**
 * Fond de page commun à toutes les pages : une couleur ivoire unique et plate (pas de dégradé,
 * pas de photo) — le même blanc partout sur le site. Les sections à fond opaque (hero, pied de
 * page, bandes bg-ink-800/bg-noir/mn-abyss) recouvrent simplement ce fond là où elles s'affichent.
 * Injecté en position: fixed pour rester stable au défilement. `.mn-grain` conserve un très
 * léger grain (texture « argentique ») par-dessus.
 */
function mnPageBackground() {
  return `
    <div class="fixed inset-0 -z-10 bg-ivoire pointer-events-none" aria-hidden="true"></div>
    <div class="mn-grain" aria-hidden="true"></div>`;
}

/** Injecte fond/header/footer, câble le menu mobile et la newsletter (démo). */
function mnMountLayout(activePage) {
  const bgMount = document.getElementById("site-bg");
  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  if (bgMount) bgMount.outerHTML = mnPageBackground();
  if (headerMount) headerMount.outerHTML = mnHeader(activePage);
  if (footerMount) footerMount.outerHTML = mnFooter();

  const toggle = document.getElementById("mn-menu-toggle");
  const mobileMenu = document.getElementById("mn-mobile-menu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("is-open");
      mobileMenu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.innerHTML = isOpen ? MN_ICONS.menu : MN_ICONS.close;
    });
  }

  const newsletterForm = document.getElementById("mn-newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const feedback = document.getElementById("mn-newsletter-feedback");
      feedback.textContent = "Merci ! Vous recevrez bientôt nos actualités.";
      feedback.classList.remove("hidden");
      newsletterForm.reset();
    });
  }

  const header = document.querySelector(".nav-glass");
  if (header) {
    // Over the homepage hero the bar stays transparent until the visitor has scrolled nearly
    // past the full-screen image; every other page keeps the original 8px trigger.
    const isHeroNav = header.classList.contains("mn-hero-nav");
    const threshold = () => (isHeroNav ? window.innerHeight - 100 : 8);
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > threshold());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  mnInitMagnetic();
}

document.addEventListener("DOMContentLoaded", () => {
  mnMountLayout(document.body.dataset.page || "");
});
