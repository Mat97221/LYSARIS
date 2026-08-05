/**
 * MARENOSTRUM — Catalogue produits (données de démonstration)
 * Remplacer par un flux réel (CMS / ERP / feed fournisseur) en production.
 */
const MARENOSTRUM_PRODUCTS = [
  {
    id: "osciètre-royal",
    name: "Osciètre Royal",
    species: "Acipenser gueldenstaedtii",
    category: "caviar",
    tint: "amber",
    tagline: "Grain doré, notes de noisette grillée",
    badge: "Best-seller",
    origin: "Hongrie — élevage partenaire, sélection MARENOSTRUM",
    affinage: "Affiné 90 jours, salage traditionnel Malossol",
    description:
      "Notre Osciètre Royal est l'expression la plus aboutie de notre exigence de sélection : un grain ferme et doré, une texture qui éclate délicatement en bouche, et une longue finale sur des notes de beurre noisette et de fruits secs. Un caviar de référence, apprécié aussi bien des connaisseurs que des curieux qui découvrent l'Osciètre pour la première fois.",
    tastingNotes: ["Noisette grillée", "Beurre frais", "Finale iodée longue"],
    pairing: "Blinis tièdes, crème fraîche d'Isigny, vodka polonaise glacée ou Champagne blanc de blancs.",
    variants: [
      { size: "30 g", sku: "OSC-030" },
      { size: "50 g", sku: "OSC-050" },
      { size: "125 g", sku: "OSC-125" },
      { size: "250 g", sku: "OSC-250" }
    ],
    inStock: true
  },
  {
    id: "beluga-imperial",
    name: "Beluga hybride Impérial",
    species: "Huso huso × Acipenser baerii",
    category: "caviar",
    tint: "graphite",
    tagline: "Le plus grand des grains, la plus grande des rondeurs",
    badge: "Édition limitée",
    origin: "Hongrie — élevage partenaire certifié CITES",
    affinage: "Affiné 120 jours, salage Malossol léger",
    description:
      "Le Beluga hybride Impérial est la pièce maîtresse de toute table d'exception. Ses grains, parmi les plus gros qui existent, offrent une texture crémeuse et fondante, presque beurrée, avec une salinité extrêmement délicate. Une rareté sélectionnée en quantités volontairement limitées chaque saison.",
    tastingNotes: ["Crémeux, presque beurré", "Salinité délicate", "Arômes marins subtils"],
    pairing: "À la cuillère de nacre, seul, tempéré 5 minutes hors du froid. Champagne millésimé.",
    variants: [
      { size: "30 g", sku: "BEL-030" },
      { size: "50 g", sku: "BEL-050" },
      { size: "125 g", sku: "BEL-125" }
    ],
    inStock: true
  },
  {
    id: "sevruga-tradition",
    name: "Sevruga Tradition",
    species: "Acipenser stellatus",
    category: "caviar",
    tint: "onyx",
    tagline: "Grain fin, caractère affirmé",
    badge: null,
    origin: "Hongrie — élevage partenaire, sélection MARENOSTRUM",
    affinage: "Affiné 60 jours, salage Malossol",
    description:
      "Le Sevruga séduit par son grain plus petit et son caractère plus marqué : des notes iodées franches, une texture ferme et un léger croquant. Un caviar au tempérament affirmé, parfait pour les amateurs qui recherchent de l'intensité.",
    tastingNotes: ["Iodé franc", "Léger croquant", "Notes minérales"],
    pairing: "Œuf mollet, pomme de terre tiède, beurre demi-sel.",
    variants: [
      { size: "30 g", sku: "SEV-030" },
      { size: "50 g", sku: "SEV-050" },
      { size: "125 g", sku: "SEV-125" },
      { size: "250 g", sku: "SEV-250" }
    ],
    inStock: true
  },
  {
    id: "kaluga-reserve",
    name: "Kaluga hybride Réserve",
    species: "Acipenser schrenckii × Huso dauricus",
    category: "caviar",
    tint: "amber",
    tagline: "Rondeur généreuse, rareté du fleuve Amour",
    badge: "Nouveauté",
    origin: "Hongrie — élevage partenaire, sélection MARENOSTRUM",
    affinage: "Affiné 100 jours, salage Malossol léger",
    description:
      "Cousin du Beluga, le Kaluga hybride Réserve partage sa générosité et sa rondeur en bouche, avec une pointe de douceur supplémentaire. Un grain large, brillant, à la texture soyeuse — une alternative rare et remarquable pour les grandes occasions.",
    tastingNotes: ["Doux et rond", "Grain brillant", "Notes lactées"],
    pairing: "Toast brioché, beurre cru, un trait de citron.",
    variants: [
      { size: "30 g", sku: "KAL-030" },
      { size: "50 g", sku: "KAL-050" },
      { size: "125 g", sku: "KAL-125" }
    ],
    inStock: true
  },
  {
    id: "baeri-prestige",
    name: "Sibérien Prestige",
    species: "Acipenser baerii",
    category: "caviar",
    tint: "onyx",
    tagline: "L'équilibre parfait pour découvrir le caviar",
    badge: null,
    origin: "Hongrie — élevage partenaire, sélection MARENOSTRUM",
    affinage: "Affiné 75 jours, salage Malossol",
    description:
      "Le Sibérien est l'esturgeon le plus élevé au monde, un gage de constance et de traçabilité. Nous sélectionnons directement ce lot chez notre éleveur partenaire. Son grain gris-brun offre une texture souple et un goût délicat aux notes beurrées — l'entrée idéale dans l'univers du caviar d'exception.",
    tastingNotes: ["Beurré et doux", "Texture souple", "Finale discrète"],
    pairing: "Blinis nature, crème épaisse, ciboulette fraîche.",
    variants: [
      { size: "30 g", sku: "BAE-030" },
      { size: "50 g", sku: "BAE-050" },
      { size: "125 g", sku: "BAE-125" },
      { size: "250 g", sku: "BAE-250" }
    ],
    inStock: true
  },
  {
    id: "perles-blondes",
    name: "Perles Blondes",
    species: "Acipenser gueldenstaedtii — mutation albinos",
    category: "caviar",
    tint: "champagne",
    tagline: "La rareté ultime, réservée aux grandes occasions",
    badge: "Édition limitée",
    origin: "Hongrie — moins de 300 kg sélectionnés par an",
    affinage: "Affiné 90 jours, salage Malossol minimal",
    description:
      "Issues d'une mutation naturelle extrêmement rare de l'esturgeon Osciètre, les Perles Blondes affichent une robe dorée unique et un raffinement incomparable. Une pièce de collection, souvent présentée dans un coffret nacré et servie à la cuillère devant les convives.",
    tastingNotes: ["Délicatesse extrême", "Notes de miel et de noisette", "Grain translucide"],
    pairing: "Servi seul, à température, dans son écrin de glace pilée.",
    variants: [
      { size: "30 g", sku: "PBL-030" },
      { size: "50 g", sku: "PBL-050" }
    ],
    inStock: true
  },
  {
    id: "cuillere-nacre",
    name: "Cuillère de Nacre",
    species: null,
    category: "accessoires",
    tint: "champagne",
    tagline: "L'ustensile traditionnel, sans altération du goût",
    badge: null,
    origin: "Fabrication artisanale, nacre naturelle",
    affinage: null,
    description:
      "Contrairement au métal, la nacre ne réagit pas avec le caviar et préserve intégralement la pureté de ses arômes. Chaque cuillère est taillée à la main dans une nacre naturelle, légèrement différente d'une pièce à l'autre.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "Unité", sku: "ACC-CUI" }],
    inStock: true
  },
  {
    id: "plateau-service",
    name: "Plateau de Service Glacé",
    species: null,
    category: "accessoires",
    tint: "graphite",
    tagline: "Maintient le caviar à température idéale pendant le service",
    badge: null,
    origin: "Verre et acier inoxydable",
    affinage: null,
    description:
      "Un plateau à double paroi qui se glace au congélateur et maintient le caviar entre 0 et 4°C pendant toute la durée du service, sans jamais le mettre en contact direct avec la glace.",
    tastingNotes: [],
    pairing: null,
    variants: [{ size: "Ø 20 cm", sku: "ACC-PLA" }],
    inStock: true
  },
  {
    id: "blinis-artisanaux",
    name: "Blinis Artisanaux",
    species: null,
    category: "epicerie",
    tint: "champagne",
    tagline: "La garniture traditionnelle, moelleuse et légère",
    badge: null,
    origin: "Fabrication française, farine de sarrasin",
    affinage: null,
    description:
      "Réalisés selon la recette traditionnelle russe, ces blinis moelleux à la farine de sarrasin subliment le caviar sans jamais masquer sa finesse. Livrés frais, à réchauffer 2 minutes avant dégustation.",
    tastingNotes: [],
    pairing: "Accompagnement traditionnel de tous nos caviars.",
    variants: [{ size: "Boîte de 12", sku: "EPI-BLI" }],
    inStock: true
  },
  {
    id: "creme-fraiche-isigny",
    name: "Crème Fraîche d'Isigny AOP",
    species: null,
    category: "epicerie",
    tint: "onyx",
    tagline: "Onctuosité et fraîcheur pour accompagner le grain",
    badge: null,
    origin: "Isigny-sur-Mer, Normandie",
    affinage: null,
    description:
      "Une crème fraîche épaisse et légèrement acidulée, AOP Isigny, qui apporte de la fraîcheur en bouche et fait ressortir la salinité délicate du caviar.",
    tastingNotes: [],
    pairing: "Blinis, œuf mollet, pomme de terre tiède.",
    variants: [{ size: "200 g", sku: "EPI-CRE" }],
    inStock: true
  }
];

const MARENOSTRUM_CATEGORIES = [
  { id: "tous", label: "Tous les produits" },
  { id: "caviar", label: "Caviars" },
  { id: "accessoires", label: "Accessoires" },
  { id: "epicerie", label: "Épicerie fine" }
];

function mnFindProduct(id) {
  return MARENOSTRUM_PRODUCTS.find((p) => p.id === id) || null;
}
