import { Case } from "../lib/Case";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { lifecycle } from "../data";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { LifecycleStep } from "../types/content";
import { Button } from "./Button";

// Tilt only applies from md up, where the cards float in the parallax layout.
const TILTS = [
  "md:-rotate-3",
  "md:rotate-2",
  "md:rotate-3",
  "md:-rotate-2",
  "md:rotate-1",
  "md:-rotate-1",
  "md:rotate-2",
] as const;

function StepCard({ step, tilt, onOpen }: { step: LifecycleStep; tilt: string; onOpen: (s: LifecycleStep) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(step)}
      aria-haspopup="dialog"
     
      className={`pointer-events-auto flex w-full flex-col justify-between rounded-3xl border border-stroke bg-surface p-4 text-left transition-transform duration-500 hover:z-10 hover:scale-[1.03] focus-visible:scale-[1.03] sm:p-6 md:aspect-square md:max-w-[320px] md:hover:rotate-0 md:focus-visible:rotate-0 ${tilt}`}
    >
      <span>
        <span className="font-display text-3xl italic text-[#89AACC] md:text-4xl">
          {String(step.order).padStart(2, "0")}
        </span>
        <span className="mt-2 block text-sm font-medium text-text-primary md:text-base">{step.name}</span>
        <span className="mt-2 block text-xs leading-relaxed text-muted md:text-[13px]">{step.sentence}</span>
      </span>
      <span className="mt-4 block text-[11px] uppercase tracking-[0.15em] text-text-primary/70">
        Artifact: <Case>{step.artifact}</Case>
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
      <p className="mt-4 text-xs uppercase tracking-[0.15em] text-[#89AACC]">Artifact: <Case>{step.artifact}</Case></p>
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
  const reduced = useReducedMotion();
  const [active, setActive] = useState<LifecycleStep | null>(null);

  useEffect(() => {
    if (reduced || !section.current || !pin.current) return;
    gsap.registerPlugin(ScrollTrigger);
    // Pin and parallax only from 768px up; below that the section is static (matchMedia handles resize).
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: "bottom bottom",
        pin: pin.current,
        pinSpacing: false,
      });
      const scrub = { trigger: section.current, start: "top bottom", end: "bottom top", scrub: true };
      // Odd steps drift slower than even steps; the wrappers (not the tilted cards) carry the transform.
      const items = section.current!.querySelectorAll<HTMLElement>("[data-parallax]");
      items.forEach((el) => {
        const y = el.dataset.parallax === "slow" ? -180 : -330;
        gsap.fromTo(el, { y: 0 }, { y, ease: "none", scrollTrigger: scrub });
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={section}
      aria-labelledby="sox-practice-title"
      id="sox-404b-practice"
      className={reduced ? "relative bg-bg py-16 md:py-24" : "relative bg-bg py-16 md:min-h-[300vh] md:py-0"}
    >
      <div
        ref={pin}
        className={
          reduced
            ? "relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 pb-16 text-center"
            : "relative z-10 flex flex-col items-center px-6 pb-12 text-center md:h-screen md:justify-center md:pb-0"
        }
      >
        <div className="mb-5 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted"><Case>SOX 404(b) practice</Case></span>
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
            : "relative mx-auto max-w-[1400px] px-6 md:pointer-events-none md:absolute md:inset-0 md:z-20"
        }
      >
        <ol
          className={
            reduced
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2"
              : "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-40 md:gap-y-16 md:pt-[100vh]"
          }
        >
          {lifecycle.map((s, i) => (
            <li
              key={s.order}
              data-parallax={reduced ? undefined : i % 2 === 0 ? "slow" : "fast"}
              className={
                reduced || i % 2 === 0
                  ? "flex justify-center"
                  : "flex justify-center md:-mb-[30vh] md:mt-[30vh]"
              }
            >
              <StepCard step={s} tilt={TILTS[i % TILTS.length]} onOpen={setActive} />
            </li>
          ))}
        </ol>
      </div>

      {active ? <Lightbox step={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}
