import { useCallback, useEffect, useState } from "react";
import { Explorations } from "../components/Explorations";
import { Hero } from "../components/Hero";
import { JournalList } from "../components/JournalList";
import { LoadingScreen } from "../components/LoadingScreen";
import { ProjectBento } from "../components/ProjectBento";
import { SectionHeader } from "../components/SectionHeader";
import { Stats } from "../components/Stats";
import { Button } from "../components/Button";
import { projects, writing } from "../data";

const SEEN_KEY = "ub-loader-seen";

/** Loader shows on the first landing-page load per browser session, and never under reduced motion. */
function shouldShowLoader(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return window.sessionStorage.getItem(SEEN_KEY) !== "1";
  } catch {
    return true;
  }
}

export function Landing() {
  const [isLoading, setIsLoading] = useState(shouldShowLoader);
  const onComplete = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    if (!isLoading) return;
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Storage blocked: the loader may replay on the next visit, which is harmless.
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? <LoadingScreen onComplete={onComplete} /> : null}
      <Hero ready={!isLoading} />

      <section id="work" aria-labelledby="work-title" className="scroll-mt-24 bg-bg py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
          <SectionHeader
            id="work-title"
            eyebrow="Selected Work"
            heading="Featured *projects*"
            sub="Two case studies first, then the supporting work behind them."
            action={
              <Button to="/work" variant="pill">
                View all work
                <span aria-hidden="true">→</span>
              </Button>
            }
          />
          <ProjectBento items={projects.slice(0, 4)} />
        </div>
      </section>

      <section id="ai-in-grc" aria-labelledby="journal-title" className="scroll-mt-24 bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
          <SectionHeader
            id="journal-title"
            eyebrow="Journal"
            heading="AI in *GRC*"
            sub="Three short positions, each with its sources. The Crescive case study is the worked example."
          />
          <JournalList pieces={writing} />
        </div>
      </section>

      <Explorations />
      <Stats />
    </>
  );
}
