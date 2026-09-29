import { Link } from "react-router-dom";
import { readMinutes } from "../lib/text";
import type { WritingPiece } from "../types/content";
import { CardArt } from "./CardArt";
import { Reveal } from "./Reveal";

/** Journal entries as horizontal pills: thumbnail, title, computed read time. */
export function JournalList({ pieces }: { pieces: WritingPiece[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {pieces.map((piece, i) => (
        <li key={piece.slug}>
          <Reveal delay={i * 0.08}>
            <Link
              to={`/journal/${piece.slug}`}
              className="group flex min-h-[44px] items-center gap-4 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors hover:bg-surface focus-visible:bg-surface sm:gap-6 sm:rounded-full"
            >
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-stroke sm:h-20 sm:w-20">
                <CardArt seed={20 + i} className="h-full w-full object-cover" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <span className="font-display text-xl italic leading-snug text-text-primary md:text-2xl">
                  {piece.title}
                </span>
                <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-muted">
                  {readMinutes(piece.paragraphs)} min read
                </span>
              </span>
              <span
                aria-hidden="true"
                className="hidden pr-3 text-xl text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-text-primary sm:block"
              >
                →
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
