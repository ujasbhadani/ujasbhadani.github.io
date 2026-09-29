import { Case } from "../lib/Case";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "../components/ExternalLink";
import { LifecycleList } from "../components/LifecycleList";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import {
  about,
  awards,
  certifications,
  education,
  experience,
  recommendations,
  research,
  skills,
  training,
} from "../data";
import type { ResearchPaper } from "../types/content";

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-stroke py-14 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <Reveal className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-stroke" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted"><Case>{eyebrow}</Case></span>
          </div>
          <h2 id={`${id}-title`} className="text-3xl leading-tight tracking-tight md:text-5xl">
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-stroke bg-surface/40 px-3.5 py-1.5 text-sm text-text-primary/85"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Paper({ paper }: { paper: ResearchPaper }) {
  const meta = [paper.venue, paper.year].filter(Boolean).join(", ");
  return (
    <li className="rounded-3xl border border-stroke bg-surface/40 p-6">
      <h4 className="text-base font-medium text-text-primary">{paper.title}</h4>
      <p className="mt-1 text-sm text-muted">
        {meta || "Manuscript"}
        {paper.link ? (
          <>
            {" · "}
            <ExternalLink href={paper.link}>
              {paper.linkNote ? paper.linkNote : "Read the paper"}
            </ExternalLink>
            {paper.linkNote ? " (publisher removed the live page)" : null}
          </>
        ) : null}
      </p>
      <details className="group mt-4">
        <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center gap-2 text-sm text-[#89AACC] [&::-webkit-details-marker]:hidden">
          <span aria-hidden="true" className="transition-transform group-open:rotate-90">
            ›
          </span>
          Abstract
        </summary>
        <p className="mt-2 text-sm leading-relaxed text-text-primary/80">{paper.abstract}</p>
      </details>
    </li>
  );
}

export function Resume() {
  const published = research.filter((r) => r.group === "published");
  const manuscripts = research.filter((r) => r.group === "manuscript");

  return (
    <>
      <PageHeader
        eyebrow="Ujas Bhadani"
        title="The *resume*"
        sub="SOX 404(b) ITGC lead, security and GRC engineer, and founder of Vasan AI (Crescive.ai)."
      />

      <Section id="about" eyebrow="About" title="About">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
          <img
            src="/assets/img/profile-img.webp"
            alt="Ujas Bhadani"
            width={720}
            height={614}
            {...({ fetchpriority: "high" } as Record<string, string>)}
            decoding="async"
            className="w-full max-w-xs rounded-3xl border border-stroke object-cover"
          />
          <div className="max-w-2xl space-y-5 text-base leading-relaxed text-text-primary/85">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section id="experience" eyebrow="Experience" title="Experience">
        <ol className="relative ml-2 space-y-14 border-l border-stroke pl-8 md:ml-4 md:pl-12">
          {experience.map((role) => (
            <li key={role.order} className="relative">
              <span
                aria-hidden="true"
                className="accent-gradient absolute -left-[38px] top-2 h-3 w-3 rounded-full md:-left-[54px]"
              />
              <h3 className="text-xl font-medium text-text-primary md:text-2xl">{role.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {[role.org, role.location].filter(Boolean).join(" · ")}
                {role.subline ? (
                  <>
                    <br />
                    {role.subline}
                  </>
                ) : null}
              </p>
              {role.groups.map((group, gi) => (
                <div key={gi} className="mt-5">
                  {group.label ? (
                    <h4 className="mb-3 text-xs uppercase tracking-[0.2em] text-[#89AACC]"><Case>{group.label}</Case></h4>
                  ) : null}
                  <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-text-primary/85 marker:text-[#4E85BF] md:text-[15px]">
                    {group.bullets.map((b) => (
                      <li key={b.text} className="pl-1">
                        {b.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {role.links?.length ? (
                <p className="mt-5 text-sm text-muted">
                  Links:{" "}
                  {role.links.map((l, i) => (
                    <span key={l.url}>
                      <ExternalLink href={l.url}>{l.label}</ExternalLink>
                      {i < role.links!.length - 1 ? " · " : null}
                    </span>
                  ))}
                </p>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="mt-16">
          <h3 className="mb-6 font-display text-3xl italic md:text-4xl">Education</h3>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {education.map((e) => (
              <li key={e.order} className="rounded-3xl border border-stroke bg-surface/40 p-6">
                <h4 className="text-base font-medium text-text-primary">{e.degree}</h4>
                <p className="mt-1 text-sm text-muted">
                  {[e.org, e.gpa].filter(Boolean).join(" · ")}
                </p>
                {e.coursework ? (
                  <p className="mt-3 text-sm leading-relaxed text-text-primary/80">
                    Coursework: {e.coursework}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="sox-404b" eyebrow="SOX 404(b) practice" title="How I run a SOX 404(b) program">
        <p className="mb-8 max-w-2xl text-sm text-muted md:text-base">
          Seven steps, in the order the audit runs. Each one names what I do and the artifact it
          leaves behind.
        </p>
        <LifecycleList />
        <p className="mt-8 text-sm text-text-primary/85">
          The full story of one program rebuild is in the{" "}
          <Link
            to="/work/sox-404b-itgc"
            className="text-text-primary underline decoration-stroke underline-offset-4 hover:decoration-[#89AACC]"
          >
            case study
          </Link>
          .
        </p>
      </Section>

      <Section id="skills" eyebrow="Skills and certifications" title="Skills and certifications">
        <dl className="space-y-8">
          {skills.map((g) => (
            <div key={g.order}>
              <dt className="mb-3 text-xs uppercase tracking-[0.2em] text-[#89AACC]"><Case>{g.label}</Case></dt>
              <dd>
                <Chips items={g.items} />
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-4 font-display text-2xl italic md:text-3xl">Certifications</h3>
            <Chips items={certifications.map((c) => c.name)} />
          </div>
          <div>
            <h3 className="mb-4 font-display text-2xl italic md:text-3xl">Training</h3>
            <Chips items={training.map((t) => t.name)} />
          </div>
        </div>
      </Section>

      <Section id="awards" eyebrow="Awards" title="Awards">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {awards.map((a) => (
            <li
              key={a.order}
              className="rounded-3xl border border-stroke bg-surface/40 p-6 font-display text-2xl italic leading-snug text-text-primary"
            >
              {a.name}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="research" eyebrow="Research" title="Research">
        <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-[#89AACC]">Published</h3>
        <ul className="mb-10 space-y-4">
          {published.map((p) => (
            <Paper key={p.order} paper={p} />
          ))}
        </ul>
        <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-[#89AACC]">Manuscripts</h3>
        <ul className="space-y-4">
          {manuscripts.map((p) => (
            <Paper key={p.order} paper={p} />
          ))}
        </ul>
      </Section>

      <Section id="recommendations" eyebrow="Recommendations" title="Recommendations">
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {recommendations.map((r) => (
            <li key={r.order} className="flex flex-col rounded-3xl border border-stroke bg-surface/40 p-6 md:p-8">
              <blockquote className="flex-1 text-sm leading-relaxed text-text-primary/85 md:text-base">
                <p>&ldquo;{r.quote}&rdquo;</p>
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={r.image}
                  alt={r.name}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-14 rounded-full border border-stroke object-cover"
                />
                <div className="text-sm">
                  <p className="font-medium text-text-primary">
                    <ExternalLink href={r.linkedin} className="hover:underline">
                      {r.name}
                    </ExternalLink>
                  </p>
                  <p className="text-muted">{r.title}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
