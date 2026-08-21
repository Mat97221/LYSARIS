/**
 * MARENOSTRUM — Panier sans prix, base de la demande envoyée depuis coordonnees.html.
 * Stockage 100% client (localStorage) — ce site statique n'a pas de back-end ; il n'y a donc
 * rien d'autre à synchroniser. Une ligne = { productId, sku, quantity }. Le prix n'existe nulle
 * part dans ce fichier ni dans products.js : il n'y a rien à masquer, juste rien à afficher.
 */

const MN_CART_KEY = "mn-selection";
// Message facultatif saisi en bas du panier (page panier.html) — stocké à part de la liste des
// lignes : c'est un texte libre, pas une ligne de produit, et coordonnees.html doit pouvoir le
// lire sans passer par la logique de résolution produit/variant ci-dessous.
const MN_CART_MESSAGE_KEY = "mn-selection-message";

function mnGetCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(MN_CART_KEY));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function mnSaveCart(items) {
  localStorage.setItem(MN_CART_KEY, JSON.stringify(items));
  // Laisse mnHeader() (chargé sur chaque page) rafraîchir son badge sans rechargement, y
  // compris quand l'ajout se fait depuis produit.html/boutique.html sans navigation.
  document.dispatchEvent(new CustomEvent("mn-cart-updated", { detail: { items } }));
}

function mnCartCount(items) {
  return (items || mnGetCart()).reduce((sum, line) => sum + (line.quantity || 1), 0);
}

/** Ajoute une unité (ou `quantity`) d'un SKU précis ; fusionne avec la ligne existante si le
    même produit+conditionnement est déjà dans la sélection. */
function mnAddToCart(productId, sku, quantity = 1) {
  const items = mnGetCart();
  const existing = items.find((l) => l.productId === productId && l.sku === sku);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ productId, sku, quantity });
  }
  mnSaveCart(items);
  return items;
}

/** Change le conditionnement et/ou la quantité d'une ligne existante (page "Panier"). */
function mnUpdateCartLine(productId, oldSku, newSku, quantity) {
  const items = mnGetCart();
  const idx = items.findIndex((l) => l.productId === productId && l.sku === oldSku);
  if (idx === -1) return items;
  const qty = Math.max(1, Math.round(quantity) || 1);
  // Une autre ligne du même produit porte déjà le conditionnement choisi (l'utilisateur change
  // la taille d'une ligne pour une taille déjà présente ailleurs dans sa sélection) : fusionne
  // les quantités plutôt que de laisser deux lignes identiques cohabiter.
  const dupIdx = items.findIndex((l, i) => i !== idx && l.productId === productId && l.sku === newSku);
  if (dupIdx !== -1) {
    items[dupIdx].quantity += qty;
    items.splice(idx, 1);
  } else {
    items[idx].sku = newSku;
    items[idx].quantity = qty;
  }
  mnSaveCart(items);
  return items;
}

function mnRemoveCartLine(productId, sku) {
  const items = mnGetCart().filter((l) => !(l.productId === productId && l.sku === sku));
  mnSaveCart(items);
  return items;
}

function mnClearCart() {
  mnSaveCart([]);
  mnSetCartMessage("");
}

function mnGetCartMessage() {
  return localStorage.getItem(MN_CART_MESSAGE_KEY) || "";
}

function mnSetCartMessage(text) {
  localStorage.setItem(MN_CART_MESSAGE_KEY, (text || "").slice(0, 300));
}

/** Une ligne "brute" ne porte qu'un id produit et un SKU — la page panier et la page
    coordonnées ont besoin du produit et du variant complets pour s'afficher. Le
    conditionnement détermine l'unité affichée : "au kg" (poissons fumés à la coupe) se
    commande en kg, tout le reste (boîtes de 30 g à 1 kg) se commande à la boîte. Filtre les
    lignes dont le produit n'existe plus (catalogue modifié) plutôt que de planter dessus. */
function mnCartLinesResolved() {
  return mnGetCart()
    .map((line) => {
      const product = mnFindProduct(line.productId);
      if (!product) return null;
      const variant = product.variants.find((v) => v.sku === line.sku) || product.variants[0];
      const unit = /au kg/i.test(variant.size) ? "kg" : "boîte(s)";
      return { ...line, product, variant, unit };
    })
    .filter(Boolean);
}

/** Rafraîchit le badge de compteur dans l'en-tête (voir mnHeader() dans ui.js). Appelé une fois
    au chargement de chaque page (mnMountLayout) et à chaque mnSaveCart() via l'event ci-dessus,
    pour rester à jour sans recharger la page après un ajout. */
function mnRefreshCartBadge() {
  const badge = document.getElementById("mn-cart-count");
  if (!badge) return;
  const count = mnCartCount();
  badge.textContent = String(count);
  badge.classList.toggle("hidden", count === 0);
}

document.addEventListener("mn-cart-updated", mnRefreshCartBadge);

/** Remet à jour l'icône/le libellé de chaque bouton "Ajouter au panier" présent sur la page
    d'après l'état réel du panier — appelé après chaque mnSaveCart() (retrait depuis une AUTRE
    carte du même produit, page panier ouverte dans un second onglet, etc.) pour que tous les
    boutons restent synchronisés, pas seulement celui qui vient d'être cliqué. */
function mnRefreshQuickAddButtons() {
  const items = mnGetCart();
  document.querySelectorAll("[data-quickadd]").forEach((btn) => {
    const inCart = items.some((l) => l.productId === btn.dataset.productId && l.sku === btn.dataset.sku);
    const icon = btn.querySelector("[data-quickadd-icon]");
    const label = btn.querySelector("[data-quickadd-label]");
    if (icon) icon.innerHTML = inCart ? MN_ICONS.trash : MN_ICONS.cart;
    if (label) label.textContent = inCart ? "Retirer du panier" : "Ajouter au panier";
    btn.classList.toggle("border-marine", inCart);
    btn.classList.toggle("bg-marine", inCart);
    btn.classList.toggle("text-ivoire", inCart);
    btn.classList.toggle("hover:bg-navy-hover", inCart);
    btn.classList.toggle("border-marine/40", !inCart);
    btn.classList.toggle("text-marine", !inCart);
    btn.classList.toggle("hover:bg-marine", !inCart);
    btn.classList.toggle("hover:text-ivoire", !inCart);
  });
}

document.addEventListener("mn-cart-updated", mnRefreshQuickAddButtons);

/** Délégation sur `document` plutôt qu'un binding au moment du rendu : les cartes produit
    (mnProductCard) sont injectées dynamiquement via innerHTML après coup sur boutique.html et
    produit.html, un binding direct au moment de leur création serait perdu à chaque nouveau
    rendu (changement de filtre catégorie, par ex.). La délégation reste valable quel que soit
    le moment où le bouton apparaît dans le DOM.
    Le bouton bascule entre les deux états plutôt que de se contenter d'ajouter : un même produit
    déjà présent dans le panier se retire d'un second clic, sans repasser par la page panier. */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-quickadd]");
  if (!btn) return;
  e.preventDefault();
  const { productId, sku } = btn.dataset;
  const alreadyInCart = mnGetCart().some((l) => l.productId === productId && l.sku === sku);
  if (alreadyInCart) {
    mnRemoveCartLine(productId, sku);
  } else {
    mnAddToCart(productId, sku, 1);
  }
});
