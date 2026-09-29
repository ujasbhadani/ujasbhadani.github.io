// Prerenders every route to static HTML after `vite build` and `vite build --ssr`.
//
// It loads the SSR bundle (.ssr/entry-server.js), renders each route with
// react-dom/server at its at-rest state (no loading overlay), and injects the markup
// and per-route <head> into the client build's index.html template:
//   /            -> dist/index.html
//   /work/       -> dist/work/index.html
//   (not found)  -> dist/404.html   (GitHub Pages serves it for unknown URLs)
// No headless browser is needed. After the client bundle loads it mounts a fresh React
// root over this markup (createRoot), so there is no hydration mismatch.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");

const { render, allRoutes, getRouteMeta, headHtml } = await import(
  pathToFileURL(path.join(root, ".ssr/entry-server.js")).href
);

const template = await readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-html-->") || !template.includes("<!--app-head-->")) {
  throw new Error("dist/index.html is missing the <!--app-head--> / <!--app-html--> placeholders");
}

// Guard rails: nothing that must never ship may appear in prerendered output.
const FORBIDDEN = [/\[confirm/i, /\[N\]/, /\[TBD\]/, /TODO/, /lorem/i, /role="status"[^>]*aria-label="Loading/];

function page(route, notFound = false) {
  const html = render(notFound ? "/__not-found__" : route);
  const head = headHtml(getRouteMeta(notFound ? "/__not-found__" : route));
  const out = template.replace("<!--app-head-->", head).replace("<!--app-html-->", html);
  for (const pattern of FORBIDDEN) {
    if (pattern.test(out)) throw new Error(`Prerendered ${route} matches forbidden pattern ${pattern}`);
  }
  if (!/<h1[\s>]/.test(out)) throw new Error(`Prerendered ${route} has no <h1>`);
  return out;
}

const written = [];
for (const route of allRoutes()) {
  const file = route === "/" ? "index.html" : path.join(route.replace(/^\/|\/$/g, ""), "index.html");
  const target = path.join(dist, file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, page(route));
  written.push(file);
}
await writeFile(path.join(dist, "404.html"), page("/404", true));
written.push("404.html");

console.log(`Prerendered ${written.length} files:\n  ${written.join("\n  ")}`);
