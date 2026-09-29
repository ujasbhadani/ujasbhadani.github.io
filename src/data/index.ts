import type {
  CaseStudy,
  Certification,
  Education,
  Experience,
  LifecycleStep,
  Named,
  Project,
  Recommendation,
  ResearchPaper,
  SkillGroup,
  WritingPiece,
} from "../types/content";

// Every collection is a folder of JSON files under src/data/. import.meta.glob
// inlines them at build time (both the client and the SSR/prerender bundle).
function load<T extends { order?: number }>(modules: Record<string, unknown>): T[] {
  return (Object.values(modules) as T[]).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export const experience = load<Experience>(
  import.meta.glob("./experience/*.json", { eager: true, import: "default" }),
);
export const education = load<Education>(
  import.meta.glob("./education/*.json", { eager: true, import: "default" }),
);
export const lifecycle = load<LifecycleStep>(
  import.meta.glob("./lifecycle/*.json", { eager: true, import: "default" }),
);
export const projects = load<Project>(
  import.meta.glob("./projects/*.json", { eager: true, import: "default" }),
);
export const research = load<ResearchPaper>(
  import.meta.glob("./research/*.json", { eager: true, import: "default" }),
);
export const writing = load<WritingPiece>(
  import.meta.glob("./writing/*.json", { eager: true, import: "default" }),
);
export const skills = load<SkillGroup>(
  import.meta.glob("./skills/*.json", { eager: true, import: "default" }),
);
export const certifications = load<Certification>(
  import.meta.glob("./certifications/*.json", { eager: true, import: "default" }),
);
export const training = load<Named>(
  import.meta.glob("./training/*.json", { eager: true, import: "default" }),
);
export const awards = load<Named>(
  import.meta.glob("./awards/*.json", { eager: true, import: "default" }),
);
export const recommendations = load<Recommendation>(
  import.meta.glob("./recommendations/*.json", { eager: true, import: "default" }),
);
export const caseStudies = Object.values(
  import.meta.glob("./caseStudies/*.json", { eager: true, import: "default" }),
) as CaseStudy[];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
export function getWriting(slug: string): WritingPiece | undefined {
  return writing.find((w) => w.slug === slug);
}
