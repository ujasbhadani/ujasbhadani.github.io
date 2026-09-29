import { caseStudies, projects, writing } from "../data";
import {
  HEADSHOT_URL,
  HOME_DESCRIPTION,
  HOME_TITLE,
  IDENTITY_LINE,
  OG_IMAGE_URL,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "./site";

export interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
}

function firstSentence(text: string): string {
  const m = text.match(/^.*?[.!?](?:\s|$)/);
  return (m ? m[0] : text).trim();
}

/** Canonical route list. Used by the prerender step and the client router. */
export function allRoutes(): string[] {
  return [
    "/",
    "/work/",
    ...caseStudies.map((c) => `/work/${c.slug}/`),
    "/resume/",
    ...writing.map((w) => `/journal/${w.slug}/`),
  ];
}

function normalize(pathname: string): string {
  const p = pathname.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

export function getRouteMeta(pathname: string): RouteMeta {
  const path = normalize(pathname);
  const canonical = (p: string) => `${SITE_URL}${p === "/" ? "/" : `${p}/`}`;

  if (path === "/") {
    return { title: HOME_TITLE, description: HOME_DESCRIPTION, canonical: canonical("/") };
  }
  if (path === "/work") {
    return {
      title: `Work · ${SITE_NAME}`,
      description:
        "Case studies and projects by Ujas Bhadani: a SOX 404(b) ITGC program rebuild, Crescive, and the GRC and security engineering work behind them.",
      canonical: canonical("/work"),
    };
  }
  if (path === "/resume") {
    return {
      title: `Resume · ${SITE_NAME}`,
      description:
        "Experience, education, certifications, research and recommendations for Ujas Bhadani, SOX 404(b) ITGC lead and founder of Vasan AI (Crescive.ai).",
      canonical: canonical("/resume"),
    };
  }
  const cs = path.match(/^\/work\/([^/]+)$/);
  if (cs) {
    const study = caseStudies.find((c) => c.slug === cs[1]);
    if (study) {
      const project = projects.find((p) => p.link === `/work/${study.slug}/`);
      return {
        title: `${study.title} · ${SITE_NAME}`,
        description: project?.outcome ?? firstSentence((study.blocks[0] as { text: string }).text),
        canonical: canonical(path),
      };
    }
  }
  const jr = path.match(/^\/journal\/([^/]+)$/);
  if (jr) {
    const piece = writing.find((w) => w.slug === jr[1]);
    if (piece) {
      return {
        title: `${piece.title} · ${SITE_NAME}`,
        description: firstSentence(piece.paragraphs[0]),
        canonical: canonical(path),
      };
    }
  }
  return {
    title: `Page not found · ${SITE_NAME}`,
    description: "This page does not exist. Head back to the home page, work or resume.",
    canonical: canonical("/"),
    noindex: true,
  };
}

export function jsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    image: HEADSHOT_URL,
    jobTitle: IDENTITY_LINE,
    worksFor: { "@type": "Organization", name: "Xponential Fitness, Inc." },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Northeastern University" },
      { "@type": "CollegeOrUniversity", name: "Gujarat Technological University" },
    ],
    sameAs: SOCIAL_LINKS.map((l) => l.url),
  };
  const organization = {
    "@type": "Organization",
    "@id": "https://vasan.ai/#organization",
    name: "Vasan AI Technologies, LLC",
    url: "https://vasan.ai",
    brand: { "@type": "Brand", name: "Crescive", url: "https://crescive.ai" },
    founder: { "@id": `${SITE_URL}/#person` },
  };
  return { "@context": "https://schema.org", "@graph": [person, organization] };
}

interface Tag {
  tag: "meta" | "link" | "script";
  attrs: Record<string, string>;
  text?: string;
}

/** Every head tag a route owns (title excluded), tagged data-head for client swaps. */
export function headTags(meta: RouteMeta): Tag[] {
  const tags: Tag[] = [
    { tag: "meta", attrs: { name: "description", content: meta.description } },
    { tag: "link", attrs: { rel: "canonical", href: meta.canonical } },
    { tag: "meta", attrs: { property: "og:type", content: "website" } },
    { tag: "meta", attrs: { property: "og:site_name", content: SITE_NAME } },
    { tag: "meta", attrs: { property: "og:title", content: meta.title } },
    { tag: "meta", attrs: { property: "og:description", content: meta.description } },
    { tag: "meta", attrs: { property: "og:url", content: meta.canonical } },
    { tag: "meta", attrs: { property: "og:image", content: OG_IMAGE_URL } },
    { tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
    { tag: "meta", attrs: { property: "og:image:height", content: "630" } },
    { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
    { tag: "meta", attrs: { name: "twitter:title", content: meta.title } },
    { tag: "meta", attrs: { name: "twitter:description", content: meta.description } },
    { tag: "meta", attrs: { name: "twitter:image", content: OG_IMAGE_URL } },
    { tag: "script", attrs: { type: "application/ld+json" }, text: JSON.stringify(jsonLd()) },
  ];
  if (meta.noindex) {
    tags.push({ tag: "meta", attrs: { name: "robots", content: "noindex" } });
  }
  return tags;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** HTML string injected at <!--app-head--> by scripts/prerender.mjs. */
export function headHtml(meta: RouteMeta): string {
  const parts = [`<title>${esc(meta.title)}</title>`];
  for (const t of headTags(meta)) {
    const attrs = Object.entries(t.attrs)
      .map(([k, v]) => `${k}="${esc(v)}"`)
      .join(" ");
    if (t.tag === "script") {
      // JSON in a script element must not contain a literal "</".
      parts.push(`<script ${attrs} data-head>${(t.text ?? "").replace(/</g, "\\u003c")}</script>`);
    } else {
      parts.push(`<${t.tag} ${attrs} data-head />`);
    }
  }
  return parts.join("\n    ");
}

/** Client-side equivalent: swap the managed tags when the route changes. */
export function applyHead(meta: RouteMeta): void {
  document.title = meta.title;
  document.head.querySelectorAll("[data-head]").forEach((el) => el.remove());
  for (const t of headTags(meta)) {
    const el = document.createElement(t.tag);
    for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v);
    if (t.text) el.textContent = t.text;
    el.setAttribute("data-head", "");
    document.head.appendChild(el);
  }
}
