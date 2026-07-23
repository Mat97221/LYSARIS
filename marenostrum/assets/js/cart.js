/**
 * MARENOSTRUM — Panier (persistance locale via localStorage)
 * Le panier ne contient aucune donnée de paiement : uniquement des références produit.
 */
const MN_CART_KEY = "marenostrum_cart_v1";
const MN_FREE_SHIPPING_THRESHOLD = 150;
const MN_SHIPPING_COST = 14;

const MnCart = {
  read() {
    try {
      const raw = localStorage.getItem(MN_CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  write(items) {
    localStorage.setItem(MN_CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("mn:cart-updated"));
  },

  add(productId, sku, qty = 1) {
    const items = this.read();
    const existing = items.find((i) => i.productId === productId && i.sku === sku);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ productId, sku, qty });
    }
    this.write(items);
  },

  updateQty(sku, qty) {
    let items = this.read();
    if (qty <= 0) {
      items = items.filter((i) => i.sku !== sku);
    } else {
      const item = items.find((i) => i.sku === sku);
      if (item) item.qty = qty;
    }
    this.write(items);
  },

  remove(sku) {
    const items = this.read().filter((i) => i.sku !== sku);
    this.write(items);
  },

  clear() {
    this.write([]);
  },

  /** Enrichit les lignes du panier avec les données produit/variante courantes. */
  detailedLines() {
    return this.read()
      .map((line) => {
        const product = mnFindProduct(line.productId);
        if (!product) return null;
        const variant = product.variants.find((v) => v.sku === line.sku);
        if (!variant) return null;
        return {
          ...line,
          product,
          variant,
          lineTotal: variant.price * line.qty
        };
      })
      .filter(Boolean);
  },

  count() {
    return this.read().reduce((sum, i) => sum + i.qty, 0);
  },

  totals() {
    const lines = this.detailedLines();
    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
    const shipping = subtotal === 0 || subtotal >= MN_FREE_SHIPPING_THRESHOLD ? 0 : MN_SHIPPING_COST;
    return {
      itemCount: lines.reduce((sum, l) => sum + l.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      freeShippingRemaining: Math.max(0, MN_FREE_SHIPPING_THRESHOLD - subtotal)
    };
  }
};
