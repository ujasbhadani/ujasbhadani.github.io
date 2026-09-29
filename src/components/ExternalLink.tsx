import type { ReactNode } from "react";

/** Off-site link. Always opens in a new tab with noopener noreferrer. */
export function ExternalLink({
  href,
  children,
  className = "text-text-primary underline decoration-stroke underline-offset-4 transition-colors hover:decoration-[#89AACC]",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
