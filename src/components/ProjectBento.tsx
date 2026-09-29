import { Link } from "react-router-dom";
import type { Project } from "../types/content";
import { CardArt } from "./CardArt";
import { Reveal } from "./Reveal";

// Column spans alternate 7 / 5 / 5 / 7 (full static class names).
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"] as const;

const LABEL = "View";

function CardBody({ project, index }: { project: Project; index: number }) {
  const hasLink = Boolean(project.link);
  const internal = project.link?.startsWith("/");
  const titleEl = <span>{project.title}</span>;
  return (
    <>
      <CardArt
        seed={index + 1}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div aria-hidden="true" className="halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
      />

      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
        {project.tag ? (
          <span className="mb-3 inline-flex w-fit items-center rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-text-primary">
            {project.tag}
          </span>
        ) : null}
        <h3 className="font-display text-2xl italic leading-tight text-text-primary md:text-3xl">
          {hasLink ? (
            internal ? (
              <Link
                to={project.link!}
                className="rounded-sm after:absolute after:inset-0 after:content-['']"
              >
                {titleEl}
              </Link>
            ) : (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm after:absolute after:inset-0 after:content-['']"
              >
                {titleEl}
              </a>
            )
          ) : (
            titleEl
          )}
        </h3>
        <p className="mt-3 max-w-xl text-sm text-text-primary/85">{project.outcome}</p>
      </div>

      {hasLink ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100"
        >
          <span className="accent-gradient-animated rounded-full p-[2px]">
            <span className="block rounded-full bg-white px-6 py-3 text-sm text-bg">
              {LABEL} — <span className="font-display italic">{project.title}</span>
            </span>
          </span>
        </div>
      ) : null}
    </>
  );
}

/** Bento grid of project cards. Cards without a link render without an anchor. */
export function ProjectBento({ items }: { items: Project[] }) {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
      {items.map((project, i) => (
        <li key={project.order} className={SPANS[i % SPANS.length]}>
          <Reveal className="h-full">
            <article className="group relative h-full min-h-[340px] overflow-hidden rounded-3xl border border-stroke bg-surface focus-within:ring-2 focus-within:ring-[#89AACC] md:min-h-[420px]">
              <CardBody project={project} index={i} />
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
