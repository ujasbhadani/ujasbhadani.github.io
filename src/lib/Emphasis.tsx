import { Fragment } from "react";

/**
 * Renders the bare `*phrase*` lead-in convention used in the case-study data as <em>.
 * Not a markdown renderer: it only handles that one pattern, without innerHTML.
 */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/\*(.+?)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

/** Splits a heading like "Seven *steps*" into text with a display-italic accent word. */
export function DisplayHeading({ text }: { text: string }) {
  const parts = text.split(/\*(.+?)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-display italic">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
