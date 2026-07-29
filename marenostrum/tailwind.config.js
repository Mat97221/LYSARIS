/** @type {import('tailwindcss').Config} */

// Single source of truth for the MARENOSTRUM brand palette. Change a hex here and it
// propagates everywhere — both the new bg-noir/text-ivoire/text-or/bg-marine utilities and
// the legacy ink-*/navy/azure/pine aliases below, which every page already builds on, derive
// from these four values alone.
const BRAND = {
  noir: "#111110", // dominant background, ~60% of the surface
  ivoire: "#F4EFE6", // primary text and soft surfaces
  or: "#C4A35A", // accent — small touches only (~10%): key buttons, hairlines, details
  marine: "#123A3A" // secondary — sections and inserts, ~30%
};

module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        noir: BRAND.noir,
        ivoire: BRAND.ivoire,
        or: BRAND.or,
        marine: BRAND.marine,

        /**
         * Legacy token names, reused across every page (bg-ink-900, text-ink-200, border-ink-600, …).
         * Brand identity pass: every step below now derives from BRAND above instead of the old
         * navy/ivory scheme, so the whole site inherits the new palette without any page having
         * to change which class it reaches for.
         */
        ink: {
          50: BRAND.ivoire, // primary text
          100: "#D9D2C2", // secondary text — ivoire stepped down
          200: "#B6AD99", // muted paragraph text
          300: "#8C8474", // faint / footnote text
          400: "#5C5646", // unused today, kept for scale completeness
          500: "#4A4438", // visible borders — inputs, filter pills, unselected variant buttons
          600: BRAND.or, // hairline borders / dividers, always used at reduced opacity — thin gold "filets"
          700: BRAND.marine, // card surfaces
          800: "#152C2A", // alternate section backgrounds / footer — marine, darkened toward noir
          900: BRAND.noir // page background
        },
        navy: {
          DEFAULT: BRAND.or, // primary accent — key buttons, prices, eyebrows
          hover: "#D4B36E", // brighter gold for hover/active feedback
          dark: "#0A0A09" // deepest shade — dividers, the "abysse" section (near-black, never pure #000)
        },
        charcoal: BRAND.noir,
        azure: {
          DEFAULT: BRAND.or, // collapsed onto the gold accent — no separate accent hue
          light: BRAND.or,
          50: "#2A2721"
        },
        pine: {
          DEFAULT: BRAND.or, // collapsed onto the gold accent — no separate accent hue
          light: BRAND.or
        },
        error: "#E2776B" // lightened from the previous #B3261E so it still reads on the new dark background
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
