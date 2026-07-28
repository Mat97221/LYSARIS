# MARENOSTRUM — Hero React (prototype)

Prototype React (Vite + Tailwind CSS + lucide-react) d'une page hero plein
écran pour MARENOSTRUM : navbar responsive, menu mobile animé, texte hero
avec animations décalées, fond vidéo en boucle.

Ce projet est séparé du site statique principal (`../marenostrum/`, en
HTML/CSS/JS vanilla) — c'est un prototype isolé, pas encore branché dessus.

## Lancer en local

```bash
npm install
npm run dev
```

## Build de production

```bash
npm run build
```

## Vidéo de fond

`src/App.jsx` définit `HERO_VIDEO_URL` en haut du fichier, actuellement
vide — sans URL, le hero retombe sur le fond navy uni (`#0A1F3D`). Pour
l'activer, renseigner une URL de vidéo directe (mp4/webm, idéalement
libre de droits) à cette constante.
