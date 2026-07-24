/**
 * MARENOSTRUM — Tunnel de commande (démonstration).
 *
 * Aucune donnée de paiement réelle n'est collectée ni transmise : ce formulaire
 * simule un paiement pour les besoins de la démo. Voir SETUP.md à la racine du
 * projet pour brancher un vrai prestataire de paiement (Stripe Checkout / Payment Links).
 */

const MN_ORDER_KEY = "marenostrum_last_order";

function mnValidateField(input, validator, message) {
  const errorEl = document.getElementById(`${input.id}-error`);
  const valid = validator(input.value.trim());
  if (!valid) {
    input.classList.add("!border-error");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove("hidden");
    }
  } else {
    input.classList.remove("!border-error");
    if (errorEl) errorEl.classList.add("hidden");
  }
  return valid;
}

const MN_VALIDATORS = {
  required: (v) => v.length > 0,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  postalCode: (v) => /^\d{5}$/.test(v),
  cardNumber: (v) => /^[\d\s]{13,23}$/.test(v),
  cardExpiry: (v) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(v),
  cardCvc: (v) => /^\d{3,4}$/.test(v)
};

function mnGenerateOrderNumber() {
  const now = new Date();
  const y = now.getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `MN-${y}-${rand}`;
}

function mnInitCheckoutForm() {
  const form = document.getElementById("mn-checkout-form");
  if (!form) return;

  const fields = [
    { id: "ck-firstname", validator: MN_VALIDATORS.required, message: "Merci d'indiquer votre prénom." },
    { id: "ck-lastname", validator: MN_VALIDATORS.required, message: "Merci d'indiquer votre nom." },
    { id: "ck-email", validator: MN_VALIDATORS.email, message: "Adresse e-mail invalide." },
    { id: "ck-phone", validator: MN_VALIDATORS.required, message: "Merci d'indiquer un numéro de téléphone (utile pour la livraison réfrigérée)." },
    { id: "ck-address", validator: MN_VALIDATORS.required, message: "Merci d'indiquer votre adresse." },
    { id: "ck-postal", validator: MN_VALIDATORS.postalCode, message: "Code postal invalide (5 chiffres)." },
    { id: "ck-city", validator: MN_VALIDATORS.required, message: "Merci d'indiquer votre ville." },
    { id: "ck-card-number", validator: MN_VALIDATORS.cardNumber, message: "Numéro de carte invalide (démonstration : 16 chiffres quelconques)." },
    { id: "ck-card-expiry", validator: MN_VALIDATORS.cardExpiry, message: "Format attendu : MM/AA." },
    { id: "ck-card-cvc", validator: MN_VALIDATORS.cardCvc, message: "CVC invalide." }
  ];

  fields.forEach(({ id, validator, message }) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener("blur", () => mnValidateField(input, validator, message));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let allValid = true;
    fields.forEach(({ id, validator, message }) => {
      const input = document.getElementById(id);
      if (!input) return;
      if (!mnValidateField(input, validator, message)) allValid = false;
    });

    if (!allValid) {
      const firstError = form.querySelector(".\\!border-error");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const lines = MnCart.detailedLines();
    if (lines.length === 0) return;

    const totals = MnCart.totals();
    const order = {
      orderNumber: mnGenerateOrderNumber(),
      date: new Date().toISOString(),
      customer: {
        firstName: document.getElementById("ck-firstname").value.trim(),
        lastName: document.getElementById("ck-lastname").value.trim(),
        email: document.getElementById("ck-email").value.trim(),
        phone: document.getElementById("ck-phone").value.trim(),
        address: document.getElementById("ck-address").value.trim(),
        addressComplement: document.getElementById("ck-address-2").value.trim(),
        postalCode: document.getElementById("ck-postal").value.trim(),
        city: document.getElementById("ck-city").value.trim()
      },
      lines: lines.map((l) => ({
        name: l.product.name,
        size: l.variant.size,
        qty: l.qty,
        lineTotal: l.lineTotal
      })),
      totals
    };

    sessionStorage.setItem(MN_ORDER_KEY, JSON.stringify(order));

    const submitBtn = document.getElementById("mn-submit-payment");
    submitBtn.disabled = true;
    submitBtn.textContent = "Traitement en cours…";

    setTimeout(() => {
      MnCart.clear();
      window.location.href = "confirmation.html";
    }, 900);
  });
}

document.addEventListener("DOMContentLoaded", mnInitCheckoutForm);
