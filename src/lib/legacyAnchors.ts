// Anchors from the previous (Astro) build. A visitor arriving at "/#hash"
// with one of these is redirected once, at boot, to where the content now lives.
const MAP: Record<string, string> = {
  projects: "/work",
  "ai-in-grc": "/#ai-in-grc",
  about: "/resume#about",
  experience: "/resume#experience",
  resume: "/resume#experience",
  "sox-404b": "/resume#sox-404b",
  research: "/resume#research",
  researchpaper: "/resume#research",
  skills: "/resume#skills",
  awards: "/resume#awards",
  recommendations: "/resume#recommendations",
  recommandations: "/resume#recommendations",
  contact: "/resume#contact",
};

/** Returns the URL to replace the current one with, or null. Only applies to the landing route. */
export function legacyTarget(loc: { pathname: string; hash: string }): string | null {
  const path = loc.pathname.replace(/\/+$/, "") || "/";
  if (path !== "/" || !loc.hash) return null;
  const key = decodeURIComponent(loc.hash.slice(1));
  if (key === "ai-in-grc") return null; // lands on the journal section of "/" itself
  return MAP[key] ?? null;
}
