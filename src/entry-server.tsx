import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { App } from "./App";

export { allRoutes, getRouteMeta, headHtml } from "./lib/seo";

/** Renders a route to an HTML string at its at-rest state (no loading overlay). */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
