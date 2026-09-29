// Shapes of the JSON files under src/data/<collection>/. Ported from the
// former Astro content-collection schemas. `confirm`/`confirmNote` feed
// scripts/review-checklist.mjs and are never rendered.

export interface Bullet {
  text: string;
  confirm?: boolean;
  confirmNote?: string;
}

export interface BulletGroup {
  label?: string;
  bullets: Bullet[];
}

export interface ExternalLink {
  label: string;
  url: string;
}

export interface Experience {
  order: number;
  title: string;
  org: string;
  location?: string;
  subline?: string;
  dates?: string;
  groups: BulletGroup[];
  links?: ExternalLink[];
}

export interface Education {
  order: number;
  degree: string;
  org: string;
  location?: string;
  gpa?: string;
  coursework?: string;
  dates?: string;
}

export interface LifecycleStep {
  order: number;
  name: string;
  sentence: string;
  artifact: string;
  confirm?: boolean;
  confirmNote?: string;
}

export interface Project {
  order: number;
  title: string;
  outcome: string;
  link?: string;
  tag?: string;
  confirm?: boolean;
  confirmNote?: string;
}

export interface ResearchPaper {
  order: number;
  group: "published" | "manuscript";
  title: string;
  venue?: string;
  year?: string;
  link?: string;
  linkNote?: string;
  abstract: string;
}

export interface WritingPiece {
  order: number;
  slug: string;
  title: string;
  paragraphs: string[];
  sources: string;
}

export interface SkillGroup {
  order: number;
  label: string;
  items: string[];
}

export interface Certification {
  order: number;
  name: string;
  link?: string;
}

export interface Named {
  order: number;
  name: string;
}

export interface Recommendation {
  order: number;
  name: string;
  title: string;
  linkedin: string;
  image: string;
  quote: string;
}

export interface CaseBlockPara {
  type: "para";
  heading?: string;
  text: string;
}

export interface CaseBlockList {
  type: "list";
  heading?: string;
  ordered?: boolean;
  items: Bullet[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  eyebrow: string;
  blocks: (CaseBlockPara | CaseBlockList)[];
  diagramNote?: string;
  links?: ExternalLink[];
}
