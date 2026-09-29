import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../lib/site";
import { scrollToContact } from "../lib/scroll";

function isActive(pathname: string, to: string): boolean {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const path = pathname.replace(/\/+$/, "") || "/";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <nav
        aria-label="Primary"
        className={
          scrolled
            ? "inline-flex items-center rounded-full border border-white/10 bg-surface px-2 py-2 shadow-md shadow-black/10 backdrop-blur-md"
            : "inline-flex items-center rounded-full border border-white/10 bg-surface px-2 py-2 backdrop-blur-md"
        }
      >
        <Link
          to="/"
          aria-label="Ujas Bhadani, home"
          className="accent-gradient flex h-11 w-11 items-center justify-center rounded-full p-[2px] transition-transform duration-300 hover:scale-110 hover:[background:linear-gradient(270deg,#89AACC_0%,#4E85BF_100%)] focus-visible:scale-110"
        >
          <span className="flex h-full w-full items-center justify-center rounded-full bg-bg font-display text-[13px] italic">
            UB
          </span>
        </Link>

        <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        <ul className="flex items-center">
          {NAV_LINKS.map((link) => {
            const active = isActive(path, link.to);
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "inline-flex min-h-[44px] items-center rounded-full bg-stroke/50 px-2.5 py-1.5 text-xs text-text-primary sm:px-4 sm:py-2 sm:text-sm"
                      : "inline-flex min-h-[44px] items-center rounded-full px-2.5 py-1.5 text-xs text-muted transition-colors hover:bg-stroke/50 hover:text-text-primary sm:px-4 sm:py-2 sm:text-sm"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToContact();
          }}
          className="group relative ml-1 inline-flex rounded-full sm:ml-0"
        >
          <span
            aria-hidden="true"
            className="accent-gradient-animated pointer-events-none absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          />
          <span className="relative inline-flex min-h-[44px] items-center gap-1 rounded-full bg-surface px-2.5 py-1.5 text-xs text-text-primary backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
            Say hi <span aria-hidden="true">↗</span>
          </span>
        </a>
      </nav>
    </header>
  );
}
