# MARENOSTRUM — maison de sélection (démo)

Site statique HTML / CSS (Tailwind) / JS vanilla pour MARENOSTRUM, maison de
sélection de produits de la mer d'exception. Aucun framework, aucun backend,
**aucune boutique en ligne, aucun panier, aucun prix affiché** : le site ne
vend pas en ligne, il donne accès à la maison sur demande de référencement
professionnel (`professionnels.html`).

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
├── index.html                  — accueil : manifeste de marque, aucun
│                                  catalogue ni prix visible dès l'arrivée
├── la-maison.html               — histoire, philosophie de sélection, ce qui
│                                  légitime l'exigence et le prix (jamais
│                                  affiché)
├── la-collection.html           — présentation éditoriale d'un petit nombre
│                                  de pièces, traitement asymétrique (une
│                                  pièce phare, pas une grille de cartes
│                                  identiques), sans prix affiché
├── provenance-exigence.html     — traçabilité, sélection des producteurs,
│                                  engagement qualité, racontés plutôt que
│                                  listés
├── professionnels.html          — page à objet unique : formulaire qualifiant
│                                  de demande de référencement (pas de devis
│                                  automatisé)
├── contact.html                 — coordonnées simples, message générique,
│                                  pas de vente directe
├── mentions-legales.html, confidentialite.html
├── assets/
│   ├── css/style.css       — généré par Tailwind (ne pas éditer à la main)
│   ├── img/                — photos (voir "Emplacements photo" ci-dessous)
│   └── js/
│       ├── home.js         — sections de la page d'accueil (hero, manifeste,
│                              clôture)
│       ├── image-slot.js   — composant <image-slot> (placeholder photo)
│       └── ui.js           — header/footer (en-tête sombre en permanence),
│                              icônes SVG
├── src/input.css            — source Tailwind (éditer ici)
├── tailwind.config.js       — tokens de couleur/typo/animation
└── design-system/marenostrum/MASTER.md — décisions de design historiques
    (très en amont du positionnement actuel — voir le code pour l'état réel)
```

## Navigation

Accueil · La Maison · La Collection · Provenance & Exigence · Professionnels ·
Contact, plus un unique CTA commercial "Devenir maison partenaire"
(`professionnels.html`) dans l'en-tête et en pied de page. Aucun onglet
"Boutique" ni icône panier : aucune page n'affiche de prix ni ne mène à un
tunnel d'achat.

## Modèle "demande de référencement"

- **Aucun prix affiché** nulle part sur le site.
- Le seul appel à l'action commercial du site est "Devenir maison partenaire",
  qui renvoie vers `professionnels.html`.
- `professionnels.html` porte un formulaire qualifiant unique : nom,
  établissement, pays, e-mail, besoin. Validation et affichage d'une
  confirmation en JS pur, aucune donnée n'est réellement transmise (site
  statique, sans back-end) — voir le `console.log(payload)` dans le script de
  la page, à remplacer par un vrai service d'envoi (formulaire → e-mail, CRM,
  etc.) en production. Ce n'est pas un devis automatisé : la demande est lue
  personnellement.
- `contact.html` reste un canal de contact générique (question, message),
  distinct de la demande de référencement.

## Contenu de démonstration

- **Mentions légales / Confidentialité** : trames génériques avec des
  placeholders (`[à compléter]`) pour la raison sociale, le SIRET,
  l'hébergeur, etc. **À faire relire par un professionnel du droit avant mise
  en ligne**, notamment la clause CITES/caviar (section 4 des mentions
  légales). Ces deux pages restent volontairement claires (fond ivoire) alors
  que le reste du site est marine-dominant.
- **Formulaires de référencement et contact** : simulés en JS (aucun envoi
  réel).

## Accessibilité & performance

- Contraste texte/fond vérifié (≥ 4.5:1) pour les combinaisons de couleurs
  principales (texte ivoire sur fond marine, texte encre sur fond ivoire,
  etc.).
- `prefers-reduced-motion` respecté : animations et transitions désactivées
  automatiquement. Un seul moment de mouvement marqué (apparition du hero au
  chargement) ; rien n'est animé de façon systématique au scroll.
- Focus clavier visible sur tous les éléments interactifs.

## Emplacements photo à remplir (`<image-slot>`)

Le composant `<image-slot>` (`assets/js/image-slot.js`) est une case photo
avec légende, utilisée hors de l'outil de design d'origine (claude.ai/design)
uniquement comme repli : il affiche l'attribut `src` s'il est présent, sinon
l'espace vide avec la légende `placeholder`. Les pages actuelles (`index.html`,
`la-maison.html`, `la-collection.html`, `provenance-exigence.html`) utilisent
toutes de vraies photos existantes (`hero-mer.jpg`, `texture-mareyage.jpg`,
`grain-macro.webp`, `bar-loup.jpg`, `rouget-barbet.jpg`, `langoustine.jpg`,
`maquereau-decoupe.jpg`, `trois-caviars.webp`) et n'ont pas besoin
d'`<image-slot>`.

Le logo (`assets/img/logo-marenostrum-horizontal-noir.png`, fond transparent)
remplace le wordmark texte dans l'en-tête (`mnHeader()` dans `ui.js`), inversé
en blanc (`invert`) car l'en-tête est sombre en permanence.
