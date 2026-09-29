import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useIsoLayoutEffect } from "../hooks/useIsoLayoutEffect";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { HERO_DESCRIPTION, ROLES } from "../lib/site";
import { scrollToContact } from "../lib/scroll";
import { BgVideo } from "./BgVideo";
import { Button } from "./Button";

/** Landing hero. `ready` flips true once the loading overlay is gone; the GSAP entrance runs then. */
export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // GSAP entrance: hidden while loading, then name-reveal and staggered blur-in.
  useIsoLayoutEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      if (!ready) {
        gsap.set([".name-reveal", ".blur-in"], { opacity: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, clearProps: "transform,opacity" },
        0.1,
      );
      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1, clearProps: "filter,transform,opacity" },
        0.3,
      );
    }, root);
    return () => ctx.revert();
  }, [ready, reduced]);

  // Rotating role, every 2 s. Static first phrase when motion is reduced; paused on hover/focus.
  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2000);
    return () => clearInterval(id);
  }, [reduced, paused]);

  const role = reduced ? ROLES[0] : ROLES[roleIndex];

  return (
    <section
      ref={root}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <BgVideo />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent"
      />

      <div className="relative z-10 flex flex-col items-center px-6 pb-24 pt-28 text-center">
        <p className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">
          SOX 404(b) · AI in GRC · 2026
        </p>
        <h1 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary md:text-8xl lg:text-9xl">
          Ujas Bhadani
        </h1>
        <p
          className="blur-in mb-6 text-base text-text-primary/90 md:text-xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          A{" "}
          <span
            key={roleIndex}
            className="inline-block animate-role-fade-in font-display italic text-text-primary"
          >
            {role}
          </span>{" "}
          based in Irvine.
        </p>
        <p className="blur-in mb-12 max-w-md text-sm text-muted md:text-base">{HERO_DESCRIPTION}</p>
        <div className="blur-in inline-flex flex-wrap items-center justify-center gap-4">
          <Button to="/work" variant="solid">
            See work
          </Button>
          <Button
            href="#contact"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              scrollToContact();
            }}
          >
            Reach out
          </Button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-stroke">
          <span className="accent-gradient absolute inset-x-0 top-0 block h-1/2 animate-scroll-down" />
        </span>
      </div>
    </section>
  );
}
