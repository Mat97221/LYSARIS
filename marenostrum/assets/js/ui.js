/**
 * MARENOSTRUM — Composants d'interface partagés (en-tête, pied de page, curseur personnalisé,
 * écran de chargement, menu plein écran, icônes SVG). Injection DOM directe (pas de fetch) afin
 * de fonctionner aussi bien via file:// que via un serveur. Le scroll-reveal (`.anima--bottom-in`,
 * `.js-image-anime`) est géré entièrement par motion.js, jamais ici.
 *
 * Site vitrine B2B (maison de produits de la mer d'exception, exclusivement professionnels) :
 * aucun panier, aucun prix — chaque pièce de La Table porte une pastille de statut (Disponible /
 * Sur allocation / Ouverture prochaine) dont le seul CTA est "Demander une allocation", qui
 * renvoie vers le formulaire de référencement unique (accueil, section #contact).
 */

const MN_ICONS = {
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>`,
  box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5 12 4l8.5 4.5V16L12 20.5 3.5 16z"/><path d="M3.5 8.5 12 13l8.5-4.5M12 13v7.5"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="7" width="12" height="9"/><path d="M13.5 10h4l3 3v3h-7z"/><circle cx="5.5" cy="18" r="1.6"/><circle cx="16.5" cy="18" r="1.6"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20c8 0 14-6 16-16-10 0-16 6-16 16z"/><path d="M4 20c2-6 5-9 11-12"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L19 7"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3 6.5 12 13l9-6.5"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3l1.5 4.5L7.5 10a12 12 0 0 0 6.5 6.5l1.5-2 4.5 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.3"/></svg>`
};

/**
 * En-tête. Un déclencheur unique ("Menu") ouvre le menu plein écran (mnFullMenu) à tous les
 * gabarits — plus de liste de liens toujours visible ni de panneau mobile séparé. Sur l'accueil
 * (data-page="accueil"), l'en-tête recouvre le hero en transparent (voir .mn-hero-nav) et repasse
 * à la barre claire pleine une fois le hero dépassé.
 */
function mnHeader(active) {
  const isOnePager = active === "accueil";
  const prefix = isOnePager ? "" : "index.html";
  const heroNav = isOnePager ? " mn-hero-nav" : "";

  return `
  <header class="nav-glass sticky top-0 z-40${heroNav}">
    <div class="container-page flex h-20 items-center justify-between">
      <a href="${prefix || "index.html"}" class="flex items-center" data-hover="Accueil">
        <img src="assets/img/logo-marenostrum-horizontal-noir.png" alt="MARENOSTRUM" class="w-auto" style="width:231px;height:44px" />
      </a>
      <div class="flex items-center gap-6">
        <a href="${prefix}#contact" class="btn-navy hidden lg:inline-flex !px-5 !py-2.5 !min-h-0 !text-xs"${isOnePager ? " data-scroll-link" : ""} data-hover="Contact">Demander un référencement</a>
        <button id="mn-menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false" data-hover="Menu" class="flex items-center gap-2">
          <span id="mn-menu-label" class="text-xs font-medium uppercase tracking-label">Menu</span>
          <span class="h-5 w-5">${MN_ICONS.menu}</span>
        </button>
      </div>
    </div>
  </header>`;
}

function mnFooter() {
  const year = new Date().getFullYear();
  const isOnePager = document.body.dataset.page === "accueil";
  const prefix = isOnePager ? "" : "index.html";
  return `
  <footer data-theme="dark" class="mt-24" style="background-color:var(--color-bg); color:var(--color-text)">
    <div class="container-page grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p class="font-texte font-medium tracking-[0.18em] text-2xl mb-3">MARENOSTRUM</p>
        <p class="text-sm opacity-70 leading-relaxed">Maison de produits de la mer d'exception pour les professionnels — caviar et pièces rares, choisis, calibrés et garantis.</p>
      </div>
      <div>
        <p class="eyebrow mb-4">Découvrir</p>
        <ul class="space-y-2.5 text-sm opacity-70">
          <li><a class="hover:opacity-100 transition-opacity" href="${prefix}#maison" data-hover="Voir">La Maison</a></li>
          <li><a class="hover:opacity-100 transition-opacity" href="${prefix}#table" data-hover="Voir">La Table</a></li>
          <li><a class="hover:opacity-100 transition-opacity" href="${prefix}#savoir-faire" data-hover="Voir">Notre savoir-faire</a></li>
        </ul>
      </div>
      <div>
        <p class="eyebrow mb-4">Informations</p>
        <ul class="space-y-2.5 text-sm opacity-70">
          <li><a class="hover:opacity-100 transition-opacity" href="${prefix}#contact">Demander un référencement</a></li>
          <li><a class="hover:opacity-100 transition-opacity" href="fiche-technique-produit.html">Fiche technique produit</a></li>
          <li><a class="hover:opacity-100 transition-opacity" href="conditions-professionnelles.html">Conditions professionnelles</a></li>
          <li><a class="hover:opacity-100 transition-opacity" href="confidentialite.html">Confidentialité</a></li>
          <li><a class="hover:opacity-100 transition-opacity" href="mentions-legales.html">Mentions légales</a></li>
        </ul>
      </div>
      <div>
        <p class="eyebrow mb-4">Restez informé</p>
        <p class="text-sm opacity-70 mb-4">Disponibilités, arrivages et informations d'approvisionnement.</p>
        <form id="mn-newsletter-form" class="flex gap-2" novalidate>
          <label for="mn-newsletter-email" class="sr-only">Adresse e-mail</label>
          <input id="mn-newsletter-email" type="email" required placeholder="Votre e-mail" class="input-field !py-2.5 text-sm" />
          <button type="submit" class="btn-navy !px-4 !py-2.5 shrink-0" aria-label="S'inscrire à la newsletter" data-hover="Envoyer">${MN_ICONS.mail}</button>
        </form>
        <p id="mn-newsletter-feedback" class="mt-3 text-xs hidden" role="status"></p>
      </div>
    </div>
    <div class="border-t" style="border-color:var(--color-border)">
      <div class="container-page flex flex-col-reverse items-center gap-3 py-6 sm:flex-row sm:justify-between">
        <p class="text-xs opacity-50">&copy; ${year} MARENOSTRUM. Tous droits réservés. Vente de caviar interdite aux mineurs.</p>
        <p class="text-xs opacity-50">Site de démonstration — contenu fictif.</p>
      </div>
    </div>
  </footer>`;
}

/**
 * Menu plein écran — remplace l'ancienne liste de liens et le panneau mobile. Quatre entrées,
 * chacune associée à une image verticale 400×600 qui apparaît au survol (desktop uniquement,
 * voir .mn-fullmenu-preview). Aucune des quatre images n'existe encore : chaque emplacement est
 * laissé vide, annoté en commentaire, l'espace réservé via aspect-ratio. Libellé dupliqué dans
 * deux <span> pour l'effet de substitution verticale au survol (voir .mn-fullmenu-link en CSS).
 */
function mnFullMenu(active) {
  const isOnePager = active === "accueil";
  const prefix = isOnePager ? "" : "index.html";

  const items = [
    { href: "#maison", label: "La Maison", key: "maison", scroll: isOnePager },
    { href: "#table", label: "La Table", key: "table", scroll: isOnePager },
    { href: "#savoir-faire", label: "Notre savoir-faire", key: "savoir-faire", scroll: isOnePager },
    { href: "#contact", label: "Contact", key: "contact", scroll: isOnePager }
  ];

  const link = (item) => {
    const href = item.href.startsWith("#") ? `${prefix}${item.href}` : item.href;
    return `
    <li class="mn-fullmenu-item border-t first:border-t-0" style="border-color:var(--color-border)" data-preview="${item.key}">
      <a href="${href}"${item.scroll ? " data-scroll-link data-fullmenu-link" : " data-fullmenu-link"} class="mn-fullmenu-link block py-4 text-4xl sm:text-5xl lg:text-6xl">
        <span>${item.label}</span>
        <span aria-hidden="true">${item.label}</span>
      </a>
    </li>`;
  };

  return `
  <div id="mn-fullmenu" class="mn-fullmenu" aria-hidden="true">
    <div class="container-page flex h-20 items-center justify-between">
      <span class="font-texte font-medium tracking-[0.18em] text-lg" style="color:#F4EFE6">MARENOSTRUM</span>
      <button id="mn-fullmenu-close" aria-label="Fermer le menu" data-hover="Fermer" class="flex items-center gap-2" style="color:#F4EFE6">
        <span class="text-xs font-medium uppercase tracking-label">Fermer</span>
        <span class="h-5 w-5">${MN_ICONS.close}</span>
      </button>
    </div>
    <nav class="container-page pt-sm pb-lg">
      <ul>
        ${items.map(link).join("")}
      </ul>
    </nav>
    <div class="container-page pb-lg flex items-center justify-between">
      <div class="mn-lang-switch flex items-center gap-3">
        <button type="button" class="is-active" data-lang="fr">FR</button>
        <span style="color:#2A3A55">/</span>
        <button type="button" data-lang="en">EN</button>
      </div>
      <a href="${prefix}#contact"${isOnePager ? " data-scroll-link data-fullmenu-link" : " data-fullmenu-link"} class="btn-outline !text-xs" style="border-color:#D9BF85; color:#D9BF85" data-hover="Écrire">Demander un référencement</a>
    </div>
    <!-- Aperçu image au survol (desktop) : une image verticale 400×600 par entrée, permutée par
         mnInitFullMenu() selon l'entrée survolée. Les quatre photos n'existent pas encore :
         [IMAGE — Menu, entrée « La Maison » : macro d'un grain de caviar unique, très serrée,
          fond bleu nuit #17263F, 400×600]
         [IMAGE — Menu, entrée « La Table » : flat lay d'une boîte Marenostrum fermée vue du
          dessus, fond gris-bleu mat, ombre dure, 400×600]
         [IMAGE — Menu, entrée « Notre savoir-faire » : macro d'une cuillère de nacre chargée de
          caviar, lumière dure latérale, 400×600]
         [IMAGE — Menu, entrée « Contact » : littoral granitique breton, cadrage vertical, sans
          ciel spectaculaire, 400×600] -->
    <div class="mn-fullmenu-preview" style="aspect-ratio:400/600; background-color:#0E1829" data-preview-maison></div>
    <div class="mn-fullmenu-preview" style="aspect-ratio:400/600; background-color:#0E1829" data-preview-table></div>
    <div class="mn-fullmenu-preview" style="aspect-ratio:400/600; background-color:#0E1829" data-preview-savoir-faire></div>
    <div class="mn-fullmenu-preview" style="aspect-ratio:400/600; background-color:#0E1829" data-preview-contact></div>
  </div>`;
}

function mnInitFullMenu() {
  const menu = document.getElementById("mn-fullmenu");
  const toggle = document.getElementById("mn-menu-toggle");
  const closeBtn = document.getElementById("mn-fullmenu-close");
  if (!menu || !toggle) return;

  const setOpen = (open) => {
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
  if (closeBtn) closeBtn.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) setOpen(false);
  });
  menu.querySelectorAll("[data-fullmenu-link]").forEach((a) => a.addEventListener("click", () => setOpen(false)));

  // Aperçu image au survol : chaque <li data-preview="clé"> active le panneau [data-preview-clé].
  menu.querySelectorAll("[data-preview]").forEach((item) => {
    const key = item.dataset.preview;
    const preview = menu.querySelector(`[data-preview-${key}]`);
    if (!preview) return;
    item.addEventListener("mouseenter", () => {
      menu.querySelectorAll(".mn-fullmenu-preview").forEach((p) => p.classList.remove("is-active"));
      preview.classList.add("is-active");
    });
  });

  // Sélecteur de langue — présentation seulement, aucun contenu traduit sur ce site de démo.
  menu.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      menu.querySelectorAll("[data-lang]").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });
}

/**
 * Curseur personnalisé — un disque plein qui suit le pointeur, s'agrandit et affiche le libellé
 * porté par `data-hover="…"` sur l'élément survolé. Désactivé sur tactile : la classe qui masque
 * le curseur système n'est posée qu'après confirmation d'un pointeur fin (`(pointer: fine)`), et
 * seul un `mousemove` réel l'active, jamais un simple `matchMedia`.
 */
function mnInitCursor() {
  if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;

  const cursor = document.createElement("div");
  cursor.className = "mn-cursor";
  cursor.innerHTML = `<span></span>`;
  document.body.appendChild(cursor);
  const label = cursor.querySelector("span");

  let activated = false;
  const activate = () => {
    if (activated) return;
    activated = true;
    document.documentElement.classList.add("has-custom-cursor");
  };

  window.addEventListener(
    "mousemove",
    (e) => {
      activate();
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    },
    { passive: true }
  );

  document.addEventListener("mouseover", (e) => {
    const target = e.target.closest("[data-hover]");
    if (!target) {
      cursor.classList.remove("is-hovering");
      label.textContent = "";
      return;
    }
    cursor.classList.add("is-hovering");
    label.textContent = target.dataset.hover;
  });
}

/**
 * Écran de chargement — voile plein écran au tout premier chargement du site dans cet onglet
 * (sessionStorage évite de le rejouer à chaque navigation interne). Symbole et mot du logo,
 * deux éléments distincts, glissent l'un vers l'autre puis l'ensemble s'efface vers le hero.
 */
function mnInitLoader() {
  if (sessionStorage.getItem("mn-loader-seen")) return;
  sessionStorage.setItem("mn-loader-seen", "1");

  const loader = document.createElement("div");
  loader.className = "mn-loader";
  loader.innerHTML = `<span class="mn-loader-mark" aria-hidden="true"></span><span class="mn-loader-word">Marenostrum</span>`;
  document.body.appendChild(loader);
  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => requestAnimationFrame(() => loader.classList.add("is-ready")));

  const done = () => {
    document.body.style.overflow = "";
    loader.classList.add("is-done");
    setTimeout(() => loader.remove(), 650);
  };
  setTimeout(done, mnPrefersReducedMotion() ? 200 : 1400);
}

function mnPrefersReducedMotion() {
  return Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

/**
 * Fond de page commun à toutes les pages : un aplat --color-bg (pas de dégradé, pas de photo),
 * en position fixed pour rester stable au défilement. `.mn-grain` conserve un très léger grain.
 */
function mnPageBackground() {
  return `
    <div class="fixed inset-0 -z-10 pointer-events-none" style="background-color:var(--color-bg)" aria-hidden="true"></div>
    <div class="mn-grain" aria-hidden="true"></div>`;
}

/** Injecte fond/en-tête/menu plein écran/pied de page, câble la newsletter (démo). */
function mnMountLayout(activePage) {
  const bgMount = document.getElementById("site-bg");
  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  if (bgMount) bgMount.outerHTML = mnPageBackground();
  if (headerMount) headerMount.outerHTML = mnHeader(activePage) + mnFullMenu(activePage);
  if (footerMount) footerMount.outerHTML = mnFooter();

  mnInitFullMenu();
  mnInitCursor();
  mnInitLoader();

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
    const isHeroNav = header.classList.contains("mn-hero-nav");
    const threshold = () => (isHeroNav ? window.innerHeight - 100 : 8);
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > threshold());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mnMountLayout(document.body.dataset.page || "");
});
