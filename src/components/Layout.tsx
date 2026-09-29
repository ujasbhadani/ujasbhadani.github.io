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
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Two frames: let the new route paint before measuring.
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ block: "start" });
        }),
      );
      return () => cancelAnimationFrame(raf);
    }
    if (!isFirst) window.scrollTo(0, 0);
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
