import { Link, useParams } from "react-router-dom";
import { ExternalLink } from "../components/ExternalLink";
import { LifecycleList } from "../components/LifecycleList";
import { PageHeader } from "../components/PageHeader";
import { getCaseStudy } from "../data";
import { Emphasis } from "../lib/Emphasis";
import { NotFound } from "./NotFound";

export function CaseStudy() {
  const { slug = "" } = useParams();
  const study = getCaseStudy(slug);
  if (!study) return <NotFound />;

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 pt-28 md:px-10 md:pt-36 lg:px-16">
        <Link
          to="/work"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm text-muted transition-colors hover:text-text-primary"
        >
          <span aria-hidden="true">←</span> All work
        </Link>
      </div>
      <div className="-mt-24 md:-mt-32">
        <PageHeader eyebrow={study.eyebrow} title={study.title} />
      </div>

      <article className="mx-auto max-w-3xl px-6 pb-16 md:px-10 md:pb-24">
        {study.blocks.map((block) => (
          <section key={block.heading} className="mb-12">
            {block.heading ? (
              <h2 className="mb-4 font-display text-3xl italic text-text-primary md:text-4xl">
                {block.heading}
              </h2>
            ) : null}
            {block.type === "para" ? (
              <p className="text-base leading-relaxed text-text-primary/85">{block.text}</p>
            ) : block.ordered ? (
              <ol className="list-decimal space-y-4 pl-6 text-base leading-relaxed text-text-primary/85 marker:text-[#89AACC]">
                {block.items.map((item) => (
                  <li key={item.text} className="pl-1">
                    <Emphasis text={item.text} />
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="list-disc space-y-3 pl-6 text-base leading-relaxed text-text-primary/85 marker:text-[#4E85BF]">
                {block.items.map((item) => (
                  <li key={item.text} className="pl-1">
                    <Emphasis text={item.text} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {study.links?.length ? (
          <p className="mb-12 text-sm text-muted">
            Links:{" "}
            {study.links.map((l, i) => (
              <span key={l.url}>
                <ExternalLink href={l.url}>{l.label}</ExternalLink>
                {i < study.links!.length - 1 ? " · " : null}
              </span>
            ))}
          </p>
        ) : null}
      </article>

      {study.slug === "sox-404b-itgc" ? (
        <section aria-labelledby="lifecycle-title" className="mx-auto max-w-[1200px] px-6 pb-16 md:px-10 md:pb-24 lg:px-16">
          <h2 id="lifecycle-title" className="mb-3 font-display text-3xl italic md:text-4xl">
            How I run a SOX 404(b) ITGC program
          </h2>
          <p className="mb-8 max-w-2xl text-sm text-muted md:text-base">
            Seven steps, in the order the audit runs. Each one names what I do and the artifact it
            leaves behind.
          </p>
          <LifecycleList />
        </section>
      ) : null}
    </>
  );
}
