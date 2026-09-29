# ujasbhadani.com

Personal site of Ujas Bhadani — SOX 404(b) ITGC lead and founder of
[Crescive.ai](https://crescive.ai). A static [Astro](https://astro.build)
build, light-first editorial design with a dark theme that follows the
visitor's OS setting.

See `docs/design-system.md` for the visual spec and `docs/content-spec.md`
for the site copy (every content file under `src/content/` is a verbatim
copy of that spec).

## Stack

- [Astro](https://astro.build) 7, `output: "static"`
- Content collections (`src/content.config.ts`) for every structured section:
  experience, education, the SOX lifecycle, projects, research, the AI-in-GRC
  writing pieces, skills groups, certifications, training, awards,
  recommendations, and both case studies.
- `@astrojs/sitemap` for `sitemap-index.xml` / `sitemap-0.xml`.
- `sharp` to generate `public/og.png` at build time from a small SVG
  composited with the headshot (`scripts/generate-og.mjs`).
- No client-side framework and effectively no client JS beyond a few small,
  progressively-enhanced scripts: the hero's rotating role phrase, the
  mobile nav toggle, scroll-spy, and the contact block's copy-to-clipboard
  button.

## Commands

Run from the repository root:

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies. |
| `npm run dev` | Start the local dev server (`astro dev`). |
| `npm run build` | Generate `public/og.png`, then build the static site to `dist/`. |
| `npm run preview` | Serve the built `dist/` output locally, for a final check before deploying. |
| `npm run review-checklist` | Regenerate `docs/review-checklist.md` from every `confirm: true` content item. |

## Where content lives

Every rendered section is backed by a JSON file under `src/content/<collection>/`,
validated against the zod schemas in `src/content.config.ts`. Nothing is
hardcoded in the `.astro` page/component markup beyond section structure.

### Adding a role (experience)

Add a new JSON file to `src/content/experience/`, e.g.
`00-new-role.json` (the `order` field controls timeline position, not the
filename). Shape:

```json
{
  "order": 0,
  "title": "Job title",
  "org": "Company name",
  "location": "City, ST",
  "subline": "Optional sub-line under the title",
  "dates": "",
  "groups": [
    { "label": "Optional group label", "bullets": [{ "text": "..." }] }
  ],
  "links": [{ "label": "example.com", "url": "https://example.com" }]
}
```

A bullet can carry `"confirm": true` (and an optional `"confirmNote"`) if
it needs the founder's pre-merge sign-off per `docs/content-spec.md`'s
`[confirm]` convention — run `npm run review-checklist` afterward to
regenerate `docs/review-checklist.md`.

### Adding a paper (research)

Add a JSON file to `src/content/research/` with `order`, `group`
(`"published"` or `"manuscript"`), `title`, `abstract`, and optionally
`venue`, `year`, `link`.

The same pattern (an `order` field plus collection-specific fields defined
in `src/content.config.ts`) applies to every other collection: education,
lifecycle, projects, writing, skills, certifications, training, awards,
recommendations, and caseStudies.

## Deployment

Deployment is via a GitHub Actions workflow (added separately, under
`.github/workflows/`) that builds this Astro project and publishes `dist/`
to GitHub Pages. This README does not define that workflow — see the
repository's Actions configuration for the exact build command, output
directory, and Node version it uses.
