/**
 * MARENOSTRUM — Sections de la page d'accueil éditoriale.
 * Chaque fonction retourne le HTML d'une section autonome, montée dans index.html via le motif
 * déjà utilisé ailleurs sur le site : un placeholder `<div data-mon-attribut></div>` statique,
 * remplacé au chargement par `document.querySelector("[data-mon-attribut]").outerHTML = mnHomeXxx();`.
 * Seul index.html charge ce fichier — les autres pages n'en ont pas besoin.
 *
 * Structure volontairement resserrée (une idée par section, peu de texte, beaucoup de vide) pour
 * une page rapide et calme : hero silencieux → bande "L'eau vive" → sélection → gamme professionnels → pied de
 * page. Les 4 photos (hero-montagne.webp, eau-vive.webp, grain-macro.webp, gamme-boites.webp)
 * sont des fichiers nommés en dur dans assets/img/, encodés en WebP pour le poids (26-40% du
 * JPEG d'origine) — pas de mécanisme <image-slot> ici puisque ce ne sont pas des visuels en
 * attente. Pour remplacer l'une d'elles, déposez un nouveau fichier sous le même nom.
 */

/* ------------------------------------------------------------------------------------------ *
 * 1) HERO — hauteur réduite (70vh), une phrase courte centrée à gauche, nav lisible en surimpression
 * ------------------------------------------------------------------------------------------ */
function mnHomeHero() {
  return `
  <section class="relative h-[70vh] overflow-hidden bg-marine">
    <img src="assets/img/hero-montagne.webp" alt="Boîte de caviar Marenostrum posée sur un lit de galets" class="absolute inset-0 h-full w-full object-contain animate-slowzoom" fetchpriority="high" />
    <!-- Deux dégradés superposés : un voile en haut pour que la nav (transparente sur cette page)
         reste lisible quelle que soit la luminosité du ciel à cet endroit, et un voile horizontal
         à gauche pour la phrase, centrée verticalement — même logique de contraste AA que
         l'ancien voile bas, translatée à la nouvelle position du texte. -->
    <div class="absolute inset-0 pointer-events-none" style="background:linear-gradient(180deg, rgba(17,17,16,0.6) 0%, transparent 18%), linear-gradient(90deg, rgba(17,17,16,0.58) 0%, rgba(17,17,16,0.22) 42%, transparent 68%)"></div>
    <div class="container-page relative z-10 flex h-full items-center">
      <p class="animate-fadeUp [animation-delay:180ms] font-titre text-3xl italic text-ivoire sm:text-4xl">Une sélection sans compromis.</p>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 2) L'EAU VIVE — bande de photo alignée à droite, séparée du hero par de l'espace
 * ------------------------------------------------------------------------------------------ */
function mnHomeEauVive() {
  // Pas de container-page ici : cette section a besoin que sa colonne image atteigne le bord
  // droit réel du viewport, pas seulement celui de container-page (max-w-7xl) — impossible si
  // toute la grille est enfermée dans ce conteneur. La colonne texte recrée donc son propre
  // inset gauche (px-5 sm:px-8 lg:pl-10, mêmes valeurs que container-page) pour rester alignée
  // avec le reste du site, pendant que la colonne image garde un padding nul des deux côtés :
  // sur mobile/tablette (empilées, grid-cols-1) elle est donc bord à bord ; sur desktop
  // (lg:grid-cols-[1fr_1.6fr], sans gap ni padding à droite) son bord droit coïncide avec le
  // bord droit du viewport.
  return `
  <section class="bg-ivoire overflow-hidden">
    <div class="grid grid-cols-1 items-center gap-8 pt-28 pb-24 lg:grid-cols-[1fr_1.6fr] lg:items-stretch lg:gap-12 lg:pt-40 lg:pb-32">
      <div class="reveal px-5 sm:px-8 lg:pl-10 lg:pr-0">
        <p class="eyebrow mb-4">L'eau vive</p>
        <p class="font-titre text-2xl italic text-ink-50 sm:text-3xl">Un caviar d'eau douce, sélectionné à sa fraîcheur.</p>
      </div>
      <div class="reveal [transition-delay:120ms] flex h-56 items-center justify-center overflow-hidden sm:h-72 lg:h-auto">
        <img src="assets/img/eau-vive.webp" alt="Boîtes de caviar Marenostrum, vue rapprochée en rangée" loading="lazy" class="h-full w-full object-cover" />
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 3) LA SÉLECTION — deux colonnes, grain-macro.webp
 * ------------------------------------------------------------------------------------------ */
function mnHomeSelection() {
  return `
  <section class="bg-ivoire">
    <div class="container-page grid grid-cols-1 items-center gap-12 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
      <div class="reveal order-1 flex h-80 items-center justify-center overflow-hidden sm:h-[30rem]">
        <img src="assets/img/grain-macro.webp" alt="Vue macro plongeante du grain de caviar, boîte ouverte" loading="lazy" class="h-full w-full object-cover" />
      </div>
      <div class="reveal order-2 [transition-delay:150ms]">
        <p class="eyebrow mb-4">La sélection</p>
        <h2 class="h-section mb-6">Un grain qui ne souffre aucun compromis</h2>
        <p class="prose-copy mb-2">Chaque lot est observé et goûté avant d'entrer dans notre sélection.</p>
        <p class="prose-copy mb-8">L'affinage précis reste au cœur de notre métier.</p>
        <a href="a-propos.html" class="text-xs font-semibold uppercase tracking-widest2 text-marine hover:underline">Notre savoir-faire →</a>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 3bis) NOS ESPÈCES — grille de 3-4 cartes sobres, une par espèce/gamme, sans prix
 * ------------------------------------------------------------------------------------------ */
function mnHomeEspeces() {
  const ids = ["esturgeon-russe", "kaluga", "beluga", "keta"];
  const card = (product, i) => {
    if (!product) return "";
    return `
    <div class="reveal [transition-delay:${i * 80}ms] flex flex-col items-center text-center">
      <div class="mb-5 h-40 w-40 overflow-hidden rounded-full ring-1 ring-inset ring-ink-500/40 sm:h-44 sm:w-44">
        <img src="assets/img/produit-glacier.webp" alt="Boîte de caviar Marenostrum, ${product.name}" loading="lazy" class="h-full w-full object-cover" />
      </div>
      <h3 class="h-card mb-1">${product.name}</h3>
      ${product.species ? `<p class="mb-4 font-titre italic text-ink-300">${product.species}</p>` : `<p class="mb-4 text-sm text-ink-300">${product.tagline}</p>`}
      <a href="produit.html?id=${product.id}" class="text-xs font-semibold uppercase tracking-widest2 text-marine hover:underline">Voir la fiche →</a>
    </div>`;
  };
  const cards = ids.map(mnFindProduct).map(card).join("");
  return `
  <section class="bg-ivoire">
    <div class="container-page py-24 lg:py-32">
      <div class="reveal mx-auto mb-16 max-w-xl text-center">
        <p class="eyebrow mb-4">Nos espèces</p>
        <h2 class="h-section">Quatre profils, une même exigence</h2>
      </div>
      <div class="grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-4">
        ${cards}
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 4) LA GAMME / POUR LES PROFESSIONNELS — gamme-boites.webp, grand, centré, très aéré
 * ------------------------------------------------------------------------------------------ */
function mnHomeGammePro() {
  return `
  <section class="bg-ivoire">
    <p class="reveal eyebrow container-page pt-24 text-center lg:pt-32">Pour les professionnels</p>
    <div class="reveal [transition-delay:100ms] mt-8 flex h-[60vh] items-center justify-center overflow-hidden sm:h-[70vh]">
      <img src="assets/img/gamme-boites.webp" alt="Gamme de boîtes de caviar Marenostrum disposées sur une pierre claire" loading="lazy" class="h-full w-full object-cover" />
    </div>
    <div class="container-page pb-24 pt-10 text-center lg:pb-32">
      <p class="reveal [transition-delay:150ms] mx-auto mb-10 max-w-lg text-lg leading-relaxed text-ink-200">Formats de 30 g à 500 g. Restaurants, hôtels et grossistes.</p>
      <a href="contact.html" class="reveal [transition-delay:200ms] btn-navy inline-flex">Demander un devis</a>
    </div>
  </section>`;
}
