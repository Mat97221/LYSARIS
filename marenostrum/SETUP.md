# MARENOSTRUM — site vitrine B2B (démo)

Site statique HTML / CSS (Tailwind) / JS vanilla pour MARENOSTRUM, maison de produits de la mer
d'exception pour les professionnels de la gastronomie et de la distribution (restaurants, hôtels,
traiteurs, mareyeurs, grossistes). Aucun framework, aucun backend, **aucun panier ni paiement en
ligne, aucun prix affiché** : le site fonctionne entièrement sur un modèle de demande de
référencement — chaque pièce affiche un statut (Disponible / Sur allocation / Ouverture
prochaine), jamais un tarif.

L'accueil (`index.html`) est une **page unique défilante** (La Maison / Notre savoir-faire /
Contact enchaînés en une seule page, animée au défilement via Lenis + GSAP). **La Table** est son
propre mini-site (`la-table.html` + une page par produit), traité comme un domaine viticole
présente ses cuvées — palette et typographie propres, aucun prix, aucun bouton d'ajout au panier
(voir "La Table — mini-site domaine-viticole" ci-dessous). Les autres pages restent en dehors du
défilement, avec leur propre URL pour être partagées par e-mail : `fiche-technique-produit.html`
et `conditions-professionnelles.html`.

## Lancer le site en local

```bash
cd marenostrum
npm install            # installe Tailwind CLI (une seule fois)
npm run build:css      # compile assets/css/style.css
npm run serve          # sert le dossier sur http://localhost:8080
```

Pendant le développement, dans un second terminal :

```bash
npm run watch:css      # recompile le CSS à chaque changement de src/input.css
```

Le CSS compilé (`assets/css/style.css`) est commité : le site fonctionne tel
quel sans étape de build si vous ne touchez pas aux styles.

## Structure

```
marenostrum/
├── index.html                     — accueil one-page : hero, bandeau de textures (parallaxe),
│                                     puis les sections #maison / #savoir-faire / #contact
│                                     enchaînées (voir "Accueil one-page" ci-dessous)
├── la-table.html                  — index La Table : liste verticale alternée Le Caviar / La Mer
│                                     (voir "La Table — mini-site domaine-viticole" ci-dessous)
├── caviar-oscietre.html, caviar-beluga.html, caviar-baeri.html, caviar-sevruga.html
│                                   — fiches produit Le Caviar, une page par cuvée
├── mer-poisson-ligne.html, mer-langoustine.html, mer-terrines.html
│                                   — fiches produit La Mer, une page par pièce
├── fiche-technique-produit.html   — fiche produit (espèces, formats, conservation,
│                                     traçabilité) — page autonome, partageable par e-mail
├── conditions-professionnelles.html — référencement, allocation, livraison, paiement — page
│                                     autonome, partageable par e-mail
├── mentions-legales.html, confidentialite.html
├── assets/
│   ├── css/style.css       — généré par Tailwind (ne pas éditer à la main)
│   ├── img/                — photos sources
│   │   └── responsive/     — variantes WebP + JPEG générées à 768/1280/1920px (plafonnées à la
│   │                          résolution native), voir "Images responsives" ci-dessous
│   └── js/
│       ├── home.js         — sections de l'accueil one-page (hero, bandeau de textures,
│       │                      #maison, #savoir-faire, #contact) + helper <picture>. Expose aussi
│       │                      `mnHomeTextureBand()`, réutilisé tel quel par `la-table.html` comme
│       │                      bandeau séparateur entre Le Caviar et La Mer.
│       ├── motion.js       — Lenis (défilement lissé) + GSAP/ScrollTrigger : les animations
│       │                      partagées par l'accueil ET La Table (voir plus bas)
│       ├── image-slot.js   — composant <image-slot> (placeholder photo, non utilisé
│       │                      actuellement — toutes les photos du site sont réelles)
│       └── ui.js           — header/footer, icônes SVG
├── src/input.css            — source Tailwind (éditer ici) — contient la section dédiée aux
│                              classes `.lt-*` de La Table (voir plus bas)
├── tailwind.config.js       — tokens de couleur/typo/animation, dont `metal` et `domaine`
│                              (voir "La Table — mini-site domaine-viticole" ci-dessous)
└── design-system/marenostrum/MASTER.md — décisions de design historiques
    (très en amont du positionnement actuel — voir le code pour l'état réel)
```

## Accueil one-page

- **Trois sections** : `#maison` (positionnement, aucune revendication d'origine géographique,
  avec un lien "Découvrir La Table →" vers `la-table.html`), `#savoir-faire` (sélection,
  traçabilité, chaîne du froid, conditionnement), `#contact` (formulaire de référencement
  qualifiant).
- **Navigation fixe** : les liens de l'en-tête défilent en douceur vers chaque ancre via
  `lenis.scrollTo()` (jamais le scroll natif), voir `mnInitAnchorNav()`/`mnInitActiveNav()` dans
  `motion.js`. Le lien "La Table" de l'en-tête n'est plus une ancre : c'est une navigation normale
  vers `la-table.html`. Sur les autres pages (fiche technique, conditions pro, mentions
  légales...), les liens d'ancre pointent vers `index.html#ancre` — une navigation normale, ces
  pages ne chargent ni Lenis ni GSAP.
- **"Demander une allocation"** (La Table) ne recharge pas la page de contact : un clic depuis une
  fiche produit navigue vers `index.html?produit=<slug>#contact`, qui pré-remplit le formulaire de
  la section `#contact` et y défile au chargement (`mnPrefillProduit()`/`mnInitProduitCTAs()` dans
  `home.js`, `MN_PRODUIT_LABELS` pour l'intitulé affiché par slug).

## La Table — mini-site domaine-viticole

`la-table.html` (index) et ses sept fiches produit (`caviar-oscietre.html`, `caviar-beluga.html`,
`caviar-baeri.html`, `caviar-sevruga.html`, `mer-poisson-ligne.html`, `mer-langoustine.html`,
`mer-terrines.html`) forment un mini-site à part, avec sa propre URL par produit — chaque pièce y
est présentée comme une cuvée de domaine viticole, pas comme une référence de catalogue.

- **Palette et typographie propres, scopées à ce groupe de pages uniquement** : trois valeurs
  seulement — `noir` (#111110), `ivoire` (#F6F2EA, existants) et un nouvel accent métallique
  discret, `metal` (#9C8B6E, `tailwind.config.js`) — jamais `marine`/`glacier`/`sable` ailleurs
  utilisés sur le site. Les titres utilisent une police à empattements dédiée, `font-domaine`
  (Cormorant Garamond, chargée via Google Fonts dans `src/input.css`) ; les textes techniques
  restent en `font-texte` (Switzer, comme sur le reste du site) avec un interlettrage ouvert. Les
  classes composants `.lt-*` (eyebrow, title, title-hero, tagline, tasting, status, link,
  tech-list, tech-item) sont regroupées dans une section dédiée en fin de `src/input.css`.
- **Index (`la-table.html`)** : une liste verticale d'entrées pleine largeur, chacune avec une
  image en pleine colonne (sans cadre, sans ombre, sans arrondi) et, de l'autre côté, le nom, une
  ligne de caractérisation et un lien discret "Découvrir →" — l'alternance gauche/droite s'inverse
  à chaque entrée. Un bandeau de textures (`mnHomeTextureBand()`, réutilisé depuis `home.js`)
  sépare les deux univers : Le Caviar (Osciètre, Beluga, Baeri, Sevruga) et La Mer (poisson de
  ligne, langoustine, terrines & conserves, statut "Ouverture prochaine").
- **Fiche produit** : chapitres verticaux — image plein écran avec le nom en grand
  (`.lt-title-hero`) ; un paragraphe de caractère écrit comme une note de dégustation
  (`.lt-tasting`) ; un bloc de données sobres en liste dépouillée sans tableau ni bordure
  (`.lt-tech-list`/`.lt-tech-item` : espèce, calibre du grain, affinage, taux de sel, millésime,
  grammages pour Le Caviar ; pièce, calibre, conservation, grammage pour La Mer) ; un bloc
  d'accords et de conseils de service ; un unique appel à l'action, "Demander une allocation →",
  vers `index.html?produit=<slug>#contact`.
- **Aucun prix, aucun bouton d'ajout au panier, aucune carte/encadré** : cohérent avec le reste du
  site, mais avec une mise en page à part (marges généreuses, blocs de texte étroits, jamais pleine
  largeur pour le texte).
- **Parallaxe produit** (`mnInitProductParallax()` dans `motion.js`) : amplitude 30px, `scrub`,
  posée sur un `<div data-product-parallax>` qui enveloppe l'image — jamais sur l'`<img>`
  elle-même, car GSAP écrirait son propre `transform` inline et écraserait la classe Tailwind
  `scale-110`/`scale-125` portée par l'image. Le même Lenis/GSAP CDN et les mêmes animations
  d'apparition (`[data-reveal]`/`[data-reveal-item]`) que l'accueil sont chargés indépendamment sur
  ces huit pages.

### Lenis + GSAP/ScrollTrigger — animations partagées, aucune autre

Chargés via CDN (jsDelivr) sur `index.html`, `la-table.html` et les sept fiches produit — aucune
autre page n'en dépend :

```html
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
```

Ils ne sont pas dans `package.json` : le site n'a pas de bundler (seul Tailwind CLI compile le
CSS), donc rien ne consommerait un `npm install lenis gsap` — le CDN est le point d'intégration
réel, chargé en balises `<script>` classiques (globals `Lenis`/`gsap`/`ScrollTrigger`), exactement
comme les polices Google/Fontshare déjà chargées ainsi sur tout le site.

1. **Apparition des images/blocs** : tout `[data-reveal]` est un groupe ; ses enfants directs
   `[data-reveal-item]` cascadent à 0.12s d'écart (`gsap.from(..., {opacity:0,y:40,scale:1.02})`,
   0.9s, `power3.out`, `ScrollTrigger` `start:"top 85%"`, `toggleActions:"play none none none"` —
   une seule fois).
2. **Parallaxe du bandeau de textures** : cinq bandes verticales (`[data-texture-strip]` dans
   `[data-texture-band]`), amplitudes -30/+20/-45/+15/-25px, `scrub:1`, `start:"top bottom"`,
   `end:"bottom top"`.
3. **Révélation du slogan** : chaque mot du hero (`[data-slogan-word]`, masqué par
   `.mn-slogan-mask`) remonte depuis `yPercent:100`/`opacity:0`, cascade 0.08s, `power4.out`, 1s,
   déclenchée au chargement (pas au scroll). Uniquement sur `index.html`.
4. **Parallaxe des images produit** (La Table) : tout `[data-product-parallax]` (un `<div>`
   enveloppant l'image, jamais l'image elle-même) glisse de 30px, `scrub:1`, `start:"top bottom"`,
   `end:"bottom top"` — voir "La Table — mini-site domaine-viticole" ci-dessus.

`mnInitMotion()` (appelé une fois toutes les sections montées — par `index.html`, et directement
par chaque page statique de La Table) désactive Lenis et affiche tout dans son état final si
`prefers-reduced-motion: reduce`, ou si `gsap` n'a pas pu se charger (repli silencieux : la
navigation par ancre retombe alors sur le saut natif du navigateur, et `mnScrollTo()` sur
`element.scrollIntoView()`).

### Images responsives

Chaque photo de contenu de l'accueil est servie via `mnPicture()` (`home.js`) : `<picture>` avec
une source WebP et un repli JPEG, `srcset` à 768/1280/1920px (plafonné à la résolution native de
la photo source pour ne jamais l'agrandir — voir `MN_IMG_WIDTHS`), `loading="lazy"` sauf le hero.
Les variantes sont pré-générées dans `assets/img/responsive/` par `scripts/generate-responsive-images.py`
(Pillow) — à relancer (`python3 scripts/generate-responsive-images.py`) si une photo source change,
et à tenir en cohérence avec `MN_IMG_WIDTHS` dans `home.js`. L'espace de chaque image est réservé via `aspect-ratio`
(bandes panoramiques, grille caviar, photos La Mer) ou une hauteur de conteneur fixe (hero, bandes
plein cadre) pour ne jamais décaler la mise en page pendant le chargement.

## Modèle "demande de référencement"

- **Aucun prix affiché** nulle part sur le site — chaque pièce porte une pastille de statut, pas
  un tarif.
- Le formulaire de `#contact` (établissement, contact, type d'établissement, ville, volumes
  estimés, produits concernés, message) est validé et confirmé en JS pur ; aucune donnée n'est
  réellement transmise (site statique, sans back-end) — voir le `console.log(payload)` dans
  `mnInitContactForm()` (`home.js`), à remplacer par un vrai service d'envoi en production. Le ton
  reste celui d'une candidature étudiée individuellement, jamais d'une prise de commande
  automatique.

## Contenu de démonstration

- **Mentions légales / Confidentialité / Conditions professionnelles / Fiche technique produit** :
  trames génériques avec des placeholders (`[à compléter]`) pour la raison sociale, le SIRET,
  l'hébergeur, les modalités de paiement, etc. **À faire relire par un professionnel du droit
  avant mise en production**, notamment la clause CITES/caviar.
- **Formulaire de référencement et newsletter** : simulés en JS (aucun envoi réel).

## Accessibilité & performance

- Contraste texte/fond vérifié (≥ 4.5:1) pour les combinaisons de couleurs
  principales (texte bleu marine sur crème/blanc, texte blanc sur fond
  marine, etc.).
- `prefers-reduced-motion` respecté : Lenis désactivé, animations GSAP jouées directement dans
  leur état final (voir "Lenis + GSAP/ScrollTrigger" ci-dessus) ; les transitions CSS restantes
  (survol de boutons, etc.) sont neutralisées globalement.
- Focus clavier visible sur tous les éléments interactifs.

## Photos

Toutes les photos utilisées sont réelles (`hero-mer.jpg`, `texture-mareyage.jpg`,
`grain-macro.webp`, `trois-caviars.webp`, `hero-montagne.webp`, `bar-loup.jpg`,
`langoustine.jpg`, `gamme-boites.webp`) ; le composant `<image-slot>` (`assets/js/image-slot.js`)
reste disponible pour un futur emplacement sans photo, mais n'est utilisé nulle part actuellement.
Sur La Table, faute de photo par espèce, `boite-ouverte.png` (variante unique
`boite-ouverte-800w`) est réutilisée telle quelle sur l'index et les quatre fiches Le Caviar —
sans l'ancienne interaction de couvercle survolable (`couvercle.png` a été supprimée avec elle,
cette interaction n'étant pas l'une des animations autorisées par la direction artistique de La
Table).

Le logo (`assets/img/logo-marenostrum-horizontal-noir.png`, fond transparent)
remplace le wordmark texte dans l'en-tête (`mnHeader()` dans `ui.js`).
