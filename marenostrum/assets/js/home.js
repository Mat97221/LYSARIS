/**
 * MARENOSTRUM — Accueil one-page. Chaque fonction retourne le HTML d'une section, montée dans
 * index.html via le motif déjà utilisé ailleurs sur le site : un placeholder statique remplacé
 * par `outerHTML` une fois le DOM prêt. Seul index.html charge ce fichier.
 *
 * Quatre sections défilantes (#maison, #table, #savoir-faire, #contact), dans l'ordre du menu.
 * Construites sur le système de bandes ("strip", voir src/input.css) : chaque `strip--columns`/
 * `strip--3-cols` accepte des variables inline `--w1`/`--w2` qui décalent verticalement ses deux
 * premières colonnes — le seul dispositif de rythme visuel d'une palette à huit jetons.
 *
 * `.anima--bottom-in` (apparition douce, motion.js) n'est posée que sur une dizaine de blocs sur
 * toute la page, pas systématiquement — conformément au principe d'animations minimales.
 */

/* ------------------------------------------------------------------------------------------ *
 * Images responsives — AVIF + WebP + repli JPEG, quatre largeurs plafonnées à la résolution
 * native (voir "Images responsives" dans SETUP.md et scripts/generate-responsive-images.py).
 * ------------------------------------------------------------------------------------------ */
/* Largeurs réellement générées par scripts/generate-responsive-images.py — plafonnées à la
   résolution native de chaque source (jamais d'agrandissement), donc pas toujours les quatre
   paliers 900/1200/1920/2400 complets. Garder cette table strictement synchronisée avec la
   sortie du script : une largeur listée ici sans fichier correspondant casse l'image. */
const MN_IMG_WIDTHS = {
  "hero-mer": [900, 1200, 1376],
  "texture-mareyage": [900, 1200, 1408],
  "trois-caviars": [900, 1024],
  "bar-loup": [900, 1200, 1408],
  "langoustine": [900, 1200, 1408],
  "gamme-boites": [900, 1200, 1376],
  "grain-macro": [900, 1024]
};

/** `<picture>` complet — AVIF, WebP, repli JPEG — avec `width`/`height` explicites pour réserver
    l'espace (calculés depuis la largeur de secours et le ratio fourni, jamais de décalage de
    mise en page pendant le chargement). `loading="lazy"` sauf le hero (`eager`). `portraitStem`
    optionnel : insère des sources dédiées `-portrait-900w` sous 768px (voir generate-responsive-
    images.py, PORTRAIT_CROPS) pour les visuels plein écran qui ont besoin d'un cadrage vertical
    propre sur mobile plutôt que du simple recadrage automatique de la version paysage. */
function mnPicture({ stem, alt, sizes, className, eager, ratio, portraitStem }) {
  const widths = MN_IMG_WIDTHS[stem];
  const src = (ext) => widths.map((w) => `assets/img/responsive/${stem}-${w}w.${ext} ${w}w`).join(", ");
  const fallback = widths[widths.length - 1];
  const height = ratio ? Math.round(fallback / ratio) : undefined;
  const loadingAttr = eager ? `fetchpriority="high"` : `loading="lazy"`;
  const portrait = portraitStem
    ? ["avif", "webp", "jpeg"]
        .map(
          (ext) =>
            `<source type="image/${ext}" media="(max-width: 767px)" srcset="assets/img/responsive/${portraitStem}-portrait-900w.${ext === "jpeg" ? "jpg" : ext}" />`
        )
        .join("\n    ")
    : "";
  return `
  <picture>
    ${portrait}
    <source type="image/avif" srcset="${src("avif")}" sizes="${sizes}" />
    <source type="image/webp" srcset="${src("webp")}" sizes="${sizes}" />
    <img src="assets/img/responsive/${stem}-${fallback}w.jpg" srcset="${src("jpg")}" sizes="${sizes}" alt="${alt}" width="${fallback}"${height ? ` height="${height}"` : ""} ${loadingAttr} class="${className || ""}" />
  </picture>`;
}

/** Emplacement d'image pas encore livrée (voir les commentaires [IMAGE — ...] à chaque appel) :
    espace réservé via aspect-ratio, bordure fine + libellé discret pour qu'il se lise comme un
    slot volontairement vide plutôt que comme une image cassée. À remplacer par mnPicture() dès
    que la photo existe — rien d'autre à changer, la mise en page ne bougera pas. */
function mnImagePlaceholder({ ratio, label, className }) {
  return `
  <div class="relative flex items-center justify-center border ${className || ""}" style="aspect-ratio:${ratio}; background-color:var(--color-surface); border-color:var(--color-border)">
    <p class="px-4 text-center text-xs uppercase tracking-label opacity-40">${label}</p>
  </div>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 1) HERO — plein écran, prêt pour Splide (une diapositive pour l'instant), parallaxe légère,
 * bandeau de données vivantes juste en dessous. Photo : texture de givre en gros plan, fond
 * bleu nuit qui tourne vers le clair — choisie et validée pour cet emplacement (hero-mer).
 * ------------------------------------------------------------------------------------------ */
function mnHomeHero() {
  return `
  <section class="relative h-screen overflow-hidden" data-theme="dark" style="background-color:var(--color-bg)">
    <div class="splide" id="hero-splide" aria-label="Maison Marenostrum">
      <div class="splide__track">
        <ul class="splide__list">
          <li class="splide__slide">
            <div class="relative h-screen w-full overflow-hidden" data-hero-parallax>
              <div class="absolute inset-0 -top-12 -bottom-12" data-hero-parallax-layer>
                ${mnPicture({ stem: "hero-mer", portraitStem: "hero-mer", alt: "Givre en gros plan, Maison Marenostrum", sizes: "100vw", className: "h-full w-full object-cover", eager: true })}
              </div>
              <div class="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none" style="background-color:var(--color-bg); opacity:0.55"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="container-page absolute inset-x-0 bottom-32 z-10" style="color:var(--color-text)">
      <p class="eyebrow mb-4">Maison Marenostrum</p>
      <h1 class="h-hero max-w-2xl">L'apogée des saveurs</h1>
      <p class="mt-6 max-w-lg text-base sm:text-lg opacity-80">Le caviar choisi, calibré, garanti — pour les tables qui ne pardonnent rien.</p>
    </div>

    <!-- Conditions du littoral (Cancale) — mnInitConditionsWidget() (ui.js) écrase ces valeurs
         de repli avec les données Open-Meteo dès qu'elles sont disponibles. -->
    <div class="mn-conditions" id="mn-conditions">
      <p class="mn-conditions__place">Littoral de Cancale</p>
      <p class="mn-conditions__temp"><span data-conditions-temp>14.5°C</span></p>
      <div class="mn-conditions__footer">
        <span class="mn-conditions__data"><span class="h-4 w-4">${MN_ICONS.wind}</span> <span data-conditions-wind>3.2 m/s</span></span>
        <span class="mn-conditions__data"><span class="h-4 w-4">${MN_ICONS.droplet}</span> <span data-conditions-humidity>78%</span></span>
      </div>
    </div>
  </section>

  <!-- Bandeau de données vivantes — aplat sombre fixe, chiffres en ivoire (la taille porte la
       hiérarchie, pas la couleur), filet vertical entre chaque donnée. -->
  <div class="mn-data-band" data-theme="dark">
    <div class="container-page grid grid-cols-1 gap-8 py-10 sm:grid-cols-3 sm:gap-6">
      <div class="text-center sm:border-l sm:pl-6 sm:text-left first:border-l-0 first:pl-0" style="border-color:var(--color-border)">
        <p class="mn-data-figure font-texte text-3xl font-medium">2024</p>
        <p class="eyebrow mt-2 !text-[0.7rem]">Millésime du cru en cours</p>
      </div>
      <div class="text-center sm:border-l sm:pl-6 sm:text-left" style="border-color:var(--color-border)">
        <p class="mn-data-figure font-texte text-3xl font-medium">38</p>
        <p class="eyebrow mt-2 !text-[0.7rem]">Maisons référencées</p>
      </div>
      <div class="text-center sm:border-l sm:pl-6 sm:text-left" style="border-color:var(--color-border)">
        <p class="mn-data-figure font-texte text-3xl font-medium">14 oct.</p>
        <p class="eyebrow mt-2 !text-[0.7rem]">Prochaine date d'allocation</p>
      </div>
    </div>
  </div>

  <!-- Carrousel de sections — sert de sommaire visuel juste sous le hero, complète le menu
       plein écran plutôt que de le remplacer (voir mnInitHeroSplide pour l'init Splide, et la
       pagination textuelle synchronisée à la main plus bas, sur le modèle "01/04"). -->
  <div class="mn-sections-carousel">
    <div class="splide" id="section-splide" aria-label="Sections de la page">
      <div class="splide__track">
        <ul class="splide__list">
          ${mnSectionsCarouselSlide({
            n: 1,
            href: "#maison",
            title: "La Maison",
            bgStem: "texture-mareyage",
            imgStem: "grain-macro",
            text: "Une maison qui retient peu de pièces, les calibre avec rigueur, et en garantit la régularité, commande après commande.",
            cta: "Découvrir La Maison"
          })}
          ${mnSectionsCarouselSlide({
            n: 2,
            href: "#table",
            title: "La Table",
            bgStem: "bar-loup",
            imgStem: "langoustine",
            text: "Le Caviar et La Mer : deux univers, une même exigence. Aucun prix affiché — chaque pièce s'obtient sur demande d'allocation.",
            cta: "Découvrir La Table"
          })}
          ${mnSectionsCarouselSlide({
            n: 3,
            href: "#savoir-faire",
            title: "Notre savoir-faire",
            bgStem: "trois-caviars",
            imgStem: "gamme-boites",
            text: "Sélection, traçabilité, chaîne du froid : ce qui garantit chaque expédition, du lot retenu jusqu'à la livraison réfrigérée.",
            cta: "Découvrir notre savoir-faire"
          })}
          ${mnSectionsCarouselSlide({
            n: 4,
            href: "#contact",
            title: "Contact",
            text: "Une maison qui répond sous 48h à toute demande de référencement, étudiée individuellement.",
            cta: "Nous écrire"
          })}
        </ul>
      </div>
    </div>
    <ul class="mn-sections-carousel__paging" id="section-splide-paging">
      <li><button type="button" class="is-active" data-paging-index="0">La Maison</button></li>
      <li><button type="button" data-paging-index="1">La Table</button></li>
      <li><button type="button" data-paging-index="2">Notre savoir-faire</button></li>
      <li><button type="button" data-paging-index="3">Contact</button></li>
    </ul>
  </div>`;
}

/** Une diapositive du carrousel de sections : photo plein cadre (ou aplat de repli si aucune
    photo réelle ne convient encore, ex. Contact), carte claire centrée (compteur, titre, image
    d'appoint optionnelle, teaser, lien) — voir mnHomeHero() pour l'assemblage des quatre. */
function mnSectionsCarouselSlide({ n, href, title, bgStem, imgStem, text, cta }) {
  const total = "04";
  const num = String(n).padStart(2, "0");
  const bg = bgStem
    ? mnPicture({ stem: bgStem, alt: "", sizes: "100vw", className: "h-full w-full object-cover" })
    : `<div class="h-full w-full" style="background-color:var(--color-surface-high)"></div>`;
  const inset = imgStem
    ? mnPicture({ stem: imgStem, alt: "", sizes: "26rem", className: "h-full w-full object-cover" })
    : "";
  return `
  <li class="splide__slide">
    <div class="mn-sections-carousel__slide">
      <div class="mn-sections-carousel__bg" aria-hidden="true">${bg}</div>
      <div class="mn-sections-carousel__scrim" aria-hidden="true"></div>
      <a href="${href}" data-scroll-link data-hover="Voir" class="mn-sections-carousel__card">
        <p class="mn-sections-carousel__counter"><span>${num}</span> <span class="is-muted">${total}</span></p>
        <h3 class="h-card mt-3">${title}</h3>
        ${inset ? `<div class="mn-sections-carousel__image">${inset}</div>` : ""}
        <p class="prose-copy text-sm mt-4">${text}</p>
        <p class="btn-quiet mt-6 inline-flex">${cta} →</p>
      </a>
    </div>
  </li>`;
}

function mnInitHeroSplide() {
  if (typeof Splide === "undefined") return;
  new Splide("#hero-splide", {
    type: "fade",
    arrows: false,
    pagination: false,
    drag: false,
    autoplay: false
  }).mount();

  const sectionsSplide = new Splide("#section-splide", {
    type: "fade",
    arrows: false,
    pagination: false,
    autoplay: false
  });
  // Pagination textuelle externe (liste "La Maison / La Table / ..." sous le carrousel) au lieu
  // des puces Splide par défaut — on la synchronise à la main dans les deux sens.
  const pagingButtons = document.querySelectorAll("#section-splide-paging [data-paging-index]");
  sectionsSplide.on("move", (newIndex) => {
    pagingButtons.forEach((btn, i) => btn.classList.toggle("is-active", i === newIndex));
  });
  pagingButtons.forEach((btn) => {
    btn.addEventListener("click", () => sectionsSplide.go(Number(btn.dataset.pagingIndex)));
  });
  sectionsSplide.mount();
}

/** Widget de conditions du hero (voir mn-conditions dans mnHomeHero) : écrase les valeurs de
    repli statiques par les données Open-Meteo (sans clé, CORS ouvert) pour un point du littoral
    breton. Échec silencieux si l'API est injoignable — les valeurs de repli restent affichées. */
function mnInitConditionsWidget() {
  const el = document.getElementById("mn-conditions");
  if (!el) return;
  fetch("https://api.open-meteo.com/v1/forecast?latitude=48.68&longitude=-1.85&current=temperature_2m,wind_speed_10m,relative_humidity_2m")
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((data) => {
      const c = data && data.current;
      if (!c) return;
      const temp = el.querySelector("[data-conditions-temp]");
      const wind = el.querySelector("[data-conditions-wind]");
      const humidity = el.querySelector("[data-conditions-humidity]");
      if (temp && typeof c.temperature_2m === "number") temp.textContent = `${c.temperature_2m.toFixed(1)}°C`;
      if (wind && typeof c.wind_speed_10m === "number") wind.textContent = `${c.wind_speed_10m.toFixed(1)} m/s`;
      if (humidity && typeof c.relative_humidity_2m === "number") humidity.textContent = `${Math.round(c.relative_humidity_2m)}%`;
    })
    .catch(() => {});
}

/* ------------------------------------------------------------------------------------------ *
 * 2) #maison — deux bandes (strip--columns), décalage vertical franc et asymétrique entre les
 * deux colonnes de chacune (le dispositif de rythme demandé). La bande de textures marines,
 * seule image déjà existante réutilisée telle quelle ici, devient une strip--wide 21:9 bord à
 * bord, plus large et plus courte que l'ancien bandeau à hauteur fixe.
 * ------------------------------------------------------------------------------------------ */
function mnSectionMaison() {
  return `
  <section id="maison" data-scroll-section class="section-pad">
    <div class="strip strip--normal" data-reveal>
      <p class="eyebrow mb-4 anima--bottom-in">La Maison</p>
      <h2 class="h-section mb-6 anima--bottom-in">Choisir, calibrer, garantir</h2>
      <p class="prose-copy max-w-2xl anima--bottom-in">MARENOSTRUM n'est ni un fournisseur généraliste ni un catalogue : une maison qui retient peu de pièces, les calibre avec rigueur, et en garantit la régularité, commande après commande.</p>
    </div>

    <div class="strip strip--normal mt-lg" style="--w1:6; --w2:-5">
      <div class="strip--columns">
        <div>
          <p class="eyebrow mb-4">Le constat</p>
          <h3 class="h-card mb-6">Chaque intermédiaire coûte un jour</h3>
          <p class="prose-copy">Le circuit classique empile les étapes — chacune ajoute un délai, un coût, et dilue un peu plus l'exigence sur le produit.</p>
        </div>
        <div class="flex flex-col justify-center gap-3 text-sm uppercase tracking-wide">
          <span class="opacity-50">Producteur</span>
          <span class="opacity-50">Intermédiaire</span>
          <span class="opacity-50">Grossiste régional</span>
          <span class="font-medium">Votre établissement</span>
        </div>
      </div>
    </div>

    <div class="strip strip--normal mt-lg" style="--w1:-6; --w2:5">
      <div class="strip--columns">
        <div>
          <p class="eyebrow mb-4">Notre parti pris</p>
          <h3 class="h-card mb-6">Une signature, pas une provenance</h3>
          <p class="prose-copy mb-4">Nous sélectionnons directement producteurs et mareyeurs, sans intermédiaire superflu — mais ce n'est pas l'origine qui nous engage, c'est notre validation.</p>
          <p class="prose-copy">Chaque lot est examiné selon un cahier des charges strict — calibre, régularité, texture. Ce qui ne le satisfait pas n'entre jamais dans notre collection.</p>
        </div>
        <dl class="grid grid-cols-2 gap-6 border-t pt-6" style="border-color:var(--color-border)">
          <div><dt class="field-label">Sélection</dt><dd class="text-sm">Lot par lot, validée avant intégration</dd></div>
          <div><dt class="field-label">Calibrage</dt><dd class="text-sm">Un standard constant, jamais approximatif</dd></div>
          <div><dt class="field-label">Livraison</dt><dd class="text-sm">Réfrigérée, 24-48h</dd></div>
          <div><dt class="field-label">Garantie</dt><dd class="text-sm">La maison répond de chaque pièce</dd></div>
        </dl>
      </div>
    </div>

    <!-- [IMAGE — La Maison, pleine largeur : bande de textures marines à cinq bandes, ratio
         21:9, bords à bords] — seule photo déjà existante de cette liste, réutilisée telle
         quelle (voir mnHomeTextureBand). -->
    <div class="strip strip--wide strip--image mt-lg js-image-anime" id="mn-texture-slot" data-texture></div>

    <!-- Presse — contenu de démonstration (voir la mention en pied de page), sur le modèle de
         la carte "News" d'un site de domaine : bloc encadré à part du reste de la section. -->
    <div class="strip strip--normal mt-lg" style="--w1:3; --w2:0">
      <div class="strip--columns" style="background-color:var(--color-surface); padding-left:var(--space-section); padding-right:var(--space-section); padding-top:calc(var(--space-section) * 2); padding-bottom:calc(var(--space-section) * 2)">
        <div class="flex flex-col justify-center">
          <p class="eyebrow mb-3">Presse</p>
          <h3 class="h-card mb-4">Marenostrum salué pour la régularité de ses calibrages</h3>
          <p class="prose-copy mb-4">Un panel de chefs indépendants a testé cinq maisons sur trois commandes successives : Marenostrum est la seule à livrer un calibre rigoureusement identique à chaque expédition.</p>
          <p class="text-sm font-medium mb-4">Source : Revue de la Table (démonstration)</p>
          <a href="#contact" class="btn-quiet self-start" data-scroll-link data-hover="Lire">Lire l'article →</a>
        </div>
        <div class="relative overflow-hidden js-image-anime" style="aspect-ratio:4/5">
          ${mnPicture({ stem: "gamme-boites", alt: "Gamme de coffrets Marenostrum", sizes: "(min-width: 768px) 30rem, 100vw", className: "absolute inset-0 h-full w-full object-cover" })}
        </div>
      </div>
    </div>

    <div class="strip strip--normal mt-lg text-center">
      <p class="eyebrow mb-4">Le caviar</p>
      <h3 class="h-card mb-6">La même exigence, portée plus loin</h3>
      <p class="prose-copy mx-auto max-w-2xl mb-6">Le caviar reste notre exception : un produit qui ne pardonne aucune approximation, sur le calibrage comme sur la garantie.</p>
      <a href="#table" class="btn-quiet" data-scroll-link data-hover="Voir">Découvrir La Table →</a>
    </div>
  </section>`;
}

function mnHomeTextureBand() {
  const strips = [
    { stem: "grain-macro", alt: "Grain de caviar Marenostrum, vue macro" },
    { stem: "bar-loup", alt: "Bar de ligne, texture de peau", objectPosition: "object-[15%_50%]" },
    { stem: "texture-mareyage", alt: "Textures de produits de la mer d'exception" },
    { stem: "trois-caviars", alt: "Boîtes de caviar Marenostrum ouvertes" },
    { stem: "langoustine", alt: "Langoustine, texture de carapace" }
  ];
  return `
  <div class="grid grid-cols-5" style="aspect-ratio:21/9" data-texture-band>
    ${strips
      .map(
        (s) => `
    <div class="relative h-full overflow-hidden">
      <div class="absolute -inset-y-12 inset-x-0" data-texture-strip>
        ${mnPicture({ stem: s.stem, alt: s.alt, sizes: "20vw", className: `h-full w-full object-cover scale-125 ${s.objectPosition || ""}`.trim() })}
      </div>
    </div>`
      )
      .join("")}
  </div>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 3) #table — Le Caviar et La Mer, chacun résumé en une bande éditoriale (une image, un texte,
 * la liste des pièces), plutôt qu'une ligne par pièce comme auparavant : chaque pièce garde sa
 * fiche dédiée (caviar-oscietre.html, etc.), atteinte depuis le lien de sa ligne.
 * ------------------------------------------------------------------------------------------ */
function mnSectionTable() {
  const caviarItems = [
    ["caviar-oscietre.html", "Osciètre", "Disponible"],
    ["caviar-beluga.html", "Beluga", "Sur allocation"],
    ["caviar-baeri.html", "Baeri", "Disponible"],
    ["caviar-sevruga.html", "Sevruga", "Ouverture prochaine"]
  ];
  const merItems = [
    ["mer-poisson-ligne.html", "Poisson de ligne", "Disponible"],
    ["mer-langoustine.html", "Langoustine", "Sur allocation"],
    ["mer-terrines.html", "Terrines & conserves", "Ouverture prochaine"]
  ];

  const list = (items) =>
    `<ul class="flex flex-col gap-3 border-t pt-6" style="border-color:var(--color-border)">
      ${items
        .map(
          ([href, name, status]) => `
      <li class="flex items-baseline justify-between gap-4">
        <a href="${href}" class="lt-link !text-sm normal-case !tracking-normal" data-hover="Voir">${name}</a>
        <span class="lt-status !text-[0.65rem]">${status}</span>
      </li>`
        )
        .join("")}
    </ul>`;

  return `
  <section id="table" data-scroll-section data-theme="dark" class="section-pad" style="background-color:var(--color-bg); color:var(--color-text)">
    <div class="strip strip--normal" data-reveal>
      <p class="eyebrow mb-4 anima--bottom-in">La Table</p>
      <h2 class="h-section mb-6 anima--bottom-in">Deux univers, une même exigence</h2>
      <p class="prose-copy max-w-2xl anima--bottom-in">Le Caviar et La Mer. Aucun prix affiché : chaque pièce se découvre, puis s'obtient sur demande d'allocation.</p>
    </div>

    <!-- [IMAGE — La Table, univers Caviar : packshot vertical d'une boîte ouverte vue en légère
         plongée, fond gris-bleu mat] — emplacement réservé, espace tenu via aspect-ratio. -->
    <div class="strip strip--normal mt-lg" style="--w1:7; --w2:-6">
      <div class="strip--columns">
        ${mnImagePlaceholder({ ratio: "4/5", label: "Packshot vertical, boîte ouverte, légère plongée", className: "js-image-anime" })}
        <div class="flex flex-col justify-center">
          <p class="lt-eyebrow mb-3">Univers</p>
          <h3 class="h-card mb-5">Le Caviar</h3>
          <p class="prose-copy mb-6 max-w-sm">Osciètre, Beluga, Baeri, Sevruga — quatre espèces, un seul niveau d'exigence.</p>
          ${list(caviarItems)}
        </div>
      </div>
    </div>

    <!-- [IMAGE — La Table, univers La Mer : flat lay de langoustines, vue du dessus à 90°, fond
         gris-bleu mat, ombre dure, sans accessoire] — photo réelle (langoustine). -->
    <div class="strip strip--normal mt-lg" style="--w1:-7; --w2:6">
      <div class="strip--columns">
        <div class="flex flex-col justify-center order-2 md:order-1">
          <p class="lt-eyebrow mb-3">Univers</p>
          <h3 class="h-card mb-5">La Mer</h3>
          <p class="prose-copy mb-6 max-w-sm">Une sélection resserrée de pièces d'exception, au-delà du caviar.</p>
          ${list(merItems)}
        </div>
        <div class="relative overflow-hidden order-1 md:order-2 js-image-anime" style="aspect-ratio:4/5">
          ${mnPicture({ stem: "langoustine", alt: "Flat lay de langoustines, vue du dessus, Maison Marenostrum", sizes: "(min-width: 768px) 37.5rem, 100vw", className: "absolute inset-0 h-full w-full object-cover" })}
        </div>
      </div>
    </div>

    <div class="strip strip--normal mt-lg text-center">
      <p class="eyebrow mb-4">Accès à la collection</p>
      <p class="prose-copy mx-auto mb-6 max-w-md">Cette présentation n'est pas exhaustive. Traçabilité, conditionnement et détail technique : <a href="fiche-technique-produit.html" class="underline hover:no-underline text-accent">fiche technique produit</a>.</p>
      <a href="#contact" class="btn-quiet" data-scroll-link data-hover="Écrire">Demander une allocation →</a>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 4) #savoir-faire — quatre blocs en strip--columns/strip--3-cols ; deux d'entre eux (la
 * sélection, la traçabilité) portent une image dédiée, conformément à la liste d'images fournie.
 * ------------------------------------------------------------------------------------------ */
function mnSectionSavoirFaire() {
  return `
  <section id="savoir-faire" data-scroll-section class="section-pad">
    <div class="strip strip--normal" data-reveal>
      <p class="eyebrow mb-4 anima--bottom-in">Notre savoir-faire</p>
      <h2 class="h-section mb-6 anima--bottom-in">Ce qui garantit chaque expédition</h2>
      <p class="prose-copy max-w-2xl anima--bottom-in">Un besoin transmis, une réponse sous 48h, une livraison réfrigérée adaptée à votre cuisine.</p>
    </div>

    <!-- [IMAGE — Notre savoir-faire, bloc « La sélection » : grille de perles de caviar
         régulières illustrant la constance] — photo réelle (trois-caviars, constance entre lots). -->
    <div class="strip strip--normal mt-lg" style="--w1:5; --w2:-5">
      <div class="strip--columns">
        <div class="relative overflow-hidden js-image-anime" style="aspect-ratio:1/1">
          ${mnPicture({ stem: "trois-caviars", alt: "Trois lots de caviar, régularité des perles, Maison Marenostrum", sizes: "(min-width: 768px) 30rem, 100vw", className: "absolute inset-0 h-full w-full object-cover" })}
        </div>
        <div class="flex flex-col justify-center">
          <p class="eyebrow mb-3">La sélection</p>
          <h3 class="h-card mb-4">Un lot retenu, ou refusé</h3>
          <p class="prose-copy">Calibre, régularité, texture, absence de défaut. Ce qui ne répond pas à notre cahier des charges n'entre jamais dans notre collection.</p>
        </div>
      </div>
    </div>

    <!-- [IMAGE — Notre savoir-faire, bloc « La traçabilité » : macro d'une étiquette CITES sur
         un couvercle] — emplacement réservé. -->
    <div class="strip strip--normal mt-lg" style="--w1:-5; --w2:5">
      <div class="strip--columns">
        <div class="flex flex-col justify-center order-2 md:order-1">
          <p class="eyebrow mb-3">La traçabilité</p>
          <h3 class="h-card mb-4">Une fiche de lot par expédition</h3>
          <p class="prose-copy">Étiquette CITES, numéro de lot, date de conditionnement. Détail sur la <a href="fiche-technique-produit.html" class="underline hover:no-underline text-accent">fiche technique produit</a>.</p>
        </div>
        ${mnImagePlaceholder({ ratio: "1/1", label: "Macro étiquette CITES sur un couvercle", className: "order-1 md:order-2 js-image-anime" })}
      </div>
    </div>

    <div class="strip strip--normal mt-lg">
      <div class="strip--3-cols" style="--w1:6; --w2:-6">
        <div>
          <p class="field-label mb-3">01</p>
          <h4 class="h-card mb-3">La chaîne du froid</h4>
          <p class="prose-copy text-sm">Livraison réfrigérée en France, en Suisse, à Monaco et au Luxembourg. Formalités d'import gérées pour vous.</p>
        </div>
        <div>
          <p class="field-label mb-3">02</p>
          <h4 class="h-card mb-3">Le conditionnement</h4>
          <p class="prose-copy text-sm">Des grammages adaptés à votre service, des boîtes à la marque de votre établissement.</p>
        </div>
        <div>
          <p class="field-label mb-3">03</p>
          <h4 class="h-card mb-3">La réponse</h4>
          <p class="prose-copy text-sm">Un besoin transmis via le formulaire de référencement, une allocation confirmée sous 48h.</p>
        </div>
      </div>
      <p class="mt-md text-center text-sm opacity-70">Conditions détaillées applicables aux établissements référencés : <a href="conditions-professionnelles.html" class="underline hover:no-underline text-accent">conditions professionnelles</a>.</p>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 5) #contact — thème sombre local (data-theme="dark"), formulaire de référencement.
 * ------------------------------------------------------------------------------------------ */
function mnSectionContact() {
  return `
  <section id="contact" data-scroll-section data-theme="dark" class="section-pad" style="background-color:var(--color-bg); color:var(--color-text)">
    <div class="strip strip--normal mb-lg text-center" data-reveal>
      <p class="eyebrow mb-4 anima--bottom-in">Demande de référencement</p>
      <h2 class="h-section mb-6 anima--bottom-in">Devenir un établissement référencé</h2>
      <p class="prose-copy mx-auto max-w-xl anima--bottom-in">MARENOSTRUM référence un nombre restreint d'établissements. Cette candidature est étudiée individuellement — ce n'est pas une prise de commande.</p>
    </div>

    <div class="strip strip--normal">
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-20">
        <form id="mn-contact-form" novalidate class="lg:col-span-2 flex flex-col gap-6 p-6 sm:p-10" style="background-color:var(--color-surface)">
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
              <label class="flex items-center gap-2.5 text-sm">
                <input type="checkbox" class="mn-checkbox h-4 w-4" name="ct-produit" value="caviar" />
                Le Caviar
              </label>
              <label class="flex items-center gap-2.5 text-sm">
                <input type="checkbox" class="mn-checkbox h-4 w-4" name="ct-produit" value="mer" />
                La Mer
              </label>
            </div>
          </fieldset>
          <div>
            <label class="field-label" for="ct-message">Message</label>
            <textarea id="ct-message" rows="6" class="input-field resize-none" placeholder="Précisez votre besoin (pièces recherchées, fréquence, contraintes de livraison...)"></textarea>
          </div>
          <button type="submit" class="btn-navy w-full self-center sm:w-auto" data-hover="Envoyer">Envoyer ma demande de référencement</button>
          <p id="mn-contact-feedback" class="hidden flex items-center justify-center gap-2 text-center text-sm" style="color:var(--color-accent)" role="status">
            <span class="h-4 w-4" id="mn-contact-feedback-icon"></span> Votre demande a bien été transmise. Nous l'étudions et revenons vers vous sous 48h.
          </p>
          <p class="text-center text-xs opacity-60">Site de démonstration : ce formulaire ne transmet aucune demande réelle. En le soumettant, vous reconnaissez avoir pris connaissance des <a href="conditions-professionnelles.html" class="underline hover:no-underline">conditions professionnelles</a>.</p>
        </form>

        <aside class="flex flex-col items-center text-center">
          <div class="flex flex-col items-center gap-8">
            <div class="flex flex-col items-center gap-2">
              <span class="h-5 w-5 shrink-0" style="color:var(--color-accent)" id="mn-contact-icon-mail"></span>
              <div><p class="field-label !mb-1">E-mail</p><p class="text-sm opacity-90">contact@marenostrum.example</p></div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <span class="h-5 w-5 shrink-0" style="color:var(--color-accent)" id="mn-contact-icon-phone"></span>
              <div><p class="field-label !mb-1">Téléphone</p><p class="text-sm opacity-90">01 23 45 67 89 — lun.–ven., 9h–18h</p></div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <span class="h-5 w-5 shrink-0" style="color:var(--color-accent)" id="mn-contact-icon-pin"></span>
              <div><p class="field-label !mb-1">Maison MARENOSTRUM</p><p class="text-sm opacity-90">12 quai des Salinières, 33000 Bordeaux, France</p></div>
            </div>
          </div>
          <p class="mx-auto mt-10 max-w-xs border-t pt-8 text-center text-sm opacity-70" style="border-color:var(--color-border)">Chaque candidature est étudiée individuellement avant qu'une allocation ne soit proposée.</p>
        </aside>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * Pré-remplissage du formulaire depuis un lien "Demander une allocation" (fiche produit) ou une
 * URL partagée (?produit=<slug>).
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
}
