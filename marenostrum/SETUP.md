# MARENOSTRUM — site vitrine B2B (démo)

Site statique HTML / CSS (Tailwind) / JS vanilla pour MARENOSTRUM, négociant en
produits de la mer pour les professionnels (restaurants, hôtels, traiteurs).
Aucun framework, aucun backend, **aucun panier ni paiement en ligne** : les prix
des produits de la mer variant chaque jour, le site fonctionne entièrement sur
un modèle de demande de devis (`devis.html`).

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
├── index.html                  — accueil (hero, sourcing, gammes, engagements)
├── produits-de-la-mer.html     — catalogue statique : poissons nobles, poissons
│                                  de criée, crustacés & coquillages, découpes
│                                  sur-mesure (cartes sans prix, CTA devis)
├── caviar.html                 — signature caviar : Osciètre, Beluga, Baeri,
│                                  Sevruga, affinage Malossol, traçabilité CITES
├── notre-approche.html         — positionnement : circuit court, mareyeurs
│                                  sélectionnés, engagements
├── professionnels.html         — comment nous travaillons, process en 3 étapes
├── devis.html                  — formulaire de devis central (toutes gammes)
├── contact.html                — contact général (hors demande de devis)
├── mentions-legales.html, confidentialite.html
├── assets/
│   ├── css/style.css       — généré par Tailwind (ne pas éditer à la main)
│   ├── img/                — photos (voir "Emplacements photo" ci-dessous)
│   └── js/
│       ├── home.js         — sections de la page d'accueil
│       ├── image-slot.js   — composant <image-slot> (placeholder photo)
│       └── ui.js           — header/footer, icônes SVG, boîte de caviar
│                              animée (mnTinReveal), scroll-reveal (reveal/stagger)
├── src/input.css            — source Tailwind (éditer ici)
├── tailwind.config.js       — tokens de couleur/typo/animation
└── design-system/marenostrum/MASTER.md — décisions de design historiques
    (très en amont du positionnement actuel — voir le code pour l'état réel)
```

## Navigation

Accueil · Produits de la mer · Caviar · Notre approche · Professionnels ·
Contact, plus un CTA "Demander un devis" (`devis.html`) partout dans l'en-tête
et en pied de page. Aucun onglet "Boutique" ni icône panier : le catalogue
n'affiche jamais de prix et ne mène jamais à un tunnel d'achat.

## Modèle "demande de devis"

- **Aucun prix affiché** nulle part sur le site — les prix des produits de la
  mer varient quotidiennement.
- Chaque carte produit (`produits-de-la-mer.html`, `caviar.html`) porte un
  unique CTA "Demander un devis" qui renvoie vers `devis.html?gamme=<id>` : le
  paramètre `gamme` pré-coche la case correspondante dans le formulaire (voir
  le script en bas de `devis.html`).
- `devis.html` est le formulaire central : établissement, contact, gammes
  recherchées (cases à cocher), volume, fréquence, zone de livraison, message.
  Validation et affichage d'une confirmation en JS pur, aucune donnée n'est
  réellement transmise (site statique, sans back-end) — voir le
  `console.log(payload)` dans le script de la page, à remplacer par un vrai
  service d'envoi (formulaire → e-mail, CRM, etc.) en production.
- `contact.html` reste un canal de contact général (question, partenariat)
  distinct du formulaire de devis.

## Contenu de démonstration

- **Mentions légales / Confidentialité** : trames génériques avec des
  placeholders (`[à compléter]`) pour la raison sociale, le SIRET,
  l'hébergeur, etc. **À faire relire par un professionnel du droit avant mise
  en ligne**, notamment la clause CITES/caviar (section 4 des mentions
  légales).
- **Formulaires de devis, contact et newsletter** : simulés en JS (aucun envoi
  réel).

## Accessibilité & performance

- Contraste texte/fond vérifié (≥ 4.5:1) pour les combinaisons de couleurs
  principales (texte bleu marine sur crème/blanc, texte blanc sur fond
  marine, etc.).
- `prefers-reduced-motion` respecté : animations et transitions désactivées
  automatiquement.
- Focus clavier visible sur tous les éléments interactifs.

## Emplacements photo à remplir (`<image-slot>`)

Le site ne dispose d'aucune photo de produits de la mer (poissons, crustacés,
coquillages, mareyeurs, quais de criée) : ces emplacements utilisent le
composant `<image-slot>` (`assets/js/image-slot.js`), une case photo avec
légende. Hors de l'outil de design d'origine (claude.ai/design), ce composant
affiche simplement l'attribut `src` s'il est présent, sinon l'espace vide
avec la légende `placeholder`. Pour remplir un emplacement définitivement,
ajoutez `src="..."` sur l'élément correspondant dans le HTML de la page.

Emplacements en attente d'une vraie photo :
- `index.html` — hero plein écran (actuellement `hero-montagne.webp`, un
  grain de caviar macro conservé pour ne rien casser — à remplacer par une
  photo de criée/mareyeur), teaser "Notre approche", 3 tuiles de gammes.
- `notre-approche.html` — photo "Notre parti pris" (quai, mareyeur).
- `produits-de-la-mer.html` — les 4 cartes de gammes.

Le caviar (`caviar.html`, teaser accueil, page "Notre approche") utilise en
revanche de vraies photos existantes (`trois-caviars.webp`, `grain-macro.webp`)
et n'a pas besoin d'`<image-slot>`.

Le logo (`assets/img/logo-marenostrum-horizontal-noir.png`, fond transparent)
remplace le wordmark texte dans l'en-tête (`mnHeader()` dans `ui.js`).
