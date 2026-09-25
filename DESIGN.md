---
name: Beyond the Algorithm
description: A research game about trade-offs of Responsible AI
colors:
  paper: "#f5efec"
  paper-accent: "#f9b27b"
  paper-header: "#ecc2a3"
  domain-bg: "#ffe8c7"
  domain-accent: "#f3cc92"
  domain-text: "#edb35c"
  domain-header: "#ffdba6"
  domain-tab-text: "#7a5620"
  tech-bg: "#d0ebeb"
  tech-accent: "#8fc7cc"
  tech-text: "#6aa9af"
  tech-header: "#abdcd8"
  tech-tab-text: "#305559"
  deep: "#3f6184"
  deep-mid: "#5c7fa3"
  deep-light: "#7fa8c9"
  wedge-warm: "#f7e6cf"
  wedge-cool: "#b3ddd9"
  lid-paper: "#f8f4ef"
  lid-disc: "#4e7192"
  lid-plate: "#f0c9ad"
  lid-ink: "#22405a"
  lid-light: "#9cc0da"
  ink: "#081912"
  rule: "#08191214"
typography:
  display:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.8rem, 4vw, 2.9rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.008em"
  wordmark:
    fontFamily: "Montserrat, 'Source Sans 3', sans-serif"
    fontWeight: 800
    letterSpacing: "-0.005em"
  body:
    fontFamily: "'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.15
  label:
    fontFamily: "'Source Code Pro', ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.1em"
rounded:
  sm: "8px"
  lg: "16px"
  pill: "999px"
spacing:
  page-max: "1080px"
  gutter: "2.5rem"
  section-block: "clamp(2.5rem, 6vw, 4.5rem)"
  gap: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.deep}"
    textColor: "#f7f2ee"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.2rem"
  button-primary-hover:
    backgroundColor: "{colors.deep-mid}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.2rem"
---

# Design System: Beyond the Algorithm

## Overview

**Creative North Star: "The Box Lid, Opened"**

This site is a faithful digital redraw of the physical game's own box lid — the same disc, the same peach-and-teal fields, the same wordmark plate — carried forward onto a warm-paper page. Every color, shape and label in the interface either comes directly off the printed object (the lid artwork, the mono type used on the boards, the two team colors) or is a paper-and-ink extension of it (the body serif, the hairline rules, the soft card shadows). Nothing is invented to look "designed"; the object was already designed, and the job is to open it out into a page.

The system is deliberately quiet where the game itself is not the subject: long-form prose reads in a plain sans body face at generous measure, and the mono label face is reserved for small functional tags (section labels, buttons, team pills) exactly as the boards use it for zone titles. The one place the system allows itself full-size drama is the hero, where the lid art is reproduced at scale as the literal first thing a visitor sees.

**Key Characteristics:**
- Two named team palettes (Domain warm amber, Tech cool teal) recur everywhere a choice needs to be attributed to a side.
- A serif display face (Fraunces, tuned soft and calm) for section headings and the storyline hook; a distinct all-caps wordmark face (Montserrat) reserved only for the "Beyond the Algorithm" logotype.
- Flat by default; a shadow only ever appears as a hover response, never as a resting decoration.
- Small mono labels dress every section start and every piece of small functional UI, echoing the boards' own printed strip labels.

## Colors

Two literal team palettes carry the game's own color logic; a warm paper ground and a cover-blue accent carry everything else.

### Primary
- **Cover Blue** (`#3f6184` / `--deep`): the accent that reads as "the brand" outside the team split — primary buttons, headings, active states, the hero disc.

### Secondary
- **Domain Amber** (`#ffe8c7` bg / `#7a5620` text / `--domain-*`): the Domain team's side — inspectors and field expertise. Used for that team's card, tab, and any UI attributed to their choices.
- **Tech Teal** (`#d0ebeb` bg / `#305559` text / `--tech-*`): the Tech team's side — data scientists and model expertise. Mirrors Domain Amber's structure with the cool half of the box palette.

### Neutral
- **Paper** (`#f5efec` / `--paper`): the page ground everywhere outside the hero.
- **Lid Paper** (`#f8f4ef` / `--lid-paper`): the hero's own slightly warmer ground, matching the printed lid's stock.
- **Ink** (`#081912` / `--ink`): body text and default UI ink; used at full, `-soft` (70%), and `-faint` (35%) opacity steps rather than separate grey tokens.
- **Rule** (`#08191214` / `--rule`): the hairline divider between sections and bands.

### Named Rules
**The One Ground Rule.** Every surface is either Paper, Lid Paper, or one of the two team backgrounds — never an invented neutral grey. If a new component needs a background, it picks one of these four.

**The Hover-Only Shadow Rule.** No shadow at rest. `--shadow-card` and `--shadow-lift` exist purely as state responses to hover/interaction.

## Typography

**Display Font:** Fraunces (with Georgia, "Times New Roman", serif)
**Body Font:** Source Sans 3 (with system sans fallback)
**Label/Mono Font:** Source Code Pro (with system mono fallback)
**Wordmark Font:** Montserrat (the logotype only — never used for running text)

**Character:** Fraunces is dialed down from its display personality — mid optical size, high SOFT axis — so headings read as a calm, academic voice rather than an editorial poster; Source Sans 3 stays completely plain underneath it so the display face is the only place typographic personality shows. Source Code Pro's monospace rhythm marks anything functional (labels, buttons, tags) as belonging to the game-object layer rather than the prose layer.

### Hierarchy
- **Display** (600, `clamp(1.8rem, 4vw, 2.9rem)`, 1.02): section headings (`h2`).
- **Wordmark** (800, `clamp(1.9rem, 7vw, 5rem)`, 0.96, uppercase): the "Beyond the Algorithm" logotype only, set in Montserrat — deliberately not the display face, since it is a logo and allowed to be its own thing.
- **Headline** (600, 1.25rem): subsection headings (`h3`).
- **Body** (400, 1rem, 1.15–1.45 depending on measure): running prose; long-form paragraphs cap at `64ch`, short captioned text narrower.
- **Label** (400, 0.75rem, 0.1em tracking, uppercase): section-start pills, team tabs, run-track counts — always mono, always a small colored chip.

### Named Rules
**The Logo Is Not a Heading Rule.** Montserrat appears nowhere except the wordmark. Every actual heading, however large, is Fraunces.

## Layout

A single centered column (`--page: 1080px` max, `min(100% - 2.5rem, var(--page))`) holds every section; a narrower `720px` variant exists for dense prose blocks. Sections stack as full-width "bands" with `clamp(2.5rem, 6vw, 4.5rem)` vertical padding and a hairline top rule, alternating a plain-paper band with a faintly tinted one (`--band--tint`) to separate rhythm without adding borders. Inside a band, a "spread" is the recurring two-column pattern once viewport width allows it (≥820px): a narrow sticky label gutter on the left, full content on the right; below that width the label sits inline above its content. The hero is the one full-bleed exception, scroll-driven and independent of the band rhythm.

## Elevation & Depth

Flat by default, lift on interaction. Nothing on the page carries a resting shadow; cards, the lid artwork, and buttons all sit flush with their background until touched. Cards and person portraits translate up 3px and pick up `--shadow-lift` on hover; primary buttons pick up the same shadow on hover with no movement. This keeps the page reading as printed matter at rest and only "lifts off the table" in direct response to the visitor.

### Shadow Vocabulary
- **Card** (`0 1px 2px #0819120d, 0 8px 24px -14px #08191233`): the resting-adjacent state used the instant something needs to look like an object (never at true rest).
- **Lift** (`0 2px 4px #08191212, 0 18px 40px -20px #08191238`): the hover state for cards, portraits, and primary buttons.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows exist only as a response to hover.

## Shapes

Two radius steps only: `8px` (`--radius`) for buttons and small controls, `16px` (`--radius-lg`) for cards. Pills (`999px`) are reserved for label chips, the nav's Contact CTA, and gallery dots — anything that reads as a small tag rather than a container. Borders are hairline and low-opacity (`#08191212`–`#08191233`), never a heavy stroke; the printed box's own line weight (the lid's SVG outline) is the heaviest line on the page.

## Components

### Buttons
- **Shape:** 8px radius, mono label type, `0.75rem 1.2rem` padding.
- **Primary:** Cover Blue background, off-white text (`#f7f2ee`); hover moves to `--deep-mid`, no shadow at rest, shadow only on hover.
- **Ghost:** transparent background, hairline ink border, hover fills to a translucent white.

### Chips / Labels
- **Style:** mono, uppercase, 0.1em tracking, small colored pill background (team color or `--wedge-warm`), no border.
- **State:** static — these are content labels, not interactive filters.

### Cards
- **Corner Style:** 16px radius.
- **Background:** off-white (`#fffdfb`) for neutral cards; team background color for Domain/Tech cards.
- **Shadow Strategy:** flat at rest, `--shadow-lift` + 3px translate on hover.
- **Border:** hairline `#08191212`.
- **Internal Padding:** `1.5rem`.

### Navigation
- Plain text links at body weight; the active page gets a translucent white background chip rather than an underline. Contact is pulled out as a pill CTA with a hairline border that inverts to solid ink on hover. Mobile collapses to a burger icon that swaps to an X on open — no "Menu" text label.

## Do's and Don'ts

### Do:
- **Do** keep every UI color inside the four backgrounds named in the One Ground Rule (Paper, Lid Paper, Domain, Tech) plus the Cover Blue accent — no invented greys or a fifth accent hue.
- **Do** reserve Montserrat strictly for the wordmark; every heading, however large, is Fraunces.
- **Do** keep shadows hover-only; a resting shadow on any surface is a system violation.
- **Do** set functional/label text in the mono face at `0.75rem` minimum with uppercase + tracking, matching the printed boards' strip labels.

### Don't:
- **Don't** introduce a third team-style palette; Domain and Tech are the only two, and any new "side" reuses Cover Blue instead of inventing a color.
- **Don't** use a drop shadow, gradient text, or decorative border-radius trend the printed object doesn't have — the lid art is the single source of visual authority.
- **Don't** add scroll-hijacking or heavy motion outside the hero; the rest of the page is plain, static, flat-scrolling prose by design.
