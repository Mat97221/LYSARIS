# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** MARENOSTRUM
**Generated:** 2026-07-23 19:31:03
**Category:** E-commerce Luxury

---

## ⚠ Design Evolution (post-generation, client direction)

The tool's initial recommendation below (dark "Liquid Glass" theme) was **superseded**
after client feedback: too dark, wanted a light "chic Côte d'Azur / Swiss Alpine"
feel, plus visible motion. The site as implemented uses:

- **Light, warm palette** — ivory/cream backgrounds (`ink-900` role), white cards
  (`ink-700` role), deep navy (`navy`, `#1C3A5E`) as the primary accent for
  text/icons/links AND button/badge fills (paired with white text — navy is dark
  enough on its own to serve both roles, unlike the gold it replaced), plus two
  secondary accents: Côte d'Azur blue (`azure`, `#2C6E8E`) and alpine pine green
  (`pine`, `#4B6650`) used sparingly (icons, dividers).
  **Second revision:** the accent was originally antique gold (`#8A6D1A`) /
  champagne gold (`#E4C664`); the client asked for it to become a deep navy blue
  instead, keeping the ivory background. All `gold`/`gold-light`/`gold-hover`
  classes were mechanically renamed to `navy` (see git history) — if you find
  any stray `gold` class or `text-charcoal` paired with a `bg-navy` fill (should
  be `text-white` instead), it's a leftover from that rename.
- **Same typography** (Cormorant + Montserrat) — that recommendation held up.
- **Restrained motion, not glassmorphism**: scroll-triggered fade/rise reveals
  (`.reveal` + `mnInitReveal`/`mnStagger` in `assets/js/ui.js`), an immediate
  `animate-fadeUp` on hero/above-fold content, a floating + slowly-wobbling
  product-tin animation, small hand-drawn wave dividers (`mnWaveDivider`)
  evoking the coastline, pointer-driven 3D tilt + cursor-spotlight on cards
  (`.tilt-3d`/`.spot-glow`, `mnInit3DTilt`), and a magnetic pull on the two
  main marketing CTAs (`.magnetic`, `mnInitMagnetic`) — instead of heavy
  backdrop-blur/chromatic-aberration effects, which the tool's own priority
  order (Accessibility/Performance > Style) argued against anyway. All of it
  is skipped under `prefers-reduced-motion`.
- Token names in `tailwind.config.js` (`ink-50`…`ink-900`, `navy`) are **reused
  from the original dark spec** with new hex values assigned per their actual
  usage role (see comment block at the top of the `ink` color object) — not a
  literal light-mode ramp. Read that comment before adding new `ink-*` classes.

The color table and "Liquid Glass" style section further below are the tool's
original suggestion and are **no longer what's implemented** — kept for history.

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#1C1917` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#44403C` | `--color-secondary` |
| Accent/CTA | `#A16207` | `--color-accent` |
| Background | `#FAFAF9` | `--color-background` |
| Foreground | `#0C0A09` | `--color-foreground` |
| Muted | `#E8ECF0` | `--color-muted` |
| Border | `#D6D3D1` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| Ring | `#1C1917` | `--color-ring` |

**Color Notes:** Premium dark + gold accent [Accent adjusted from #CA8A04 for WCAG 3:1]

### Typography

- **Heading Font:** Cormorant
- **Body Font:** Montserrat
- **Mood:** luxury, high-end, fashion, elegant, refined, premium
- **Google Fonts:** [Cormorant + Montserrat](https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #A16207;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #1C1917;
  border: 2px solid #1C1917;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #FAFAF9;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #1C1917;
  outline: none;
  box-shadow: 0 0 0 3px #1C191720;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Liquid Glass

**Keywords:** Flowing glass, morphing, smooth transitions, fluid effects, translucent, animated blur, iridescent, chromatic aberration

**Best For:** Premium SaaS, high-end e-commerce, creative platforms, branding experiences, luxury portfolios

**Key Effects:** Morphing elements (SVG/CSS), fluid animations (400-600ms curves), dynamic blur (backdrop-filter), color transitions

### Page Pattern

**Pattern Name:** Feature-Rich Showcase

- **CTA Placement:** Above fold
- **Section Order:** Hero > Features > CTA

---

## Anti-Patterns (Do NOT Use)

- ❌ Vibrant & Block-based
- ❌ Playful colors

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
