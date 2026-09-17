# MARENOSTRUM — site vitrine B2B (démo)

Site statique HTML / CSS (Tailwind) / JS vanilla pour MARENOSTRUM, maison de produits de la mer
d'exception pour les professionnels de la gastronomie et de la distribution (restaurants, hôtels,
traiteurs, mareyeurs, grossistes). Aucun framework, aucun backend, **aucun panier ni paiement en
ligne, aucun prix affiché** : le site fonctionne entièrement sur un modèle de demande de
référencement — chaque pièce affiche un statut (Disponible / Sur allocation / Ouverture
prochaine), jamais un tarif.

L'accueil (`index.html`) est une **page unique défilante** (La Maison / La Table / Notre
savoir-faire / Contact enchaînés en une seule page, animée au défilement via Lenis + GSAP). Seules
deux pages restent en dehors de ce défilement, avec leur propre URL pour être partagées par
e-mail : `fiche-technique-produit.html` et `conditions-professionnelles.html`.

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
│                                     puis les sections #maison / #table / #savoir-faire /
│                                     #contact enchaînées (voir "Accueil one-page" ci-dessous)
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
│       │                      #maison, #table, #savoir-faire, #contact) + helper <picture>
│       ├── motion.js       — Lenis (défilement lissé) + GSAP/ScrollTrigger : les trois
│       │                      animations de l'accueil, uniquement (voir plus bas)
│       ├── image-slot.js   — composant <image-slot> (placeholder photo, non utilisé
│       │                      actuellement — toutes les photos du site sont réelles)
│       └── ui.js           — header/footer, icônes SVG, boîte de caviar animée (mnTinReveal)
├── src/input.css            — source Tailwind (éditer ici)
├── tailwind.config.js       — tokens de couleur/typo/animation
└── design-system/marenostrum/MASTER.md — décisions de design historiques
    (très en amont du positionnement actuel — voir le code pour l'état réel)
```

## Accueil one-page

- **Quatre sections** : `#maison` (positionnement, aucune revendication d'origine géographique),
  `#table` (Le Caviar — Osciètre/Beluga/Baeri/Sevruga, formats 30/50/125/500 g uniquement — et La
  Mer — poisson de ligne, langoustine, terrines & conserves —, statut par pièce, CTA "Demander une
  allocation"), `#savoir-faire` (sélection, traçabilité, chaîne du froid, conditionnement),
  `#contact` (formulaire de référencement qualifiant).
- **Navigation fixe** : les liens de l'en-tête défilent en douceur vers chaque ancre via
  `lenis.scrollTo()` (jamais le scroll natif), voir `mnInitAnchorNav()`/`mnInitActiveNav()` dans
  `motion.js`. Sur les autres pages (fiche technique, conditions pro, mentions légales...), les
  mêmes liens pointent vers `index.html#ancre` — une navigation normale, ces pages ne chargent ni
  Lenis ni GSAP.
- **"Demander une allocation"** (La Table) ne recharge plus la page : un clic pré-remplit le
  formulaire de la section `#contact` et y défile (`mnPrefillProduit()`/`mnInitProduitCTAs()`
  dans `home.js`). Un lien partagé du type `index.html?produit=caviar-beluga#contact` fonctionne
  aussi au chargement direct.

### Lenis + GSAP/ScrollTrigger — trois animations, aucune autre

Chargés via CDN (jsDelivr) uniquement sur `index.html`, aucune autre page n'en dépend :

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
   déclenchée au chargement (pas au scroll).

`mnInitMotion()` (appelé par `index.html` une fois toutes les sections montées) désactive Lenis et
affiche tout dans son état final si `prefers-reduced-motion: reduce`, ou si `gsap` n'a pas pu se
charger (repli silencieux : la navigation par ancre retombe alors sur le saut natif du navigateur,
et `mnScrollTo()` sur `element.scrollIntoView()`).

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

Le logo (`assets/img/logo-marenostrum-horizontal-noir.png`, fond transparent)
remplace le wordmark texte dans l'en-tête (`mnHeader()` dans `ui.js`).
