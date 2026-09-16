/**
 * MARENOSTRUM — Sections de la page d'accueil.
 * Chaque fonction retourne le HTML d'une section autonome, montée dans index.html via le motif
 * déjà utilisé ailleurs sur le site : un placeholder `<div data-mon-attribut></div>` statique,
 * remplacé au chargement par `document.querySelector("[data-mon-attribut]").outerHTML = mnHomeXxx();`.
 * Seul index.html charge ce fichier — les autres pages n'en ont pas besoin.
 *
 * L'accueil est un manifeste de marque, pas une vitrine : aucun catalogue, aucune tuile de
 * gamme, aucun prix. La page reste volontairement courte — hero (seul moment de mouvement
 * marqué, au chargement) → citation de positionnement → un unique renvoi, discret, vers la
 * Maison. Aucune animation au scroll (pas de `.reveal`/`mnStagger` ici).
 */

/* ------------------------------------------------------------------------------------------ *
 * 1) HERO — plein écran, la phrase de marque
 * ------------------------------------------------------------------------------------------ */
function mnHomeHero() {
  return `
  <section class="relative h-screen overflow-hidden bg-marine">
    <img src="assets/img/hero-mer.jpg" alt="" class="absolute inset-0 h-full w-full object-cover animate-slowzoom" fetchpriority="high" />
    <div class="absolute inset-0 bg-marine/70"></div>
    <div class="container-page relative z-10 flex h-full flex-col items-center justify-center text-center">
      <p class="animate-fadeUp mb-6 text-xs font-semibold uppercase tracking-widest2 text-brass sm:text-sm">Maison de sélection</p>
      <h1 class="animate-fadeUp [animation-delay:100ms] font-titre text-4xl italic leading-tight text-ivoire sm:text-6xl lg:text-7xl">Nous ne vendons pas la mer.<br />Nous la sélectionnons.</h1>
      <a href="la-maison.html" class="animate-fadeUp [animation-delay:220ms] mt-10 inline-flex items-center gap-2 border-b border-ivoire/40 pb-1 font-texte text-xs font-medium uppercase tracking-label text-ivoire transition-colors duration-200 ease-fluid hover:border-brass hover:text-brass">Découvrir la Maison →</a>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 2) MANIFESTE — citation de positionnement, fond marine, très aéré
 * ------------------------------------------------------------------------------------------ */
function mnHomeManifesto() {
  return `
  <section class="bg-marine">
    <div class="container-page py-24 text-center lg:py-32">
      <p class="h-quote mx-auto max-w-3xl">MARENOSTRUM sélectionne, travaille et signe des produits de la mer rares, en petites séries, aux côtés de producteurs identifiés. Nous répondons de la qualité de chaque pièce.</p>
      <div class="divider-brass mx-auto mt-12"></div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 3) RENVOI — un seul lien discret, pas un CTA commercial
 * ------------------------------------------------------------------------------------------ */
function mnHomeClosing() {
  const links = [
    ["la-collection.html", "La Collection"],
    ["provenance-exigence.html", "Provenance & Exigence"]
  ];
  return `
  <section class="bg-marine pb-24 lg:pb-32">
    <div class="container-page flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-center sm:gap-16">
      ${links
        .map(
          ([href, label]) =>
            `<a href="${href}" class="font-titre text-xl italic text-ivoire/90 transition-colors duration-200 hover:text-brass">${label} →</a>`
        )
        .join("")}
    </div>
  </section>`;
}
