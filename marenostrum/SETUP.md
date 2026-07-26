# MARENOSTRUM — site vitrine & e-commerce (démo)

Site statique HTML / CSS (Tailwind) / JS vanilla pour la marque de caviar
MARENOSTRUM. Aucun framework, aucun backend : catalogue, panier et tunnel de
commande fonctionnent entièrement côté client (localStorage / sessionStorage).

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
├── index.html, boutique.html, produit.html, panier.html, paiement.html,
│   confirmation.html, a-propos.html, contact.html,
│   mentions-legales.html, cgv.html, confidentialite.html
├── assets/
│   ├── css/style.css       — généré par Tailwind (ne pas éditer à la main)
│   └── js/
│       ├── products.js     — catalogue produits (données de démo)
│       ├── cart.js         — panier localStorage (MnCart)
│       ├── checkout.js     — validation du formulaire + commande simulée
│       └── ui.js           — header/footer, cartes produit, icônes SVG,
│                              animations de scroll (reveal/stagger)
├── src/input.css            — source Tailwind (éditer ici)
├── tailwind.config.js       — tokens de couleur/typo/animation
└── design-system/marenostrum/MASTER.md — décisions de design (voir section
    "Design Evolution" en tête de fichier pour le contexte du thème clair)
```

## Contenu de démonstration

- **Catalogue** (`assets/js/products.js`) : 12 produits fictifs (caviars,
  coffrets, accessoires, épicerie fine), prix indicatifs.
- **Mentions légales / CGV / Confidentialité** : trames génériques avec des
  placeholders (`[à compléter]`) pour la raison sociale, le SIRET, l'hébergeur,
  etc. **À faire relire par un professionnel du droit avant mise en ligne.**
- **Formulaire de contact** et **newsletter** : simulés en JS (aucun envoi
  réel).

## Paiement — passer du mode démonstration à un vrai paiement

`paiement.html` / `assets/js/checkout.js` simulent un paiement : le
formulaire est validé côté client, une commande est générée et stockée en
`sessionStorage`, puis l'utilisateur est redirigé vers `confirmation.html`.
**Aucune donnée bancaire n'est collectée ni transmise.**

Pour un vrai paiement, deux options selon si vous voulez garder un site 100%
statique ou ajouter une fonction serveur légère :

### Option A — Stripe Payment Links (reste 100% statique)

1. Créez un compte Stripe et un [Payment Link](https://dashboard.stripe.com/payment-links)
   par produit (ou un lien générique avec quantités ajustables).
2. Remplacez le bouton "Confirmer et payer" par une redirection vers le
   Payment Link correspondant au contenu du panier (simple si le panier ne
   contient qu'un type de produit ; pour un panier multi-produits, il faudra
   soit limiter à un seul Payment Link "panier" avec des line items fixes,
   soit passer à l'option B).

### Option B — Stripe Checkout Session (nécessite une fonction serveur)

1. Ajoutez une fonction serverless (Vercel/Netlify/Cloudflare Functions) qui
   reçoit le contenu du panier (`MnCart.detailedLines()`), crée une
   [Checkout Session](https://stripe.com/docs/api/checkout/sessions/create)
   côté serveur avec la clé secrète Stripe, et renvoie l'URL de la session.
2. Dans `assets/js/checkout.js`, remplacez le bloc `setTimeout(...)` de
   simulation par un `fetch()` vers cette fonction, puis
   `window.location.href = session.url`.
3. Stripe redirige vers vos pages de succès/annulation ; adaptez
   `confirmation.html` pour lire les paramètres renvoyés par Stripe (ou
   conservez la logique `sessionStorage` actuelle en la déclenchant depuis la
   page de succès Stripe).

Dans les deux cas, ne mettez jamais de clé secrète Stripe dans le code
front-end — seule la clé publique (`pk_...`) peut être exposée côté client.

## Accessibilité & performance

- Contraste texte/fond vérifié (≥ 4.5:1) pour les combinaisons de couleurs
  principales (texte bleu marine sur crème/blanc, texte blanc sur fond
  marine, etc.).
- `prefers-reduced-motion` respecté : animations et transitions désactivées
  automatiquement.
- Focus clavier visible sur tous les éléments interactifs.
- Illustrations de produits en SVG généré (pas de photos) — à remplacer par
  de vraies photos produit en production pour un rendu plus premium.

## Fond photo (montagne)

`assets/img/hero-mountain.jpg` (photo Unsplash, libre de droits) sert de fond
à tout le site : appliqué sur `body` dans `src/input.css`, en `fixed` sur
desktop (avec un fondu crème par-dessus pour rester lisible derrière tous
les textes) et en bande pleine largeur fixée en haut de page sur mobile
(`@media (max-width: 768px)`, pour éviter qu'un fond `cover` non-fixe
n'étire l'image sur toute la hauteur d'une longue page et ne révèle ses
zones sombres derrière le texte).

Pour changer cette photo : remplacez le fichier `assets/img/hero-mountain.jpg`
(même nom) par une autre image, idéalement dans les mêmes tons clairs en
haut de l'image (le fondu crème est calé sur une zone claire en haut). Le
fichier actuel (~264 Ko) n'est pas optimisé (pas d'outil de compression
d'image disponible au moment de l'intégration) — le passer dans un
compresseur (Squoosh, TinyPNG) ou générer une version WebP est recommandé
avant mise en production.
