/** @type {import('tailwindcss').Config} */

// Single source of truth for the MARENOSTRUM brand palette. Change a hex here and it
// propagates everywhere — both the bg-noir/text-ivoire/text-or/bg-marine utilities and the
// legacy ink-*/navy/azure/pine aliases below, which every page already builds on, derive from
// these four values alone.
const BRAND = {
  noir: "#111110", // contrast / signature ground — hero, footer, a few impact sections only
  ivoire: "#F4EFE6", // DEFAULT background of most content sections; text on dark grounds
  marine: "#17263F" // the single accent — buttons, active states, links, icons, details
  // (a gold accent was removed entirely from the identity; nothing uses it anymore)
};

module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        noir: BRAND.noir,
        ivoire: BRAND.ivoire,
        marine: BRAND.marine,

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
          500: "#CFC7B4", // visible borders — inputs, filter pills, unselected variant buttons
          600: "#E4DCCB", // subtle neutral hairlines / section dividers (gold filets are applied on purpose, not here)
          700: "#FBFAF6", // card surfaces — near-white, lifted just above the ivoire page
          800: "#ECE5D7", // alternate section backgrounds — a tint just below ivoire for quiet alternation
          900: BRAND.ivoire // page background
        },
        navy: {
          DEFAULT: BRAND.marine, // marine FILLS — primary buttons, badges, active-state chips (paired with ivoire text)
          hover: "#24395E", // slightly lighter marine for hover/active feedback
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
        // Fraunces (Google Fonts, loaded once in src/input.css) — editorial serif for every
        // heading. Its optical-size axis is requested up to 144 so large titles get the
        // warmer, slightly raw display cut rather than a text-sized one scaled up.
        titre: ["Fraunces", "Georgia", "serif"],
        // Inter — neutral, highly legible sans for body copy and interface chrome. Also the
        // default font on <body>, see src/input.css.
        texte: ["Inter", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 4px 14px rgba(17,17,16,0.35)",
        lifted: "0 18px 40px rgba(17,17,16,0.5)",
        navy: "0 0 0 1px rgba(196,163,90,0.45)"
      },
      letterSpacing: {
        widest2: "0.25em"
      },
      lineHeight: {
        // Overrides Tailwind's default 1.625 for `leading-relaxed`, used throughout for body
        // copy — every existing use of the class picks up the airier editorial rhythm with no
        // HTML change.
        relaxed: "1.7"
      },
      transitionTimingFunction: {
        fluid: "cubic-bezier(0.4, 0, 0.2, 1)"
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
