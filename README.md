# ujasbhadani.com

Personal site of Ujas Bhadani: SOX 404(b) ITGC lead and founder of
[Crescive.ai](https://crescive.ai). A React + Vite single-page app, built from the
reference spec in `docs/reference-landing-spec.md`, prerendered to static HTML and deployed
to GitHub Pages.

Rulings that shape the build are in `docs/decisions-2026-09-29.md` and
`docs/decisions-2026-09-29-b-react-rebuild.md` (FD10 React + Vite, FD11 forced dark,
FD12 generated hero video). The copy lives in `docs/content-spec.md`; every file under
`src/data/` is a verbatim copy of it.

## Stack

- Vite 8, React 18, TypeScript, react-router-dom 7
- Tailwind CSS 3 with `tailwindcss-animate`; design tokens and keyframes in `src/index.css`
- GSAP (ScrollTrigger) for the hero entrance, pinned parallax section and marquee;
  Framer Motion for `whileInView` headers and the loading screen
- `sharp` for the Open Graph card, favicons and image derivatives
- No `hls.js`: the hero video is a self-hosted progressive file in a native `<video>`

## Commands

```sh
npm ci                 # install
npm run dev            # Vite dev server
npm run build          # og + favicons + typecheck + client build + SSR build + prerender + sitemap
npm run preview        # serve dist/ locally (vite preview)
npm run review-checklist   # regenerate docs/review-checklist.md
```

Node `>=22.12.0` is required. The build needs no browser.

## How the build works

1. `scripts/generate-og.mjs` and `scripts/generate-favicons.mjs` write `public/og.png` and
   the favicons.
2. `tsc --noEmit` type-checks the project.
3. `vite build` writes the client bundle to `dist/`.
4. `vite build --ssr src/entry-server.tsx --outDir .ssr` builds a server bundle.
5. `scripts/prerender.mjs` renders every route with `react-dom/server` at its at-rest state
   (no loading overlay) and writes `dist/<route>/index.html` plus `dist/404.html`, so
   search and answer engines see the real text. The step fails if a route has no `<h1>` or
   contains a placeholder marker. At runtime the client mounts a fresh React root over
   this markup.
6. `scripts/sitemap.mjs` writes `dist/sitemap.xml` from the prerendered routes.

Routes: `/`, `/work`, `/work/sox-404b-itgc`, `/work/crescive`, `/resume`,
`/journal/<slug>` (three pieces). Anchors from the old Astro build (`/#projects`,
`/#about`, ...) are redirected once at boot by `src/lib/legacyAnchors.ts`.

## Project layout

- `src/data/**`: content as JSON (typed in `src/types/content.ts`, loaded in `src/data/index.ts`)
- `src/pages/**`, `src/components/**`: routes and UI
- `src/lib/seo.ts`: per-route title, description, canonical, Open Graph, Twitter, JSON-LD
- `public/`: `CNAME`, `robots.txt`, `llms.txt`, `og.png`, favicons, images
- `public/media/`: hero video files (`hero.mp4`, `hero.webm`, `hero-720.mp4`,
  `hero-poster.jpg`), delivered separately; the site renders without them

## Content review

Items marked `"confirm": true` in `src/data` are drawn from industry practice and need the
founder's confirmation before merge. `npm run review-checklist` lists them in
`docs/review-checklist.md` (18 items).

## Deployment

Pushing to `main` runs `.github/workflows/pages.yml`, which runs `npm ci && npm run build`
and uploads `dist/`. In the repository settings, set Pages source to "GitHub Actions" and
enable "Enforce HTTPS" (custom domain `ujasbhadani.com` via `public/CNAME`).
