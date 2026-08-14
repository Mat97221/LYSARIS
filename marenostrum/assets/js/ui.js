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
  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`,
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

/** Small-caps label on a solid marine chip — legible over the product photo regardless of
    what's under it (a plain text-shadow treatment worked against the old dark placeholder
    gradient but disappears against the ivoire-toned product photo now filling the slot). */
function mnBadge(text) {
  if (!text) return "";
  return `<span class="absolute left-3 top-3 z-10 bg-marine px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest2 text-ivoire">${text}</span>`;
}

/** Divise décoratif en forme de vague (Côte d'Azur) — se dessine au chargement. */
function mnWaveDivider(colorClass) {
  const cls = colorClass || "text-marine/50";
  return `<svg viewBox="0 0 400 24" class="mx-auto h-5 w-36 ${cls}" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 12 C 40 2, 80 22, 120 12 S 200 2, 240 12 S 320 22, 360 12 S 400 2 400 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="1000" stroke-dashoffset="1000" class="animate-drawline"/>
  </svg>`;
}

/**
 * Boîte de caviar dont le couvercle glisse vers la droite et s'estompe au survol, pour révéler
 * les grains dessous — souris uniquement (voir la garde `@media (hover: hover)` sur .mn-tin-lid
 * dans input.css) ; au tactile :hover peut rester "collé" après un tap, la boîte reste donc
 * simplement fermée sur mobile. Pur CSS, aucun JS pour l'interaction elle-même.
 *
 * `aspect-square h-full mx-auto` (plutôt que `h-full w-full`) fait correspondre la zone de survol
 * au carré réellement dessiné par `object-contain` (l'image source est carrée), pas à toute la
 * largeur du conteneur ambiant : le survol ne déclenche donc que quand le curseur est vraiment
 * sur la boîte, pas sur les marges de la vignette autour.
 *
 * Réutilisable : placer `<div id="un-id" data-tin-reveal></div>` n'importe où, puis dans le
 * script de la page, une fois le DOM prêt :
 *   document.querySelector("[data-tin-reveal]").outerHTML = mnTinReveal();
 * (voir les appels dans produit.html, le "pièce maîtresse" de index.html, et mnProductCard()
 * ci-dessous). Le conteneur direct doit garder `overflow-hidden` : le glissement dépasse très
 * largement sa propre largeur pour garantir que le disque du couvercle sorte entièrement du
 * cadre (voir le commentaire sur .mn-tin-lid dans input.css) — sans ce clip, le couvercle
 * déborderait sur le contenu voisin (texte, carte suivante dans une grille).
 */
function mnTinReveal() {
  return `
  <div class="mn-tin-reveal relative mx-auto aspect-square h-full">
    <img src="assets/img/boite-ouverte.png" alt="Boîte de caviar Marenostrum 50g" class="absolute inset-0 h-full w-full object-contain" />
    <img src="assets/img/couvercle.png" alt="" class="mn-tin-lid absolute inset-0 h-full w-full object-contain" />
  </div>`;
}

/**
 * `compact` (used by the homepage's "Nos produits les plus appréciés" section only — boutique.html
 * and the "vous aimerez aussi" grid on produit.html keep the default look): the product name runs
 * 20% smaller, and "Découvrir" becomes a centered navy-outline box instead of a plain text link.
 * That box is a <span>, not an <a> — the whole card is already a click target via the title's
 * .stretched-link overlay (position:absolute, painted above normal-flow siblings regardless of DOM
 * order), so a real link here would just sit under it, unclickable; a styled span avoids that trap
 * while still reading as a button.
 */
function mnProductCard(product, { compact = false } = {}) {
  const titleClass = compact
    ? "h-card text-[1rem] sm:text-[1.2rem] group-hover:text-marine transition-colors"
    : "h-card group-hover:text-marine transition-colors";
  const cta = compact
    ? `<div class="mt-auto pt-3 text-center">
        <span class="inline-flex items-center justify-center border border-marine/40 px-5 py-2 text-xs font-semibold uppercase tracking-widest2 text-marine transition-colors duration-200 ease-fluid group-hover:bg-marine group-hover:text-ivoire">Découvrir</span>
      </div>`
    : `<div class="mt-auto pt-3">
        <span class="text-xs uppercase tracking-wide text-ink-300 group-hover:text-marine transition-colors">Découvrir →</span>
      </div>`;
  return `
  <div class="card-product group" data-category="${product.category}">
    ${mnBadge(product.badge)}
    <a href="produit.html?id=${product.id}" aria-hidden="true" tabindex="-1" class="relative z-[5] flex h-56 items-center justify-center overflow-hidden bg-ivoire">
      ${mnTinReveal()}
    </a>
    <div class="flex flex-1 flex-col gap-3 pt-5">
      <a href="produit.html?id=${product.id}" class="stretched-link block">
        <h3 class="${titleClass}">${product.name}</h3>
      </a>
      <p class="text-sm text-ink-200 leading-snug">${product.tagline}</p>
      ${cta}
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

  // "Nos produits" opens a hover mega-menu (products.js loads before ui.js on every page, so
  // MARENOSTRUM_PRODUCTS/MARENOSTRUM_CATEGORIES are already defined here). The two caviar
  // categories are expanded into the actual caviar types available, each under its own column
  // heading, instead of one flat "Caviar d'esturgeon"/"Caviar de saumon" link; poissons fumés
  // and épicerie fine stay as single links in a third column. Kept open via CSS
  // (:hover/:focus-within on the wrapping .group) — no JS needed. The appearance uses a slow,
  // soft "water" easing (duration-1000, ease-water — see tailwind.config.js) instead of the
  // site's usual quick ease-fluid, so the panel surfaces gently rather than snapping open.
  // Panel is `fixed` (viewport-relative), not `absolute` under the trigger link — centering it
  // with `left-1/2 -translate-x-1/2` this way keeps it dead-center on the page regardless of
  // where "Nos produits" happens to fall in the nav row, and sidesteps the overflow risk an
  // absolute panel would have on either edge at that position. `top-20` matches the header's own
  // height (h-20) so the panel sits flush under it — accurate on every page: fixed nav-glass
  // itself on the homepage hero, and a `sticky top-0` bar elsewhere that's already at the top of
  // the viewport whenever this menu is reachable. Width still capped at `min(640px, 100vw -
  // 2rem)` as a safety margin on narrow viewports. Only shown at lg (1024px) and up — tablets
  // get the same compact, always-visible category links as phones, inside #mn-mobile-menu below
  // — arguably a better fit for touch anyway, since :hover doesn't behave consistently there.
  const caviarColumn = (categoryId, label) => {
    const items = MARENOSTRUM_PRODUCTS.filter((p) => p.category === categoryId)
      .map(
        (p) =>
          `<a href="produit.html?id=${p.id}" class="block py-1.5 text-sm text-ink-100 hover:text-marine transition-colors duration-200 ease-fluid">${p.name}</a>`
      )
      .join("");
    return `
      <div>
        <a href="boutique.html?cat=${categoryId}" class="eyebrow mb-4 block hover:underline">${label}</a>
        <div class="flex flex-col">${items}</div>
      </div>`;
  };

  const otherCategoryLinks = MARENOSTRUM_CATEGORIES.filter((c) => c.id === "poissons-fumes" || c.id === "epicerie-fine")
    .map(
      (c) =>
        `<a href="boutique.html?cat=${c.id}" class="block py-1.5 text-sm text-ink-100 hover:text-marine transition-colors duration-200 ease-fluid">${c.label}</a>`
    )
    .join("");

  const productsNav = `
      <div class="relative group">
        <a href="boutique.html" class="mn-nav-link inline-flex items-center gap-1.5 text-sm uppercase tracking-wide transition-colors duration-200 hover:text-marine ${
          active === "boutique" ? "text-marine is-active" : "text-ink-100"
        }">
          Nos produits
          <span class="h-3 w-3 transition-transform duration-1000 ease-water group-hover:rotate-180 group-focus-within:rotate-180">${MN_ICONS.chevronDown}</span>
        </a>
        <div class="fixed left-1/2 top-20 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-3 transition-all duration-1000 ease-water group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0">
          <div class="grid grid-cols-3 gap-10 bg-ivoire border border-ink-600/50 shadow-lifted p-8" style="width:min(640px, calc(100vw - 2rem))">
            ${caviarColumn("caviar-esturgeon", "Caviar d'esturgeon")}
            ${caviarColumn("caviar-saumon", "Caviar de saumon")}
            <div>
              <p class="eyebrow mb-4">Autres gammes</p>
              <div class="flex flex-col">${otherCategoryLinks}</div>
            </div>
          </div>
        </div>
      </div>`;

  return `
  <header class="nav-glass sticky top-0 z-40${heroNav}">
    <div class="container-page flex h-20 items-center justify-between">
      <a href="index.html" class="flex items-center">
        <img src="assets/img/logo-marenostrum-horizontal-noir.png" alt="MARENOSTRUM" class="w-auto" style="width:231px;height:44px" />
      </a>
      <nav class="hidden lg:flex items-center gap-8">
        ${link("index.html", "Accueil", "accueil")}
        ${productsNav}
        ${link("a-propos.html", "La Maison", "apropos")}
        ${link("contact.html", "Contact", "contact")}
      </nav>
      <div class="flex items-center gap-4">
        <a href="contact.html" class="mn-nav-cta btn-quiet hidden sm:inline-flex">Demander un devis</a>
        <button id="mn-menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false" class="lg:hidden h-6 w-6 text-ink-50">
          ${MN_ICONS.menu}
        </button>
      </div>
    </div>
    <nav id="mn-mobile-menu" class="mn-menu-panel lg:hidden border-t border-ink-600/50 bg-ink-900/95">
      <div class="container-page flex flex-col gap-4 py-5">
        ${link("index.html", "Accueil", "accueil")}
        <div class="flex flex-col gap-3">
          ${link("boutique.html", "Nos produits", "boutique")}
          <div class="ml-3 flex flex-col gap-2.5 border-l border-ink-600/50 pl-4">
            ${MARENOSTRUM_CATEGORIES.filter((c) => c.id !== "tous")
              .map(
                (c) =>
                  `<a href="boutique.html?cat=${c.id}" class="mn-nav-link text-xs uppercase tracking-wide text-ink-200 transition-colors duration-200 hover:text-marine">${c.label}</a>`
              )
              .join("")}
          </div>
        </div>
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
        <p class="text-sm text-ivoire/70 leading-relaxed">Maison de caviar et de délicatesses d'exception. Sélection exigeante, fournisseur de la restauration et de l'hôtellerie.</p>
      </div>
      <div>
        <p class="eyebrow text-ivoire mb-4">Produits</p>
        <ul class="space-y-2.5 text-sm text-ivoire/70">
          <li><a class="hover:text-ivoire transition-colors" href="boutique.html">Tous les produits</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="boutique.html?cat=caviar-esturgeon">Caviar d'esturgeon</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="boutique.html?cat=caviar-saumon">Caviar de saumon</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="boutique.html?cat=poissons-fumes">Poissons fumés</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="boutique.html?cat=epicerie-fine">Épicerie fine</a></li>
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
 * Fond de page commun à toutes les pages : une couleur ivoire unique et plate (pas de dégradé,
 * pas de photo) — le même blanc partout sur le site. Les sections à fond opaque (hero, pied de
 * page, bandes bg-ink-800/bg-noir) recouvrent simplement ce fond là où elles s'affichent.
 * Injecté en position: fixed pour rester stable au défilement. `.mn-grain` conserve un très
 * léger grain (texture « argentique ») par-dessus.
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
