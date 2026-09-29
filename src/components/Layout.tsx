import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { applyHead, getRouteMeta } from "../lib/seo";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/** Scrolls to the hash target (or top) on in-app navigation and keeps the head in sync. */
function RouteEffects() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    applyHead(getRouteMeta(pathname));
  }, [pathname]);

  useEffect(() => {
    const isFirst = first.current;
    first.current = false;
    if (!hash) {
      if (!isFirst) window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    const align = () => document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });

    // Scroll once after the route paints, then keep the target aligned while late content
    // (webfonts, images, the loader hand-off) settles. Stops on the first user input.
    let stopped = false;
    const stop = () => {
      stopped = true;
    };
    const realign = () => {
      if (!stopped) align();
    };
    const raf = requestAnimationFrame(() => requestAnimationFrame(realign));
    const inputs = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    inputs.forEach((t) => window.addEventListener(t, stop, { passive: true, once: true }));
    window.addEventListener("load", realign);
    document.fonts?.ready.then(realign);
    const ro = new ResizeObserver(realign);
    ro.observe(document.body);
    const timer = setTimeout(() => ro.disconnect(), 10000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener("load", realign);
      inputs.forEach((t) => window.removeEventListener(t, stop));
    };
  }, [pathname, hash]);

  return null;
}

export function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-full focus:bg-text-primary focus:px-5 focus:py-3 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>
      <RouteEffects />
      <Navbar />
      <main id="main" key={pathname} className="animate-page-in">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
