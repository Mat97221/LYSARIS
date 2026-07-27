/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        /**
         * Token names are reused across every page (bg-ink-900, text-ink-200, border-ink-600, …).
         * "Vivant & premium" pass: collapsed to a restrained two-tone navy/ivory system (see
         * design_handoff_marenostrum_site) — ink-50 (primary text) now equals navy itself, and
         * azure/pine (formerly separate accent hues) collapse to the same navy too, so the whole
         * site reads as a single deliberate color instead of several competing accents.
         */
        ink: {
          50: "#0A1F3D", // primary text — same value as navy
          100: "#14304F", // secondary text
          200: "#35506E", // muted paragraph text
          300: "#6B7C90", // faint / footnote text
          400: "#94A0AF",
          500: "#C3C9D2", // input borders
          600: "#D7DCE3", // hairline borders, gradient stops
          700: "#FFFFFF", // card surfaces
          800: "#F1EADC", // alternate section backgrounds / footer
          900: "#FAF6EF" // page background / nav background (warm ivory)
        },
        navy: {
          DEFAULT: "#0A1F3D",
          hover: "#15355C", // richer/lighter navy for hover feedback
          dark: "#050D1A" // deepest shade — dividers, the "abysse" section
        },
        charcoal: "#0A1F3D",
        azure: {
          DEFAULT: "#0A1F3D", // collapsed onto navy — no separate accent hue anymore
          light: "#0A1F3D",
          50: "#EAF3F6"
        },
        pine: {
          DEFAULT: "#0A1F3D", // collapsed onto navy — no separate accent hue anymore
          light: "#0A1F3D"
        },
        error: "#B3261E"
      },
      fontFamily: {
        // Bodoni Moda (Google Fonts) evokes the high-contrast Didot/Bodoni serif used in
        // CHANEL's branding — not their actual (proprietary, unlicensed) typeface.
        display: ["Bodoni Moda", "Didot", "Georgia", "serif"],
        // Helvetica Neue system stack, matching the spare grotesque body type common to
        // high-fashion sites — no separate font file needed, works everywhere.
        body: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 4px 14px rgba(10,31,61,0.08)",
        lifted: "0 18px 40px rgba(10,31,61,0.14)",
        navy: "0 0 0 1px rgba(10,31,61,0.35)"
      },
      letterSpacing: {
        widest2: "0.25em"
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
