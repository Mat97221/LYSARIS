/**
 * MARENOSTRUM — Composants d'interface partagés (header, footer, icônes SVG). Injection DOM
 * directe (pas de fetch) afin de fonctionner aussi bien via file:// que via un serveur.
 *
 * Maison de sélection de produits de la mer d'exception — un curateur, pas un fournisseur ni un
 * grossiste : aucun panier, aucun prix nulle part sur le site, aucun catalogue. Le seul appel à
 * l'action commercial est la demande de référencement professionnel (professionnels.html) ; il
 * n'y a ni devis automatisé ni bouton "panier" dans l'en-tête. L'en-tête est volontairement
 * sombre en permanence (identité marine-dominante) — plus de bascule clair/sombre au scroll.
 */

const MN_ICONS = {
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L19 7"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3 6.5 12 13l9-6.5"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3l1.5 4.5L7.5 10a12 12 0 0 0 6.5 6.5l1.5-2 4.5 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.3"/></svg>`
};

function mnHeader(active) {
  const link = (href, label, key) =>
    `<a href="${href}" class="mn-nav-link text-sm uppercase tracking-wide transition-colors duration-200 hover:text-brass ${
      active === key ? "text-brass is-active" : "text-ivoire/85"
    }">${label}</a>`;

  const navLinks = [
    ["index.html", "Accueil", "accueil"],
    ["la-maison.html", "La Maison", "maison"],
    ["la-collection.html", "La Collection", "collection"],
    ["provenance-exigence.html", "Provenance & Exigence", "provenance"],
    ["professionnels.html", "Professionnels", "professionnels"],
    ["contact.html", "Contact", "contact"]
  ];

  return `
  <header class="nav-glass sticky top-0 z-40">
    <div class="container-page flex h-20 items-center justify-between">
      <a href="index.html" class="flex items-center">
        <img src="assets/img/logo-marenostrum-horizontal-noir.png" alt="MARENOSTRUM" class="w-auto brightness-0 invert" style="width:231px;height:44px" />
      </a>
      <nav class="hidden lg:flex items-center gap-6">
        ${navLinks.map(([href, label, key]) => link(href, label, key)).join("")}
      </nav>
      <div class="flex items-center gap-4">
        <a href="professionnels.html" class="btn-brass hidden lg:inline-flex !px-5 !py-2.5 !min-h-0 !text-xs">Devenir maison partenaire</a>
        <button id="mn-menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false" class="lg:hidden h-6 w-6 text-ivoire">
          ${MN_ICONS.menu}
        </button>
      </div>
    </div>
    <nav id="mn-mobile-menu" class="mn-menu-panel lg:hidden border-t border-ivoire/10 bg-noir/95">
      <div class="container-page flex flex-col gap-4 py-5">
        ${navLinks.map(([href, label, key]) => link(href, label, key)).join("")}
        <a href="professionnels.html" class="btn-brass w-full text-center">Devenir maison partenaire</a>
      </div>
    </nav>
  </header>`;
}

function mnFooter() {
  const year = new Date().getFullYear();
  return `
  <footer class="bg-noir text-ivoire mt-24 border-t border-ivoire/10">
    <div class="container-page grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p class="font-titre font-semibold tracking-[0.18em] text-2xl text-ivoire mb-3">MAREN<span class="text-brass">O</span>STRUM</p>
        <p class="text-sm text-ivoire/70 leading-relaxed">Une maison de sélection de produits de la mer d'exception, signés et tracés jusqu'à la source.</p>
      </div>
      <div>
        <p class="eyebrow mb-4">La maison</p>
        <ul class="space-y-2.5 text-sm text-ivoire/70">
          <li><a class="hover:text-ivoire transition-colors" href="la-maison.html">La Maison</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="la-collection.html">La Collection</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="provenance-exigence.html">Provenance & Exigence</a></li>
        </ul>
      </div>
      <div>
        <p class="eyebrow mb-4">Informations</p>
        <ul class="space-y-2.5 text-sm text-ivoire/70">
          <li><a class="hover:text-ivoire transition-colors" href="professionnels.html">Devenir maison partenaire</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="contact.html">Contact</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="confidentialite.html">Confidentialité</a></li>
          <li><a class="hover:text-ivoire transition-colors" href="mentions-legales.html">Mentions légales</a></li>
        </ul>
      </div>
      <div>
        <p class="eyebrow mb-4">Restez informé</p>
        <p class="text-sm text-ivoire/70 mb-4">Sélections limitées et informations réservées à nos maisons partenaires.</p>
        <form id="mn-newsletter-form" class="flex gap-2" novalidate>
          <label for="mn-newsletter-email" class="sr-only">Adresse e-mail</label>
          <input id="mn-newsletter-email" type="email" required placeholder="Votre e-mail" class="input-field !py-2.5 text-sm !bg-noir !border-ivoire/25 !text-ivoire placeholder:!text-ivoire/40 focus:!border-brass" />
          <button type="submit" class="btn-brass !px-4 !py-2.5 shrink-0" aria-label="S'inscrire">${MN_ICONS.mail}</button>
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

/** Subtle pointer-driven 3D tilt on product/gamme cards — sets --tilt-x/--tilt-y consumed by
    the .card-product transform in input.css. Purely additive to the existing hover shine. */
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
 * Fond de secours commun à toutes les pages : une couleur ivoire unique et plate, sous tout le
 * reste. Le site étant marine-dominant, chaque section des pages de la maison couvre ce fond
 * avec son propre bg-marine/bg-noir explicite — cette couche n'est donc quasiment jamais visible
 * (juste un filet de sécurité, ex. un rebond élastique en bas de page sur mobile). Les deux pages
 * légales restées claires (mentions-légales, confidentialité) s'appuient dessus normalement.
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

  mnInitReveal();
  mnInitMagnetic();
}

document.addEventListener("DOMContentLoaded", () => {
  mnMountLayout(document.body.dataset.page || "");
});
