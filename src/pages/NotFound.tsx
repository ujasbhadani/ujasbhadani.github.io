import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/resume", label: "Resume" },
] as const;

export function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="Page not *found*"
        sub="That address does not exist here. These places do."
      />
      <nav aria-label="Back to the site" className="mx-auto max-w-[1200px] px-6 pb-24 md:px-10 lg:px-16">
        <ul className="flex flex-wrap gap-3">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="inline-flex min-h-[44px] items-center rounded-full border border-stroke px-6 text-sm text-text-primary transition-colors hover:bg-surface"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
