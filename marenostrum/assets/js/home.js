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
 * 1) HERO — plein écran, hero-montagne.webp, silencieux (pas de texte superposé)
 * ------------------------------------------------------------------------------------------ */
function mnHomeHero() {
  return `
  <section class="relative min-h-screen overflow-hidden bg-marine">
    <img src="assets/img/hero-montagne.webp" alt="Paysage de lac de montagne brumeux au lever du jour" class="absolute inset-0 h-full w-full object-cover animate-slowzoom" fetchpriority="high" />
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 2) L'EAU VIVE — bande de photo alignée à droite, séparée du hero par de l'espace
 * ------------------------------------------------------------------------------------------ */
function mnHomeEauVive() {
  return `
  <section class="bg-ivoire">
    <div class="container-page grid grid-cols-1 items-center gap-8 pt-20 pb-24 lg:grid-cols-[1fr_1.6fr] lg:gap-12 lg:pt-28 lg:pb-32">
      <div class="reveal">
        <p class="eyebrow mb-4">L'eau vive</p>
        <p class="font-titre text-2xl italic text-ink-50 sm:text-3xl">Un caviar d'eau douce, sélectionné à sa fraîcheur.</p>
      </div>
      <div class="reveal [transition-delay:120ms] flex h-56 items-center justify-center overflow-hidden sm:h-72 lg:ml-auto lg:h-80 lg:w-full">
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
 * 4) LA GAMME / POUR LES PROFESSIONNELS — gamme-boites.webp, grand, centré, très aéré
 * ------------------------------------------------------------------------------------------ */
function mnHomeGammePro() {
  return `
  <section class="bg-ivoire">
    <div class="container-page py-24 text-center lg:py-32">
      <p class="reveal eyebrow mb-4">Pour les professionnels</p>
      <div class="reveal [transition-delay:100ms] mx-auto mb-12 flex h-72 max-w-4xl items-center justify-center overflow-hidden sm:h-[28rem]">
        <img src="assets/img/gamme-boites.webp" alt="Gamme de boîtes de caviar Marenostrum disposées sur une pierre claire" loading="lazy" class="h-full w-full object-cover" />
      </div>
      <p class="reveal [transition-delay:150ms] mx-auto mb-10 max-w-lg text-lg leading-relaxed text-ink-200">Formats de 30 g à 500 g. Restaurants, hôtels et grossistes.</p>
      <a href="contact.html" class="reveal [transition-delay:200ms] btn-navy inline-flex">Demander un devis</a>
    </div>
  </section>`;
}
