import { Case } from "../lib/Case";
import { lifecycle } from "../data";

/** The seven-step SOX 404(b) lifecycle as an ordered list of cards. */
export function LifecycleList() {
  return (
    <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {lifecycle.map((step) => (
        <li
          key={step.order}
          className="rounded-3xl border border-stroke bg-surface p-6 md:p-7"
        >
          <span className="font-display text-3xl italic text-[#89AACC]">
            {String(step.order).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-base font-medium text-text-primary">{step.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-primary/80">{step.sentence}</p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.15em] text-muted">
            Artifact: <Case>{step.artifact}</Case>
          </p>
        </li>
      ))}
    </ol>
  );
}
