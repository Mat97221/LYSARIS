/**
 * MARENOSTRUM — Catalogue produits (données de démonstration)
 * Remplacer par un flux réel (CMS / ERP / feed fournisseur) en production.
 */
const MARENOSTRUM_PRODUCTS = [
  {
    id: "bottarga-yastik",
    name: "Bottarga Yastik",
    species: null,
    category: "caviar-esturgeon",
    tagline: "Caviar pressé en pochon de cuir, méthode traditionnelle",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "Le Bottarga Yastik est un caviar pressé, conditionné en pochon selon une méthode de pressage traditionnelle — un format concentré, pensé pour la cuisine.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "150 g (pièce)", sku: "BOT-150" }]
  },
  {
    id: "caviar-gold",
    name: "Caviar Gold",
    species: null,
    category: "caviar-esturgeon",
    tagline: "Grain doré, calibrage constant",
    badge: "Édition limitée",
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "Le Caviar Gold se distingue par sa robe dorée, réservée aux lots dont le calibrage est le plus régulier de la saison.",
    tastingNotes: [],
    pairing: null,
    variants: [
      { size: "30 g", sku: "GOL-030" },
      { size: "50 g", sku: "GOL-050" },
      { size: "100 g", sku: "GOL-100" },
      { size: "1 kg", sku: "GOL-1000" }
    ]
  },
  {
    id: "caviar-presse",
    name: "Caviar Pressé",
    species: null,
    category: "caviar-esturgeon",
    tagline: "Concentré de grains mêlés, texture dense",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "Le Caviar Pressé rassemble des grains de plusieurs récoltes en une pâte dense et parfumée — un format traditionnel, utilisé en cuisine pour son intensité.",
    tastingNotes: [],
    pairing: null,
    variants: [
      { size: "100 g", sku: "PRE-100" },
      { size: "1 kg", sku: "PRE-1000" }
    ]
  },
  {
    id: "sevruga",
    name: "Sevruga",
    species: "Acipenser stellatus",
    category: "caviar-esturgeon",
    tagline: "Grain fin, caractère affirmé",
    badge: null,
    origin: "Hongrie, bassin du Danube — Danubius Caviar",
    affinage: null,
    description:
      "Le Sevruga se distingue par un grain plus petit et des notes iodées franches, constantes lot après lot.",
    tastingNotes: ["Iodé franc", "Grain fin"],
    pairing: "Blinis, crème fraîche, vodka glacée.",
    variants: [
      { size: "30 g", sku: "SEV-030" },
      { size: "50 g", sku: "SEV-050" },
      { size: "100 g", sku: "SEV-100" },
      { size: "1 kg", sku: "SEV-1000" }
    ]
  },
  {
    id: "tradition-russe",
    name: "Tradition Russe",
    species: null,
    category: "caviar-esturgeon",
    tagline: "Salage traditionnel, équilibre classique",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: "Salage Malossol traditionnel",
    description:
      "La Tradition Russe applique le salage Malossol classique, pour un équilibre constant entre douceur et minéralité.",
    tastingNotes: [],
    pairing: null,
    variants: [
      { size: "30 g", sku: "TRU-030" },
      { size: "50 g", sku: "TRU-050" },
      { size: "100 g", sku: "TRU-100" },
      { size: "250 g", sku: "TRU-250" },
      { size: "1 kg", sku: "TRU-1000" }
    ]
  },
  {
    id: "selection-premium",
    name: "Sélection Premium",
    species: null,
    category: "caviar-esturgeon",
    tagline: "Calibrage constant, lot après lot",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "La Sélection Premium réunit les lots au calibrage le plus régulier de chaque récolte, disponible dans l'ensemble de nos formats.",
    tastingNotes: [],
    pairing: null,
    variants: [
      { size: "30 g", sku: "PRM-030" },
      { size: "50 g", sku: "PRM-050" },
      { size: "100 g", sku: "PRM-100" },
      { size: "250 g", sku: "PRM-250" },
      { size: "500 g", sku: "PRM-500" },
      { size: "1 kg", sku: "PRM-1000" }
    ]
  },
  {
    id: "sterlet",
    name: "Sterlet",
    species: "Acipenser ruthenus",
    category: "caviar-esturgeon",
    tagline: "Grain délicat, finale fine",
    badge: null,
    origin: "Hongrie, bassin du Danube — Danubius Caviar",
    affinage: null,
    description:
      "Le Sterlet, plus petit esturgeon d'Europe, offre un grain délicat et une finale fine, régulière d'un lot à l'autre.",
    tastingNotes: ["Délicat", "Finale fine"],
    pairing: null,
    variants: [
      { size: "100 g", sku: "STE-100" },
      { size: "250 g", sku: "STE-250" },
      { size: "1 kg", sku: "STE-1000" }
    ]
  },
  {
    id: "esturgeon-russe",
    name: "Esturgeon Russe",
    species: "Acipenser gueldenstaedtii",
    category: "caviar-esturgeon",
    tagline: "Grain ferme, notes de noisette",
    badge: "Best-seller",
    origin: "Hongrie, bassin du Danube — Danubius Caviar",
    affinage: null,
    description:
      "L'Esturgeon Russe (Osciètre) offre un grain ferme et des notes de noisette, constants d'une commande à l'autre.",
    tastingNotes: ["Noisette grillée", "Grain ferme"],
    pairing: "Blinis tièdes, crème fraîche, Champagne blanc de blancs.",
    variants: [
      { size: "30 g", sku: "RUS-030" },
      { size: "50 g", sku: "RUS-050" },
      { size: "100 g", sku: "RUS-100" },
      { size: "250 g", sku: "RUS-250" },
      { size: "500 g", sku: "RUS-500" },
      { size: "1 kg", sku: "RUS-1000" }
    ]
  },
  {
    id: "kaluga",
    name: "Kaluga",
    species: "Huso dauricus",
    category: "caviar-esturgeon",
    tagline: "Grain rond, texture généreuse",
    badge: "Nouveauté",
    origin: "Hongrie, bassin du Danube — Danubius Caviar",
    affinage: null,
    description:
      "Cousin du Beluga, le Kaluga offre une texture généreuse et une pointe de douceur supplémentaire, grain après grain.",
    tastingNotes: ["Doux et rond", "Grain brillant"],
    pairing: null,
    variants: [
      { size: "30 g", sku: "KAL-030" },
      { size: "50 g", sku: "KAL-050" },
      { size: "100 g", sku: "KAL-100" },
      { size: "250 g", sku: "KAL-250" },
      { size: "500 g", sku: "KAL-500" },
      { size: "1 kg", sku: "KAL-1000" }
    ]
  },
  {
    id: "classique-persan",
    name: "Classique Persan",
    species: null,
    category: "caviar-esturgeon",
    tagline: "Salage traditionnel, méthode historique",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "Le Classique Persan applique une méthode de salage traditionnelle, héritée des techniques historiques de préparation du caviar.",
    tastingNotes: [],
    pairing: null,
    variants: [
      { size: "30 g", sku: "PER-030" },
      { size: "50 g", sku: "PER-050" },
      { size: "100 g", sku: "PER-100" },
      { size: "250 g", sku: "PER-250" },
      { size: "500 g", sku: "PER-500" },
      { size: "1 kg", sku: "PER-1000" }
    ]
  },
  {
    id: "amur",
    name: "Amur",
    species: "Acipenser schrenckii",
    category: "caviar-esturgeon",
    tagline: "Grain soutenu, texture ferme",
    badge: null,
    origin: "Hongrie, bassin du Danube — Danubius Caviar",
    affinage: null,
    description:
      "Cet esturgeon offre un grain soutenu et une texture ferme, réguliers d'un lot à l'autre.",
    tastingNotes: [],
    pairing: null,
    variants: [
      { size: "30 g", sku: "AMU-030" },
      { size: "50 g", sku: "AMU-050" },
      { size: "100 g", sku: "AMU-100" },
      { size: "250 g", sku: "AMU-250" },
      { size: "500 g", sku: "AMU-500" },
      { size: "1 kg", sku: "AMU-1000" }
    ]
  },
  {
    id: "kaluga-premium",
    name: "Kaluga Premium",
    species: "Huso dauricus",
    category: "caviar-esturgeon",
    tagline: "Grands formats, calibrage régulier",
    badge: null,
    origin: "Hongrie, bassin du Danube — Danubius Caviar",
    affinage: null,
    description:
      "Le Kaluga Premium réserve à nos plus grands formats les lots au calibrage le plus régulier de la récolte.",
    tastingNotes: [],
    pairing: null,
    variants: [
      { size: "100 g", sku: "KLP-100" },
      { size: "1 kg", sku: "KLP-1000" }
    ]
  },
  {
    id: "siberien",
    name: "Sibérien",
    species: "Acipenser baerii",
    category: "caviar-esturgeon",
    tagline: "Texture souple, une entrée en matière régulière",
    badge: null,
    origin: "Hongrie, bassin du Danube — Danubius Caviar",
    affinage: null,
    description:
      "Le Sibérien, esturgeon le plus élevé au monde, offre une texture souple et un grain constant, un bon repère pour découvrir le caviar.",
    tastingNotes: ["Beurré et doux", "Texture souple"],
    pairing: "Blinis nature, crème épaisse, ciboulette fraîche.",
    variants: [
      { size: "30 g", sku: "SIB-030" },
      { size: "50 g", sku: "SIB-050" },
      { size: "100 g", sku: "SIB-100" },
      { size: "250 g", sku: "SIB-250" },
      { size: "1 kg", sku: "SIB-1000" }
    ]
  },
  {
    id: "beluga",
    name: "Beluga",
    species: "Huso huso",
    category: "caviar-esturgeon",
    tagline: "Grand grain, texture crémeuse",
    badge: "Édition limitée",
    origin: "Hongrie, bassin du Danube — Danubius Caviar, certifié CITES",
    affinage: null,
    description:
      "Le Beluga offre le grain le plus gros et la texture la plus crémeuse parmi nos esturgeons. Traçabilité CITES complète, lot par lot.",
    tastingNotes: ["Crémeux, presque beurré", "Salinité délicate"],
    pairing: "À la cuillère de nacre, seul, tempéré 5 minutes hors du froid.",
    variants: [
      { size: "30 g", sku: "BEL-030" },
      { size: "50 g", sku: "BEL-050" },
      { size: "100 g", sku: "BEL-100" },
      { size: "1 kg", sku: "BEL-1000" }
    ]
  },
  {
    id: "keta",
    name: "Keta",
    species: "Oncorhynchus keta",
    category: "caviar-saumon",
    tagline: "Grain ambré, texture ferme",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "Le Keta offre un grain ambré et ferme, régulier d'une commande à l'autre.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "1 kg", sku: "KET-1000" }]
  },
  {
    id: "corbusha",
    name: "Corbusha",
    species: "Oncorhynchus gorbuscha",
    category: "caviar-saumon",
    tagline: "Grain fin, saveur douce",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "Le Corbusha (saumon rose) offre un grain fin et une saveur douce, constante d'un lot à l'autre.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "1 kg", sku: "COR-1000" }]
  },
  {
    id: "truite",
    name: "Truite",
    species: "Oncorhynchus mykiss",
    category: "caviar-saumon",
    tagline: "Petit grain, orange vif",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "Les œufs de truite offrent un petit grain orangé, croquant et légèrement salé.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "1 kg", sku: "TRO-1000" }]
  },
  {
    id: "brochet",
    name: "Brochet",
    species: "Esox lucius",
    category: "caviar-saumon",
    tagline: "Grain menu, caractère d'eau douce",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "Les œufs de brochet, plus rares, offrent un grain menu au caractère affirmé d'eau douce.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "1 kg", sku: "BRO-1000" }]
  },
  {
    id: "nerka",
    name: "Nerka",
    species: "Oncorhynchus nerka",
    category: "caviar-saumon",
    tagline: "Rouge profond, grain moyen",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "Le Nerka (saumon rouge) se distingue par sa teinte profonde et son grain moyen bien affirmé.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "1 kg", sku: "NER-1000" }]
  },
  {
    id: "kisutch",
    name: "Kisutch",
    species: "Oncorhynchus kisutch",
    category: "caviar-saumon",
    tagline: "Grain moyen, équilibre iodé",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "Le Kisutch (saumon coho) offre un grain moyen à l'équilibre iodé harmonieux.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "1 kg", sku: "KIS-1000" }]
  },
  {
    id: "saumon-chinook",
    name: "Saumon Chinook",
    species: "Oncorhynchus tshawytscha",
    category: "caviar-saumon",
    tagline: "Grain généreux, saveur riche",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "Ces œufs de saumon Chinook offrent un grain généreux et une saveur riche, régulière d'une commande à l'autre.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "1 kg", sku: "CHI-1000" }]
  },
  {
    id: "saumon-atlantique",
    name: "Saumon Atlantique",
    species: "Salmo salar",
    category: "caviar-saumon",
    tagline: "Grain classique, disponible toute l'année",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "Le Saumon Atlantique offre un grain classique et régulier, sans variation d'une saison à l'autre.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "1 kg", sku: "ATL-1000" }]
  },
  {
    id: "balik-esturgeon-blanc",
    name: "Balik d'Esturgeon Blanc",
    species: null,
    category: "poissons-fumes",
    tagline: "Fumé à froid, méthode traditionnelle",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: "Fumage à froid",
    description:
      "Le Balik d'Esturgeon Blanc est fumé à froid selon une méthode traditionnelle, pour une chair fondante et régulière.",
    tastingNotes: [],
    pairing: null,
    variants: [
      { size: "Tranché, au kg", sku: "BALESB-TR" },
      { size: "Sur peau, au kg", sku: "BALESB-PE" }
    ]
  },
  {
    id: "balik-beluga",
    name: "Balik de Beluga",
    species: null,
    category: "poissons-fumes",
    tagline: "Fumé à froid, chair fondante",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: "Fumage à froid",
    description:
      "Le Balik de Beluga est fumé à froid, pour une chair particulièrement fondante et parfumée.",
    tastingNotes: [],
    pairing: null,
    variants: [
      { size: "Tranché, au kg", sku: "BALBEL-TR" },
      { size: "Sur peau, au kg", sku: "BALBEL-PE" }
    ]
  },
  {
    id: "balik-saumon",
    name: "Balik de Saumon",
    species: null,
    category: "poissons-fumes",
    tagline: "Fumé à froid, méthode traditionnelle",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: "Fumage à froid",
    description:
      "Le Balik de Saumon est fumé à froid selon la même méthode que nos esturgeons.",
    tastingNotes: [],
    pairing: null,
    variants: [
      { size: "Tranché, au kg", sku: "BALSAU-TR" },
      { size: "Sur peau, au kg", sku: "BALSAU-PE" }
    ]
  },
  {
    id: "fletan-fume",
    name: "Flétan Fumé",
    species: null,
    category: "poissons-fumes",
    tagline: "Fumé à froid",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: "Fumage à froid",
    description: "Le flétan fumé à froid offre une chair délicate et légèrement fumée.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "Au kg", sku: "FLE-KG" }]
  },
  {
    id: "saumon-fume-chaud",
    name: "Saumon Fumé à Chaud",
    species: null,
    category: "poissons-fumes",
    tagline: "Fumage à chaud, texture cuite",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: "Fumage à chaud",
    description: "Ce saumon fumé à chaud offre une texture cuite et un goût fumé plus prononcé.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "Au kg", sku: "SFC-KG" }]
  },
  {
    id: "esturgeon-blanc-fume-chaud",
    name: "Esturgeon Blanc Fumé à Chaud",
    species: null,
    category: "poissons-fumes",
    tagline: "Fumage à chaud",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: "Fumage à chaud",
    description: "Cet esturgeon blanc fumé à chaud offre une chair ferme et un goût fumé prononcé.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "Au kg", sku: "EBFC-KG" }]
  },
  {
    id: "esturgeon-russe-fume-chaud",
    name: "Esturgeon Russe Fumé à Chaud",
    species: null,
    category: "poissons-fumes",
    tagline: "Fumage à chaud",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: "Fumage à chaud",
    description: "Cet esturgeon russe fumé à chaud offre une chair ferme et un goût fumé prononcé.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "Au kg", sku: "ERFC-KG" }]
  },
  {
    id: "quenelles-esturgeon-beluga-saumon",
    name: "Quenelles Esturgeon, Beluga & Saumon",
    species: null,
    category: "epicerie-fine",
    tagline: "Trois poissons, une seule quenelle",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "Ces quenelles associent esturgeon, beluga et saumon pour un plat prêt à réchauffer.",
    tastingNotes: [],
    pairing: null,
    variants: [
      { size: "500 g", sku: "QUE-500" },
      { size: "1 kg", sku: "QUE-1000" }
    ]
  },
  {
    id: "escalopes-esturgeon-saumon",
    name: "Escalopes Esturgeon & Saumon",
    species: null,
    category: "epicerie-fine",
    tagline: "Prêtes à poêler",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "Ces escalopes associent esturgeon et saumon, prêtes à poêler pour un plat rapide.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "500 g", sku: "ESC-500" }]
  },
  {
    id: "saucisses-esturgeon-saumon",
    name: "Saucisses Esturgeon & Saumon",
    species: null,
    category: "epicerie-fine",
    tagline: "Une charcuterie de poisson",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description: "Ces saucisses associent esturgeon et saumon pour une charcuterie de poisson prête à servir.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "1 kg", sku: "SAU-1000" }]
  },
  {
    id: "esturgeon-conserve-huile-olive",
    name: "Esturgeon en Conserve, Huile d'Olive",
    species: null,
    category: "epicerie-fine",
    tagline: "Prêt à servir, longue conservation",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description:
      "Cet esturgeon en conserve à l'huile d'olive se garde longtemps et se sert à température ambiante.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "500 g", sku: "CON-500" }]
  },
  {
    id: "king-crab",
    name: "King Crab",
    species: null,
    category: "epicerie-fine",
    tagline: "Chair généreuse, prête à dresser",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description: "Le King Crab (crabe royal) offre une chair généreuse et délicatement sucrée, servi en pièces.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "250 g", sku: "KGC-250" }]
  },
  {
    id: "foie-gras-canard-miel",
    name: "Foie Gras de Canard au Miel",
    species: null,
    category: "epicerie-fine",
    tagline: "Une pointe de douceur",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description: "Ce foie gras de canard au miel équilibre onctuosité et une pointe de douceur florale.",
    tastingNotes: [],
    pairing: null,
    variants: [
      { size: "50 g", sku: "FGC-050" },
      { size: "70 g", sku: "FGC-070" },
      { size: "100 g", sku: "FGC-100" },
      { size: "150 g", sku: "FGC-150" },
      { size: "250 g", sku: "FGC-250" }
    ]
  },
  {
    id: "foie-gras-oie-miel",
    name: "Foie Gras d'Oie au Miel",
    species: null,
    category: "epicerie-fine",
    tagline: "Texture fine, douceur miellée",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: null,
    description: "Ce foie gras d'oie au miel offre une texture plus fine, relevée d'une douceur miellée.",
    tastingNotes: [],
    pairing: null,
    variants: [
      { size: "50 g", sku: "FGO-050" },
      { size: "70 g", sku: "FGO-070" },
      { size: "100 g", sku: "FGO-100" },
      { size: "150 g", sku: "FGO-150" },
      { size: "250 g", sku: "FGO-250" }
    ]
  },
  {
    id: "foie-gras-oie-fume-miel",
    name: "Foie Gras d'Oie Fumé au Miel",
    species: null,
    category: "epicerie-fine",
    tagline: "Fumé, relevé de miel",
    badge: null,
    origin: "Hongrie, bassin du Danube — sélection MARENOSTRUM",
    affinage: "Fumage",
    description: "Ce foie gras d'oie fumé et relevé de miel offre un profil plus intense, entre fumaison et douceur.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "Au kg", sku: "FGF-KG" }]
  }
];

const MARENOSTRUM_CATEGORIES = [
  { id: "tous", label: "Tous les produits" },
  { id: "caviar-esturgeon", label: "Caviar d'esturgeon" },
  { id: "caviar-saumon", label: "Caviar de saumon" },
  { id: "poissons-fumes", label: "Poissons fumés" },
  { id: "epicerie-fine", label: "Épicerie fine" }
];

function mnFindProduct(id) {
  return MARENOSTRUM_PRODUCTS.find((p) => p.id === id) || null;
}
