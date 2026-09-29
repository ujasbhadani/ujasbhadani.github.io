import { Case } from "../lib/Case";
import type { ReactNode } from "react";
import { DisplayHeading } from "../lib/Emphasis";

/** Header block for non-landing routes (the fixed navbar floats above it). */
export function PageHeader({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-[1200px] px-6 pb-12 pt-32 md:px-10 md:pb-16 md:pt-44 lg:px-16">
      <div className="mb-5 flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-stroke" />
        <span className="text-xs uppercase tracking-[0.3em] text-muted"><Case>{eyebrow}</Case></span>
      </div>
      <h1 className="max-w-4xl text-4xl leading-[1.05] tracking-tight text-text-primary md:text-6xl">
        <DisplayHeading text={title} />
      </h1>
      {sub ? <p className="mt-5 max-w-2xl text-sm text-muted md:text-base">{sub}</p> : null}
      {children}
    </header>
  );
}
