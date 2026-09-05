/**
 * MARENOSTRUM — Sections de la page d'accueil éditoriale.
 * Chaque fonction retourne le HTML d'une section autonome, montée dans index.html via le motif
 * déjà utilisé ailleurs sur le site : un placeholder `<div data-mon-attribut></div>` statique,
 * remplacé au chargement par `document.querySelector("[data-mon-attribut]").outerHTML = mnHomeXxx();`.
 * Seul index.html charge ce fichier — les autres pages n'en ont pas besoin.
 *
 * Positionnement : négoce de produits de la mer pour les professionnels (modèle demande de
 * devis, aucun prix affiché) — le caviar reste une signature du catalogue mais n'est plus le
 * sujet exclusif de la page. Structure : hero → citation de marque → teaser "Notre approche" →
 * bande sombre "sourcing direct" (.mn-abyss) → tuiles des gammes (.mn-tile) → teaser caviar →
 * engagements → CTA devis.
 */

/* ------------------------------------------------------------------------------------------ *
 * 1) HERO — plein écran, accroche B2B produits de la mer
 * ------------------------------------------------------------------------------------------ */
function mnHomeHero() {
  // Photo : hero-montagne.webp (grain de caviar macro) conservée pour ne rien casser en
  // attendant une vraie photo "produits de la mer" (criée, mareyeur, étal) — à remplacer.
  return `
  <section class="relative h-screen overflow-hidden bg-marine">
    <!-- TODO photo : remplacer par une photo "produits de la mer" (criée, mareyeur, étal réfrigéré) -->
    <img src="assets/img/hero-montagne.webp" alt="Sélection de produits de la mer Marenostrum" class="absolute inset-0 h-full w-full object-cover animate-slowzoom" fetchpriority="high" />
    <div class="absolute inset-0 pointer-events-none" style="background:linear-gradient(180deg, rgba(17,17,16,0.6) 0%, transparent 18%), linear-gradient(90deg, rgba(17,17,16,0.58) 0%, rgba(17,17,16,0.22) 42%, transparent 68%)"></div>
    <div class="container-page relative z-10 flex h-full flex-col justify-center">
      <p class="animate-fadeUp mb-4 text-xs font-semibold uppercase tracking-widest2 text-ivoire/80 sm:text-sm">Négociants en produits de la mer</p>
      <p class="animate-fadeUp [animation-delay:100ms] font-titre text-4xl italic text-ivoire sm:text-5xl lg:text-6xl">De la criée à votre cuisine, sans détour.</p>
      <p class="animate-fadeUp [animation-delay:200ms] mt-6 max-w-lg text-base text-ivoire/90 sm:text-lg">Poissons, crustacés, coquillages et caviar, sélectionnés pour les professionnels de la restauration et de l'hôtellerie.</p>
      <div class="animate-fadeUp [animation-delay:280ms] mt-9 flex flex-wrap items-center gap-4">
        <a href="devis.html" class="btn-navy">Demander un devis</a>
        <a href="produits-de-la-mer.html" class="btn-quiet !text-ivoire !border-ivoire/40 hover:!text-ivoire hover:!border-ivoire">Découvrir nos produits</a>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 2) CITATION DE MARQUE — bloc h-quote, fond ivoire, très aéré
 * ------------------------------------------------------------------------------------------ */
function mnHomeQuote() {
  return `
  <section class="bg-ivoire">
    <div class="container-page py-24 text-center lg:py-32">
      <p class="reveal h-quote mx-auto max-w-3xl">« Mare Nostrum, notre mer. » Un retour à ce que nous savons faire : choisir, sur les quais, ce qui mérite votre table.</p>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 3) TEASER NOTRE APPROCHE — deux colonnes, photo (image-slot) + texte
 * ------------------------------------------------------------------------------------------ */
function mnHomeApproche() {
  return `
  <section class="bg-ivoire">
    <div class="container-page grid grid-cols-1 items-center gap-12 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
      <div class="reveal order-2 lg:order-1">
        <p class="eyebrow mb-4">Notre approche</p>
        <h2 class="h-section mb-6">Une chaîne plus courte, un produit plus frais</h2>
        <p class="prose-copy mb-2">Criée, mareyeur, grossiste, grossiste régional, restaurateur : chaque intermédiaire ajoute un délai et éloigne le produit de son origine.</p>
        <p class="prose-copy mb-8">Nous raccourcissons cette chaîne — des mareyeurs sélectionnés directement sur les côtes, une origine claire, une livraison plus rapide.</p>
        <a href="notre-approche.html" class="text-xs font-semibold uppercase tracking-widest2 text-marine hover:underline">En savoir plus →</a>
      </div>
      <div class="reveal [transition-delay:120ms] order-1 lg:order-2 flex h-72 items-center justify-center overflow-hidden bg-ink-800 sm:h-96">
        <image-slot id="mn-home-approche-photo" shape="rect" alt="Mareyeur sélectionnant des produits de la mer sur les quais" placeholder="Photo : quai de criée, mareyeur, étal réfrigéré" style="width:100%;height:100%"></image-slot>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 4) SOURCING DIRECT — bande sombre .mn-abyss, la seule note sombre de la page
 * ------------------------------------------------------------------------------------------ */
function mnHomeSourcing() {
  const zones = ["Bretagne", "Boulogne-sur-Mer", "Écosse"];
  return `
  <section class="mn-abyss">
    <div class="container-page py-24 text-center lg:py-32">
      <p class="reveal eyebrow mb-4 !text-ivoire/70">Sourcing direct</p>
      <h2 class="reveal h-section mb-8 text-ivoire">Sélectionné sur les côtes, pas sur catalogue</h2>
      <p class="reveal [transition-delay:100ms] prose-copy mx-auto mb-12 !text-ivoire/80">Nous travaillons avec des mareyeurs choisis directement sur leurs zones de débarque, pour une origine que nous pouvons toujours nommer.</p>
      <div class="reveal [transition-delay:180ms] flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        ${zones
          .map(
            (z) =>
              `<span class="font-titre text-xl italic text-ivoire sm:text-2xl">${z}</span>`
          )
          .join(`<span class="hidden h-1 w-1 rounded-full bg-ivoire/40 sm:inline-block" aria-hidden="true"></span>`)}
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 5) TUILES DES GAMMES — .mn-tile, 3 tuiles vers produits-de-la-mer.html
 * ------------------------------------------------------------------------------------------ */
function mnHomeGammes() {
  const gammes = [
    { id: "mn-home-tile-nobles", href: "produits-de-la-mer.html#poissons-nobles", label: "Poissons nobles", placeholder: "Photo : bar de ligne, turbot, Saint-Pierre" },
    { id: "mn-home-tile-criee", href: "produits-de-la-mer.html#poissons-criee", label: "Poissons de criée", placeholder: "Photo : arrivage du jour, caisses de criée" },
    { id: "mn-home-tile-crustaces", href: "produits-de-la-mer.html#crustaces-coquillages", label: "Crustacés & coquillages", placeholder: "Photo : crustacés et coquillages sur glace" }
  ];
  return `
  <section class="bg-ivoire">
    <div class="container-page py-24 lg:py-32">
      <div class="reveal mx-auto mb-16 max-w-xl text-center">
        <p class="eyebrow mb-4">Nos gammes</p>
        <h2 class="h-section">Trois familles, un même niveau d'exigence</h2>
      </div>
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
        ${gammes
          .map(
            (g, i) => `
        <a href="${g.href}" class="reveal [transition-delay:${i * 90}ms] mn-tile group block">
          <div class="flex h-64 items-center justify-center overflow-hidden bg-ink-800">
            <image-slot id="${g.id}" shape="rect" alt="${g.label}" placeholder="${g.placeholder}" style="width:100%;height:100%"></image-slot>
          </div>
          <div class="flex items-center justify-between pt-4">
            <h3 class="h-card !text-xl group-hover:text-marine transition-colors">${g.label}</h3>
            <span class="h-4 w-4 shrink-0 text-marine transition-transform duration-200 ease-fluid group-hover:translate-x-1">${MN_ICONS.chevronRight}</span>
          </div>
        </a>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 6) TEASER CAVIAR — signature du catalogue, photo réelle
 * ------------------------------------------------------------------------------------------ */
function mnHomeCaviar() {
  return `
  <section class="bg-ivoire">
    <div class="container-page grid grid-cols-1 items-center gap-12 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
      <div class="reveal order-1 flex h-80 items-center justify-center overflow-hidden sm:h-[28rem]">
        <img src="assets/img/grain-macro.webp" alt="Vue macro du grain de caviar Marenostrum" loading="lazy" class="h-full w-full object-cover" />
      </div>
      <div class="reveal order-2 [transition-delay:150ms]">
        <p class="eyebrow mb-4">Le caviar, notre exception</p>
        <h2 class="h-section mb-6">La même exigence, portée à son sommet</h2>
        <p class="prose-copy mb-2">Osciètre, Beluga, Baeri, Sevruga : quatre espèces sélectionnées pour leur calibrage et leur régularité.</p>
        <p class="prose-copy mb-8">Affinage Malossol, traçabilité CITES complète, lot par lot.</p>
        <a href="caviar.html" class="text-xs font-semibold uppercase tracking-widest2 text-marine hover:underline">Découvrir notre caviar →</a>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 7) ENGAGEMENTS — 3 fiches (Fraîcheur / Traçabilité / Sur-mesure)
 * ------------------------------------------------------------------------------------------ */
function mnHomeEngagements() {
  return `
  <section class="border-y border-ink-600/50 bg-ink-800">
    <div class="container-page py-24 lg:py-32">
      <p class="eyebrow mb-4 text-center reveal">Nos engagements</p>
      <h2 class="h-section mb-16 text-center reveal">Ce qui ne se négocie pas</h2>
      <div id="mn-home-engagements-grid" class="grid grid-cols-1 gap-12 sm:grid-cols-3">
        <div>
          <span class="mb-5 flex h-9 w-9 text-marine" id="mn-home-engagement-icon-1"></span>
          <h3 class="h-card mb-3">Fraîcheur</h3>
          <p class="text-ink-200 leading-relaxed">Un circuit court, de la débarque à votre cuisine, pour un produit qui n'a pas eu le temps de vieillir.</p>
        </div>
        <div>
          <span class="mb-5 flex h-9 w-9 text-marine" id="mn-home-engagement-icon-2"></span>
          <h3 class="h-card mb-3">Traçabilité</h3>
          <p class="text-ink-200 leading-relaxed">Une origine que nous pouvons toujours nommer, et pour le caviar, une traçabilité CITES complète.</p>
        </div>
        <div>
          <span class="mb-5 flex h-9 w-9 text-marine" id="mn-home-engagement-icon-3"></span>
          <h3 class="h-card mb-3">Sur-mesure</h3>
          <p class="text-ink-200 leading-relaxed">Calibre, découpe, espèce : votre demande de devis part de vos besoins, pas d'un catalogue figé.</p>
        </div>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 8) CTA FINAL — bandeau devis
 * ------------------------------------------------------------------------------------------ */
function mnHomeCtaDevis() {
  return `
  <section class="bg-ivoire">
    <div class="container-page py-24 text-center lg:py-32">
      <p class="reveal eyebrow mb-4">Restaurant, hôtel, grossiste</p>
      <h2 class="reveal h-section mb-8">Demandez votre devis professionnel</h2>
      <p class="reveal [transition-delay:80ms] prose-copy mx-auto mb-10">Les prix des produits de la mer varient chaque jour — nous établissons votre devis sur mesure, sous 48h.</p>
      <a href="devis.html" class="reveal [transition-delay:150ms] btn-navy inline-flex">Demander un devis</a>
    </div>
  </section>`;
}
