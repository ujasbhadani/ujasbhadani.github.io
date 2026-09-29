import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { EMAIL, SOCIAL_LINKS } from "../lib/site";
import { BgVideo } from "./BgVideo";
import { Button } from "./Button";
import { ExternalLink } from "./ExternalLink";
import { Reveal } from "./Reveal";

const MARQUEE_TEXT = "AUDITABLE BY CONSTRUCTION • ";

function Marquee() {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !track.current) return;
    const tween = gsap.to(track.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    return () => {
      tween.kill();
      if (track.current) gsap.set(track.current, { clearProps: "transform" });
    };
  }, [reduced]);

  return (
    <div aria-hidden="true" className="mb-14 overflow-hidden md:mb-20">
      <div ref={track} className="flex w-max whitespace-nowrap">
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className="font-display text-6xl italic text-text-primary/15 md:text-8xl lg:text-9xl"
          >
            {MARQUEE_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable: the address is selectable text and a mailto link.
    }
  };
  return (
    <>
      <Button variant="pill" onClick={copy} ariaLabel={`Copy email address ${EMAIL}`}>
        {copied ? "Copied" : "Copy"}
      </Button>
      <span role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </>
  );
}

/** Contact section and footer bar. Rendered on every route; anchor target for `#contact`. */
export function Footer() {
  return (
    <footer
      id="contact"
      tabIndex={-1}
      className="relative overflow-hidden bg-bg pb-8 pt-16 outline-none md:pb-12 md:pt-20"
    >
      <BgVideo flipped overlayClass="bg-black/60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-bg to-transparent"
      />

      <div className="relative z-10">
        <Marquee />

        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
          <Reveal className="mx-auto mb-20 max-w-2xl text-center md:mb-28">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-stroke" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Contact</span>
              <span aria-hidden="true" className="h-px w-8 bg-stroke" />
            </div>
            <h2 className="text-4xl leading-[1.05] tracking-tight md:text-6xl">
              Let&rsquo;s <span className="font-display italic">talk</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm text-text-primary/80 md:text-base">
              If you are standing up or rescuing a SOX 404(b) ITGC program, evaluating AI for your
              GRC function, or want to talk about how Crescive is built, I would like to hear from
              you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href={`mailto:${EMAIL}`} variant="solid">
                {EMAIL}
              </Button>
              <CopyEmail />
            </div>
          </Reveal>

          <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
            <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.url}>
                  <ExternalLink
                    href={link.url}
                    className="inline-flex min-h-[44px] items-center rounded-full px-3 text-sm text-text-primary/80 transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-3 text-sm text-text-primary/80">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 shrink-0 animate-pulse-dot rounded-full bg-green-400"
              />
              Available for SOX 404(b) and AI in GRC conversations
            </p>
          </div>
          <p className="mt-6 text-center text-xs text-text-primary/70 md:text-left">
            © 2026 Ujas Bhadani · Founder, Vasan AI Technologies, LLC · crescive.ai
          </p>
        </div>
      </div>
    </footer>
  );
}
