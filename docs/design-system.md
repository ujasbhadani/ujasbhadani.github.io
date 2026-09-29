## ujasbhadani.com — design system (T1)

Light-first, editorial, professional. Reads credible to audit partners and CISOs, not
like a generated landing page. Companion file: `src/styles/tokens.css` (implements every
token below; import it once, globally, before any component CSS).

This is a **separate design language from Crescive's dark "Signal Room" theme** — no
mint accent, no `#0b1010`, no `cs-*` classes, no aurora backgrounds. Nothing here should
be copied back into the Crescive repo, and nothing from Crescive should leak in here.

---

### 1. Typefaces

| Role | Family | Weights used | Why |
|---|---|---|---|
| Display (h1–h3, nav wordmark, eyebrows) | **Archivo** | 600, 700, 800 | Grotesk with real character — squared terminals, a slightly assertive width — without tipping into a display/decorative face. Reads confident on a case-study title next to an audit firm's name. |
| Body (paragraphs, nav links, list items, cards) | **Public Sans** | 400, 500, 600 | A plain humanist sans (built for the U.S. Web Design System, so it's built to be legible and boring in the right way) at long paragraph lengths — About, case studies, POV pieces. |
| Mono (control IDs, years, metrics, eyebrow labels, workpaper references) | **IBM Plex Mono** | 400, 500, 600 | The one deliberately "workpaper" texture on the page — control references, sample sizes, GPA, dates once supplied. Plex reads technical/audit-adjacent without being a coding-blog cliché. |

None of Inter, Space Grotesk, Roboto, Open Sans, Raleway or Poppins are used anywhere.

**`<head>` tags:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

**Fallback stacks** (declared as CSS custom properties, see tokens.css):

```
--font-display: "Archivo", "Arial Narrow", Arial, sans-serif;
--font-body:    "Public Sans", system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
--font-mono:    "IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
```

---

### 2. Palette

One accent family (deep teal), used for links, section markers (eyebrow labels, the
lifecycle diagram's connector and step numbers) and focus rings. Semantic green is
reserved for outcome callouts only (e.g. "no material weakness," "35% faster") — it
never doubles as the interactive accent, so a reader never has to guess whether green
means "click this" or "this is the result."

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--bg` | `#F2F5F4` | `#0E1513` | Page canvas |
| `--surface` | `#FFFFFF` | `#141C1A` | Cards, rail, panels |
| `--surface-raised` | `#EAF1EF` | `#1B2623` | Elevated panel content — open `<details>` body, hero card, expanded skills row |
| `--ink` | `#14201D` | `#E7EDEB` | Primary text |
| `--ink-soft` | `#3F4C48` | `#A9B6B2` | Secondary text — sub-lines, metadata, footer |
| `--line` | `#D3DBD8` | `#26332F` | Hairline borders/dividers (decorative structure, not a text pair) |
| `--accent` | `#0B6E64` | `#4FD6C3` | Links, eyebrow labels, active nav item, lifecycle connector/step numbers, focus ring |
| `--accent-on-accent` | `#F5FBFA` | `#062420` | Text/icon sitting on a solid `--accent` fill (e.g. a filled button, if one is ever needed) |
| `--accent-soft` | `#DCEEEA` | `#12312C` | Soft badge/tag fill (e.g. "pilot" project tag) — always paired with `--ink` text, never `--accent-on-accent` |
| `--ok` | `#1C7A42` | `#4ED07F` | Outcome callouts only — "no material weakness," lift percentages, remediation closed |
| `--focus` | `--accent` (same value) | `--accent` (same value) | Focus-visible ring |

**Contrast, computed (WCAG relative-luminance formula), both themes:**

| Pair | Ratio | Floor |
|---|---|---|
| Light `--ink` on `--bg` | 15.26:1 | 4.5:1 body text |
| Light `--ink-soft` on `--bg` | 8.19:1 | 4.5:1 body text |
| Light `--ink` on `--surface` | 16.75:1 | 4.5:1 |
| Light `--ink-soft` on `--surface` | 8.98:1 | 4.5:1 |
| Light `--accent` on `--bg` (link text) | 5.58:1 | 4.5:1 |
| Light `--accent` on `--surface` (link text) | 6.12:1 | 4.5:1 |
| Light `--accent-on-accent` on `--accent` fill | 5.85:1 | 4.5:1 |
| Light `--ink` on `--accent-soft` (tag text) | 13.92:1 | 4.5:1 |
| Light `--ok` on `--bg` | 4.89:1 | 4.5:1 |
| Light `--ok` on `--surface` | 5.37:1 | 4.5:1 |
| Light `--focus` ring vs `--bg`/`--surface` (non-text UI) | 5.58:1 / 6.12:1 | 3:1 UI component |
| Dark `--ink` on `--bg` | 15.60:1 | 4.5:1 |
| Dark `--ink-soft` on `--bg` | 8.83:1 | 4.5:1 |
| Dark `--ink` on `--surface` | 14.63:1 | 4.5:1 |
| Dark `--ink-soft` on `--surface` | 8.28:1 | 4.5:1 |
| Dark `--accent` on `--bg` (link text) | 10.34:1 | 4.5:1 |
| Dark `--accent` on `--surface` (link text) | 9.70:1 | 4.5:1 |
| Dark `--accent-on-accent` on `--accent` fill | 9.16:1 | 4.5:1 |
| Dark `--ink` on `--accent-soft` (tag text) | 11.80:1 | 4.5:1 |
| Dark `--ok` on `--bg` | 9.38:1 | 4.5:1 |
| Dark `--ok` on `--surface` | 8.80:1 | 4.5:1 |

Every one of these clears AA with real margin (most clear AAA's 7:1 too), so there's
headroom if frontend-dev needs a slightly heavier or lighter tint of any surface without
re-checking from scratch. `--line` is a decorative hairline, not a text pair, so it is
intentionally low-contrast (1.29:1 light / 1.41:1 dark) — never place text at that
contrast; it exists only to be a barely-there divider.

---

### 3. Spacing, radius, layout width, breakpoint

**Spacing scale** (4px base, exposed as both px comment and rem custom property):

```
--space-1: 0.25rem;  /* 4px  — tight inline gaps (icon-to-label) */
--space-2: 0.5rem;   /* 8px  — chip/tag padding */
--space-3: 0.75rem;  /* 12px — small stack gaps */
--space-4: 1rem;     /* 16px — default stack gap, card padding (mobile) */
--space-5: 1.5rem;   /* 24px — card padding (desktop), paragraph gaps */
--space-6: 2rem;     /* 32px — section-internal gaps */
--space-7: 3rem;     /* 48px — between major blocks inside a section */
--space-8: 4rem;     /* 64px — between sections (mobile) */
--space-9: 6rem;     /* 96px — between sections (desktop) */
```

**Radius scale** — restrained on purpose (nothing above 14px anywhere, so it never
reads as the generic oversized-rounding look):

```
--radius-sm: 6px;    /* buttons, inline chips, the copy button */
--radius-md: 10px;   /* cards: project card, quote card, award tile, skills group box */
--radius-lg: 14px;   /* the hero card and any expanded/raised panel */
--radius-pill: 999px;/* small tag chips only ("pilot") — never a whole card */
```

**Content width:** running text (About paragraphs, case-study body, POV pieces) is
capped at `--content-max: 42rem` (672px) — inside the target 65–72ch range at the body
type size below. The overall page container (rail + content + right gutter) caps at
`--page-max: 1120px` and centers past that.

**Breakpoint:** the left rail collapses to a top bar at **900px**. Reasoning: the rail
(260px) + a comfortable content column (672px) + gutters need roughly 1040px to breathe;
below that the rail starts crowding the text column before the text column itself needs
to shrink, so the rail is the first thing to give way. This is a single breakpoint —
don't add a second tablet-only tier; the top bar layout should already work from 900px
down to a small phone.

**Top bar (below 900px):** fixed to the top, 56px tall, `--surface` background with a
`--line` bottom hairline. Contents: wordmark/name (left), a hamburger menu button
(right, 44×44px hit target, `aria-expanded`/`aria-controls` wired to the nav panel). The
panel it opens is a full-width vertical list below the bar (not a horizontal scrolling
tab strip — a horizontally-scrolling nav is an easy trap on 11 items and reads as
broken, not intentional). No horizontal scroll anywhere on the page at any breakpoint.

---

### 4. Type scale

| Style | Size (desktop) | Size (≤900px) | Line-height | Weight/family |
|---|---|---|---|---|
| h1 (hero name) | 2.75rem (44px) | 2.125rem (34px) | 1.1 | Archivo 800 |
| h2 (section header) | 2rem (32px) | 1.625rem (26px) | 1.2 | Archivo 700 |
| h3 (role title, card title, step name) | 1.375rem (22px) | same | 1.3 | Archivo 600/700 |
| body | 1.0625rem (17px) | same | 1.65 | Public Sans 400 |
| small (metadata, footer, sub-lines) | 0.875rem (14px) | same | 1.5 | Public Sans 400/500 |
| mono label (eyebrow, control ID, tag) | 0.75rem (12px) | same | 1.4 | IBM Plex Mono 500, uppercase, `letter-spacing: 0.08em` |

- `h1, h2, h3 { text-wrap: balance; }` so headings never break to an orphaned single
  word.
- Any run of aligned digits — GPA, percentages, sample sizes, years once supplied —
  gets `font-variant-numeric: tabular-nums` (utility class `.tab-nums`) so the RCM
  sampling numbers and the two GPAs line up vertically where they appear in a list.

---

### 5. Motion

The only thing that animates on a loop is the hero's rotating role phrase. Everything
else is a hover/focus state transition, never ambient.

- **Hero phrase rotation:** crossfade + 4px upward slide, 380ms ease-out in / 260ms
  ease-in out, each phrase holds 2600ms before advancing, loops through the four
  phrases and repeats. Implemented as a JS interval swapping text content (not a CSS
  `@keyframes` loop), because it has to stop entirely under reduced motion, not just
  visually pause.
- **Hover/focus transitions** (links, buttons, cards, nav items): `background-color`,
  `border-color`, `color` transition at 150ms ease-out. Cards may add a 1px
  `translateY(-1px)` on hover — no shadow growth, no scale.
- **`prefers-reduced-motion: reduce`:** the hero shows only the first phrase
  (`SOX 404(b) ITGC lead`), statically, and the JS interval never starts. Hover/focus
  color transitions stay (they're not the kind of motion this setting targets) but any
  `translateY` on card hover is dropped — color change only.

---

### 6. Dark theme rules

- Every color in this system is referenced through a custom property — no component
  CSS hardcodes a hex value.
- `:root` carries the light values and `color-scheme: light`.
- Dark values are redefined **only** inside `@media (prefers-color-scheme: dark)`,
  re-declaring the same custom property names on `:root`, plus `color-scheme: dark`.
- Inside that same query, `body { background-color: var(--bg); color: var(--ink); }`
  is restated explicitly (not left to inherit from a rule earlier in the cascade) so
  there's no flash-of-wrong-background risk in engines that paint before the full
  cascade resolves.
- There is no separate dark stylesheet and no `[data-theme]` attribute toggle in this
  build — FD5=A is "follows the visitor's OS setting," not a manual switch. If a manual
  override is added later, it layers a `[data-theme="dark"]` attribute selector at the
  same specificity, but that's out of scope for T1.

---

### 7. Components

**Left rail (desktop, ≥900px).** Fixed, 260px wide, full viewport height,
`--surface` background, `--line` right-edge hairline. Contents top-to-bottom: headshot
(64px circle) + name (h1-weight but rendered at body-adjacent size here, ~1.25rem) +
identity line in `--ink-soft` small text, then the 11-item nav as a vertical list
(mono-label-sized, `--ink-soft` default, `--accent` + a 3px left `--accent` bar on the
active/current-section item — set via scroll-spy `aria-current="location"`), then
social links (LinkedIn, GitHub, email) pinned near the bottom. Content column sits in
the remaining width with `margin-left: 260px` plus a gutter.

**Top bar (mobile, <900px).** See breakpoint section above.

**Hero.** Two-column on desktop (headshot left in a `--radius-lg` card with a
`--line` border, text right), single column stacked (photo above text) on phones. h1
name, rotating role phrase directly under it in `--accent` mono-label-style text (not
h2 — it's a tagline, not a heading), sub-line in body text below at `--ink-soft`.

**Section header.** Eyebrow (mono label, uppercase, `--accent`, e.g. "CASE STUDY ·
XPONENTIAL FITNESS, INC.") directly above the `h2`. Consistent across every section
and every case-study page.

**Experience timeline entry.** A vertical rule in `--line` runs down the left of the
whole timeline; each entry has a small filled `--accent` dot on the rule at its top.
Entry: h3 (title), a `--ink-soft` small line (org · location, and the sub-line like
"SOX 404(b) ITGC program lead · external auditor: Deloitte" where given), then bullets.
Where a role has groups (3.2 has two), render each group label as a mono-label
sub-heading above its own bullet list, both groups under the one role header — do not
repeat the role header per group.

**Lifecycle diagram (seven SOX steps).** Semantically an `<ol>` of seven `<li>`s (each
with a heading, one sentence, and an artifact label in mono/small text) — a screen
reader gets the full content in order regardless of the visual layout. Visually:
- **Desktop:** CSS Grid, 7 equal columns, one row. A single inline `<svg
  aria-hidden="true">` sits behind the row as a decorative connector — one `<line>` in
  `--accent` at 2px running the full width — with each step's numbered circle (a small
  `--accent`-filled circle with the ink-soft-on-accent number) sitting on top of the
  line at each grid column's center.
- **Phone:** CSS Grid collapses to 1 column; the same SVG connector rotates to a
  vertical line running down the left edge of the stacked steps instead of across.
- No loading/error state — this is static markup shipped in the initial HTML, same as
  every other content section.

**Expandable panel** (research abstracts, AI-in-GRC point-of-view pieces). Native
`<details>`/`<summary>` — no custom disclosure widget, no JS required for the open/close
mechanic itself (Jakob's Law: this is exactly the disclosure triangle pattern browsers
and assistive tech already know). Summary row: title/venue/year (research) or the POV
title (AI in GRC), `--ink` text, with a small chevron that rotates 90° on `[open]`
(CSS only, `transition: transform 150ms`). Expanded body renders on `--surface-raised`
with `--space-4` padding and a top `--line` hairline separating it from the summary
row. Default state: **closed** — this is the progressive-disclosure move for both
sections (what it's about first, full text on demand).

**Project card.** `--surface` fill, `--line` 1px border, `--radius-md`. Title (h3),
one outcome line (body, `--ink-soft`), optional tag (small `--radius-pill` chip,
`--accent-soft` fill, `--ink` text — e.g. "pilot"), optional link (whole card is not a
link if there's no URL; render as a plain card with no hover affordance in that case,
so a reader never clicks something dead).

**Case-study page header.** Same section-header eyebrow/h2 pattern, plus a `--line`
divider under it before the body copy starts. The seven-step lifecycle diagram is
reused verbatim as the page's spine for the SOX case study (content-spec 6.1) — same
component, not a re-drawn variant.

**Skills group list.** No progress bars, no per-skill icons. Each group: mono-label
group name (h3-equivalent, `--accent`), then the items as a single flowing paragraph of
`--ink` text separated by " · " (matches the content spec's own formatting). Plain
text, not a grid of pill chips — a wall of skill-pills is the generic-AI look this
system is explicitly avoiding.

**Award tile.** Three across on desktop (CSS Grid, 3 columns), stacked on phones.
`--surface` fill, `--line` border, `--radius-md`, no icon, no year, no ribbon/badge
graphic — just the award name as body-weight text, centered isn't required (left-align,
consistent with "everything centered" being on the ruled-out list).

**Quote card.** Static, no carousel (three or four sit in a row on desktop / stack on
phones — CSS Grid, not a slider). Photo (48px circle) + name + title in `--ink-soft`
small text at the top, quote text below at body size in `--ink`, with one accent
opening-quote glyph (`"` character, not an emoji or icon) in `--accent` at roughly 2×
body size, positioned inline before the quote — not a giant decorative background
glyph.

**Contact block.** Intro paragraph, then the email rendered as selectable `--ink` text
next to a small "Copy" button (`--radius-sm`, `--line` border, `--surface` fill,
`--accent` text). Button states: **idle** ("Copy") → on click, **success** (label
changes to "Copied" for 2s, `aria-live="polite"` region announces it, don't rely on
the label change alone) → back to idle. If the Clipboard API is unavailable/blocked,
**fallback**: the button instead selects the email text (`Range`/`Selection` API) and
the label reads "Select" so the visitor can copy manually — never fail silently.
LinkedIn renders as a plain text link beside it, same row on desktop, stacked below on
phones.

**Footer.** `--line` top hairline, `--ink-soft` small text, single line: copyright ·
org name · LinkedIn · GitHub · email, separated by " · ". No template-credit line.

**404.** Same left-rail/top-bar shell as every other page (this is the site's error
state — a visitor should never lose the nav). h2 "Page not found" + one body-text
sentence + the same 11-item nav already in the rail/top-bar as the recovery path — no
separate "back to home" button needed since the rail is always present.

---

### 8. Accessibility notes

- **Focus-visible:** `:focus-visible { outline: 2px solid var(--focus); outline-offset:
  2px; }` everywhere — never `outline: none` without this replacement. Verified ≥3:1
  against both `--bg` and `--surface` in both themes (table in §2).
- **Minimum target size:** every interactive element (nav links, the copy button, the
  menu button, `<summary>` rows) is at least 24×24 CSS px (WCAG 2.2 AA floor); the
  mobile menu button and the copy button are sized to 44×44px specifically since
  they're the two most-repeated taps on a phone.
- **Heading order:** one `h1` per page (the hero name on the home page; the case-study
  title on those pages). Section headers are `h2` in the order listed in content-spec
  §0 nav. Sub-items (role titles, card titles, research entries, POV titles, award
  names) are `h3`. Nothing skips a level.
- **Alt text:** headshot alt="Ujas Bhadani" (content-spec §0); testimonial photos
  alt=the person's name (content-spec §10); the lifecycle diagram's SVG connector is
  `aria-hidden="true"` since the `<ol>` already carries the real content.
- **Reduced motion:** covered in §5 — static first phrase, no interval, color
  transitions only on hover/focus.

---

### 9. What this is not

Ruling these out explicitly so frontend-dev doesn't default to them:

- Cream background + serif display type + terracotta accent.
- Near-black background + acid/neon green accent.
- Purple-to-blue gradient hero background or gradient text anywhere.
- Broadsheet-style hairline multi-column text layout.
- Emoji used as section markers or bullet glyphs.
- Everything center-aligned (this is a left-rail, left-aligned, editorial layout).
- The same oversized `rounded-lg`/`rounded-2xl` radius stamped on every element
  regardless of role (radius here is small and role-specific — see §3).
- A colored accent rail running down the side of every card (that's a Crescive/SaaS
  dashboard tell, and it's also not this system's own left-rail-on-the-page pattern —
  don't confuse the two).
- Icon-in-a-colored-blob card decoration, and image/testimonial carousels — both
  explicitly ruled out by D2/D3.
