# Rebrand decisions and approvals, recorded 2026-09-29

Source: the founder's clicks in the proposal artifact
(https://claude.ai/artifact/RrURBr4VgcrLjXbVjYc6h6), read back from its database.
The proposal itself is `docs/rebrand-proposal-2026-09-28.html`.

## Decisions (FD1 to FD9)

| ID | Choice | Meaning for the build |
|----|--------|-----------------------|
| FD1 | A | Headline: "SOX 404(b) ITGC lead · Security and GRC engineer · Founder, Vasan AI (Crescive.ai)" |
| FD2 | A | Rebuild on Astro, static output, GitHub Pages via GitHub Actions |
| FD3 | A | First person throughout |
| FD4 | A | Contact invites conversations on SOX 404(b) programs, AI in GRC, and how Crescive is built. No job-seeking line. |
| FD5 | A | Light, editorial, professional, with a dark theme that follows the visitor's setting |
| FD6 | **B** | **Outcomes only, no counts** for the Crescive role: no commit, PR, ADR, migration, post, agent or engine counts anywhere on the site |
| FD7 | A | Bullets drawn from industry practice stay in the build and are confirmed by the founder in the pre-merge content review (D5) |
| FD8 | A | Dedicated "AI in GRC" section: SOX lifecycle walk-through plus three sourced point-of-view pieces |
| FD9 | A | ujasbhadani.com stays the personal site; link out to crescive.ai and vasan.ai; no company page here |

## Item approvals

41 of 44 items approved as proposed. Three came back "needs change":

| ID | Founder note | Applied as |
|----|--------------|------------|
| B2 | "not six years - by now it's a decade." | About says "a decade" of experience |
| E1 | Remove "Delaware LLC · 2026 to present · exact start month and title (I1)" | The Founder role shows the company name only; no entity type, no dates |
| S4 | "Keep all the Research" | All eight unique papers stay, including the four without links (shown as "Manuscript"). The literal duplicate "Weaponizing Phase" entry is still removed per S2, which was approved. |

## Inputs not yet supplied (I1 to I8)

None of the eight inputs were provided. Build rules until they arrive:

- No dates are rendered for roles or degrees (the current site has none either). Content files carry an empty `dates` field to fill later.
- No certification links; names only.
- No award years or issuers.
- Project cards whose correct link is unknown (Email Security, Docker pentest, AI IDS, Risk Assessment) render without a link.
- The existing `assets/img/profile-img.jpg` is the headshot; the Open Graph card is generated from it.
- SOX program scale numbers are omitted, not placeholdered. No "[N]" reaches the rendered page.

## Environment facts that shape the build

- Working clone: `/Users/ujasbhadani/Claude/Projects/Portfolio/ujasbhadani.github.io`, branch `rebrand-2026`. Nothing in the Crescive repo is touched.
- **Local only (founder instruction, 2026-09-29): all work is committed to this clone and never pushed. No `git push`, no fork, no `gh` calls, no PR. The founder pushes the branch manually.** The vasan-ai account here has read-only access to the upstream repo anyway.
- GitHub Pages is currently "legacy" build from `main` root with CNAME `ujasbhadani.com` and HTTPS not enforced. The build includes a GitHub Actions workflow for Astro → Pages; after the founder pushes and merges, the founder switches Pages source to "GitHub Actions" and enables "Enforce HTTPS" in repo settings. Until then the workflow is inert.
- The Crescive auto-commit hooks do not run in this directory. Every specialist commits its own work with `git add` / `git commit` before reporting done, and reports the commit hash.
