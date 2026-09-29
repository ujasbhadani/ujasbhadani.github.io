# Rebrand decisions, addendum: React + Vite rebuild (2026-09-29, later the same day)

After reviewing the QA-passed Astro build (tag `astro-build-2026-09-29`, commit c9afb71),
the founder pasted a specification for a dark, animated single-page portfolio and answered
three questions. These rulings supersede FD2 and FD5 in `docs/decisions-2026-09-29.md`.
Everything else there (FD1, FD3, FD4, FD6 to FD9, the three revisions, the "local only"
rule, the no-dates and no-placeholder rules) stays in force.

| ID | Ruling | Meaning for the build |
|----|--------|-----------------------|
| FD10 | **Rebuild on React + Vite** (supersedes FD2) | New project: React, Vite, Tailwind CSS, TypeScript, GSAP, Framer Motion, react-router-dom, tailwindcss-animate, per the pasted spec. Content is ported from `docs/content-spec.md` and the existing `src/content/*.json` data. Deploy target stays GitHub Pages via the Actions workflow. |
| FD11 | **Forced dark theme** (supersedes FD5) | No light mode, no toggle. `body` is the spec's `--bg` (0 0% 4%) with `--text` (0 0% 96%). |
| FD12 | **Generated hero video** | The spec's Mux stream is a template placeholder and is not used. A looping abstract background video is generated in this repository by code (procedural animation rendered to frames and encoded), stored under `public/media/`, and played with a native `<video>` element with a poster image. `hls.js` is not needed for a self-hosted progressive file and is left out unless a later decision adds HLS. |

## What is ported from the spec verbatim

Design system (Inter 300–700 body, Instrument Serif italic display; HSL tokens `--bg`,
`--surface`, `--text`, `--muted`, `--stroke`, `--accent`; accent gradient
`linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)`; the three keyframes), the loading
screen with the 000→100 counter and rotating words, the floating pill navbar with logo
ring, dividers, links and "Say hi", the hero layout with eyebrow, name, rotating role
line, description and two CTAs with gradient hover rings, the GSAP entrance timeline,
the scroll indicator, the "Selected Work" bento grid with halftone overlay and hover
label, the journal pill rows, the pinned parallax "Explorations" layer, the stats row
layout, the contact section with flipped video, the GSAP marquee, and the footer bar with
social links and the pulsing availability dot.

## What is replaced because it is placeholder content or breaks an earlier ruling

| Spec element | Replacement |
|---|---|
| "Michael Smith", "JA" logo, "lives in Chicago" | Ujas Bhadani, "UB" logo, role line built from the FD1 identity: "A {SOX 404(b) ITGC lead / Security and GRC engineer / Founder / Builder of AI for GRC} based in Irvine." (city per the Xponential role; founder may change) |
| Eyebrow "COLLECTION '26" | "SOX 404(b) · AI in GRC · 2026" |
| Description | The hero sub-line from content-spec section 1 |
| Rotating loading words "Design / Create / Inspire" | "Scope / Test / Prove" |
| "Selected Work" cards: Automotive Motion, Urban Architecture, Human Perspective, Brand Identity | The two case studies plus the two strongest GRC cards from content-spec section 6 (AuditBoard evidence automation, AI governance program). Card art is generated abstract imagery, not stock photos. |
| "Journal" entries | The three AI in GRC pieces from content-spec section 5, each opening as its own route |
| "Explorations" gallery of six images with Dribbble link | The seven-step SOX 404(b) lifecycle from content-spec section 4 as the parallax cards; button links to the SOX case study |
| Stats "20+ Years / 95+ Projects / 200% Satisfied Clients" | Three true outcomes from the spec: "No material weakness", "35% faster evidence retrieval", "Every prior-year deficiency closed". No invented numbers, no Crescive counts (FD6). |
| Marquee "BUILDING THE FUTURE" | "AUDITABLE BY CONSTRUCTION" |
| Email hello@michaelsmith.com | contact@ujasbhadani.com |
| Social links Twitter, LinkedIn, Dribbble, GitHub | LinkedIn, GitHub, crescive.ai, vasan.ai (FD9) |
| Nav "Home / Work / Resume" | Kept. `/` landing, `/work` (case studies and projects), `/resume` (experience, education, skills, certifications, awards, research, recommendations, contact). Old anchors from the Astro build map to `/resume#…` and `/work#…`. |
| Mux HLS video | Generated video (FD12) |

## Still true

- Local only. No push, no `gh`, no PR. The founder pushes.
- No counts about Crescive (FD6 = B). First person (FD3). Contact copy from FD4.
- Items marked `confirm: true` in the data keep the flag; `docs/review-checklist.md` is
  regenerated from the new data location.
- No dates rendered, no bracketed placeholders, all research papers kept, the archived
  Hakin9 link kept.
- Search and answer engines must still see the text: every route is prerendered to static
  HTML at build time so `dist/` contains the content, not an empty app shell. JSON-LD,
  Open Graph, sitemap, robots.txt, llms.txt, CNAME, 404 fallback for client routing.
- The Astro implementation remains in history under tag `astro-build-2026-09-29`.
