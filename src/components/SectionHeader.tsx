import { Case } from "../lib/Case";
import type { ReactNode } from "react";
import { DisplayHeading } from "../lib/Emphasis";
import { Reveal } from "./Reveal";

interface Props {
  eyebrow: string;
  heading: string;
  sub?: string;
  action?: ReactNode;
  level?: 1 | 2;
  id?: string;
}

export function SectionHeader({ eyebrow, heading, sub, action, level = 2, id }: Props) {
  const title = <DisplayHeading text={heading} />;
  const cls = "text-4xl md:text-6xl leading-[1.05] tracking-tight text-text-primary";
  return (
    <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted"><Case>{eyebrow}</Case></span>
        </div>
        {level === 1 ? (
          <h1 id={id} className={cls}>
            {title}
          </h1>
        ) : (
          <h2 id={id} className={cls}>
            {title}
          </h2>
        )}
        {sub ? <p className="mt-4 max-w-md text-sm text-muted md:text-base">{sub}</p> : null}
      </div>
      {action ? <div className="hidden md:block">{action}</div> : null}
    </Reveal>
  );
}
