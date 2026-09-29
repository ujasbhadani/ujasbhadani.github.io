import { ProjectBento } from "../components/ProjectBento";
import { PageHeader } from "../components/PageHeader";
import { projects } from "../data";

export function Work() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Case studies and *projects*"
        sub="Two case studies first, then the supporting work: GRC first, engineering second, coursework last."
      />
      <section aria-label="Projects" className="bg-bg pb-16 md:pb-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
          <ProjectBento items={projects} headingLevel="h2" />
        </div>
      </section>
    </>
  );
}
