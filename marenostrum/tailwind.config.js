/** @type {import('tailwindcss').Config} */

// Single source of truth for the MARENOSTRUM brand palette. Change a hex here and it
// propagates everywhere — both the bg-noir/text-ivoire/text-or/bg-marine utilities and the
// legacy ink-*/navy/azure/pine aliases below, which every page already builds on, derive from
// these four values alone.
const BRAND = {
  noir: "#111110", // deep ground — hero overlay, footer; a few full-bleed dark sections only
  ivoire: "#F6F2EA", // primary page background — warm off-white
  marine: "#1E2C3A", // "encre" — the single ink accent: buttons, active states, links, headings
  glacier: "#C6D2D4", // alternate section background — pairs with ivoire to give the editorial
  // homepage a light/light rhythm from section to section (see mnPageBackground and the home
  // section builders in assets/js/home.js) without ever going dark or introducing a second hue
  sable: "#E8DFD0", // warm accent, used sparingly (a divider, a small fill) — never a full section
  anthracite: "#35322C" // rare dark accent for small marks/icons that need more weight than
  // marine but shouldn't reach for the noir grounds — not used as a background
  // (no gold, no pure black anywhere in the palette)
};

module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        noir: BRAND.noir,
        ivoire: BRAND.ivoire,
        marine: BRAND.marine,
        glacier: BRAND.glacier,
        sable: BRAND.sable,
        anthracite: BRAND.anthracite,

        /**
         * Legacy token names, reused across every page (bg-ink-900, text-ink-200, border-ink-600, …).
         * Light-composition pass: the scale now runs DARK-text → LIGHT-surface, so the site reads
         * as ivoire-dominant with noir text by default. Dark grounds (hero, footer, the "abysse"
         * break, the product-display panels) don't rely on this scale — they use the fixed
         * noir/ivoire/or brand utilities directly, so flipping the scale can't wash them out.
         */
        ink: {
          50: BRAND.noir, // primary text — headings, strongest copy (dark on ivoire)
          100: "#2E2B24", // strong secondary text — nav links, product names
          200: "#46433B", // body / muted paragraph text — main reading colour (~8.5:1 on ivoire)
          300: "#6B6557", // faint / footnote text
          400: "#928B7A", // very faint decorative text
          500: "#D0CABA", // visible borders — inputs, filter pills, unselected variant buttons
          600: "#E4DFD3", // subtle neutral hairlines / section dividers (gold filets are applied on purpose, not here)
          700: "#FBF8F1", // card surfaces — near-white, lifted just above the ivoire page
          800: "#F0ECE2", // alternate section backgrounds — a tint just below ivoire for quiet alternation
          900: BRAND.ivoire // page background
        },
        navy: {
          DEFAULT: BRAND.marine, // marine FILLS — primary buttons, badges, active-state chips (paired with ivoire text)
          hover: "#2B3F59", // slightly lighter marine for hover/active feedback
          dark: "#0A0A09" // deepest shade — the "abysse" section keylines (near-black, never pure #000)
        },
        charcoal: BRAND.noir,
        azure: {
          DEFAULT: BRAND.marine, // supporting icons/details collapse onto marine (legible on ivoire)
          light: BRAND.marine,
          50: "#E7EAF0"
        },
        pine: {
          DEFAULT: BRAND.marine, // supporting icons/details collapse onto marine
          light: BRAND.marine
        },
        error: "#B3261E" // deep red — reads correctly again now that form surfaces are light
      },
      fontFamily: {
        // Single-typeface system (Fontshare, loaded once in src/input.css): Switzer
        // everywhere. "titre" and "texte" both resolve to the same family — kept as two
        // Tailwind keys only because every page already calls font-titre/font-texte; weight
        // (400/500/600) is what carries the hierarchy now, not a font swap.
        titre: ["Switzer", "Inter", "-apple-system", "sans-serif"],
        texte: ["Switzer", "Inter", "-apple-system", "sans-serif"]
      },
      boxShadow: {
        soft: "0 4px 14px rgba(17,17,16,0.35)",
        lifted: "0 18px 40px rgba(17,17,16,0.5)",
        navy: "0 0 0 1px rgba(196,163,90,0.45)"
      },
      letterSpacing: {
        widest2: "0.25em",
        // Buttons and form labels (Switzer Medium, uppercase) — 0.10-0.14em band from the
        // typeface brief, fixed at its midpoint so every button/label reads consistently.
        label: "0.12em"
      },
      lineHeight: {
        // Overrides Tailwind's default 1.625 for `leading-relaxed`, used throughout for body
        // copy — every existing use of the class picks up the airier editorial rhythm with no
        // HTML change.
        relaxed: "1.7"
      },
      transitionTimingFunction: {
        fluid: "cubic-bezier(0.4, 0, 0.2, 1)",
        // Slow, even ease-in-out — used for the "Nos produits" mega-menu so it surfaces like
        // water rising rather than snapping open like the rest of the site's UI transitions.
        // Unlike an ease-out curve (front-loaded, feels fast despite a long duration), this
        // spreads the motion evenly across the whole transition so the full 1000ms actually
        // reads as slow throughout, not just long.
        water: "cubic-bezier(0.65, 0, 0.35, 1)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        drawline: {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" }
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(22px)" },
          to: { opacity: "1", transform: "none" }
        },
        slowzoom: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" }
        },
        tinwobble: {
          "0%, 100%": { transform: "rotateY(-7deg)" },
          "50%": { transform: "rotateY(7deg)" }
        }
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        drawline: "drawline 2.2s ease-out forwards",
        fadeUp: "fadeUp 800ms cubic-bezier(0.4, 0, 0.2, 1) both",
        slowzoom: "slowzoom 14s ease-in-out infinite",
        tinwobble: "tinwobble 9s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
