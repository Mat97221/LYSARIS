/**
 * MARENOSTRUM — Catalogue produits (données de démonstration)
 * Remplacer par un flux réel (CMS / ERP / feed fournisseur) en production.
 *
 * Catalogue volontairement resserré à 4 espèces de caviar, chacune disponible dans les 4 mêmes
 * calibres (30 g / 50 g / 125 g / 500 g) — pas de gamme saumon, poissons fumés ou épicerie fine.
 * `origin` ne pointe plus vers un lieu de production unique (MARENOSTRUM sélectionne auprès de
 * plusieurs producteurs européens certifiés, sans revendiquer une origine ou un terroir précis) :
 * le champ porte désormais notre politique de sourcing et de traçabilité, identique pour les
 * 4 espèces — voir aussi le libellé "Sourcing" (et non "Origine") sur la fiche produit.
 */
const MARENOSTRUM_PRODUCTS = [
  {
    id: "oscietre",
    name: "Osciètre",
    species: "Acipenser gueldenstaedtii",
    category: "caviar",
    tagline: "Grain ferme, notes de noisette",
    badge: "Best-seller",
    origin: "Sélection multi-producteurs européens, traçabilité CITES par lot",
    affinage: null,
    description:
      "L'Osciètre offre un grain ferme et des notes de noisette, constants d'une commande à l'autre — calibrage vérifié et traçabilité CITES complète, lot par lot.",
    tastingNotes: ["Noisette grillée", "Grain ferme"],
    pairing: "Blinis tièdes, crème fraîche, Champagne blanc de blancs.",
    variants: [
      { size: "30 g", sku: "OSC-030" },
      { size: "50 g", sku: "OSC-050" },
      { size: "125 g", sku: "OSC-125" },
      { size: "500 g", sku: "OSC-500" }
    ]
  },
  {
    id: "beluga",
    name: "Beluga",
    species: "Huso huso",
    category: "caviar",
    tagline: "Grand grain, texture crémeuse",
    badge: "Édition limitée",
    origin: "Sélection multi-producteurs européens, traçabilité CITES par lot",
    affinage: null,
    description:
      "Le Beluga offre le grain le plus gros et la texture la plus crémeuse de notre sélection. Traçabilité CITES complète, lot par lot.",
    tastingNotes: ["Crémeux, presque beurré", "Salinité délicate"],
    pairing: "À la cuillère de nacre, seul, tempéré 5 minutes hors du froid.",
    variants: [
      { size: "30 g", sku: "BEL-030" },
      { size: "50 g", sku: "BEL-050" },
      { size: "125 g", sku: "BEL-125" },
      { size: "500 g", sku: "BEL-500" }
    ]
  },
  {
    id: "baeri",
    name: "Baeri",
    species: "Acipenser baerii",
    category: "caviar",
    tagline: "Texture souple, calibrage constant",
    badge: null,
    origin: "Sélection multi-producteurs européens, traçabilité CITES par lot",
    affinage: null,
    description:
      "Le Baeri offre une texture souple et un grain constant, un bon repère pour évaluer la régularité d'un fournisseur d'une commande à l'autre.",
    tastingNotes: ["Beurré et doux", "Texture souple"],
    pairing: "Blinis nature, crème épaisse, ciboulette fraîche.",
    variants: [
      { size: "30 g", sku: "BAE-030" },
      { size: "50 g", sku: "BAE-050" },
      { size: "125 g", sku: "BAE-125" },
      { size: "500 g", sku: "BAE-500" }
    ]
  },
  {
    id: "sevruga",
    name: "Sevruga",
    species: "Acipenser stellatus",
    category: "caviar",
    tagline: "Grain fin, caractère affirmé",
    badge: null,
    origin: "Sélection multi-producteurs européens, traçabilité CITES par lot",
    affinage: null,
    description:
      "Le Sevruga se distingue par un grain plus petit et des notes iodées franches, constantes lot après lot.",
    tastingNotes: ["Iodé franc", "Grain fin"],
    pairing: "Blinis, crème fraîche, vodka glacée.",
    variants: [
      { size: "30 g", sku: "SEV-030" },
      { size: "50 g", sku: "SEV-050" },
      { size: "125 g", sku: "SEV-125" },
      { size: "500 g", sku: "SEV-500" }
    ]
  }
];

function mnFindProduct(id) {
  return MARENOSTRUM_PRODUCTS.find((p) => p.id === id) || null;
}
