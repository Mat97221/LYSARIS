/**
 * MARENOSTRUM — Sections de la page d'accueil.
 * Chaque fonction retourne le HTML d'une section autonome, montée dans index.html via le motif
 * déjà utilisé ailleurs sur le site : un placeholder `<div data-mon-attribut></div>` statique,
 * remplacé au chargement par `document.querySelector("[data-mon-attribut]").outerHTML = mnHomeXxx();`.
 * Seul index.html charge ce fichier — les autres pages n'en ont pas besoin.
 *
 * Positionnement : maison de produits de la mer d'exception, exclusivement pour les
 * professionnels de la gastronomie et de la distribution — pas de catalogue exposé dès
 * l'arrivée, juste le hero et trois portes d'entrée courtes vers La Maison, La Table et
 * Notre savoir-faire.
 */

/* ------------------------------------------------------------------------------------------ *
 * 1) HERO — plein écran
 * ------------------------------------------------------------------------------------------ */
function mnHomeHero() {
  return `
  <section class="relative h-screen overflow-hidden bg-marine">
    <img src="assets/img/hero-mer.jpg" alt="Macro de glace pilée sur fond bleu marine" class="absolute inset-0 h-full w-full object-cover animate-slowzoom" fetchpriority="high" />
    <div class="absolute inset-0 pointer-events-none" style="background:linear-gradient(180deg, rgba(17,17,16,0.28) 0%, transparent 22%), linear-gradient(90deg, rgba(17,17,16,0.22) 0%, rgba(17,17,16,0.08) 42%, transparent 68%)"></div>
    <div class="container-page relative z-10 flex h-full flex-col justify-center">
      <p class="animate-fadeUp mb-4 text-xs font-semibold uppercase tracking-widest2 text-ivoire/80 sm:text-sm">Maison Marenostrum</p>
      <p class="animate-fadeUp [animation-delay:100ms] font-titre text-4xl italic text-ivoire sm:text-5xl lg:text-6xl">L'apogée des saveurs</p>
      <p class="animate-fadeUp [animation-delay:200ms] mt-6 max-w-lg text-base text-ivoire/90 sm:text-lg">Le caviar choisi, calibré, garanti — pour les tables qui ne pardonnent rien.</p>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 2) TROIS PORTES D'ENTRÉE — La Maison / La Table / Notre savoir-faire
 * ------------------------------------------------------------------------------------------ */
function mnHomeUnivers() {
  const blocs = [
    { href: "la-maison.html", label: "La Maison", photo: "assets/img/texture-mareyage.jpg", alt: "Textures de produits de la mer d'exception", text: "Une maison qui choisit, calibre et garantit chaque pièce avant qu'elle ne porte son nom." },
    { href: "la-table.html", label: "La Table", photo: "assets/img/grain-macro.webp", alt: "Vue macro du grain de caviar Marenostrum", text: "Caviar et produits de la mer d'exception, présentés sans prix, ouverts sur demande d'allocation." },
    { href: "notre-savoir-faire.html", label: "Notre savoir-faire", photo: "assets/img/gamme-boites.webp", alt: "Conditionnement des produits Marenostrum", text: "Sélection, traçabilité, chaîne du froid, conditionnement : ce qui garantit chaque expédition." }
  ];
  return `
  <section class="bg-ivoire">
    <div class="container-page py-24 lg:py-32">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
        ${blocs
          .map(
            (b, i) => `
        <a href="${b.href}" class="reveal [transition-delay:${i * 90}ms] mn-tile group block">
          <div class="flex h-64 items-center justify-center overflow-hidden bg-ink-800">
            <img src="${b.photo}" alt="${b.alt}" loading="lazy" class="h-full w-full object-cover" />
          </div>
          <div class="pt-4">
            <div class="flex items-center justify-between">
              <h3 class="h-card !text-xl group-hover:text-marine transition-colors">${b.label}</h3>
              <span class="h-4 w-4 shrink-0 text-marine transition-transform duration-200 ease-fluid group-hover:translate-x-1">${MN_ICONS.chevronRight}</span>
            </div>
            <p class="mt-2 text-sm text-ink-200 leading-relaxed">${b.text}</p>
          </div>
        </a>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}
