import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { ExternalLink } from "../components/ExternalLink";
import { JournalList } from "../components/JournalList";
import { PageHeader } from "../components/PageHeader";
import { getWriting, writing } from "../data";
import { IS_URL, readMinutes, URL_SPLIT } from "../lib/text";
import { NotFound } from "./NotFound";

function Source({ item }: { item: string }) {
  const parts = item.split(URL_SPLIT);
  if (parts.length === 1 && /Crescive case study/.test(item)) {
    return (
      <>
        <Link
          to="/work/crescive"
          className="text-text-primary underline decoration-stroke underline-offset-4 hover:decoration-[#89AACC]"
        >
          {item}
        </Link>
      </>
    );
  }
  return (
    <>
      {parts.map((part, i) =>
        IS_URL.test(part) ? (
          <ExternalLink
            key={i}
            href={part}
            className="break-all text-text-primary underline decoration-stroke underline-offset-4 hover:decoration-[#89AACC]"
          >
            {part}
          </ExternalLink>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function JournalPiece() {
  const { slug = "" } = useParams();
  const piece = getWriting(slug);
  if (!piece) return <NotFound />;
  const others = writing.filter((w) => w.slug !== piece.slug);
  const sources = piece.sources.split(" · ");

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 pt-28 md:px-10 md:pt-36 lg:px-16">
        <Link
          to={{ pathname: "/", hash: "#ai-in-grc" }}
          className="inline-flex min-h-[44px] items-center gap-2 text-sm text-muted transition-colors hover:text-text-primary"
        >
          <span aria-hidden="true">←</span> Journal
        </Link>
      </div>
      <div className="-mt-24 md:-mt-32">
        <PageHeader
          eyebrow={`AI in GRC · ${readMinutes(piece.paragraphs)} min read`}
          title={piece.title}
        />
      </div>

      <article className="mx-auto max-w-3xl px-6 pb-16 md:px-10 md:pb-20">
        <div className="space-y-6 text-base leading-relaxed text-text-primary/85">
          {piece.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <section aria-labelledby="sources-title" className="mt-12 border-t border-stroke pt-8">
          <h2 id="sources-title" className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">
            Sources
          </h2>
          <ul className="space-y-3 text-sm leading-relaxed text-muted">
            {sources.map((s) => (
              <li key={s}>
                <Source item={s} />
              </li>
            ))}
          </ul>
        </section>
      </article>

      <section aria-labelledby="more-title" className="mx-auto max-w-[1200px] px-6 pb-16 md:px-10 md:pb-24 lg:px-16">
        <h2 id="more-title" className="mb-6 font-display text-3xl italic md:text-4xl">
          More from the journal
        </h2>
        <JournalList pieces={others} />
      </section>
    </>
  );
}
