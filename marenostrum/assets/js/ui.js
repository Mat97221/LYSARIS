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
const MN_TINTS = {
  amber: { top: "#E4C664", side: "#8A6D1A", label: "#22201A" },
  graphite: { top: "#6B6252", side: "#3B372C", label: "#FBF6EA" },
  onyx: { top: "#2A2620", side: "#181410", label: "#C9A227" },
  champagne: { top: "#FBF6E4", side: "#8A6D1A", label: "#22201A" }
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
    <ellipse cx="80" cy="128" rx="46" ry="10" fill="#000" opacity="0.35"/>
    <path d="M34 66 L34 108 A46 12 0 0 0 126 108 L126 66 Z" fill="url(#${id}-body)" stroke="${c.top}" stroke-opacity="0.4" stroke-width="1"/>
    <ellipse cx="80" cy="66" rx="46" ry="12" fill="${c.top}"/>
    <ellipse cx="80" cy="66" rx="46" ry="12" fill="none" stroke="#000" stroke-opacity="0.15" stroke-width="1"/>
    <ellipse cx="80" cy="63" rx="34" ry="8" fill="none" stroke="${c.label}" stroke-opacity="0.55" stroke-width="1.4"/>
    <text x="80" y="67" text-anchor="middle" font-family="Cormorant, serif" font-size="9" letter-spacing="2" fill="${c.label}" fill-opacity="0.8">MARENOSTRUM</text>
  </svg>`;
}

function mnBadge(text) {
  if (!text) return "";
  return `<span class="absolute left-3 top-3 rounded-sm bg-gold-light px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-charcoal z-10">${text}</span>`;
}

/** Divise décoratif en forme de vague (Côte d'Azur) — se dessine au chargement. */
function mnWaveDivider(colorClass) {
  const cls = colorClass || "text-gold/50";
  return `<svg viewBox="0 0 400 24" class="mx-auto h-5 w-36 ${cls}" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 12 C 40 2, 80 22, 120 12 S 200 2, 240 12 S 320 22, 360 12 S 400 2 400 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="1000" stroke-dashoffset="1000" class="animate-drawline"/>
  </svg>`;
}

function mnProductCard(product) {
  const price = mnLowestPrice(product);
  return `
  <a href="produit.html?id=${product.id}" class="card-product group" data-category="${product.category}">
    ${mnBadge(product.badge)}
    <div class="relative flex h-48 items-center justify-center bg-gradient-to-b from-ink-600/40 to-ink-800 p-6">
      ${mnTinSVG(product.tint)}
    </div>
    <div class="flex flex-1 flex-col gap-2 p-5">
      <h3 class="font-display text-xl font-semibold text-ink-50 group-hover:text-gold transition-colors">${product.name}</h3>
      <p class="text-sm text-ink-200 leading-snug">${product.tagline}</p>
      <div class="mt-auto flex items-center justify-between pt-3">
        <span class="font-body text-sm text-ink-100">
          ${product.variants.length > 1 ? "dès " : ""}<span class="text-gold font-semibold">${mnFormatPrice(price)}</span>
        </span>
        <span class="flex items-center gap-1 text-xs uppercase tracking-wide text-ink-200 group-hover:text-gold transition-colors">
          Découvrir <span class="h-3.5 w-3.5">${MN_ICONS.chevronRight}</span>
        </span>
      </div>
    </div>
  </a>`;
}

const MN_CATEGORY_CARDS = [
  {
    label: "caviars",
    href: "boutique.html?cat=caviar",
    gradient: "linear-gradient(160deg, #2A2620 0%, #181410 55%, #0B0A08 100%)",
    icon: "tin"
  },
  {
    label: "coffrets",
    href: "boutique.html?cat=coffrets",
    gradient: "linear-gradient(160deg, #8A6D1A 0%, #5C4812 55%, #2A2010 100%)",
    icon: "gift"
  },
  {
    label: "accessoires",
    href: "boutique.html?cat=accessoires",
    gradient: "linear-gradient(160deg, #2C6E8E 0%, #1C4B60 55%, #0F2C38 100%)",
    icon: "spoon"
  }
];

/** Carte de catégorie plein cadre : fond illustré (pas de photo), nom en texte vertical, CTA. */
function mnCategoryCard(cat) {
  const artInner =
    cat.icon === "tin"
      ? `<div class="absolute -right-6 -bottom-6 h-56 w-56 opacity-30 md:h-72 md:w-72">${mnTinSVG("amber")}</div>`
      : `<span class="absolute -right-4 -bottom-4 h-48 w-48 text-white/15 md:h-64 md:w-64">${MN_ICONS[cat.icon]}</span>`;

  return `
  <a href="${cat.href}" class="cat-card group reveal">
    <div class="cat-card-art" style="background-image:${cat.gradient}">${artInner}</div>
    <div class="cat-card-overlay"></div>
    <h2
      class="relative z-10 font-display text-5xl font-medium transition-transform duration-500 ease-fluid group-hover:-translate-y-2 sm:text-6xl md:text-7xl lg:text-8xl"
      style="writing-mode: vertical-lr; transform: rotate(180deg);"
    >${cat.label}</h2>
    <span class="btn-shimmer relative z-10 mt-auto">découvrir ${cat.label}</span>
  </a>`;
}

function mnHeader(active) {
  const link = (href, label, key) =>
    `<a href="${href}" class="text-sm uppercase tracking-wide transition-colors duration-200 hover:text-gold ${
      active === key ? "text-gold" : "text-ink-100"
    }">${label}</a>`;

  return `
  <header class="nav-glass sticky top-0 z-40">
    <div class="container-page flex h-20 items-center justify-between">
      <a href="index.html" class="font-display text-2xl sm:text-3xl font-semibold tracking-wide text-ink-50">
        MAREN<span class="text-gold">O</span>STRUM
      </a>
      <nav class="hidden md:flex items-center gap-8">
        ${link("index.html", "Accueil", "accueil")}
        ${link("boutique.html", "Boutique", "boutique")}
        ${link("boutique.html?cat=coffrets", "Coffrets", "coffrets")}
        ${link("a-propos.html", "La Maison", "apropos")}
        ${link("contact.html", "Contact", "contact")}
      </nav>
      <div class="flex items-center gap-4">
        <a href="panier.html" aria-label="Voir le panier" class="relative h-6 w-6 text-ink-50 hover:text-gold transition-colors">
          ${MN_ICONS.cart}
          <span id="mn-cart-badge" class="badge-count hidden">0</span>
        </a>
        <button id="mn-menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false" class="md:hidden h-6 w-6 text-ink-50">
          ${MN_ICONS.menu}
        </button>
      </div>
    </div>
    <nav id="mn-mobile-menu" class="hidden md:hidden border-t border-ink-600/50 bg-ink-900/95">
      <div class="container-page flex flex-col gap-4 py-5">
        ${link("index.html", "Accueil", "accueil")}
        ${link("boutique.html", "Boutique", "boutique")}
        ${link("boutique.html?cat=coffrets", "Coffrets", "coffrets")}
        ${link("a-propos.html", "La Maison", "apropos")}
        ${link("contact.html", "Contact", "contact")}
      </div>
    </nav>
  </header>`;
}

function mnFooter() {
  const year = new Date().getFullYear();
  return `
  <footer class="border-t border-ink-600/60 bg-ink-800/60 mt-24">
    <div class="container-page grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p class="font-display text-2xl text-ink-50 mb-3">MAREN<span class="text-gold">O</span>STRUM</p>
        <p class="text-sm text-ink-200 leading-relaxed">Maison de caviar d'exception. Élevage responsable, affinage traditionnel, livraison réfrigérée en 24-48h partout en France métropolitaine.</p>
      </div>
      <div>
        <p class="eyebrow mb-4">Boutique</p>
        <ul class="space-y-2.5 text-sm text-ink-200">
          <li><a class="hover:text-gold transition-colors" href="boutique.html">Tous les caviars</a></li>
          <li><a class="hover:text-gold transition-colors" href="boutique.html?cat=coffrets">Coffrets &amp; cadeaux</a></li>
          <li><a class="hover:text-gold transition-colors" href="boutique.html?cat=accessoires">Accessoires</a></li>
          <li><a class="hover:text-gold transition-colors" href="boutique.html?cat=epicerie">Épicerie fine</a></li>
        </ul>
      </div>
      <div>
        <p class="eyebrow mb-4">Informations</p>
        <ul class="space-y-2.5 text-sm text-ink-200">
          <li><a class="hover:text-gold transition-colors" href="a-propos.html">La Maison</a></li>
          <li><a class="hover:text-gold transition-colors" href="contact.html">Contact</a></li>
          <li><a class="hover:text-gold transition-colors" href="cgv.html">Conditions générales de vente</a></li>
          <li><a class="hover:text-gold transition-colors" href="confidentialite.html">Confidentialité</a></li>
          <li><a class="hover:text-gold transition-colors" href="mentions-legales.html">Mentions légales</a></li>
        </ul>
      </div>
      <div>
        <p class="eyebrow mb-4">Restez informé</p>
        <p class="text-sm text-ink-200 mb-4">Nouveautés, éditions limitées et accords de dégustation.</p>
        <form id="mn-newsletter-form" class="flex gap-2" novalidate>
          <label for="mn-newsletter-email" class="sr-only">Adresse e-mail</label>
          <input id="mn-newsletter-email" type="email" required placeholder="Votre e-mail" class="input-field !py-2.5 text-sm" />
          <button type="submit" class="btn-gold !px-4 !py-2.5 shrink-0" aria-label="S'inscrire à la newsletter">${MN_ICONS.mail}</button>
        </form>
        <p id="mn-newsletter-feedback" class="mt-3 text-xs text-gold hidden" role="status"></p>
      </div>
    </div>
    <div class="border-t border-ink-600/60">
      <div class="container-page flex flex-col-reverse items-center gap-3 py-6 sm:flex-row sm:justify-between">
        <p class="text-xs text-ink-300">&copy; ${year} MARENOSTRUM. Tous droits réservés. Vente de caviar interdite aux mineurs.</p>
        <p class="text-xs text-ink-300">Site de démonstration — contenu et prix fictifs.</p>
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

/** Ajoute `.reveal` à chaque enfant d'un conteneur avec un décalage progressif (effet de cascade). */
function mnStagger(container, stepMs) {
  if (!container) return;
  const step = stepMs || 70;
  Array.from(container.children).forEach((child, i) => {
    child.classList.add("reveal");
    child.style.transitionDelay = `${Math.min(i * step, 560)}ms`;
  });
  mnInitReveal(container);
}

function mnUpdateCartBadge() {
  const badge = document.getElementById("mn-cart-badge");
  if (!badge) return;
  const count = MnCart.count();
  badge.textContent = String(count);
  badge.classList.toggle("hidden", count === 0);
}

/** Injecte header/footer, câble le menu mobile, la newsletter (démo) et le badge panier. */
function mnMountLayout(activePage) {
  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.outerHTML = mnHeader(activePage);
  if (footerMount) footerMount.outerHTML = mnFooter();

  const toggle = document.getElementById("mn-menu-toggle");
  const mobileMenu = document.getElementById("mn-mobile-menu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden");
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

  mnUpdateCartBadge();
  window.addEventListener("mn:cart-updated", mnUpdateCartBadge);

  const header = document.querySelector(".nav-glass");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  mnInitReveal();
}

document.addEventListener("DOMContentLoaded", () => {
  mnMountLayout(document.body.dataset.page || "");
});
