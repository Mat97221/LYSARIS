/**
 * MARENOSTRUM — Sections de la page d'accueil éditoriale.
 * Chaque fonction retourne le HTML d'une section autonome, montée dans index.html via le motif
 * déjà utilisé ailleurs sur le site : un placeholder `<div data-mon-attribut></div>` statique,
 * remplacé au chargement par `document.querySelector("[data-mon-attribut]").outerHTML = mnHomeXxx();`.
 * Seul index.html charge ce fichier — les autres pages n'en ont pas besoin.
 *
 * Structure volontairement resserrée (une idée par section, peu de texte, beaucoup de vide) pour
 * une page rapide et calme : hero → bande immersive → sélection → gamme professionnels → pied de
 * page. Les 4 photos (hero-montagne.jpg, eau-vive.jpg, grain-macro.jpg, gamme-boites.jpg) sont
 * des fichiers nommés en dur dans assets/img/ — à déposer par vos soins avec ces noms exacts, pas
 * de mécanisme <image-slot> ici puisque ce ne sont pas des visuels en attente.
 */

/* ------------------------------------------------------------------------------------------ *
 * 1) HERO — plein écran, hero-montagne.jpg, texte aligné à gauche sur voile dégradé
 * ------------------------------------------------------------------------------------------ */
function mnHomeHero() {
  return `
  <section class="relative min-h-screen flex flex-col overflow-hidden bg-marine">
    <img src="assets/img/hero-montagne.jpg" alt="Boîtes de caviar Marenostrum dans un paysage de lac de montagne enneigé" class="absolute inset-0 h-full w-full object-cover animate-slowzoom" fetchpriority="high" />
    <div class="absolute inset-0 pointer-events-none" style="background:linear-gradient(90deg, rgba(17,17,16,0.55) 0%, rgba(17,17,16,0.15) 45%, rgba(17,17,16,0.05) 70%)"></div>
    <div class="container-page relative z-10 flex flex-1 flex-col justify-center gap-8 py-32">
      <div class="max-w-xl">
        <p class="animate-fadeUp [animation-delay:100ms] eyebrow text-ivoire/80 [text-shadow:0_1px_12px_rgba(17,17,16,0.7)]">Sélectionneur · Affineur</p>
        <h1 class="h-hero text-ivoire animate-fadeUp [animation-delay:280ms] mt-6 [text-shadow:0_2px_24px_rgba(17,17,16,0.5)]">
          MARENOSTRUM — l'art du caviar, sans compromis.
        </h1>
        <a href="contact.html" class="btn-navy animate-fadeUp [animation-delay:520ms] mt-8 inline-flex">Demander un devis</a>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 2) BANDE IMMERSIVE — « L'eau vive », eau-vive.jpg plein largeur, texte minimal
 * ------------------------------------------------------------------------------------------ */
function mnHomeEauVive() {
  return `
  <section class="relative flex min-h-[60vh] items-end overflow-hidden bg-marine sm:min-h-[75vh]">
    <img src="assets/img/eau-vive.jpg" alt="Boîte de caviar Marenostrum dans un ruisseau d'eau vive, éclaboussures" loading="lazy" class="absolute inset-0 h-full w-full object-cover" />
    <div class="absolute inset-0 pointer-events-none" style="background:linear-gradient(180deg, transparent 50%, rgba(17,17,16,0.65) 100%)"></div>
    <div class="reveal container-page relative z-10 pb-16 sm:pb-20">
      <p class="eyebrow text-ivoire/85 [text-shadow:0_1px_12px_rgba(17,17,16,0.7)]">L'eau vive</p>
      <p class="mt-3 max-w-md font-titre text-2xl italic text-ivoire sm:text-3xl [text-shadow:0_2px_16px_rgba(17,17,16,0.6)]">Un caviar d'eau douce, sélectionné à sa fraîcheur.</p>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 3) LA SÉLECTION — deux colonnes, grain-macro.jpg
 * ------------------------------------------------------------------------------------------ */
function mnHomeSelection() {
  return `
  <section class="bg-ivoire">
    <div class="container-page grid grid-cols-1 items-center gap-12 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
      <div class="reveal order-1 flex h-80 items-center justify-center overflow-hidden sm:h-[30rem]">
        <img src="assets/img/grain-macro.jpg" alt="Vue macro plongeante du grain de caviar, boîte ouverte" loading="lazy" class="h-full w-full object-cover" />
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
 * 4) LA GAMME / POUR LES PROFESSIONNELS — gamme-boites.jpg, grand, centré, très aéré
 * ------------------------------------------------------------------------------------------ */
function mnHomeGammePro() {
  return `
  <section class="bg-ivoire">
    <div class="container-page py-24 text-center lg:py-32">
      <p class="reveal eyebrow mb-4">Pour les professionnels</p>
      <div class="reveal [transition-delay:100ms] mx-auto mb-12 flex h-72 max-w-4xl items-center justify-center overflow-hidden sm:h-[28rem]">
        <img src="assets/img/gamme-boites.jpg" alt="Gamme de boîtes de caviar Marenostrum disposées sur une pierre claire" loading="lazy" class="h-full w-full object-cover" />
      </div>
      <p class="reveal [transition-delay:150ms] mx-auto mb-10 max-w-lg text-lg leading-relaxed text-ink-200">Formats de 30 g à 500 g. Restaurants, hôtels et grossistes.</p>
      <a href="contact.html" class="reveal [transition-delay:200ms] btn-navy inline-flex">Demander un devis</a>
    </div>
  </section>`;
}
