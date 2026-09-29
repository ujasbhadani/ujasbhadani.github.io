/** Smooth-scroll to the contact section (present in every route's footer) and move focus there. */
export function scrollToContact(): void {
  const el = document.getElementById("contact");
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  el.focus({ preventScroll: true });
}
