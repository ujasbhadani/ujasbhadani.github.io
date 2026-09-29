// Minimal, deliberately narrow inline-markup helper: content-spec.md's case
// studies use a bare `*phrase*` convention for a lead-in emphasis inside a
// "What changed" list item (e.g. "*Scoping went top-down.* Instead of...").
// This is not a general markdown renderer -- it only escapes HTML and
// converts that one pattern to <em>, so content stays plain data (JSON)
// rather than pre-rendered markup.
export function emphasisHtml(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/\*(.+?)\*/g, "<em>$1</em>");
}
