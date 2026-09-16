# MARENOSTRUM — site vitrine B2B (démo)

Site statique HTML / CSS (Tailwind) / JS vanilla pour MARENOSTRUM, maison de produits de la mer
d'exception pour les professionnels de la gastronomie et de la distribution (restaurants, hôtels,
traiteurs, mareyeurs, grossistes). Aucun framework, aucun backend, **aucun panier ni paiement en
ligne, aucun prix affiché** : le site fonctionne entièrement sur un modèle de demande de
référencement (`contact.html`) — chaque pièce affiche un statut (Disponible / Sur allocation /
Ouverture prochaine), jamais un tarif.

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
├── index.html                  — accueil : hero, puis trois portes d'entrée courtes vers
│                                  La Maison, La Table et Notre savoir-faire
├── la-maison.html               — positionnement : une maison qui choisit, calibre et
│                                  garantit — aucune revendication d'origine géographique
├── la-table.html                 — Le Caviar (Osciètre/Beluga/Baeri/Sevruga, formats
│                                  30/50/125/500 g) et La Mer (poisson de ligne, langoustine,
│                                  terrines & conserves), statut par pièce, CTA "Demander une
│                                  allocation"
├── notre-savoir-faire.html      — sélection, traçabilité, chaîne du froid & livraison,
│                                  conditionnement — reprend le process 3 étapes qui était
│                                  sur l'ancienne page "Professionnels"
├── contact.html                 — formulaire de référencement qualifiant (établissement,
│                                  type, ville, volumes estimés, produits concernés) — ton
│                                  candidature, pas prise de commande
├── mentions-legales.html, confidentialite.html
├── assets/
│   ├── css/style.css       — généré par Tailwind (ne pas éditer à la main)
│   ├── img/                — photos (voir "Emplacements photo" ci-dessous)
│   └── js/
│       ├── home.js         — sections de la page d'accueil (hero + 3 portes d'entrée)
│       ├── image-slot.js   — composant <image-slot> (placeholder photo)
│       └── ui.js           — header/footer, icônes SVG, boîte de caviar
│                              animée (mnTinReveal), scroll-reveal (reveal/stagger)
├── src/input.css            — source Tailwind (éditer ici)
├── tailwind.config.js       — tokens de couleur/typo/animation
└── design-system/marenostrum/MASTER.md — décisions de design historiques
    (très en amont du positionnement actuel — voir le code pour l'état réel)
```

## Navigation

Accueil · La Maison · La Table · Notre savoir-faire · Contact, plus un CTA "Demander un
référencement" (`contact.html`) partout dans l'en-tête et en pied de page. Aucun onglet
"Boutique" ni icône panier, aucun prix nulle part : chaque pièce de La Table affiche un statut
(Disponible / Sur allocation / Ouverture prochaine) et un unique CTA "Demander une allocation".

## Modèle "demande de référencement"

- **Aucun prix affiché** nulle part sur le site — chaque pièce porte une pastille de statut, pas
  un tarif.
- Chaque pièce de `la-table.html` porte un CTA "Demander une allocation" qui renvoie vers
  `contact.html?produit=<slug>` : le paramètre `produit` coche le groupe correspondant (Caviar /
  La Mer) et pré-remplit le message avec le nom de la pièce (voir le script en bas de
  `contact.html`).
- `contact.html` est le formulaire unique : établissement, contact, type d'établissement, ville,
  volumes estimés, produits concernés, message. Validation et affichage d'une confirmation en JS
  pur, aucune donnée n'est réellement transmise (site statique, sans back-end) — voir le
  `console.log(payload)` dans le script de la page, à remplacer par un vrai service d'envoi
  (formulaire → e-mail, CRM, etc.) en production. Le ton reste celui d'une candidature étudiée
  individuellement, jamais d'une prise de commande automatique.

## Contenu de démonstration

- **Mentions légales / Confidentialité** : trames génériques avec des
  placeholders (`[à compléter]`) pour la raison sociale, le SIRET,
  l'hébergeur, etc. **À faire relire par un professionnel du droit avant mise
  en ligne**, notamment la clause CITES/caviar (section 4 des mentions
  légales).
- **Formulaire de référencement et newsletter** : simulés en JS (aucun envoi
  réel).

## Accessibilité & performance

- Contraste texte/fond vérifié (≥ 4.5:1) pour les combinaisons de couleurs
  principales (texte bleu marine sur crème/blanc, texte blanc sur fond
  marine, etc.).
- `prefers-reduced-motion` respecté : animations et transitions désactivées
  automatiquement.
- Focus clavier visible sur tous les éléments interactifs.

## Emplacements photo à remplir (`<image-slot>`)

Le composant `<image-slot>` (`assets/js/image-slot.js`) reste disponible pour tout emplacement
sans photo réelle : hors de l'outil de design d'origine (claude.ai/design), il affiche simplement
l'attribut `src` s'il est présent, sinon l'espace vide avec la légende `placeholder`. Les pages
actuelles utilisent toutes de vraies photos existantes (`hero-mer.jpg`, `texture-mareyage.jpg`,
`grain-macro.webp`, `trois-caviars.webp`, `hero-montagne.webp`, `bar-loup.jpg`,
`langoustine.jpg`, `gamme-boites.webp`) et n'ont donc pas besoin d'`<image-slot>`.

Le logo (`assets/img/logo-marenostrum-horizontal-noir.png`, fond transparent)
remplace le wordmark texte dans l'en-tête (`mnHeader()` dans `ui.js`).
