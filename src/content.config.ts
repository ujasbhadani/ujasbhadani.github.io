import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Shared shape for a single bullet/paragraph that may carry the founder's
// pre-merge review marker (docs/content-spec.md, the "[confirm]" convention
// explained at the top of that file). The marker text itself is tracked here
// for scripts/review-checklist.mjs and is never rendered on the page --
// only the plain `text` is rendered.
const bullet = z.object({
  text: z.string(),
  confirm: z.boolean().default(false),
  confirmNote: z.string().optional(),
});

const bulletGroup = z.object({
  label: z.string().optional(),
  bullets: z.array(bullet),
});

const link = z.object({
  label: z.string(),
  url: z.string().url(),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/experience" }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    org: z.string(),
    location: z.string().optional(),
    subline: z.string().optional(),
    dates: z.string().default(""),
    groups: z.array(bulletGroup),
    links: z.array(link).optional(),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/education" }),
  schema: z.object({
    order: z.number(),
    degree: z.string(),
    org: z.string(),
    location: z.string().optional(),
    gpa: z.string().optional(),
    coursework: z.string().optional(),
    dates: z.string().default(""),
  }),
});

const lifecycle = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/lifecycle" }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    sentence: z.string(),
    artifact: z.string(),
    confirm: z.boolean().default(false),
    confirmNote: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    outcome: z.string(),
    link: z.string().optional(),
    tag: z.string().optional(),
    confirm: z.boolean().default(false),
    confirmNote: z.string().optional(),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/research" }),
  schema: z.object({
    order: z.number(),
    group: z.enum(["published", "manuscript"]),
    title: z.string(),
    venue: z.string().optional(),
    year: z.string().optional(),
    link: z.string().url().optional(),
    linkNote: z.string().optional(),
    abstract: z.string(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/writing" }),
  schema: z.object({
    order: z.number(),
    slug: z.string(),
    title: z.string(),
    paragraphs: z.array(z.string()),
    sources: z.string(),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/skills" }),
  schema: z.object({
    order: z.number(),
    label: z.string(),
    items: z.array(z.string()),
  }),
});

const certifications = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/certifications" }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    link: z.string().url().optional(),
  }),
});

const training = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/training" }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
  }),
});

const awards = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/awards" }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
  }),
});

const recommendations = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/recommendations" }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    title: z.string(),
    linkedin: z.string().url(),
    image: z.string(),
    quote: z.string(),
  }),
});

const caseBlockPara = z.object({
  type: z.literal("para"),
  heading: z.string().optional(),
  text: z.string(),
});

const caseBlockList = z.object({
  type: z.literal("list"),
  heading: z.string().optional(),
  ordered: z.boolean().default(false),
  items: z.array(bullet),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/caseStudies" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    eyebrow: z.string(),
    blocks: z.array(z.union([caseBlockPara, caseBlockList])),
    diagramNote: z.string().optional(),
    links: z.array(link).optional(),
  }),
});

export const collections = {
  experience,
  education,
  lifecycle,
  projects,
  research,
  writing,
  skills,
  certifications,
  training,
  awards,
  recommendations,
  caseStudies,
};
