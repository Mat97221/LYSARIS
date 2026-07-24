/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        /**
         * Token names are reused across every page (bg-ink-900, text-ink-200, border-ink-600, …).
         * Values below are assigned per the ROLE each token already plays in the markup
         * (see grep audit before this change), not a literal light→dark ramp — so the same
         * class names now render a warm, light "Côte d'Azur / Alpine chic" theme.
         */
        ink: {
          50: "#22201A", // primary text (was brightest text-on-dark; now darkest text-on-light)
          100: "#3B372C", // secondary text
          200: "#655F4E", // muted paragraph text
          300: "#8D8570", // faint / footnote text
          400: "#A79C80",
          500: "#CBBB92", // input borders
          600: "#E1D3AE", // hairline borders, gradient stops
          700: "#FFFFFF", // card surfaces
          800: "#F3EBD8", // alternate section backgrounds / footer
          900: "#FBF6EA" // page background / nav background
        },
        navy: {
          DEFAULT: "#1C3A5E", // deep navy — text, icons, borders AND button/badge fills (dark
          // enough on its own to serve both roles; pair fills with text-white, not text-charcoal)
          hover: "#2E5384", // richer/lighter navy for hover feedback
          dark: "#0F1F35" // deepest shade — dividers, subtle borders
        },
        charcoal: "#22201A", // dark text for fills that stay light (e.g. .btn-shimmer's cream pill)
        azure: {
          DEFAULT: "#2C6E8E", // Côte d'Azur sea blue — secondary accent
          light: "#6FA9C2",
          50: "#EAF3F6"
        },
        pine: {
          DEFAULT: "#4B6650", // alpine pine green — tertiary accent
          light: "#7C9682"
        },
        error: "#B3261E"
      },
      fontFamily: {
        display: ["Cormorant", "serif"],
        body: ["Montserrat", "sans-serif"]
      },
      boxShadow: {
        soft: "0 4px 14px rgba(60,50,20,0.08)",
        lifted: "0 18px 40px rgba(60,50,20,0.14)",
        navy: "0 0 0 1px rgba(28,58,94,0.35)"
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
