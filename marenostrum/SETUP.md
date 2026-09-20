# MARENOSTRUM — site vitrine B2B (démo)

Site statique HTML / CSS (Tailwind) / JS vanilla pour MARENOSTRUM, maison de produits de la mer
d'exception pour les professionnels de la gastronomie et de la distribution. Aucun framework,
aucun backend, **aucun panier ni paiement en ligne, aucun prix affiché** : chaque pièce affiche un
statut (Disponible / Sur allocation / Ouverture prochaine), jamais un tarif.

Le site applique un système de design unique, inspiré de la structure des sites de domaines
viticoles haut de gamme, dans l'identité Marenostrum : une palette de huit jetons par thème
(clair/sombre), une seule famille typographique plafonnée à une graisse 500, une grille de bandes
("strip") au décalage vertical asymétrique comme unique dispositif de rythme, des animations
volontairement minimales (deux classes, jamais de bibliothèque de scroll), un curseur personnalisé,
un écran de chargement, et un menu plein écran. Voir "Système de design" ci-dessous pour le détail.

L'accueil (`index.html`) est une **page unique défilante** : La Maison, La Table, Notre
savoir-faire et Contact s'enchaînent dans cet ordre — celui du menu plein écran — en une seule
page. Le défilement est **100% natif** (aucune bibliothèque de smooth-scroll, voir "Animations"
ci-dessous). La Table y reste une section de ce même défilement, jamais une page à part ; seule
chaque fiche produit individuelle garde sa propre URL, avec `fiche-technique-produit.html` et
`conditions-professionnelles.html`, partageables par e-mail.

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

Le CSS compilé (`assets/css/style.css`) est commité : le site fonctionne tel quel sans étape de
build si vous ne touchez pas aux styles. Après avoir remplacé une photo source, relancer
`python3 scripts/generate-responsive-images.py` (Pillow, AVIF/WebP/JPEG — voir "Images" plus bas).

## Structure

```
marenostrum/
├── index.html                     — accueil one-page : hero + bandeau de données vivantes,
│                                     sélecteur de sections (Splide), puis #maison / #table /
│                                     #savoir-faire / #contact enchaînées, dans cet ordre
├── caviar-oscietre.html, caviar-beluga.html, caviar-baeri.html, caviar-sevruga.html
│                                   — fiches produit Le Caviar, une page par cuvée
├── mer-poisson-ligne.html, mer-langoustine.html, mer-terrines.html
│                                   — fiches produit La Mer, une page par pièce
├── fiche-technique-produit.html   — fiche produit — page autonome, partageable par e-mail
├── conditions-professionnelles.html — référencement, allocation, livraison — page autonome
├── mentions-legales.html, confidentialite.html
├── assets/
│   ├── css/style.css       — généré par Tailwind (ne pas éditer à la main)
│   ├── img/                — photos sources
│   │   └── responsive/     — variantes AVIF + WebP + JPEG, 900/1200/1920/2400px (plafonnées à
│   │                          la résolution native) + un recadrage portrait dédié pour mobile
│   │                          sur les photos utilisées en hero plein écran
│   └── js/
│       ├── home.js         — sections de l'accueil (hero, bandeau de données, #maison, #table,
│       │                      #savoir-faire, #contact), helper <picture> et helper de
│       │                      placeholder image
│       ├── motion.js       — les deux classes d'animation (IntersectionObserver) + la
│       │                      parallaxe légère du hero ; aucune bibliothèque de scroll
│       └── ui.js           — en-tête, pied de page, curseur personnalisé, écran de chargement,
│                              menu plein écran, icônes SVG
├── src/input.css            — source Tailwind (éditer ici) : jetons de couleur (--color-*),
│                              variables typographiques/grille, système de bandes, curseur,
│                              écran de chargement, menu plein écran
├── tailwind.config.js       — les jetons ci-dessus exposés comme classes Tailwind (bg-page,
│                              text-ink, bg-line, text-gold...)
├── scripts/generate-responsive-images.py — pipeline AVIF/WebP/JPEG + recadrage portrait
└── design-system/marenostrum/MASTER.md — décisions de design historiques (très en amont du
    positionnement actuel — voir le code pour l'état réel)
```

## Système de design

### Palette — deux thèmes via `data-theme`

Sept jetons par thème, définis comme variables CSS dans `src/input.css` (`:root` pour le thème
clair, `[data-theme="dark"]` pour le sombre), exposés comme couleurs Tailwind dans
`tailwind.config.js` : `page` (fond), `surface` (cartes/champs), `surface-high` (sombre
uniquement), `line` (bordures — sert aussi de teinte d'alternance de fond), `ink` (texte),
`ink-2` (texte secondaire), `accent` (liens et filets), `accent-hover` (survol des liens).
**Aucune couleur dorée, cuivrée, métallique ou chaude d'aucune sorte : l'accent est un bleu-gris
sourd (`#3D5478` en clair, `#A8B6CC` en sombre), jamais posé en fond. Le contraste ivoire/bleu
nuit est le seul moteur chromatique du site. Aucune autre couleur, jamais de dégradé, jamais de
halo/lueur, jamais de variation de teinte dans un fond — des aplats uniquement.**

Le thème est posé localement sur les sections qui doivent rester sombres quel que soit le
défilement — le hero, le bandeau de données, le pied de page, `#contact`, **`#table`** (La Table
alterne avec La Maison et Notre savoir-faire, toutes deux claires — deux sections ivoire ne se
suivent jamais sans respiration sombre entre elles), le menu plein écran, l'écran de chargement,
le chapitre d'ouverture des fiches produit de La Table — via `data-theme="dark"` sur leur
conteneur. Comme les jetons sont des variables CSS qui se recalculent par portée, une même classe
(`bg-page`, `text-ink`...) rend clair ou sombre selon qu'elle vit ou non dans une portée
`[data-theme="dark"]`, sans jamais dupliquer une règle.

La hiérarchie visuelle ne repose plus que sur l'échelle typographique et le vide (voir
"Typographie" ci-dessous) : les chiffres du bandeau de données, par exemple, ne sont plus en
accent mais en `--color-text` brut, la taille seule les distinguant des libellés.

### Typographie

Switzer (Fontshare), seule famille du site — aucune serif, aucune deuxième famille (l'ancien
traitement Cormorant Garamond de La Table a été retiré et unifié). Trois variables dans
`src/input.css` : `--titleSize` (4.7rem, plafond `clamp()` du plus grand titre), `--lineHeight`
(1.6), `--fontBold` (500 — **plafond de graisse, y compris pour les titres** ; les classes
`.h-hero`/`.h-page`/`.h-section`/`.h-card`/`.h-quote` posent `font-weight: var(--fontBold)`
directement plutôt que d'utiliser `font-semibold`/`font-bold`, qui resteraient à 600/700 si on les
utilisait). `.eyebrow` : intertitre de section, capitales, interlettrage ouvert
(`tracking-widest2`). Les titres de chapitre restent en casse normale. Le texte technique
(`.lt-tech-item`, `.field-label`) reste petit, graisse 400.

### Grille et espacement

`--container-maxWidth: 75rem` (`.container-page`/`.strip--normal`, via le token Tailwind
`max-w-container`). `--space-section` (padding vertical de section, `.section-pad`) : 1.6rem par
défaut, 2.56rem à partir de `sm`, 3.168rem à partir de `lg`, 3.456rem à partir de `xl`. Échelle
d'espacement nommée en plus de l'échelle numérique de Tailwind : `.mt-xs`/`.mb-xs`/`.pt-xs`/
`.pb-xs` (0.8rem), `-sm` (1.6rem), `-md` (2.56rem), `-lg` (4rem).

### Système de bandes ("strip")

Le dispositif visuel principal, dans `src/input.css` : `.strip` (base, pose `--w1`/`--w2` à 0) +
un modificateur — `.strip--normal` (contenue dans `--container-maxWidth`), `.strip--wide` (pleine
largeur), `.strip--columns` (deux colonnes), `.strip--3-cols` (trois colonnes), `.strip--image`
(image seule). `--w1`/`--w2`, posées en style inline (`style="--w1:7; --w2:-6"`), décalent
verticalement la première et la deuxième colonne d'un `.strip--columns`/`.strip--3-cols` — jamais
alignées en haut, c'est la seule source de rythme d'une palette à huit jetons. 1 unité = 0.6rem ;
utiliser des valeurs franches (5 à 8 au moins, jamais 1 ou 2 — un décalage timide ne se voit pas,
voir `mnSectionMaison()`/`mnSectionTable()`/`mnSectionSavoirFaire()` dans `home.js` pour des
exemples). Neutralisé sous 768px (empilement simple, sans transform) — un décalage n'a de sens
qu'à deux colonnes côte à côte. `transform` ne réservant pas d'espace en layout,
`.strip--columns`/`.strip--3-cols` portent une marge verticale interne généreuse
(`--strip-offset-pad`, 3.5rem) pour absorber le décalage sans jamais chevaucher la bande
précédente ou suivante — **si vous changez l'unité ou les magnitudes utilisées, revérifiez que ce
padding reste suffisant.**

### Animations — volontairement minimales

Deux classes seulement, dans `motion.js`/`src/input.css`, jouées une seule fois par
IntersectionObserver (déclenchement dès qu'un élément entre dans les 85% inférieurs du viewport,
`rootMargin: "0px 0px -15% 0px"`) :

1. `.anima--bottom-in` — opacité 0→1, translation Y +40px→0, 0.9s, easing doux
   (`cubic-bezier(0.16,1,0.3,1)`). Posée sur une dizaine de blocs par page, jamais
   systématiquement.
2. `.js-image-anime` — même mécanisme, légère révélation (opacité + échelle 1.06→1) pour les
   images et les emplacements d'image encore vides.

Parallaxe légère du hero uniquement (`mnInitHeroParallax()`) : la photo (ou son emplacement
réservé) glisse à 15% de la vitesse de défilement tant que le hero est visible — un seul listener
`scroll` passif, pas de bibliothèque.

**Aucune bibliothèque de scroll n'est installée : ni GSAP, ni Lenis, ni Locomotive Scroll.** Un
essai avec Lenis a été retiré en cours de projet — quel que soit son réglage, une telle
bibliothèque intercepte la molette/le trackpad et impose sa propre physique de défilement à la
place de celle voulue par la personne qui scrolle. Le défilement (molette, trackpad, clavier,
ascenseur) est donc 100% natif et jamais intercepté ; `scroll-behavior: smooth` (CSS) n'adoucit
que le saut ponctuel d'un clic sur un lien d'ancre (`mnScrollTo()` dans `motion.js`,
`scroll-margin-top` sur `[data-scroll-section]` pour ne jamais arriver masqué sous l'en-tête).
`prefers-reduced-motion` désactive les deux classes d'animation (tout apparaît directement dans
son état final) et la parallaxe du hero.

### Splide.js

Seule bibliothèque tierce chargée (CDN jsDelivr, `index.html` uniquement) : le carrousel du hero
(`#hero-splide`, une diapositive pour l'instant — prêt à en recevoir d'autres) et le sélecteur de
sections horizontal (`#section-splide`, sous le bandeau de données). `mnInitHeroSplide()` dans
`home.js`. Absente du `package.json` comme les autres dépendances CDN du site (pas de bundler).

### Curseur personnalisé

`mnInitCursor()` dans `ui.js` : un disque (`.mn-cursor`, `18px`) suit le pointeur
(`transform: translate(...)`, mis à jour à chaque `mousemove`), s'agrandit à `72px` et affiche le
libellé porté par l'attribut `data-hover="…"` de l'élément survolé. Sa couleur n'est **jamais**
l'accent (réservé aux liens) : un aplat texte/fond inversé (`--color-cursor-bg`/
`--color-cursor-text`, `#17263F`/`#F4EFE6` en clair, l'inverse en sombre) qui suit le thème local
survolé plutôt que le thème de la racine du document — à chaque `mouseover`, le disque recopie sur
lui-même l'attribut `data-theme` de l'ancêtre le plus proche de l'élément survolé (l'héritage des
variables CSS suit l'arbre du DOM, pas la position à l'écran, donc ça suffit même si le curseur
est positionné `fixed`). Deux composants gèrent leur contraste par classe plutôt que par
`data-theme` (l'en-tête flottant sur le hero, le menu plein écran) et sont traités comme des cas
sombres explicites dans cette même logique. Désactivé sur tactile : la classe qui masque le
curseur système (`html.has-custom-cursor`) n'est posée qu'après un
`matchMedia("(pointer: fine)")` positif ET un premier `mousemove` réel.

### Écran de chargement

`mnInitLoader()` dans `ui.js` : voile plein écran (`.mn-loader`, aplat `#17263F`) au tout premier
chargement du site dans l'onglet (`sessionStorage` évite de le rejouer à chaque navigation
interne). Symbole (`.mn-loader-mark`, un cercle) et mot (`.mn-loader-word`, "Marenostrum") glissent
l'un vers l'autre depuis les bords opposés (700ms), puis l'ensemble s'efface (`.is-done`, 600ms)
avant d'être retiré du DOM.

### Menu plein écran

`mnFullMenu()`/`mnInitFullMenu()` dans `ui.js` : remplace l'ancienne liste de liens toujours
visible et le panneau mobile séparé — un déclencheur unique ("Menu", visible à tous les gabarits)
ouvre un overlay plein écran (aplat `#17263F`). Quatre entrées (La Maison, La Table, Notre
savoir-faire, Contact), chacune en deux `<span>` superposés pour l'effet de substitution verticale
au survol (`.mn-fullmenu-link`, `transform: translateY(-100%)` sur le groupe au survol). Sur
desktop, survoler une entrée active son image d'aperçu verticale 400×600
(`.mn-fullmenu-preview[data-preview-*]`) — les quatre photos n'existent pas encore, voir "Images"
plus bas. Sélecteur de langue FR/EN en bas à gauche (présentation seulement, aucun contenu traduit
sur ce site de démonstration).

## Accueil one-page

- **Quatre sections, dans l'ordre du menu** : `#maison` (positionnement, aucune revendication
  d'origine géographique), `#table` (Le Caviar et La Mer, voir plus bas), `#savoir-faire`
  (sélection, traçabilité, chaîne du froid, conditionnement), `#contact` (formulaire de
  référencement qualifiant, thème sombre local).
- **"Demander une allocation"** (fiche produit La Table) ne recharge pas la page de contact : un
  clic navigue vers `index.html?produit=<slug>#contact`, qui pré-remplit le formulaire de
  `#contact` et y défile au chargement (`mnPrefillProduit()`/`mnInitProduitCTAs()` dans `home.js`,
  `MN_PRODUIT_LABELS` pour l'intitulé affiché par slug).
- **Bandeau de données vivantes** (`.mn-data-band`, sous le hero) : le millésime du cru en cours,
  le nombre de maisons référencées, la prochaine date d'allocation — trois chiffres statiques de
  démonstration, en accent sur aplat sombre.

## La Table

`#table` (`mnSectionTable()` dans `home.js`) présente Le Caviar et La Mer comme deux univers d'un
domaine plutôt que deux rayons de catalogue — un bloc éditorial par univers (image + texte +
liste des pièces), chacune de ces pièces gardant sa propre fiche à part, avec sa propre URL,
partageable par e-mail : `caviar-oscietre.html`, `caviar-beluga.html`, `caviar-baeri.html`,
`caviar-sevruga.html`, `mer-poisson-ligne.html`, `mer-langoustine.html`, `mer-terrines.html`.

- **Fiche produit** : chapitres verticaux — image plein écran (thème sombre local) avec le nom en
  grand (`.lt-title-hero`), une bande de légende en aplat (jamais un dégradé de scrim) sous la
  photo pour la lisibilité du texte ; un paragraphe de caractère écrit comme une note de
  dégustation (`.lt-tasting`) ; un bloc de données sobres en liste dépouillée sans tableau ni
  bordure (`.lt-tech-list`/`.lt-tech-item`) ; un bloc d'accords et de service ; un unique appel à
  l'action, "Demander une allocation →", vers `index.html?produit=<slug>#contact`.
- Les classes `.lt-*` résolvent désormais aux mêmes jetons `--color-*` que le reste du site (plus
  de palette exclusive ni de serif dédiée) — voir la section "LA TABLE" de `src/input.css`.

## Images

**Grammaire photographique commune aux photos produit** : prise de vue à 90° à la verticale, fond
gris-bleu mat, ombre portée dure et unique, aucun accessoire, aucune garniture, aucun décor.

**Pipeline technique** (`scripts/generate-responsive-images.py`, Pillow avec support AVIF) :
chaque photo listée dans `IMAGES` est déclinée en AVIF + WebP + JPEG à 900/1200/1920/2400px,
plafonnés à sa résolution native (jamais d'agrandissement) — garder `MN_IMG_WIDTHS` dans `home.js`
strictement synchronisé avec la sortie réelle du script (une largeur listée sans fichier
correspondant casse l'image). Les photos utilisées en hero plein écran sur au moins une page
(`PORTRAIT_CROPS` dans le script — bar-loup, langoustine, gamme-boites) reçoivent en plus un
recadrage portrait dédié 3:4 à 900px (jamais un simple redimensionnement de la version paysage),
servi via une `<source media="(max-width: 767px)">` dans le `<picture>` (voir les fiches produit
de La Mer). `mnPicture()` (`home.js`) construit systématiquement un `<picture>` à trois formats
avec `width`/`height` explicites (jamais de décalage de mise en page pendant le chargement),
`loading="lazy"` sauf le hero.

**Emplacements d'image non encore livrés** : le hero est réglé (`hero-mer`, givre en gros plan,
recadrage portrait dédié pour mobile) et deux des quatre emplacements de contenu ont reçu une
photo déjà existante mais jusqu'ici inutilisée sur l'accueil (langoustine pour "La Table, univers
La Mer" ; trois-caviars pour "Notre savoir-faire, La sélection"). Restent vides, faute de photo
correspondante : les quatre aperçus du menu plein écran (grain de caviar sur fond bleu nuit, boîte
fermée, cuillère de nacre, littoral breton), "La Table, univers Caviar" (packshot de boîte
ouverte) et "Notre savoir-faire, La traçabilité" (macro étiquette CITES). Chacune est laissée vide
dans le code, avec un commentaire `[IMAGE — …]` décrivant précisément le visuel attendu, et son
espace réservé via `aspect-ratio` (`mnImagePlaceholder()` dans `home.js` pour les blocs de
contenu — bordure fine et libellé discret pour se lire comme un slot volontairement vide plutôt
que comme une image cassée). Remplacer un emplacement par une vraie photo consiste à appeler
`mnPicture()`/construire le `<picture>` correspondant à la place du placeholder — la mise en page
ne bouge pas.

Photos réelles et utilisées : `hero-mer.jpg` (hero, avec recadrage portrait), `texture-mareyage.jpg`,
`grain-macro.webp`, `trois-caviars.webp` (accueil, "La sélection"), `bar-loup.jpg`,
`langoustine.jpg` (accueil, "univers La Mer", et fiche produit dédiée), `gamme-boites.webp`,
`boite-ouverte.png` (boîte de caviar, réutilisée telle quelle sur les quatre fiches Le Caviar,
faute de photo par espèce). Le logo (`assets/img/logo-marenostrum-horizontal-noir.png`) remplace
le wordmark texte dans l'en-tête.

## Modèle "demande de référencement"

- **Aucun prix affiché** nulle part sur le site — chaque pièce porte une pastille de statut, pas
  un tarif.
- Le formulaire de `#contact` est validé et confirmé en JS pur ; aucune donnée n'est réellement
  transmise (site statique, sans back-end) — voir le `console.log(payload)` dans
  `mnInitContactForm()` (`home.js`), à remplacer par un vrai service d'envoi en production.

## Contenu de démonstration

- **Mentions légales / Confidentialité / Conditions professionnelles / Fiche technique produit** :
  trames génériques avec des placeholders (`[à compléter]`). **À faire relire par un professionnel
  du droit avant mise en production**, notamment la clause CITES/caviar.
- **Formulaire de référencement et newsletter** : simulés en JS (aucun envoi réel).

## Accessibilité & performance

- Contraste texte/fond vérifié (≥ 4.5:1) pour les combinaisons principales ; l'accent `gold` n'est
  jamais utilisé pour du texte courant sur fond clair (voir `gold-dark` plus haut).
- `prefers-reduced-motion` respecté : `.anima--bottom-in`/`.js-image-anime` affichées directement
  dans leur état final, parallaxe du hero désactivée, curseur personnalisé indépendant de ce
  réglage (il ne fait qu'un `transform`, pas d'animation).
- Focus clavier visible sur tous les éléments interactifs.
- Curseur personnalisé désactivé sur tactile ; le menu plein écran reste utilisable au clavier
  (`Échap` le referme).
