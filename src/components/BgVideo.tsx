import { useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const POSTER = "/media/hero-poster.jpg";

/**
 * Looping background video (native <video>, FD12). Under 768px the 720p
 * file is used. With reduced motion the poster shows and nothing autoplays.
 * The media files are delivered separately; the page still renders without them.
 */
export function BgVideo({
  flipped = false,
  overlayClass = "bg-black/20",
}: {
  flipped?: boolean;
  overlayClass?: string;
}) {
  const reduced = useReducedMotion();
  const [small, setSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-bg">
      <div className={flipped ? "absolute inset-0 scale-y-[-1]" : "absolute inset-0"}>
        <video
          key={`${small ? "s" : "l"}-${reduced ? "r" : "m"}`}
          className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
          autoPlay={!reduced}
          loop={!reduced}
          muted
          playsInline
          preload="metadata"
          poster={POSTER}
          tabIndex={-1}
        >
          {small ? null : <source src="/media/hero.webm" type="video/webm" />}
          <source src={small ? "/media/hero-720.mp4" : "/media/hero.mp4"} type="video/mp4" />
        </video>
      </div>
      <div className={`absolute inset-0 ${overlayClass}`} />
    </div>
  );
}
