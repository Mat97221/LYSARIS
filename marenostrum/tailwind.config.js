/** @type {import('tailwindcss').Config} */

// MARENOSTRUM — design system palette. Two themes (light default, dark via [data-theme="dark"]),
// defined as CSS custom properties in src/input.css and simply referenced here — so every
// Tailwind color utility below is automatically theme-reactive: the SAME class (bg-page,
// text-ink...) renders light or dark depending on whether it sits inside a [data-theme="dark"]
// wrapper (hero, footer, contact, La Table's product heroes, the data band, the full-screen menu,
// the loading screen) or the default light document flow. Exactly eight tokens per theme, no more:
// bg, surface, surface-high (dark only), shadow/border, text, text-2, accent, accent-dark
// (light only, fixed). Never a gradient, never a glow — flat fills only.
module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        page: "var(--color-bg)", // primary background — replaces the old bg-ivoire/bg-noir pair
        surface: "var(--color-surface)", // cards, inputs, elevated panels
        "surface-high": "var(--color-surface-high)", // dark theme only: menu items, raised chips
        line: "var(--color-border)", // hairline borders AND the "shadow" alternate-tint fill
        ink: "var(--color-text)", // primary text — inverts automatically light/dark
        "ink-2": "var(--color-text-2)", // secondary text, eyebrows, dark-theme surfaces
        gold: "var(--color-accent)", // the one accent — filets, chiffres, libellés de survol
        "gold-dark": "#9A7F42", // fixed (not theme-reactive): body-text links on the light theme
        error: "#B3261E"
      },
      fontFamily: {
        // Single-typeface system, sitewide, no exception (La Table's former Cormorant Garamond
        // serif treatment has been retired — "titre" and "texte" both resolve to Switzer alone).
        titre: ["Switzer", "Inter", "-apple-system", "sans-serif"],
        texte: ["Switzer", "Inter", "-apple-system", "sans-serif"]
      },
      maxWidth: {
        container: "var(--container-maxWidth)"
      },
      letterSpacing: {
        widest2: "0.25em",
        label: "0.12em"
      },
      lineHeight: {
        relaxed: "var(--lineHeight)"
      },
      transitionTimingFunction: {
        fluid: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      fontSize: {
        title: "var(--titleSize)"
      },
      fontWeight: {
        bold: "var(--fontBold)" // 500 — the ceiling, never higher, even for titles
      }
    }
  },
  plugins: []
};
