/**
 * MARENOSTRUM — Composants d'interface partagés (header, footer, cartes produit, icônes SVG).
 * Injection DOM directe (pas de fetch) afin de fonctionner aussi bien via file:// que via un serveur.
 */

const MN_ICONS = {
  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.2 12.1a2 2 0 0 0 2 1.65h7.6a2 2 0 0 0 2-1.65L21 8H6"/><circle cx="9.5" cy="20.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="17" cy="20.5" r="1.1" fill="currentColor" stroke="none"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  minus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 12h14"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 12.2A2 2 0 0 0 9 21h6a2 2 0 0 0 2-1.8L18 7"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="7" width="12" height="9"/><path d="M13.5 10h4l3 3v3h-7z"/><circle cx="5.5" cy="18" r="1.6"/><circle cx="16.5" cy="18" r="1.6"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20c8 0 14-6 16-16-10 0-16 6-16 16z"/><path d="M4 20c2-6 5-9 11-12"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L19 7"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3 6.5 12 13l9-6.5"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3l1.5 4.5L7.5 10a12 12 0 0 0 6.5 6.5l1.5-2 4.5 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.3"/></svg>`,
  gift: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="11"/><path d="M3 9h18M12 9v11"/><path d="M12 9c-1.2-3.2-3.2-5-5-5-1.4 0-2.3 1-2.3 2.2C4.7 8 6.4 9 9 9M12 9c1.2-3.2 3.2-5 5-5 1.4 0 2.3 1 2.3 2.2C19.3 8 17.6 9 15 9"/></svg>`,
  spoon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6.5" rx="4.5" ry="5.5"/><path d="M12 12v10"/></svg>`
};

let mnTinCounter = 0;
// Tin illustration tints — a set of metals with the gold removed entirely: brushed steel,
// graphite, onyx and pearl. All read as light-on-dark against the marine→noir display panels.
const MN_TINTS = {
  amber: { top: "#CDD3DC", side: "#6E7A8A", label: "#17263F" }, // acier / brushed steel
  graphite: { top: "#8A8578", side: "#4A463C", label: "#F4EFE6" },
  onyx: { top: "#2A2620", side: "#181410", label: "#F4EFE6" },
  champagne: { top: "#F4EFE6", side: "#B8B2A4", label: "#17263F" } // nacre / pearl
};

/** Illustration vectorielle d'une boîte de caviar — pas de photo produit, teinte selon le type. */
function mnTinSVG(tint) {
  const c = MN_TINTS[tint] || MN_TINTS.onyx;
  const id = `mnTin${mnTinCounter++}`;
  return `
  <svg viewBox="0 0 160 160" class="h-full w-full" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="${id}-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${c.side}" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="${c.side}" stop-opacity="0.55"/>
      </linearGradient>
    </defs>
    <ellipse cx="80" cy="128" rx="46" ry="10" fill="#111110" opacity="0.35"/>
    <path d="M34 66 L34 108 A46 12 0 0 0 126 108 L126 66 Z" fill="url(#${id}-body)" stroke="${c.top}" stroke-opacity="0.4" stroke-width="1"/>
    <ellipse cx="80" cy="66" rx="46" ry="12" fill="${c.top}"/>
    <ellipse cx="80" cy="66" rx="46" ry="12" fill="none" stroke="#111110" stroke-opacity="0.15" stroke-width="1"/>
    <ellipse cx="80" cy="63" rx="34" ry="8" fill="none" stroke="${c.label}" stroke-opacity="0.55" stroke-width="1.4"/>
    <text x="80" y="67" text-anchor="middle" font-family="Cormorant, serif" font-size="9" letter-spacing="2" fill="${c.label}" fill-opacity="0.8">MARENOSTRUM</text>
  </svg>`;
}

/** Plain small-caps text label, no chip/fill — same quiet treatment as the homepage's
    "Best-seller" flag on the flagship product. */
function mnBadge(text) {
  if (!text) return "";
  return `<span class="absolute left-3 top-3 text-[10px] font-semibold uppercase tracking-widest2 text-ivoire z-10 [text-shadow:0_1px_6px_rgba(17,17,16,0.6)]">${text}</span>`;
}

/** Divise décoratif en forme de vague (Côte d'Azur) — se dessine au chargement. */
function mnWaveDivider(colorClass) {
  const cls = colorClass || "text-marine/50";
  return `<svg viewBox="0 0 400 24" class="mx-auto h-5 w-36 ${cls}" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 12 C 40 2, 80 22, 120 12 S 200 2, 240 12 S 320 22, 360 12 S 400 2 400 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="1000" stroke-dashoffset="1000" class="animate-drawline"/>
  </svg>`;
}

function mnProductCard(product) {
  return `
  <div class="card-product group" data-category="${product.category}">
    ${mnBadge(product.badge)}
    <div class="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-b from-marine to-noir">
      <image-slot id="mn-slot-${product.id}" shape="rect" placeholder="Photo produit" style="width:100%;height:100%"></image-slot>
    </div>
    <div class="flex flex-1 flex-col gap-3 pt-5">
      <a href="produit.html?id=${product.id}" class="stretched-link block">
        <h3 class="h-card group-hover:text-marine transition-colors">${product.name}</h3>
      </a>
      <p class="text-sm text-ink-200 leading-snug">${product.tagline}</p>
      <div class="mt-auto pt-3">
        <span class="text-xs uppercase tracking-wide text-ink-300 group-hover:text-marine transition-colors">Découvrir →</span>
      </div>
    </div>
  </div>`;
}

function mnHeader(active) {
  const link = (href, label, key) =>
    `<a href="${href}" class="mn-nav-link text-sm uppercase tracking-wide transition-colors duration-200 hover:text-marine ${
      active === key ? "text-marine is-active" : "text-ink-100"
    }">${label}</a>`;

  // On the homepage the header overlays the full-bleed hero image (transparent + light),
  // resolving to the standard solid light bar once scrolled past it (see .mn-hero-nav in CSS).
  const heroNav = active === "accueil" ? " mn-hero-nav" : "";

  return `
  <header class="nav-glass sticky top-0 z-40${heroNav}">
    <div class="container-page flex h-20 items-center justify-between">
      <a href="index.html" class="flex items-center">
        <img src="assets/img/logo-marenostrum-horizontal-noir.png" alt="MARENOSTRUM" class="w-auto" style="width:231px;height:44px" />
      </a>
      <nav class="hidden md:flex items-center gap-8">
        ${link("index.html", "Accueil", "accueil")}
        ${link("boutique.html", "Nos produits", "boutique")}
        ${link("a-propos.html", "La Maison", "apropos")}
        ${link("contact.html", "Contact", "contact")}
      </nav>
      <div class="flex items-center gap-4">
        <a href="contact.html" class="mn-nav-cta btn-quiet hidden sm:inline-flex">Demander un devis</a>
        <button id="mn-menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false" class="md:hidden h-6 w-6 text-ink-50">
          ${MN_ICONS.menu}
        </button>
      </div>
    </div>
    <nav id="mn-mobile-menu" class="mn-menu-panel md:hidden border-t border-ink-600/50 bg-ink-900/95">
      <div class="container-page flex flex-col gap-4 py-5">
        ${link("index.html", "Accueil", "accueil")}
        ${link("boutique.html", "Nos produits", "boutique")}
        ${link("a-propos.html", "La Maison", "apropos")}
        ${link("contact.html", "Contact", "contact")}
      </div>
    </nav>
  </header>`;
}

function mnFooter() {
  const year = new Date().getFullYear();
  return `
  <footer class="bg-noir text-ivoire mt-24">
    <div class="container-page grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p class="font-titre text-2xl text-ivoire mb-3">MAREN<span class="text-ivoire">O</span>STRUM</p>
        <p class="text-sm text-ivoire/70 leading-relaxed">Maison de caviar d'exception. Sélection exigeante, affinage traditionnel, fournisseur de la restauration et de l'hôtellerie.</p>
      </div>
      <div>
        <p class="eyebrow text-ivoire mb-4">Produits</p>
        <ul class="space-y-2.5 text-sm text-ivoire/70">
          <li><a class="hover:text-ivoire transition-colors" href="boutique.html">Tous les caviars</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="boutique.html?cat=accessoires">Accessoires</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="boutique.html?cat=epicerie">Épicerie fine</a></li>
        </ul>
      </div>
      <div>
        <p class="eyebrow text-ivoire mb-4">Informations</p>
        <ul class="space-y-2.5 text-sm text-ivoire/70">
          <li><a class="hover:text-ivoire transition-colors" href="a-propos.html">La Maison</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="contact.html">Contact</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="confidentialite.html">Confidentialité</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="mentions-legales.html">Mentions légales</a></li>
        </ul>
      </div>
      <div>
        <p class="eyebrow text-ivoire mb-4">Restez informé</p>
        <p class="text-sm text-ivoire/70 mb-4">Nouveautés, éditions limitées et accords de dégustation.</p>
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

/** Observe les éléments `.reveal` et les fait apparaître (fondu + léger décalage) à l'entrée dans le viewport. */
function mnInitReveal(root) {
  const scope = root || document;
  const elements = Array.from(scope.querySelectorAll(".reveal:not([data-reveal-bound])"));
  if (elements.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px" }
  );

  elements.forEach((el) => {
    el.dataset.revealBound = "true";
    observer.observe(el);
  });

  // Safety net: a very fast/instant scroll (flick, "End" key, bfcache restore) can in rare
  // cases move past an element between two rendered frames without ever registering an
  // intersection — reveal anything still hidden after a brief delay so content is never
  // stuck invisible. Short enough that it's imperceptible if it ever has to fire.
  setTimeout(() => {
    elements.forEach((el) => el.classList.add("is-visible"));
  }, 500);
}

/** Ajoute `.reveal` à chaque enfant d'un conteneur avec un décalage progressif (effet de cascade).
    Une base de 140ms avant le premier élément garde l'ensemble posé plutôt qu'instantané. */
function mnStagger(container, stepMs) {
  if (!container) return;
  const step = stepMs || 90;
  const base = 140;
  Array.from(container.children).forEach((child, i) => {
    child.classList.add("reveal");
    child.style.transitionDelay = `${Math.min(base + i * step, 700)}ms`;
  });
  mnInitReveal(container);
  mnInitTilt(container);
}

function mnPrefersReducedMotion() {
  return Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

function mnClamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/** Subtle pointer-driven 3D tilt on product cards — sets --tilt-x/--tilt-y consumed by the
    .card-product transform in input.css. Purely additive to the existing hover shine. */
function mnInitTilt(root) {
  if (mnPrefersReducedMotion()) return;
  const scope = root || document;
  const cards = Array.from(scope.querySelectorAll(".card-product:not([data-tilt-bound])"));
  const maxDeg = 6;

  cards.forEach((card) => {
    card.dataset.tiltBound = "true";
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-py * maxDeg).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(px * maxDeg).toFixed(2)}deg`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
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
 * Fond de page uni ivoire, commun à toutes les pages — la composition claire et aérée repose
 * sur ce fond ivoire par défaut ; les moments sombres (hero, pied de page, section « abysse »)
 * posent leur propre fond noir par-dessus. Injecté en position: fixed pour rester stable au
 * défilement. La photo océan n'habille plus tout le site (elle reste dans le hero d'accueil) :
 * un grand aplat photographique sombre irait à l'encontre du parti pris ivoire.
 * `.mn-grain` conserve un très léger grain (texture « argentique ») par-dessus l'ivoire.
 */
function mnPageBackground() {
  return `
    <div class="fixed inset-0 -z-10 bg-ivoire pointer-events-none" aria-hidden="true"></div>
    <div class="mn-grain" aria-hidden="true"></div>`;
}

/** Injecte fond/header/footer, câble le menu mobile, la newsletter (démo) et le badge panier. */
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

  mnInitReveal();
  mnInitMagnetic();
}

document.addEventListener("DOMContentLoaded", () => {
  mnMountLayout(document.body.dataset.page || "");
});
