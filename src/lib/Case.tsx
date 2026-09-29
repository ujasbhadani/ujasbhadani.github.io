import { Fragment } from "react";

/** Keeps the statutory "(b)" in SOX 404(b) lowercase inside `uppercase` text. */
export function Case({ children }: { children: string }) {
  const parts = children.split(/(404\(b\))/g);
  return (
    <>
      {parts.map((part, i) =>
        part === "404(b)" ? (
          <span key={i} className="normal-case">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
