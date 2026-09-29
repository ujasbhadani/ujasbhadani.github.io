import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "solid" | "outline" | "pill";

interface Props {
  variant?: Variant;
  to?: string;
  href?: string;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

// Full static class strings per variant (Tailwind cannot see concatenated names).
const INNER: Record<Variant, string> = {
  solid:
    "relative inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary group-focus-visible:bg-bg group-focus-visible:text-text-primary",
  outline:
    "relative inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-sm text-text-primary transition-colors duration-300 group-hover:border-transparent group-focus-visible:border-transparent",
  pill: "relative inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-stroke bg-bg px-5 py-2.5 text-sm text-text-primary transition-colors duration-300 group-hover:border-transparent group-focus-visible:border-transparent",
};

const OUTER =
  "group relative inline-flex rounded-full transition-transform duration-300 hover:scale-105 focus-visible:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100";

/** Pill button with the accent-gradient ring on hover and keyboard focus. */
export function Button({
  variant = "solid",
  to,
  href,
  external,
  onClick,
  children,
  className = "",
  ariaLabel,
}: Props) {
  const ring = (
    <span
      aria-hidden="true"
      className="accent-gradient-animated pointer-events-none absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
    />
  );
  const inner = <span className={INNER[variant]}>{children}</span>;
  const cls = `${OUTER} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel}>
        {ring}
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {ring}
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} aria-label={ariaLabel} onClick={onClick}>
      {ring}
      {inner}
    </button>
  );
}
