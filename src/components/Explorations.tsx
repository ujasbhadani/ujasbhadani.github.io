import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { lifecycle } from "../data";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { LifecycleStep } from "../types/content";
import { Button } from "./Button";

const TILTS = [
  "-rotate-3",
  "rotate-2",
  "rotate-3",
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-2",
] as const;

function StepCard({ step, tilt, onOpen }: { step: LifecycleStep; tilt: string; onOpen: (s: LifecycleStep) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(step)}
      aria-haspopup="dialog"
      className={`pointer-events-auto flex w-full max-w-[320px] flex-col justify-between rounded-3xl border border-stroke bg-surface p-4 text-left transition-transform duration-500 hover:z-10 hover:scale-[1.03] hover:rotate-0 focus-visible:scale-[1.03] focus-visible:rotate-0 sm:p-6 md:aspect-square ${tilt}`}
    >
      <span>
        <span className="font-display text-3xl italic text-[#89AACC] md:text-4xl">
          {String(step.order).padStart(2, "0")}
        </span>
        <span className="mt-2 block text-sm font-medium text-text-primary md:text-base">{step.name}</span>
        <span className="mt-2 block text-xs leading-relaxed text-muted md:text-[13px]">{step.sentence}</span>
      </span>
      <span className="mt-4 block text-[11px] uppercase tracking-[0.15em] text-text-primary/70">
        Artifact: {step.artifact}
      </span>
    </button>
  );
}

function Lightbox({ step, onClose }: { step: LifecycleStep; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dlg = ref.current;
    if (dlg && !dlg.open) dlg.showModal();
    return () => {
      if (dlg?.open) dlg.close();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby="step-dialog-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto w-[min(92vw,560px)] rounded-3xl border border-stroke bg-surface p-8 text-text-primary backdrop:bg-black/70 backdrop:backdrop-blur-sm md:p-10"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-muted">Step {step.order} of {lifecycle.length}</p>
      <h3 id="step-dialog-title" className="mt-3 font-display text-3xl italic md:text-4xl">
        {step.name}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-text-primary/85 md:text-base">{step.sentence}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.15em] text-[#89AACC]">Artifact: {step.artifact}</p>
      <div className="mt-8">
        <Button variant="pill" onClick={onClose}>
          Close
        </Button>
      </div>
    </dialog>
  );
}

/** Pinned "How I run a SOX 404(b) program" section with scroll-driven parallax step cards. */
export function Explorations() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const col1 = useRef<HTMLDivElement>(null);
  const col2 = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState<LifecycleStep | null>(null);

  useEffect(() => {
    if (reduced || !section.current || !pin.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: "bottom bottom",
        pin: pin.current,
        pinSpacing: false,
      });
      const scrub = { trigger: section.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(col1.current, { yPercent: 0 }, { yPercent: -12, ease: "none", scrollTrigger: scrub });
      gsap.fromTo(col2.current, { yPercent: 0 }, { yPercent: -30, ease: "none", scrollTrigger: scrub });
    }, section);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [reduced]);

  const left = lifecycle.filter((_, i) => i % 2 === 0);
  const right = lifecycle.filter((_, i) => i % 2 === 1);

  return (
    <section
      ref={section}
      aria-labelledby="sox-practice-title"
      id="sox-404b-practice"
      className={reduced ? "relative bg-bg py-16 md:py-24" : "relative min-h-[300vh] bg-bg"}
    >
      <div
        ref={pin}
        className={
          reduced
            ? "relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 pb-16 text-center"
            : "relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center"
        }
      >
        <div className="mb-5 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">SOX 404(b) practice</span>
          <span aria-hidden="true" className="h-px w-8 bg-stroke" />
        </div>
        <h2 id="sox-practice-title" className="text-4xl leading-[1.05] tracking-tight md:text-6xl">
          Seven <span className="font-display italic">steps</span>
        </h2>
        <p className="mt-4 max-w-md text-sm text-muted md:text-base">
          Seven steps, in the order the audit runs. Each one names what I do and the artifact it
          leaves behind.
        </p>
        <div className="mt-8">
          <Button to="/work/sox-404b-itgc" variant="outline">
            Read the case study
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>

      <div
        className={
          reduced
            ? "relative mx-auto max-w-[1400px] px-6"
            : "pointer-events-none absolute inset-0 z-20 mx-auto max-w-[1400px] px-6"
        }
      >
        <div
          className={
            reduced
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2"
              : "grid grid-cols-2 gap-3 pt-[100vh] md:gap-40"
          }
        >
          <div ref={col1} className="flex flex-col items-center gap-6 md:gap-16">
            {left.map((s) => (
              <StepCard key={s.order} step={s} tilt={TILTS[(s.order - 1) % TILTS.length]} onOpen={setActive} />
            ))}
          </div>
          <div ref={col2} className="flex flex-col items-center gap-6 md:gap-16 md:pt-[30vh]">
            {right.map((s) => (
              <StepCard key={s.order} step={s} tilt={TILTS[(s.order - 1) % TILTS.length]} onOpen={setActive} />
            ))}
          </div>
        </div>
      </div>

      {active ? <Lightbox step={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}
