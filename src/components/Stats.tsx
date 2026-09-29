import { Case } from "../lib/Case";
import { Reveal } from "./Reveal";

const STATS = [
  {
    lead: null,
    value: "No material weakness",
    label: "Deloitte-audited SOX 404(b) ITGC program",
  },
  {
    lead: "35%",
    value: "faster evidence retrieval",
    label: "AuditBoard (now Optro), with evidence pulled from source systems",
  },
  {
    lead: null,
    value: "Every prior-year deficiency closed",
    label: "Remediated through owned POA&Ms with re-test dates",
  },
] as const;

export function Stats() {
  return (
    <section aria-label="Outcomes" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <ul className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {STATS.map((s, i) => (
            <li key={s.value}>
              <Reveal delay={i * 0.1} className="border-t border-stroke pt-6">
                <p className="font-display text-4xl italic leading-tight text-text-primary md:text-5xl">
                  {s.lead ? (
                    <>
                      <span className="accent-gradient bg-clip-text text-transparent">{s.lead}</span>{" "}
                    </>
                  ) : null}
                  {s.value}
                </p>
                <p className="mt-4 max-w-xs text-xs uppercase tracking-[0.15em] text-muted"><Case>{s.label}</Case></p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
