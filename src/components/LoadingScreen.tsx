import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["Scope", "Test", "Prove"] as const;
const DURATION = 2700;

/**
 * Full-screen intro: 000 to 100 counter over 2700 ms, rotating words every
 * 900 ms, gradient progress bar. Calls onComplete 400 ms after reaching 100.
 * It is a plain fixed overlay: no focus trap, unmounted by its parent.
 */
export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let raf = 0;
    let done: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();
    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / DURATION) * 100));
      setCount(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        done = setTimeout(onComplete, 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (done) clearTimeout(done);
    };
  }, [onComplete]);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      role="status"
      aria-label={`Loading, ${count} percent`}
      className="fixed inset-0 z-[9999] bg-bg"
    >
      <motion.span
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-muted md:left-10 md:top-10"
      >
        Portfolio
      </motion.span>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-10 right-6 font-display text-6xl tabular-nums text-text-primary md:right-10 md:text-8xl lg:text-9xl"
      >
        {String(count).padStart(3, "0")}
      </span>

      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <div
          className="accent-gradient h-full origin-left"
          style={{ transform: `scaleX(${count / 100})`, boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)" }}
        />
      </div>
    </div>
  );
}
