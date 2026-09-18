/**
 * MARENOSTRUM — Accueil one-page. Chaque fonction retourne le HTML d'une section, montée dans
 * index.html via le motif déjà utilisé ailleurs sur le site : un placeholder statique remplacé
 * par `outerHTML` une fois le DOM prêt. Seul index.html charge ce fichier.
 *
 * Quatre sections défilantes (#maison, #table, #savoir-faire, #contact) portent chacune
 * `data-scroll-section` (pour la surbrillance de nav de motion.js) et un `id` correspondant à
 * l'ancre de navigation — dans cet ordre, qui est aussi celui du menu d'en-tête. La Table
 * (traitement domaine-viticole : palette noir/ivoire/metal, classes `.lt-*`, voir
 * mnSectionTable()) fait pleinement partie du défilement Lenis/GSAP de l'accueil ; chaque produit
 * garde toutefois sa propre fiche à part (caviar-oscietre.html, mer-langoustine.html, etc.),
 * atteinte depuis un lien "Découvrir" — comme la fiche technique produit et les conditions
 * professionnelles, qui restent elles aussi des pages séparées.
 *
 * Animation 1 (apparition au défilement, voir motion.js) : tout élément `data-reveal` est un
 * groupe ; ses enfants directs `data-reveal-item` cascadent à 0.12s d'écart. Un `data-reveal`
 * sans enfant marqué s'anime comme bloc unique.
 */

/* ------------------------------------------------------------------------------------------ *
 * Images responsives — WebP + repli JPEG, trois largeurs plafonnées à la résolution native.
 * ------------------------------------------------------------------------------------------ */
const MN_IMG_WIDTHS = {
  "hero-mer": [768, 1280, 1376],
  "texture-mareyage": [768, 1280, 1408],
  "trois-caviars": [768, 1024],
  "hero-montagne": [768, 1280, 1408],
  "bar-loup": [768, 1280, 1408],
  "langoustine": [768, 1280, 1408],
  "gamme-boites": [768, 1280, 1376],
  "grain-macro": [768, 1024]
};

function mnPicture({ stem, alt, sizes, className, eager }) {
  const widths = MN_IMG_WIDTHS[stem];
  const src = (ext) => widths.map((w) => `assets/img/responsive/${stem}-${w}w.${ext} ${w}w`).join(", ");
  const fallback = widths[widths.length - 1];
  const loadingAttr = eager ? `fetchpriority="high"` : `loading="lazy"`;
  return `
  <picture>
    <source type="image/webp" srcset="${src("webp")}" sizes="${sizes}" />
    <img src="assets/img/responsive/${stem}-${fallback}w.jpg" srcset="${src("jpg")}" sizes="${sizes}" alt="${alt}" ${loadingAttr} class="${className || ""}" />
  </picture>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 1) HERO — plein écran, slogan mot par mot (animation 3)
 * ------------------------------------------------------------------------------------------ */
function mnSloganMarkup(text) {
  return text
    .split(" ")
    .map((word) => `<span class="mn-slogan-mask"><span class="mn-slogan-word" data-slogan-word>${word}</span></span>`)
    .join(" ");
}

function mnHomeHero() {
  const heroImg = mnPicture({
    stem: "hero-mer",
    alt: "Macro de glace pilée sur fond bleu marine",
    sizes: "100vw",
    className: "absolute inset-0 h-full w-full object-cover",
    eager: true
  });
  return `
  <section class="relative h-screen overflow-hidden bg-marine">
    ${heroImg}
    <div class="absolute inset-0 pointer-events-none" style="background:linear-gradient(180deg, rgba(17,17,16,0.28) 0%, transparent 22%), linear-gradient(90deg, rgba(17,17,16,0.22) 0%, rgba(17,17,16,0.08) 42%, transparent 68%)"></div>
    <div class="container-page relative z-10 flex h-full flex-col justify-center">
      <p class="mb-4 text-xs font-semibold uppercase tracking-widest2 text-ivoire/80 sm:text-sm">Maison Marenostrum</p>
      <p data-slogan class="font-titre text-4xl italic text-ivoire sm:text-5xl lg:text-6xl">${mnSloganMarkup("L'apogée des saveurs")}</p>
      <p class="mt-6 max-w-lg text-base text-ivoire/90 sm:text-lg">Le caviar choisi, calibré, garanti — pour les tables qui ne pardonnent rien.</p>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 2) BANDEAU DE TEXTURES MARINES — animation 2 (parallaxe), cinq bandes, cinq vitesses
 *
 * `data-texture-strip` (ciblé par le glissement GSAP dans motion.js) est posé sur un DIV
 * intermédiaire surdimensionné (-inset-y-12, soit 48px de marge en haut et en bas au-delà de la
 * cellule visible), jamais sur la cellule elle-même : sans cette marge, translater la cellule qui
 * définit le cadre visible (overflow-hidden, hauteur exacte de la bande) découvrirait le fond
 * ivoire au-dessus ou en dessous de la photo pendant le défilement — un bord qui se désaligne au
 * lieu de simplement glisser. 48px de marge couvre l'amplitude maximale (45px).
 * ------------------------------------------------------------------------------------------ */
function mnHomeTextureBand() {
  const strips = [
    { stem: "grain-macro", alt: "Grain de caviar Marenostrum, vue macro" },
    { stem: "bar-loup", alt: "Bar de ligne, texture de peau" },
    { stem: "texture-mareyage", alt: "Textures de produits de la mer d'exception" },
    { stem: "trois-caviars", alt: "Boîtes de caviar Marenostrum ouvertes" },
    { stem: "langoustine", alt: "Langoustine, texture de carapace" }
  ];
  return `
  <section class="mn-texture-band h-64 overflow-hidden sm:h-80 lg:h-96" data-texture-band>
    ${strips
      .map(
        (s) => `
    <div class="relative h-full overflow-hidden">
      <div class="absolute -inset-y-12 inset-x-0" data-texture-strip>
        ${mnPicture({ stem: s.stem, alt: s.alt, sizes: "20vw", className: "h-full w-full object-cover scale-125" })}
      </div>
    </div>`
      )
      .join("")}
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 3) #maison — reprend le contenu de l'ancienne page La Maison
 * ------------------------------------------------------------------------------------------ */
function mnSectionMaison() {
  return `
  <section id="maison" data-scroll-section class="bg-ivoire py-24 lg:py-32">
    <div class="container-page" data-reveal>
      <p class="eyebrow mb-4" data-reveal-item>La Maison</p>
      <h2 class="h-section mb-6" data-reveal-item>Choisir, calibrer, garantir</h2>
      <p class="prose-copy max-w-2xl" data-reveal-item>MARENOSTRUM n'est ni un fournisseur généraliste ni un catalogue : une maison qui retient peu de pièces, les calibre avec rigueur, et en garantit la régularité, commande après commande.</p>
    </div>

    <div class="container-page py-16 text-center" data-reveal>
      <p class="eyebrow mb-4" data-reveal-item>Le constat</p>
      <h3 class="h-card mb-6" data-reveal-item>Chaque intermédiaire coûte un jour</h3>
      <p class="prose-copy mx-auto mb-10 max-w-2xl" data-reveal-item>Le circuit classique empile les étapes — chacune ajoute un délai, un coût, et dilue un peu plus l'exigence sur le produit.</p>
      <div class="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-4 text-sm uppercase tracking-wide text-ink-300 sm:text-base" data-reveal-item>
        <span>Producteur</span>
        <span class="text-ink-500" aria-hidden="true">→</span>
        <span>Intermédiaire</span>
        <span class="text-ink-500" aria-hidden="true">→</span>
        <span>Grossiste régional</span>
        <span class="text-ink-500" aria-hidden="true">→</span>
        <span class="font-semibold text-ink-100">Votre établissement</span>
      </div>
    </div>

    <div class="container-page py-16">
      <div data-reveal>
        <p class="eyebrow mb-4" data-reveal-item>Notre parti pris</p>
        <h3 class="h-card mb-6" data-reveal-item>Une signature, pas une provenance</h3>
        <p class="prose-copy mb-4 max-w-2xl" data-reveal-item>Nous sélectionnons directement producteurs et mareyeurs, sans intermédiaire superflu — mais ce n'est pas l'origine qui nous engage, c'est notre validation.</p>
        <p class="prose-copy mb-8 max-w-2xl" data-reveal-item>Chaque lot est examiné par notre responsable sélection selon un cahier des charges strict — calibre, régularité, texture. Ce qui ne le satisfait pas n'entre jamais dans notre collection.</p>
        <dl class="grid grid-cols-2 gap-6 border-t border-ink-600/50 pt-6 sm:grid-cols-4" data-reveal-item>
          <div>
            <dt class="field-label">Sélection</dt>
            <dd class="text-ink-100 text-sm">Lot par lot, validée avant intégration</dd>
          </div>
          <div>
            <dt class="field-label">Calibrage</dt>
            <dd class="text-ink-100 text-sm">Un standard constant, jamais approximatif</dd>
          </div>
          <div>
            <dt class="field-label">Livraison</dt>
            <dd class="text-ink-100 text-sm">Réfrigérée, 24-48h</dd>
          </div>
          <div>
            <dt class="field-label">Garantie</dt>
            <dd class="text-ink-100 text-sm">La maison répond de chaque pièce</dd>
          </div>
        </dl>
      </div>
    </div>
    <div class="w-[85%] lg:w-3/5" data-reveal>
      ${mnPicture({ stem: "texture-mareyage", alt: "Textures de produits de la mer d'exception", sizes: "(min-width: 1024px) 60vw, 85vw", className: "aspect-[16/9] lg:aspect-[21/9] w-full object-cover object-center" })}
    </div>

    <div class="container-page py-16 mt-16">
      <div data-reveal>
        <p class="eyebrow mb-4" data-reveal-item>Le caviar</p>
        <h3 class="h-card mb-6" data-reveal-item>La même exigence, portée plus loin</h3>
        <p class="prose-copy max-w-2xl" data-reveal-item>Le caviar reste notre exception : un produit qui ne pardonne aucune approximation, sur le calibrage comme sur la garantie. Espèces, formats et disponibilités se retrouvent dans La Table.</p>
        <a href="#table" class="mt-6 inline-block text-xs font-semibold uppercase tracking-widest2 text-marine hover:underline" data-scroll-link data-reveal-item>Découvrir La Table →</a>
      </div>
    </div>
    <div class="ml-auto w-[85%] lg:w-3/5" data-reveal>
      ${mnPicture({ stem: "trois-caviars", alt: "Trois boîtes de caviar Marenostrum ouvertes, grains vus de dessus", sizes: "(min-width: 1024px) 60vw, 85vw", className: "aspect-[16/9] lg:aspect-[21/9] w-full object-cover object-center" })}
    </div>

    <div class="border-y border-ink-600/50 bg-ink-800 mt-16">
      <div class="container-page py-16" data-reveal>
        <p class="eyebrow mb-4 text-center" data-reveal-item>Ce qui ne se négocie pas</p>
        <h3 class="h-card mb-12 text-center" data-reveal-item>Sélection, calibrage, garantie</h3>
      </div>
      <div class="container-page pb-16 grid grid-cols-1 gap-12 sm:grid-cols-3" data-reveal>
        <div data-reveal-item>
          <span class="mb-5 flex h-9 w-9 text-marine" id="mn-value-icon-1"></span>
          <h4 class="h-card mb-3">Sélection</h4>
          <p class="text-ink-200 leading-relaxed">Un lot qui ne répond pas à notre cahier des charges n'entre jamais dans notre collection.</p>
        </div>
        <div data-reveal-item>
          <span class="mb-5 flex h-9 w-9 text-marine" id="mn-value-icon-2"></span>
          <h4 class="h-card mb-3">Calibrage</h4>
          <p class="text-ink-200 leading-relaxed">Un standard constant, d'une commande à l'autre, quelle que soit la saison.</p>
        </div>
        <div data-reveal-item>
          <span class="mb-5 flex h-9 w-9 text-marine" id="mn-value-icon-3"></span>
          <h4 class="h-card mb-3">Garantie</h4>
          <p class="text-ink-200 leading-relaxed">La maison répond de chaque pièce qui porte son nom — sans exception.</p>
        </div>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * #table — Le Caviar et La Mer, présentés comme des cuvées de domaine viticole (palette
 * noir/ivoire/metal, typographie à empattements, classes `.lt-*` définies dans src/input.css).
 * Liste verticale alternée gauche/droite ; chaque pièce garde sa propre fiche produit à part
 * (caviar-oscietre.html, mer-langoustine.html...), atteinte depuis son lien "Découvrir". La
 * parallaxe légère sur chaque image (`data-product-parallax`, motion.js) est posée sur le DIV
 * enveloppant, jamais sur l'image elle-même, pour ne pas écraser son `scale-110`/`scale-125` avec
 * le `transform` inline que GSAP y écrit.
 * ------------------------------------------------------------------------------------------ */
function mnSectionTable() {
  return `
  <section id="table" data-scroll-section class="bg-ivoire">
    <div class="py-24 lg:py-32">
      <div class="container-page max-w-2xl" data-reveal>
        <p class="lt-eyebrow mb-6" data-reveal-item>La Table</p>
        <h2 class="lt-title mb-8" data-reveal-item>Deux univers,<br />une même exigence</h2>
        <p class="lt-tasting" data-reveal-item>Le Caviar et La Mer. Aucun prix affiché : chaque pièce se découvre, puis s'obtient sur demande d'allocation.</p>
      </div>
    </div>

    <div class="container-page pb-16" data-reveal>
      <p class="lt-eyebrow mb-3" data-reveal-item>Univers</p>
      <h3 class="lt-title !text-4xl sm:!text-5xl" data-reveal-item>Le Caviar</h3>
    </div>

    <!-- Osciètre — image gauche -->
    <div class="border-t border-noir/10">
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[80vh]">
        <div class="relative order-1 h-[48vh] overflow-hidden bg-ivoire lg:h-auto" data-reveal>
          <div class="absolute inset-0" data-product-parallax>
            <img src="assets/img/responsive/boite-ouverte-800w.webp" alt="Boîte de caviar Osciètre ouverte, grains vus de dessus" loading="lazy" class="h-full w-full scale-110 object-contain" />
          </div>
        </div>
        <div class="order-2 flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20 lg:py-0" data-reveal>
          <p class="lt-status mb-3" data-reveal-item>Disponible</p>
          <h4 class="lt-title !text-4xl sm:!text-5xl mb-5" data-reveal-item>Osciètre</h4>
          <p class="lt-tagline mb-10 max-w-xs" data-reveal-item>Grain ferme, note de noisette nette.</p>
          <a href="caviar-oscietre.html" class="lt-link" data-reveal-item>Découvrir →</a>
        </div>
      </div>
    </div>

    <!-- Beluga — image droite -->
    <div class="border-t border-noir/10">
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[80vh]">
        <div class="relative order-1 h-[48vh] overflow-hidden bg-ivoire lg:order-2 lg:h-auto" data-reveal>
          <div class="absolute inset-0" data-product-parallax>
            <img src="assets/img/responsive/boite-ouverte-800w.webp" alt="Boîte de caviar Beluga ouverte, grains vus de dessus" loading="lazy" class="h-full w-full scale-110 object-contain" />
          </div>
        </div>
        <div class="order-2 flex flex-col justify-center px-6 py-16 sm:px-12 lg:order-1 lg:px-20 lg:py-0" data-reveal>
          <p class="lt-status mb-3" data-reveal-item>Sur allocation</p>
          <h4 class="lt-title !text-4xl sm:!text-5xl mb-5" data-reveal-item>Beluga</h4>
          <p class="lt-tagline mb-10 max-w-xs" data-reveal-item>Le grain le plus large, une texture enveloppante.</p>
          <a href="caviar-beluga.html" class="lt-link" data-reveal-item>Découvrir →</a>
        </div>
      </div>
    </div>

    <!-- Baeri — image gauche -->
    <div class="border-t border-noir/10">
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[80vh]">
        <div class="relative order-1 h-[48vh] overflow-hidden bg-ivoire lg:h-auto" data-reveal>
          <div class="absolute inset-0" data-product-parallax>
            <img src="assets/img/responsive/boite-ouverte-800w.webp" alt="Boîte de caviar Baeri ouverte, grains vus de dessus" loading="lazy" class="h-full w-full scale-110 object-contain" />
          </div>
        </div>
        <div class="order-2 flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20 lg:py-0" data-reveal>
          <p class="lt-status mb-3" data-reveal-item>Disponible</p>
          <h4 class="lt-title !text-4xl sm:!text-5xl mb-5" data-reveal-item>Baeri</h4>
          <p class="lt-tagline mb-10 max-w-xs" data-reveal-item>Texture souple, grain régulier.</p>
          <a href="caviar-baeri.html" class="lt-link" data-reveal-item>Découvrir →</a>
        </div>
      </div>
    </div>

    <!-- Sevruga — image droite -->
    <div class="border-t border-noir/10">
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[80vh]">
        <div class="relative order-1 h-[48vh] overflow-hidden bg-ivoire lg:order-2 lg:h-auto" data-reveal>
          <div class="absolute inset-0" data-product-parallax>
            <img src="assets/img/responsive/boite-ouverte-800w.webp" alt="Boîte de caviar Sevruga ouverte, grains vus de dessus" loading="lazy" class="h-full w-full scale-110 object-contain" />
          </div>
        </div>
        <div class="order-2 flex flex-col justify-center px-6 py-16 sm:px-12 lg:order-1 lg:px-20 lg:py-0" data-reveal>
          <p class="lt-status mb-3" data-reveal-item>Ouverture prochaine</p>
          <h4 class="lt-title !text-4xl sm:!text-5xl mb-5" data-reveal-item>Sevruga</h4>
          <p class="lt-tagline mb-10 max-w-xs" data-reveal-item>Grain dense, attaque iodée.</p>
          <a href="caviar-sevruga.html" class="lt-link" data-reveal-item>Découvrir →</a>
        </div>
      </div>
    </div>

    <div class="container-page border-t border-noir/10 pt-24 pb-16 lg:pt-32" data-reveal>
      <p class="lt-eyebrow mb-3" data-reveal-item>Univers</p>
      <h3 class="lt-title !text-4xl sm:!text-5xl" data-reveal-item>La Mer</h3>
    </div>

    <!-- Poisson de ligne — image gauche -->
    <div class="border-t border-noir/10">
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[80vh]">
        <div class="relative order-1 h-[48vh] overflow-hidden lg:h-auto" data-reveal>
          <div class="absolute inset-0" data-product-parallax>
            ${mnPicture({ stem: "bar-loup", alt: "Bar de ligne entier, produit de la mer Marenostrum", sizes: "(min-width: 1024px) 50vw, 100vw", className: "h-full w-full scale-110 object-cover" })}
          </div>
        </div>
        <div class="order-2 flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20 lg:py-0" data-reveal>
          <p class="lt-status mb-3" data-reveal-item>Disponible</p>
          <h4 class="lt-title !text-4xl sm:!text-5xl mb-5" data-reveal-item>Poisson de ligne</h4>
          <p class="lt-tagline mb-10 max-w-xs" data-reveal-item>Chair ferme, se détache en lamelles nettes.</p>
          <a href="mer-poisson-ligne.html" class="lt-link" data-reveal-item>Découvrir →</a>
        </div>
      </div>
    </div>

    <!-- Langoustine — image droite -->
    <div class="border-t border-noir/10">
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[80vh]">
        <div class="relative order-1 h-[48vh] overflow-hidden lg:order-2 lg:h-auto" data-reveal>
          <div class="absolute inset-0" data-product-parallax>
            ${mnPicture({ stem: "langoustine", alt: "Langoustine entière, produit de la mer Marenostrum", sizes: "(min-width: 1024px) 50vw, 100vw", className: "h-full w-full scale-110 object-cover" })}
          </div>
        </div>
        <div class="order-2 flex flex-col justify-center px-6 py-16 sm:px-12 lg:order-1 lg:px-20 lg:py-0" data-reveal>
          <p class="lt-status mb-3" data-reveal-item>Sur allocation</p>
          <h4 class="lt-title !text-4xl sm:!text-5xl mb-5" data-reveal-item>Langoustine</h4>
          <p class="lt-tagline mb-10 max-w-xs" data-reveal-item>Chair translucide, sucrée, à peine contractée à la cuisson.</p>
          <a href="mer-langoustine.html" class="lt-link" data-reveal-item>Découvrir →</a>
        </div>
      </div>
    </div>

    <!-- Terrines & conserves — image gauche -->
    <div class="border-t border-b border-noir/10">
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[80vh]">
        <div class="relative order-1 h-[48vh] overflow-hidden lg:h-auto" data-reveal>
          <div class="absolute inset-0" data-product-parallax>
            ${mnPicture({ stem: "gamme-boites", alt: "Coffrets et conditionnement Marenostrum", sizes: "(min-width: 1024px) 50vw, 100vw", className: "h-full w-full scale-110 object-cover" })}
          </div>
        </div>
        <div class="order-2 flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20 lg:py-0" data-reveal>
          <p class="lt-status mb-3" data-reveal-item>Ouverture prochaine</p>
          <h4 class="lt-title !text-4xl sm:!text-5xl mb-5" data-reveal-item>Terrines & conserves</h4>
          <p class="lt-tagline mb-10 max-w-xs" data-reveal-item>Texture dense, travaillée pour tenir en tranche.</p>
          <a href="mer-terrines.html" class="lt-link" data-reveal-item>Découvrir →</a>
        </div>
      </div>
    </div>

    <div class="py-24 text-center lg:py-32">
      <div class="container-page max-w-md mx-auto" data-reveal>
        <p class="lt-eyebrow mb-4" data-reveal-item>Accès à la collection</p>
        <p class="lt-tasting mx-auto mb-10" data-reveal-item>Cette présentation n'est pas exhaustive. Traçabilité, conditionnement et détail technique : <a href="fiche-technique-produit.html" class="underline hover:no-underline">fiche technique produit</a>.</p>
        <a href="#contact" class="lt-link" data-scroll-link data-reveal-item>Demander une allocation →</a>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * #savoir-faire — reprend l'ancienne page Notre savoir-faire
 * ------------------------------------------------------------------------------------------ */
function mnSectionSavoirFaire() {
  return `
  <section id="savoir-faire" data-scroll-section class="bg-ivoire py-24 lg:py-32">
    <div class="container-page" data-reveal>
      <p class="eyebrow mb-4" data-reveal-item>Notre savoir-faire</p>
      <h2 class="h-section mb-6" data-reveal-item>Ce qui garantit chaque expédition</h2>
      <p class="prose-copy max-w-2xl" data-reveal-item>Un besoin transmis, une réponse sous 48h, une livraison réfrigérée adaptée à votre cuisine : voici ce qui se passe entre votre demande et votre réception.</p>
    </div>

    <div class="container-page py-16">
      <div class="grid grid-cols-1 gap-16 sm:grid-cols-2" data-reveal>
        <div data-reveal-item>
          <span class="mb-5 flex h-9 w-9 text-marine" id="mn-sf-icon-1"></span>
          <h3 class="h-card mb-3">La sélection</h3>
          <p class="text-ink-200 leading-relaxed">Un lot est retenu ou refusé selon des critères précis : calibre, régularité, texture, absence de défaut. Ce qui ne répond pas à notre cahier des charges n'entre jamais dans notre collection.</p>
        </div>
        <div data-reveal-item>
          <span class="mb-5 flex h-9 w-9 text-marine" id="mn-sf-icon-2"></span>
          <h3 class="h-card mb-3">La traçabilité</h3>
          <p class="text-ink-200 leading-relaxed">Étiquette CITES, numéro de lot, date de conditionnement : chaque expédition est accompagnée d'une fiche de lot complète, remise avec chaque commande. Détail sur la <a href="fiche-technique-produit.html" class="text-marine hover:underline">fiche technique produit</a>.</p>
        </div>
        <div data-reveal-item>
          <span class="mb-5 flex h-9 w-9 text-marine" id="mn-sf-icon-3"></span>
          <h3 class="h-card mb-3">La chaîne du froid et la livraison</h3>
          <p class="text-ink-200 leading-relaxed">Livraison réfrigérée en France, en Suisse, à Monaco et au Luxembourg. Le délai de réassort est annoncé dès la commande, et les formalités d'import sont gérées pour vous.</p>
        </div>
        <div data-reveal-item>
          <span class="mb-5 flex h-9 w-9 text-marine" id="mn-sf-icon-4"></span>
          <h3 class="h-card mb-3">Le conditionnement</h3>
          <p class="text-ink-200 leading-relaxed">Des grammages adaptés à votre service, des boîtes à la marque de votre établissement, des coffrets pour vos temps forts.</p>
        </div>
      </div>
    </div>

    <div class="border-y border-ink-600/50 bg-ink-800">
      <div class="container-page py-16">
        <div class="mx-auto max-w-2xl text-center" data-reveal>
          <p class="eyebrow mb-4" data-reveal-item>Comment nous travaillons</p>
          <h3 class="h-card mb-8" data-reveal-item>Trois étapes, une réponse sous 48h</h3>
        </div>
        <div class="mx-auto grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3" data-reveal>
          <div class="text-center" data-reveal-item>
            <p class="mn-chapter-num mb-4">01</p>
            <p class="text-sm text-ink-200 leading-relaxed">Vous transmettez votre besoin via notre formulaire de référencement.</p>
          </div>
          <div class="text-center" data-reveal-item>
            <p class="mn-chapter-num mb-4">02</p>
            <p class="text-sm text-ink-200 leading-relaxed">Nous étudions votre demande et confirmons l'allocation possible.</p>
          </div>
          <div class="text-center" data-reveal-item>
            <p class="mn-chapter-num mb-4">03</p>
            <p class="text-sm text-ink-200 leading-relaxed">Livraison réfrigérée, en colis isotherme, sur commande ponctuelle ou réassort planifié.</p>
          </div>
        </div>
        <p class="mx-auto mt-10 max-w-2xl text-center text-sm text-ink-300" data-reveal>Conditions détaillées applicables aux établissements référencés : <a href="conditions-professionnelles.html" class="text-marine hover:underline">conditions professionnelles</a>.</p>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 6) #contact — formulaire de référencement (ex-contact.html)
 * ------------------------------------------------------------------------------------------ */
function mnSectionContact() {
  return `
  <section id="contact" data-scroll-section class="bg-marine py-24 lg:py-32">
    <div class="container-page mb-16 text-center" data-reveal>
      <p class="eyebrow mb-4 !text-ivoire/70" data-reveal-item>Demande de référencement</p>
      <h2 class="h-section mb-6 text-ivoire" data-reveal-item>Devenir un établissement référencé</h2>
      <p class="mx-auto max-w-xl text-ivoire/80" data-reveal-item>MARENOSTRUM référence un nombre restreint d'établissements. Cette candidature est étudiée individuellement — ce n'est pas une prise de commande.</p>
    </div>

    <div class="container-page grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-20" data-reveal>
      <form id="mn-contact-form" novalidate class="lg:col-span-2 flex flex-col gap-6 rounded bg-ivoire p-6 sm:p-10" data-reveal-item>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label class="field-label" for="ct-establishment">Nom de l'établissement</label>
            <input id="ct-establishment" type="text" class="input-field" required />
            <p id="ct-establishment-error" class="field-error hidden">Merci d'indiquer le nom de votre établissement.</p>
          </div>
          <div>
            <label class="field-label" for="ct-name">Nom du contact</label>
            <input id="ct-name" type="text" class="input-field" required />
            <p id="ct-name-error" class="field-error hidden">Merci d'indiquer votre nom.</p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label class="field-label" for="ct-email">E-mail</label>
            <input id="ct-email" type="email" class="input-field" required />
            <p id="ct-email-error" class="field-error hidden">Adresse e-mail invalide.</p>
          </div>
          <div>
            <label class="field-label" for="ct-phone">Téléphone</label>
            <input id="ct-phone" type="tel" class="input-field" />
          </div>
        </div>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label class="field-label" for="ct-type">Type d'établissement</label>
            <select id="ct-type" class="input-field" required>
              <option value="">Sélectionnez...</option>
              <option>Restaurant gastronomique</option>
              <option>Brasserie / bistrot</option>
              <option>Hôtel</option>
              <option>Traiteur</option>
              <option>Poissonnerie</option>
              <option>Mareyeur</option>
              <option>Grossiste</option>
              <option>Autre</option>
            </select>
            <p id="ct-type-error" class="field-error hidden">Merci de préciser votre type d'établissement.</p>
          </div>
          <div>
            <label class="field-label" for="ct-city">Ville</label>
            <input id="ct-city" type="text" class="input-field" required />
            <p id="ct-city-error" class="field-error hidden">Merci d'indiquer votre ville.</p>
          </div>
        </div>
        <div>
          <label class="field-label" for="ct-volume">Volumes estimés</label>
          <select id="ct-volume" class="input-field">
            <option>À définir</option>
            <option>Moins de 1 kg / semaine</option>
            <option>1 à 5 kg / semaine</option>
            <option>5 à 20 kg / semaine</option>
            <option>Plus de 20 kg / semaine</option>
          </select>
        </div>
        <fieldset>
          <legend class="field-label">Produits concernés</legend>
          <div class="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label class="flex items-center gap-2.5 text-sm text-ink-100">
              <input type="checkbox" class="mn-checkbox h-4 w-4" name="ct-produit" value="caviar" />
              Le Caviar
            </label>
            <label class="flex items-center gap-2.5 text-sm text-ink-100">
              <input type="checkbox" class="mn-checkbox h-4 w-4" name="ct-produit" value="mer" />
              La Mer
            </label>
          </div>
        </fieldset>
        <div>
          <label class="field-label" for="ct-message">Message</label>
          <textarea id="ct-message" rows="6" class="input-field resize-none" placeholder="Précisez votre besoin (pièces recherchées, fréquence, contraintes de livraison...)"></textarea>
        </div>
        <button type="submit" class="btn-navy w-full self-center sm:w-auto">Envoyer ma demande de référencement</button>
        <p id="mn-contact-feedback" class="hidden flex items-center justify-center gap-2 text-center text-sm text-marine" role="status">
          <span class="h-4 w-4" id="mn-contact-feedback-icon"></span> Votre demande a bien été transmise. Nous l'étudions et revenons vers vous sous 48h.
        </p>
        <p class="text-center text-xs text-ink-300">Site de démonstration : ce formulaire ne transmet aucune demande réelle. En le soumettant, vous reconnaissez avoir pris connaissance des <a href="conditions-professionnelles.html" class="text-marine hover:underline">conditions professionnelles</a>.</p>
      </form>

      <aside class="flex flex-col items-center text-center" data-reveal-item>
        <div class="flex flex-col items-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <span class="h-5 w-5 shrink-0 text-brass" id="mn-contact-icon-mail"></span>
            <div>
              <p class="field-label !mb-1 !text-ivoire/70">E-mail</p>
              <p class="text-sm text-ivoire/90">contact@marenostrum.example</p>
            </div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <span class="h-5 w-5 shrink-0 text-brass" id="mn-contact-icon-phone"></span>
            <div>
              <p class="field-label !mb-1 !text-ivoire/70">Téléphone</p>
              <p class="text-sm text-ivoire/90">01 23 45 67 89 — lun.–ven., 9h–18h</p>
            </div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <span class="h-5 w-5 shrink-0 text-brass" id="mn-contact-icon-pin"></span>
            <div>
              <p class="field-label !mb-1 !text-ivoire/70">Maison MARENOSTRUM</p>
              <p class="text-sm text-ivoire/90">12 quai des Salinières, 33000 Bordeaux, France</p>
            </div>
          </div>
        </div>
        <p class="mx-auto mt-10 max-w-xs border-t border-ivoire/15 pt-8 text-center text-sm text-ivoire/70">Chaque candidature est étudiée individuellement avant qu'une allocation ne soit proposée.</p>
      </aside>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * Pré-remplissage du formulaire depuis un CTA "Demander une allocation" (La Table) ou une URL
 * partagée (?produit=<slug>) — plus besoin de recharger la page, tout vit sur index.html.
 * ------------------------------------------------------------------------------------------ */
const MN_PRODUIT_LABELS = {
  "caviar-oscietre": "Caviar Osciètre",
  "caviar-beluga": "Caviar Beluga",
  "caviar-baeri": "Caviar Baeri",
  "caviar-sevruga": "Caviar Sevruga",
  "mer-poisson-ligne": "Poisson de ligne",
  "mer-langoustine": "Langoustine",
  "mer-terrines": "Terrines et conserves d'exception"
};

function mnPrefillProduit(slug) {
  const label = MN_PRODUIT_LABELS[slug];
  if (!label) return;
  const groupe = slug.startsWith("caviar-") ? "caviar" : "mer";
  const checkbox = document.querySelector(`input[name="ct-produit"][value="${groupe}"]`);
  if (checkbox) checkbox.checked = true;
  const message = document.getElementById("ct-message");
  if (message) message.value = `Bonjour, je souhaite une allocation pour : ${label}.\n\n`;
}

function mnInitProduitCTAs() {
  document.querySelectorAll("[data-produit-cta]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      mnPrefillProduit(link.dataset.produitCta);
      mnScrollTo("#contact");
      history.pushState(null, "", "#contact");
    });
  });
}

function mnInitContactForm() {
  const form = document.getElementById("mn-contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const establishment = document.getElementById("ct-establishment");
    const name = document.getElementById("ct-name");
    const email = document.getElementById("ct-email");
    const type = document.getElementById("ct-type");
    const city = document.getElementById("ct-city");

    const establishmentValid = establishment.value.trim().length > 0;
    const nameValid = name.value.trim().length > 0;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    const typeValid = type.value.trim().length > 0;
    const cityValid = city.value.trim().length > 0;

    document.getElementById("ct-establishment-error").classList.toggle("hidden", establishmentValid);
    establishment.classList.toggle("!border-error", !establishmentValid);
    document.getElementById("ct-name-error").classList.toggle("hidden", nameValid);
    name.classList.toggle("!border-error", !nameValid);
    document.getElementById("ct-email-error").classList.toggle("hidden", emailValid);
    email.classList.toggle("!border-error", !emailValid);
    document.getElementById("ct-type-error").classList.toggle("hidden", typeValid);
    type.classList.toggle("!border-error", !typeValid);
    document.getElementById("ct-city-error").classList.toggle("hidden", cityValid);
    city.classList.toggle("!border-error", !cityValid);

    if (!(establishmentValid && nameValid && emailValid && typeValid && cityValid)) return;

    // Site statique, sans back-end : rien n'est réellement transmis — visible en console à la
    // place d'un vrai service d'envoi, comme le reste du site.
    const payload = {
      etablissement: establishment.value.trim(),
      contact: name.value.trim(),
      email: email.value.trim(),
      telephone: document.getElementById("ct-phone").value.trim(),
      type: type.value,
      ville: city.value.trim(),
      volumesEstimes: document.getElementById("ct-volume").value,
      produitsConcernes: Array.from(document.querySelectorAll('input[name="ct-produit"]:checked')).map((c) => c.value),
      message: document.getElementById("ct-message").value.trim()
    };
    console.log("Demande de référencement (démonstration, non transmise) :", payload);

    document.getElementById("mn-contact-feedback").classList.remove("hidden");
    form.reset();
  });
}

function mnInitContactIcons() {
  document.getElementById("mn-contact-icon-mail").innerHTML = MN_ICONS.mail;
  document.getElementById("mn-contact-icon-phone").innerHTML = MN_ICONS.phone;
  document.getElementById("mn-contact-icon-pin").innerHTML = MN_ICONS.pin;
  document.getElementById("mn-contact-feedback-icon").innerHTML = MN_ICONS.check;
  document.getElementById("mn-value-icon-1").innerHTML = MN_ICONS.leaf;
  document.getElementById("mn-value-icon-2").innerHTML = MN_ICONS.shield;
  document.getElementById("mn-value-icon-3").innerHTML = MN_ICONS.check;
  document.getElementById("mn-sf-icon-1").innerHTML = MN_ICONS.leaf;
  document.getElementById("mn-sf-icon-2").innerHTML = MN_ICONS.shield;
  document.getElementById("mn-sf-icon-3").innerHTML = MN_ICONS.truck;
  document.getElementById("mn-sf-icon-4").innerHTML = MN_ICONS.box;
}
