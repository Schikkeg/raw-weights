# RawWeights Design Guide
### Built on Google Stitch / Material Design 3

> **New here?** Start with the "What is Stitch?" section — it explains the whole system in plain English before diving into token names.

---

## What is Google Stitch?

Google Stitch is Google's design system for their **marketing and content websites** (think google.com/about, developers.google.com — not Gmail or Maps). It's the visual language that makes those sites feel unmistakably "Google clean" while still being flexible.

Stitch is built on top of **Material Design 3 (MD3)** — Google's newer design framework for apps. Think of it this way:

```
Material Design 3 (apps: Android, Flutter, web apps)
         ↑ Stitch extends this for content websites ↑
              (rawweights.com uses this layer)
```

**Why use it?** Because it gives you a structured vocabulary. Instead of writing `color: #f97316` everywhere, you write `color: var(--md-sys-color-primary)`. When you want to change the orange to something else someday, you change **one line**, and the whole site updates.

---

## How the Token System Works

This site uses a **two-layer system**. Think of it like a translation chain:

```
LAYER 1 — Stitch/MD3 Semantic Tokens    (the "meaning" layer)
    --md-sys-color-primary = #f97316     ← "primary action color is orange"

         ↓  feeds into  ↓

LAYER 2 — RawWeights Brand Aliases      (the "name" layer)
    --rw-orange = var(--md-sys-color-primary)  ← "orange = whatever primary is"

         ↓  used by  ↓

Component CSS & HTML
    background: var(--rw-orange)         ← existing pages keep working
    background: var(--md-sys-color-primary)  ← new pages use Layer 1 directly
```

**Key insight:** When you switch to dark mode, only Layer 1 changes — every `--rw-*` alias and every component automatically updates because they all flow through Layer 1.

---

## The Color Token Cheat Sheet

These are the tokens you'll use 90% of the time. Each one has a **role** (what it means) and a **value** (what it looks like).

### Primary — Orange actions, buttons, links

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--md-sys-color-primary` | Main action color | `#f97316` | `#fb923c` |
| `--md-sys-color-on-primary` | Text/icon ON a primary button | `#ffffff` | `#431407` |
| `--md-sys-color-primary-container` | Soft orange background (callout boxes) | `#fff7ed` | `rgba(249,115,22,.15)` |
| `--md-sys-color-on-primary-container` | Text inside that container | `#7c2d12` | `#fed7aa` |

**When to use:** Buttons, active states, links, highlights, tags, progress bars.

### Secondary — Indigo supporting color

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--md-sys-color-secondary` | Supporting interactive color | `#6366f1` | `#a5b4fc` |
| `--md-sys-color-on-secondary` | Text ON secondary elements | `#ffffff` | `#1e1b4b` |
| `--md-sys-color-secondary-container` | Soft indigo background | `#eef2ff` | `rgba(99,102,241,.15)` |
| `--md-sys-color-on-secondary-container` | Text inside that container | `#312e81` | `#c7d2fe` |

**When to use:** Chips/badges, secondary buttons, category tags, code syntax accent.

### Tertiary — Cyan accent

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--md-sys-color-tertiary` | Accent highlight | `#06b6d4` | `#67e8f9` |
| `--md-sys-color-tertiary-container` | Soft cyan background | `#ecfeff` | `rgba(6,182,212,.15)` |

**When to use:** Stats highlights, annotation callouts, decorative accents.

### Surface — Backgrounds and cards

This is where most page chrome lives. MD3 defines **5 levels** of surface depth:

| Token | Role | Light value | Use it for… |
|-------|------|-------------|-------------|
| `--md-sys-color-background` | Outermost page wash | `#f8fafc` | `<body>` background |
| `--md-sys-color-surface` | Default card/panel | `#ffffff` | Cards, modals, nav |
| `--md-sys-color-surface-container-low` | Slightly tinted | `#f8fafc` | Sidebar, alternate rows |
| `--md-sys-color-surface-container` | Mid-level container | `#f1f5f9` | Code blocks, input bg |
| `--md-sys-color-surface-container-high` | Strong container | `#e2e8f0` | Hover states, dividers |
| `--md-sys-color-surface-container-highest` | Strongest container | `#cbd5e1` | Skeleton loaders |

**The rule of thumb:** Background → Surface → Container Low → Container → Container High. Each level sits "above" the one before it visually.

### On-Surface — Text colors

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--md-sys-color-on-surface` | Primary text | `#0f172a` | `#f0f4ff` |
| `--md-sys-color-on-surface-variant` | Secondary/muted text | `#475569` | `#94a3b8` |

### Outline — Borders and dividers

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--md-sys-color-outline` | Standard border | `#e2e8f0` | `#1e293b` |
| `--md-sys-color-outline-variant` | Strong border | `#cbd5e1` | `#334155` |

### Error — Validation and warnings

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--md-sys-color-error` | Error color | `#ef4444` | `#fca5a5` |
| `--md-sys-color-error-container` | Error background | `#fee2e2` | `rgba(239,68,68,.15)` |
| `--md-sys-color-on-error-container` | Text in error container | `#991b1b` | `#fecaca` |

---

## Typography Scale

Instead of picking font sizes by feel, use the MD3 type scale. Each role has a name that describes its **visual hierarchy**.

```
Display Large   → 57px / Hero page titles (only use once per page)
Display Medium  → 45px / Section hero headlines
Display Small   → 36px / Large card headings
Headline Large  → 32px / Page section headings (h1 equivalent)
Headline Medium → 28px / Sub-section headings (h2)
Headline Small  → 24px / Card headings, sidebar titles (h3)
Title Large     → 22px / Bold labels, card subheadings
Title Medium    → 16px / 500-weight body text, nav items
Title Small     → 14px / Small labels, meta text
Body Large      → 16px / Main reading body text
Body Medium     → 14px / Secondary body, descriptions
Body Small      → 12px / Captions, footnotes
Label Large     → 14px / Button text, tab labels (500-weight)
Label Medium    → 12px / Chips, tags, small buttons
Label Small     → 11px / Badges, tiny metadata
```

**In CSS:** Use the token directly:
```css
.hero-title {
  font-size: var(--md-sys-typescale-display-large-size);        /* 57px */
  line-height: var(--md-sys-typescale-display-large-line-height); /* 64px */
  font-weight: var(--md-sys-typescale-display-large-weight);    /* 400 */
}
```

Or use the existing RawWeights shorthand (these map through):
```css
/* Existing --rw-font-display / --rw-font-body still work fine */
font-family: var(--rw-font-display);   /* Space Grotesk */
font-family: var(--rw-font-body);      /* Inter */
```

---

## Spacing Scale

Built on an **8-point grid** — every spacing value is a multiple of 8px.

| Token | Value | Use for… |
|-------|-------|---------|
| `--md-sys-spacing-1` | `0.5rem` (8px) | Tiny gaps (icon margins, tight padding) |
| `--md-sys-spacing-2` | `1rem` (16px) | Standard component padding |
| `--md-sys-spacing-3` | `1.5rem` (24px) | Section internal padding |
| `--md-sys-spacing-4` | `2rem` (32px) | Card padding, between cards |
| `--md-sys-spacing-5` | `2.5rem` (40px) | Section top/bottom padding |
| `--md-sys-spacing-6` | `3rem` (48px) | Large section spacing |
| `--md-sys-spacing-8` | `4rem` (64px) | Major section breaks |
| `--md-sys-spacing-10` | `5rem` (80px) | Hero section padding |
| `--md-sys-spacing-12` | `6rem` (96px) | Page-level spacing |

---

## Shape Scale (Border Radius)

| Token | Value | Use for… |
|-------|-------|---------|
| `--md-sys-shape-corner-extra-small` | `4px` | Input fields, small chips |
| `--md-sys-shape-corner-small` | `8px` | Buttons, standard cards |
| `--md-sys-shape-corner-medium` | `12px` | Dropdowns, notification cards |
| `--md-sys-shape-corner-large` | `16px` | Large cards, modals |
| `--md-sys-shape-corner-extra-large` | `28px` | Hero cards, feature panels |
| `--md-sys-shape-corner-full` | `9999px` | Pills, badges, avatars |

---

## Elevation (Box Shadows)

MD3 defines 5 levels of elevation (how "lifted" a surface looks):

| Token | Use for… |
|-------|---------|
| `--md-sys-elevation-1` | Default cards (subtle) |
| `--md-sys-elevation-2` | Hovered cards |
| `--md-sys-elevation-3` | Active cards, menus |
| `--md-sys-elevation-4` | Sticky nav, floating buttons |
| `--md-sys-elevation-5` | Modals, dialogs |

---

## Practical Examples

### Example 1 — A new card component

```html
<div class="my-card">
  <h3>Card Title</h3>
  <p>Card body text goes here.</p>
  <a href="#">Learn more →</a>
</div>
```

```css
.my-card {
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
  border: 1px solid var(--md-sys-color-outline);
  border-radius: var(--md-sys-shape-corner-large);  /* 16px */
  padding: var(--md-sys-spacing-4);                 /* 32px */
  box-shadow: var(--md-sys-elevation-1);
}
.my-card h3 {
  font-size: var(--md-sys-typescale-title-large-size);   /* 22px */
  color: var(--md-sys-color-on-surface);
}
.my-card a {
  color: var(--md-sys-color-primary);                /* orange */
}
.my-card:hover {
  box-shadow: var(--md-sys-elevation-2);
  background: var(--md-sys-color-surface-container-low);
}
```

**This card automatically looks correct in dark mode** — no separate dark-mode override needed.

### Example 2 — A callout / alert box

```html
<div class="callout callout-primary">
  Key insight: Always prefer semantic tokens over raw hex values.
</div>
```

```css
.callout-primary {
  background: var(--md-sys-color-primary-container);     /* soft orange */
  color: var(--md-sys-color-on-primary-container);       /* dark amber text */
  border-left: 3px solid var(--md-sys-color-primary);    /* orange accent */
  border-radius: var(--md-sys-shape-corner-small);
  padding: var(--md-sys-spacing-3);
}
/* Dark mode: automatically uses the dark values of those tokens. Done. */
```

### Example 3 — A tag / badge

```css
.tag {
  background: var(--md-sys-color-secondary-container);   /* soft indigo */
  color: var(--md-sys-color-on-secondary-container);     /* dark indigo text */
  border-radius: var(--md-sys-shape-corner-full);        /* pill shape */
  padding: 0.2rem var(--md-sys-spacing-2);
  font-size: var(--md-sys-typescale-label-medium-size);  /* 12px */
  font-weight: var(--md-sys-typescale-label-medium-weight); /* 500 */
}
```

---

## Adding a New Page

1. **Use the right template** from `/templates/` (`blog-post.html`, `guide.html`, `tool.html`, `article.html`)
2. **Link brand.css** in `<head>`:
   ```html
   <link rel="stylesheet" href="/includes/brand.css">
   ```
3. **Load the nav and footer** before `</body>`:
   ```html
   <script src="/includes/rw-nav.js"></script>
   <script src="/includes/rw-footer.js"></script>
   ```
4. **Use Stitch tokens** in any inline `<style>` or page CSS — not raw hex values
5. **Run the markdown generator** after creating the page:
   ```bash
   node _private/scripts/generate-markdown.js your-new-page.html
   ```
6. **Update the sitemap** to include the new page:
   ```bash
   python _private/scripts/generate-sitemap.py   # incremental — adds new page only
   ```

---

## Quick Token Decision Tree

```
What am I styling?
│
├── A button / link / active element?      → --md-sys-color-primary
├── A secondary button / tag?             → --md-sys-color-secondary
├── An accent stat / highlight?           → --md-sys-color-tertiary
│
├── Page body background?                 → --md-sys-color-background
├── A card / panel?                       → --md-sys-color-surface
├── A slightly different background?      → --md-sys-color-surface-container-low
├── A code block / input background?      → --md-sys-color-surface-container
│
├── Primary body text?                    → --md-sys-color-on-surface
├── Caption / muted text?                 → --md-sys-color-on-surface-variant
│
├── A border / divider?                   → --md-sys-color-outline
├── A strong border?                      → --md-sys-color-outline-variant
│
├── An error / warning?                   → --md-sys-color-error
│
└── Using existing RawWeights class?
    ├── --rw-orange           → same as --md-sys-color-primary  ✓
    ├── --rw-indigo           → same as --md-sys-color-secondary ✓
    ├── --rw-bg / --rw-card   → same as surface tokens ✓
    └── All --rw-* still work fine — no migration needed for existing pages
```

---

## Theming / Re-branding

To completely change the site's color palette, **only edit Layer 1** in `includes/brand.css` — the section labeled `LAYER 1 — STITCH / MATERIAL DESIGN 3 SEMANTIC TOKENS`.

Change the 6 key values:
```css
--md-sys-color-primary:   /* your new primary color */
--md-sys-color-secondary: /* your new secondary */
--md-sys-color-tertiary:  /* your new accent */
/* + their dark-mode variants below */
```

Everything else — all `--rw-*` aliases, all component CSS, all pages — inherits the new values automatically.

---

## FAQ

**Q: Should I use `--md-sys-color-*` or `--rw-*` in new pages?**
A: Use `--md-sys-color-*` for new components — it's more expressive and directly compatible with Stitch tools. Use `--rw-*` when touching existing components to avoid unnecessary churn.

**Q: Can I use raw hex values in page-level `<style>` tags?**
A: Avoid it for colors that exist in the token system. It's fine for one-off decorative values (specific glow effects, gradient stops) that have no semantic meaning.

**Q: What about fonts — should I use `--md-sys-typescale-*` or just write `font-size: 1rem`?**
A: For consistency, use the typescale tokens in new components. For small tweaks to existing pages, `font-size: 1rem` is fine.

**Q: Is this actually "Google Stitch" or just similar?**
A: It's Stitch-**compatible** — using the same MD3 token naming convention that Stitch is built on. The token names (`--md-sys-color-primary`, etc.) are identical to what Stitch uses, so any Stitch component or Figma plugin that exports MD3 tokens will map directly to this system.
