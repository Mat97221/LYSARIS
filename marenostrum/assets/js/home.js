/**
 * MARENOSTRUM — Sections de la page d'accueil éditoriale (refonte inspirée de heathceramics.com).
 * Chaque fonction retourne le HTML d'une section autonome, montée dans index.html via le motif
 * déjà utilisé ailleurs sur le site : un placeholder `<div data-mon-attribut></div>` statique,
 * remplacé au chargement par `document.querySelector("[data-mon-attribut]").outerHTML = mnHomeXxx();`.
 * Seul index.html charge ce fichier — les autres pages n'en ont pas besoin.
 *
 * Toutes les photos passent par `<image-slot>` (assets/js/image-slot.js), déjà utilisé partout
 * ailleurs sur le site pour les visuels en attente : pour remplacer une image, ajoutez
 * `src="assets/img/votre-photo.jpg"` (+ `alt="…"` pour les photos porteuses de sens, voir plus
 * bas) sur la balise portant l'id concerné. Rien d'autre à toucher.
 */

/* ------------------------------------------------------------------------------------------ *
 * 2) MANIFESTE — chapitres numérotés, plein largeur, alternant fond ivoire / glacier
 * ------------------------------------------------------------------------------------------ */
function mnHomeManifesto() {
  const chapters = [
    {
      num: "01",
      eyebrow: "L'eau vive",
      title: "Un caviar d'eau douce, assumé",
      body: "Nos esturgeons grandissent en circuit fermé, en eaux vives, chez notre éleveur partenaire en Hongrie — jamais en mer, jamais en cage flottante. Une eau qui se renouvelle sans cesse, condition première d'un grain juste.",
      link: { href: "a-propos.html", label: "Découvrir notre éleveur" },
      photoId: "mn-manifesto-photo-1",
      photoAlt: "Bassins d'élevage en eau vive de la ferme partenaire, en Hongrie",
      photoPlaceholder: "Photo plein cadre : bassins en eau vive, ferme Kovács, Hongrie",
      bg: "ivoire",
      imageSide: "left"
    },
    {
      num: "02",
      eyebrow: "La sélection",
      title: "Un lot goûté avant d'être retenu",
      body: "Chaque récolte est ouverte, observée, goûtée — grain par grain — avant d'entrer dans notre sélection. Ce que nous refusons ne porte jamais notre nom.",
      link: { href: "boutique.html", label: "Voir la sélection" },
      photoId: "mn-manifesto-photo-2",
      photoAlt: "Geste de sélection et de dégustation d'un lot de caviar",
      photoPlaceholder: "Photo plein cadre : geste de sélection / dégustation d'un lot",
      bg: "glacier",
      imageSide: "right"
    },
    {
      num: "03",
      eyebrow: "L'affinage",
      title: "Le geste Malossol, transmis",
      body: "Chaque lot est salé à la main selon la méthode Malossol — juste assez de sel pour révéler le grain, jamais pour le masquer. Un geste précis, transmis de génération en génération.",
      link: { href: "a-propos.html", label: "Le savoir-faire de la Maison" },
      photoId: "mn-manifesto-photo-3",
      photoAlt: "Geste de salage à la main selon la méthode Malossol",
      photoPlaceholder: "Photo plein cadre : geste de salage à la main, méthode Malossol",
      bg: "ivoire",
      imageSide: "left"
    },
    {
      num: "04",
      eyebrow: "La transparence",
      title: "On vous dit tout",
      body: "Élevage d'eau douce, origine Hongrie, numéro de lot traçable jusqu'à la ferme et à la date de récolte — aucune ambiguïté sur ce que vous servez. Sur demande, chaque référence peut être documentée pour votre carte.",
      link: { href: "a-propos.html", label: "Notre engagement de traçabilité" },
      photoId: "mn-manifesto-photo-4",
      photoAlt: "Boîte de caviar MARENOSTRUM numérotée, traçabilité du lot",
      photoPlaceholder: "Photo plein cadre : boîte numérotée / étiquette de traçabilité",
      bg: "glacier",
      imageSide: "right"
    }
  ];

  const chapterHtml = (c) => {
    const imageCol = `
      <div class="reveal flex h-80 items-center justify-center overflow-hidden sm:h-[28rem] ${c.imageSide === "right" ? "lg:order-2" : "lg:order-1"}">
        <image-slot id="${c.photoId}" shape="rect" alt="${c.photoAlt}" placeholder="${c.photoPlaceholder}" style="width:100%;height:100%"></image-slot>
      </div>`;
    const textCol = `
      <div class="reveal [transition-delay:150ms] ${c.imageSide === "right" ? "lg:order-1" : "lg:order-2"}">
        <p class="mn-chapter-num mb-4">${c.num}<span class="text-marine/30">/04</span></p>
        <p class="eyebrow mb-4">${c.eyebrow}</p>
        <h2 class="h-section mb-6">${c.title}</h2>
        <p class="prose-copy mb-8">${c.body}</p>
        <a href="${c.link.href}" class="btn-outline">${c.link.label}</a>
      </div>`;
    // Tailwind's JIT scanner needs each utility class spelled out literally somewhere in the
    // source — a computed `bg-${c.bg}` string wouldn't reliably be picked up, so the two
    // background variants this section ever uses are written out in full here.
    const bgClass = c.bg === "glacier" ? "bg-glacier" : "bg-ivoire";
    return `
      <section class="${bgClass}">
        <div class="container-page grid grid-cols-1 items-center gap-12 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
          ${imageCol}
          ${textCol}
        </div>
      </section>`;
  };

  return chapters.map(chapterHtml).join("");
}

/* ------------------------------------------------------------------------------------------ *
 * 3) LES CAVIARS — carrousel horizontal, pas de logique panier, tout oriente vers le devis
 * ------------------------------------------------------------------------------------------ */
function mnHomeCaviarCarousel() {
  const ids = ["esturgeon-russe", "kaluga", "beluga", "keta"];

  const card = (product) => {
    if (!product) return "";
    const speciesLine = product.species ? `<p class="mb-1 font-titre italic text-ink-300 text-lg">${product.species}</p>` : "";
    const note = product.tastingNotes && product.tastingNotes.length ? product.tastingNotes.join(" · ") : product.tagline;
    return `
      <article class="mn-carousel-item w-[78vw] shrink-0 sm:w-[340px]">
        <div class="mb-6 flex h-64 items-center justify-center overflow-hidden bg-ivoire sm:h-72">
          <image-slot id="mn-carousel-${product.id}" shape="rect" alt="Grain de ${product.name} en gros plan" placeholder="Photo macro : grain de ${product.name}" style="width:100%;height:100%"></image-slot>
        </div>
        <p class="eyebrow mb-2">${product.category === "caviar-saumon" ? "Œufs de saumon" : "Caviar d'esturgeon"}</p>
        <h3 class="h-card mb-1">${product.name}</h3>
        ${speciesLine}
        <p class="mb-6 text-sm text-ink-200 leading-relaxed">${note}</p>
        <div class="flex flex-wrap items-center gap-4">
          <a href="contact.html?produit=${encodeURIComponent(product.name)}" class="btn-navy">Demander un devis</a>
          <a href="produit.html?id=${product.id}" class="text-xs font-semibold uppercase tracking-widest2 text-marine hover:underline">Détails →</a>
        </div>
      </article>`;
  };

  const cards = ids.map(mnFindProduct).map(card).join("");

  return `
  <section class="bg-ivoire">
    <div class="container-page py-24 lg:py-32">
      <div class="mb-14 reveal">
        <p class="eyebrow mb-3">Le catalogue</p>
        <h2 class="h-section">Les caviars</h2>
      </div>
    </div>
    <div id="mn-caviar-carousel" class="mn-carousel mn-scrollbar-hidden pl-5 pr-5 sm:pl-8 sm:pr-8" role="region" aria-label="Carrousel des caviars">
      ${cards}
      <div class="shrink-0" style="width:1px"></div>
    </div>
    <div class="container-page mt-10 flex items-center justify-between">
      <a href="boutique.html" class="btn-outline">Voir tout le catalogue</a>
      <div class="hidden gap-3 sm:flex">
        <button type="button" id="mn-carousel-prev" aria-label="Caviar précédent" class="flex h-11 w-11 items-center justify-center rounded border border-marine/40 text-marine transition-colors duration-200 ease-fluid hover:bg-marine hover:text-ivoire">
          <span class="h-4 w-4 rotate-180">${MN_ICONS.chevronRight}</span>
        </button>
        <button type="button" id="mn-carousel-next" aria-label="Caviar suivant" class="flex h-11 w-11 items-center justify-center rounded border border-marine/40 text-marine transition-colors duration-200 ease-fluid hover:bg-marine hover:text-ivoire">
          <span class="h-4 w-4">${MN_ICONS.chevronRight}</span>
        </button>
      </div>
    </div>
  </section>`;
}

function mnInitCaviarCarousel() {
  const track = document.getElementById("mn-caviar-carousel");
  const prev = document.getElementById("mn-carousel-prev");
  const next = document.getElementById("mn-carousel-next");
  if (!track || !prev || !next) return;
  const step = () => Math.min(360, track.clientWidth * 0.8);
  prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
}

/* ------------------------------------------------------------------------------------------ *
 * 4) L'AFFINEUR / SAVOIR-FAIRE — section riche en récit, grand visuel + gros plans texture
 * ------------------------------------------------------------------------------------------ */
function mnHomeCraft() {
  return `
  <section class="bg-glacier">
    <div class="container-page py-24 lg:py-32">
      <div class="mx-auto mb-16 max-w-2xl text-center reveal">
        <p class="eyebrow mb-4">L'affineur</p>
        <h2 class="h-section mb-6">On sélectionne. On goûte. On affine.</h2>
        <p class="prose-copy mx-auto">Trois verbes qui résument tout notre métier. Rien n'est laissé au hasard entre le bassin et votre carte — et rien n'est caché non plus : nous sommes une maison de caviar d'élevage en eau douce, et nous en sommes fiers.</p>
      </div>

      <div class="reveal mb-6 flex h-[26rem] items-center justify-center overflow-hidden sm:h-[32rem]">
        <image-slot id="mn-craft-main-photo" shape="rect" alt="L'affineur MARENOSTRUM au geste de sélection" placeholder="Photo plein cadre : l'affineur au travail, geste de sélection" style="width:100%;height:100%"></image-slot>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div class="reveal [transition-delay:80ms] flex h-56 items-center justify-center overflow-hidden">
          <image-slot id="mn-craft-detail-1" shape="rect" alt="" placeholder="Gros plan texture : grain de caviar" style="width:100%;height:100%"></image-slot>
        </div>
        <div class="reveal [transition-delay:160ms] flex h-56 items-center justify-center overflow-hidden">
          <image-slot id="mn-craft-detail-2" shape="rect" alt="" placeholder="Gros plan texture : nacre de la cuillère de dégustation" style="width:100%;height:100%"></image-slot>
        </div>
        <div class="reveal [transition-delay:240ms] flex h-56 items-center justify-center overflow-hidden">
          <image-slot id="mn-craft-detail-3" shape="rect" alt="" placeholder="Gros plan texture : sel d'affinage" style="width:100%;height:100%"></image-slot>
        </div>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
        <div class="reveal">
          <p class="mn-chapter-num mb-3">01</p>
          <h3 class="h-card mb-2">Sélectionner</h3>
          <p class="text-ink-200 leading-relaxed">Chaque lot est évalué avant d'entrer dans notre gamme — grain, robe, texture.</p>
        </div>
        <div class="reveal [transition-delay:80ms]">
          <p class="mn-chapter-num mb-3">02</p>
          <h3 class="h-card mb-2">Goûter</h3>
          <p class="text-ink-200 leading-relaxed">Aucune référence n'est mise en vente sans dégustation par la Maison.</p>
        </div>
        <div class="reveal [transition-delay:160ms]">
          <p class="mn-chapter-num mb-3">03</p>
          <h3 class="h-card mb-2">Affiner</h3>
          <p class="text-ink-200 leading-relaxed">Le temps de repos juste nécessaire, jamais plus, pour que le grain s'exprime.</p>
        </div>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 5) GALERIE TEXTURE — bande plein largeur, quasi sans texte
 * ------------------------------------------------------------------------------------------ */
function mnHomeTextureGallery() {
  const tiles = [
    { id: "mn-texture-grain", label: "Grain", placeholder: "Macro : grain de caviar" },
    { id: "mn-texture-nacre", label: "Nacre", placeholder: "Macro : nacre" },
    { id: "mn-texture-glace", label: "Glace", placeholder: "Macro : glace pilée" },
    { id: "mn-texture-pierre", label: "Pierre", placeholder: "Macro : pierre mouillée" }
  ];
  const tile = (t) => `
    <figure class="reveal relative h-72 overflow-hidden sm:h-96">
      <image-slot id="${t.id}" shape="rect" alt="" placeholder="${t.placeholder}" style="width:100%;height:100%"></image-slot>
      <figcaption class="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-widest2 text-ivoire [text-shadow:0_1px_8px_rgba(17,17,16,0.6)]">${t.label}</figcaption>
    </figure>`;
  return `
  <section class="bg-ivoire">
    <div class="mn-texture-band">
      ${tiles.map(tile).join("")}
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 6) POUR LES PROFESSIONNELS — cœur commercial B2B
 * ------------------------------------------------------------------------------------------ */
function mnHomeB2B() {
  const items = [
    {
      icon: MN_ICONS.truck,
      title: "Livraison réfrigérée 24-48h",
      body: "Colis isotherme et glace pilée, partout en France métropolitaine — sur commande ponctuelle ou réassort planifié."
    },
    {
      icon: MN_ICONS.shield,
      title: "Traçabilité totale",
      body: "Chaque boîte porte un numéro de lot, retraçable jusqu'à la ferme et à la date de récolte. Documentation fournie sur demande."
    },
    {
      icon: MN_ICONS.gift,
      title: "Formats professionnels",
      body: "Du 30 g pour l'accord mets-vins jusqu'au 1 kg pour les volumes de restauration, avec tarification dégressive."
    }
  ];
  const item = (it, i) => `
    <div class="reveal [transition-delay:${i * 80}ms] flex flex-col items-start gap-4">
      <span class="flex h-11 w-11 items-center justify-center rounded border border-ivoire/30 text-ivoire">
        <span class="h-5 w-5">${it.icon}</span>
      </span>
      <h3 class="h-card text-ivoire">${it.title}</h3>
      <p class="text-ivoire/75 leading-relaxed">${it.body}</p>
    </div>`;

  return `
  <section class="bg-marine">
    <div class="container-page py-24 lg:py-32">
      <div class="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div class="reveal">
          <p class="eyebrow text-ivoire/80">Restaurants · Hôtels · Grossistes</p>
          <h2 class="h-section mb-6 text-ivoire">Une maison pensée pour la restauration professionnelle</h2>
          <p class="text-lg leading-relaxed text-ivoire/80">Depuis la commande ponctuelle jusqu'au réassort régulier d'une carte, notre équipe dédiée aux professionnels accompagne restaurants, hôtels et grossistes avec des volumes, une logistique et une traçabilité pensés pour la restauration.</p>
        </div>
        <div class="reveal [transition-delay:150ms] flex h-72 items-center justify-center overflow-hidden rounded bg-ivoire p-8 sm:h-80">
          <div id="mn-b2b-tin" data-tin-reveal></div>
        </div>
      </div>

      <div class="mb-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
        ${items.map(item).join("")}
      </div>

      <div class="reveal flex flex-col items-start gap-6 border-t border-ivoire/20 pt-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 class="h-card mb-2 text-ivoire">Comment commander</h3>
          <p class="max-w-xl text-ivoire/75 leading-relaxed">Un devis personnalisé sous 48h selon vos volumes et votre destination — puis un interlocuteur dédié pour chaque réassort.</p>
        </div>
        <a href="contact.html" class="btn-navy shrink-0 !bg-ivoire !border-ivoire !text-marine hover:!bg-sable hover:!border-sable">Demander un devis</a>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------------------------------ *
 * 7) CONTACT / DEVIS + NEWSLETTER
 * ------------------------------------------------------------------------------------------ */
function mnHomeContactDevis() {
  const productOptions = MARENOSTRUM_PRODUCTS.map((p) => `<option value="${p.name}">${p.name}</option>`).join("");
  return `
  <section class="bg-glacier">
    <div class="container-page py-24 lg:py-32">
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:gap-20">
        <div class="lg:col-span-2 reveal">
          <p class="eyebrow mb-4">Demander un devis</p>
          <h2 class="h-section mb-6">Parlons de votre carte</h2>
          <p class="prose-copy mb-10">Renseignez vos produits et volumes souhaités — notre équipe professionnelle vous répond sous 48h avec un devis personnalisé.</p>

          <form id="mn-newsletter-form" novalidate class="border-t border-marine/15 pt-8">
            <label class="field-label" for="mn-newsletter-email">Rester informé</label>
            <p class="mb-4 text-sm text-ink-200">Nouveautés, éditions limitées et arrivages — un e-mail occasionnel, jamais plus.</p>
            <div class="flex flex-col gap-3 sm:flex-row">
              <input id="mn-newsletter-email" type="email" required placeholder="vous@etablissement.fr" class="input-field !bg-ivoire" />
              <button type="submit" class="btn-outline shrink-0 whitespace-nowrap">S'inscrire</button>
            </div>
            <p id="mn-newsletter-feedback" class="hidden mt-3 flex items-center gap-2 text-sm text-marine" role="status">
              <span class="h-4 w-4" id="mn-newsletter-feedback-icon"></span> Merci, votre inscription est enregistrée.
            </p>
          </form>
        </div>

        <form id="mn-devis-form" novalidate class="lg:col-span-3 reveal [transition-delay:150ms] flex flex-col gap-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label class="field-label" for="devis-establishment">Nom de l'établissement</label>
              <input id="devis-establishment" type="text" class="input-field !bg-ivoire" required />
              <p id="devis-establishment-error" class="field-error hidden">Merci d'indiquer le nom de votre établissement.</p>
            </div>
            <div>
              <label class="field-label" for="devis-name">Nom du contact</label>
              <input id="devis-name" type="text" class="input-field !bg-ivoire" required />
              <p id="devis-name-error" class="field-error hidden">Merci d'indiquer votre nom.</p>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label class="field-label" for="devis-email">E-mail</label>
              <input id="devis-email" type="email" class="input-field !bg-ivoire" required />
              <p id="devis-email-error" class="field-error hidden">Adresse e-mail invalide.</p>
            </div>
            <div>
              <label class="field-label" for="devis-phone">Téléphone</label>
              <input id="devis-phone" type="tel" class="input-field !bg-ivoire" />
            </div>
          </div>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label class="field-label" for="devis-product">Produit souhaité</label>
              <select id="devis-product" class="input-field !bg-ivoire">
                <option value="">À définir avec vous</option>
                ${productOptions}
              </select>
            </div>
            <div>
              <label class="field-label" for="devis-quantity">Quantité estimée</label>
              <select id="devis-quantity" class="input-field !bg-ivoire">
                <option>À définir</option>
                <option>Moins de 1 kg</option>
                <option>1 à 5 kg</option>
                <option>5 à 20 kg</option>
                <option>Plus de 20 kg</option>
                <option>Réassort régulier</option>
              </select>
            </div>
          </div>
          <div>
            <label class="field-label" for="devis-message">Message</label>
            <textarea id="devis-message" rows="4" class="input-field !bg-ivoire resize-none" placeholder="Précisez votre besoin, votre échéance, votre établissement…"></textarea>
          </div>
          <button type="submit" class="btn-navy w-full sm:w-auto">Envoyer ma demande de devis</button>
          <p id="mn-devis-feedback" class="hidden flex items-center gap-2 text-sm text-marine" role="status">
            <span class="h-4 w-4" id="mn-devis-feedback-icon"></span> Merci, votre demande est enregistrée. Nous revenons vers vous sous 48h.
          </p>
          <p class="text-xs text-ink-300">Site de démonstration : ce formulaire ne transmet aucune donnée. Aucune information saisie n'est envoyée ni conservée.</p>
        </form>
      </div>
    </div>
  </section>`;
}

function mnInitHomeForms() {
  const devisForm = document.getElementById("mn-devis-form");
  if (devisForm) {
    devisForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const establishment = document.getElementById("devis-establishment");
      const name = document.getElementById("devis-name");
      const email = document.getElementById("devis-email");

      const establishmentValid = establishment.value.trim().length > 0;
      const nameValid = name.value.trim().length > 0;
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

      document.getElementById("devis-establishment-error").classList.toggle("hidden", establishmentValid);
      establishment.classList.toggle("!border-error", !establishmentValid);
      document.getElementById("devis-name-error").classList.toggle("hidden", nameValid);
      name.classList.toggle("!border-error", !nameValid);
      document.getElementById("devis-email-error").classList.toggle("hidden", emailValid);
      email.classList.toggle("!border-error", !emailValid);

      if (!(establishmentValid && nameValid && emailValid)) return;

      // Démonstration uniquement : aucune requête réseau, aucune donnée conservée.
      // Brancher un vrai point de collecte (API, service e-mail, CRM…) ici avant mise en
      // production — voir le commentaire équivalent dans contact.html.
      document.getElementById("mn-devis-feedback-icon").innerHTML = MN_ICONS.check;
      document.getElementById("mn-devis-feedback").classList.remove("hidden");
      devisForm.reset();
    });
  }

  const newsletterForm = document.getElementById("mn-newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("mn-newsletter-email");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.classList.add("!border-error");
        return;
      }
      email.classList.remove("!border-error");
      document.getElementById("mn-newsletter-feedback-icon").innerHTML = MN_ICONS.check;
      document.getElementById("mn-newsletter-feedback").classList.remove("hidden");
      newsletterForm.reset();
    });
  }
}
